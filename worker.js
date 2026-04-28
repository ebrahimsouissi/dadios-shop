const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "https://thedadios.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: HEADERS });
}

function makeCode4() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 4; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

async function createUniqueCode(kv) {
  for (let i = 0; i < 40; i++) {
    const c = makeCode4();
    const exists = await kv.get(`card:${c}`);
    if (!exists) return c;
  }
  throw new Error("Code generation failed");
}

function normalize(card) {
  card.stamps = Number(card.stamps || 0);
  card.rewards = Number(card.rewards || 0);
  return card;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: HEADERS });
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/api/loyalty") {
      return json({ ok: true, service: "loyalty", version: 3 });
    }

    if (url.pathname !== "/api/loyalty" || request.method !== "POST") {
      return json({ ok: false, error: "Not found" }, 404);
    }

    const kv = env.LOYALTY_KV;
    if (!kv) {
      return json({ ok: false, error: "KV not bound (LOYALTY_KV)" }, 500);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid JSON" }, 400);
    }

    const action = body.action;
    if (!action) {
      return json({ ok: false, error: "Missing action" }, 400);
    }

    // =========================
    // ===== ADMIN PART ========
    // =========================

    const adminPassword = env.ADMIN_PASSWORD;

    if (action.startsWith("admin_")) {
      if (!adminPassword || body.password !== adminPassword) {
        return json({ ok: false, error: "Unauthorized" }, 401);
      }
    }

    if (action === "admin_list") {
      const list = await kv.list({ prefix: "card:" });
      const cards = [];

      for (const key of list.keys) {
        const raw = await kv.get(key.name);
        if (raw) cards.push(normalize(JSON.parse(raw)));
      }

      cards.sort((a, b) =>
        (b.createdAt || "").localeCompare(a.createdAt || "")
      );

      return json({ ok: true, cards });
    }

    if (action === "admin_addStamp") {
      const code = String(body.code || "").trim().toUpperCase();
      const qty = Math.max(1, parseInt(body.qty, 10) || 1);

      const raw = await kv.get(`card:${code}`);
      if (!raw) return json({ ok: false, error: "Carte non trouvée" }, 404);

      const card = normalize(JSON.parse(raw));
      card.stamps += qty;
      card.rewards += Math.floor(card.stamps / 8);
      card.stamps = card.stamps % 8;

      await kv.put(`card:${code}`, JSON.stringify(card));
      return json({ ok: true, card });
    }

    if (action === "admin_delete") {
      const code = String(body.code || "").trim().toUpperCase();
      await kv.delete(`card:${code}`);
      return json({ ok: true });
    }

    // =========================
    // ===== USER PART =========
    // =========================

    if (action === "create") {
      const name = (body.name || "").trim();
      const phone = (body.phone || "").trim();

      if (!name || !phone) {
        return json({ ok: false, error: "Missing name/phone" }, 400);
      }

      const code = await createUniqueCode(kv);

      const card = normalize({
        code,
        name,
        phone,
        stamps: 0,
        rewards: 0,
        createdAt: new Date().toISOString(),
      });

      await kv.put(`card:${code}`, JSON.stringify(card));
      return json({ ok: true, card });
    }

    if (action === "get") {
      // Accept either a card code or a phone number (sent as `identifier`, `code`, or `phone`)
      const identifier = String(body.identifier || body.code || body.phone || "").trim();
      if (!identifier) return json({ ok: false, error: "Missing code or phone" }, 400);

      // Try direct code lookup first (codes are 4 uppercase chars)
      const asCode = identifier.toUpperCase();
      let raw = await kv.get(`card:${asCode}`);

      // If not found by code, scan for matching phone number
      if (!raw) {
        const list = await kv.list({ prefix: "card:" });
        for (const key of list.keys) {
          const entry = await kv.get(key.name);
          if (entry) {
            const card = JSON.parse(entry);
            if (card.phone && card.phone.replace(/\s+/g, "") === identifier.replace(/\s+/g, "")) {
              raw = entry;
              break;
            }
          }
        }
      }

      if (!raw) return json({ ok: false, error: "Carte non trouvée" }, 404);
      return json({ ok: true, card: normalize(JSON.parse(raw)) });
    }

    if (action === "addStamp") {
      const code = String(body.code || "").trim().toUpperCase();
      // Cap qty to a realistic cart size (1–10) to prevent bulk abuse
      const qty = Math.min(10, Math.max(1, parseInt(body.qty, 10) || 1));

      if (!code) return json({ ok: false, error: "Missing code" }, 400);

      // --- Rate limiting: max 3 stamp additions per card per hour ---
      const rateLimitKey = `ratelimit:stamp:${code}`;
      const nowMs = Date.now();
      const windowMs = 60 * 60 * 1000; // 1 hour

      let rateData = { count: 0, windowStart: nowMs };
      const rawRate = await kv.get(rateLimitKey);
      if (rawRate) {
        try {
          const parsed = JSON.parse(rawRate);
          if (nowMs - parsed.windowStart < windowMs) {
            rateData = parsed;
          }
        } catch {}
      }

      if (rateData.count >= 3) {
        return json({ ok: false, error: "Trop de tentatives. Réessayez dans une heure." }, 429);
      }

      const raw = await kv.get(`card:${code}`);
      if (!raw) return json({ ok: false, error: "Carte non trouvée" }, 404);

      const card = normalize(JSON.parse(raw));

      card.stamps += qty;
      card.rewards += Math.floor(card.stamps / 8);
      card.stamps = card.stamps % 8;

      // Persist card and update rate limit counter atomically
      rateData.count += 1;
      await Promise.all([
        kv.put(`card:${code}`, JSON.stringify(card)),
        kv.put(rateLimitKey, JSON.stringify(rateData), { expirationTtl: 3600 }),
      ]);

      return json({ ok: true, card });
    }

    return json({ ok: false, error: "Unknown action" }, 400);
  },
};
