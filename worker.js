/**
 * Cloudflare Worker - Loyalty API Endpoint
 * 
 * Handles /api/loyalty requests for loyalty card operations:
 * - create: Create a new loyalty card
 * - get: Get loyalty card by code
 * - addStamp: Add stamps to existing card
 */

const TARGET_URL = "https://script.google.com/macros/s/AKfycbwRtuAc7O3zL66ZuZGXXf0dpPghJ_h7-b6G3UrRGq2zGgIofFGfB3lyoSQOIxdoSNbnwA/exec";
const ALLOWED_ORIGIN = "https://dadiosfragrance.com";

const cardStore = new Map();

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function createCard(name, phone) {
  let code = generateCode();
  while (cardStore.has(code)) {
    code = generateCode();
  }
  const card = { code, name, phone, stamps: 0, rewards: 0, created: new Date().toISOString() };
  cardStore.set(code, card);
  return card;
}

function getCard(code) {
  return cardStore.get(code.toUpperCase()) || null;
}

function addStamps(code, qty) {
  const card = cardStore.get(code.toUpperCase());
  if (!card) return null;
  card.stamps += qty;
  card.rewards = Math.floor(card.stamps / 8);
  card.stamps = card.stamps % 8;
  return card;
}

async function proxyToGoogle(action, data) {
  const formData = new FormData();
  formData.append('action', action);
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  try {
    const response = await fetch(TARGET_URL, { method: 'POST', body: formData });
    return await response.json();
  } catch (e) {
    return { success: false, error: e.message };
  }
}

async function handleLoyaltyRequest(action, data) {
  const result = await proxyToGoogle(action, data);
  if (result.success) {
    if (action === 'create' && result.card) cardStore.set(result.card.code, result.card);
    else if (action === 'get' && result.card) cardStore.set(result.card.code, result.card);
    else if (action === 'addStamp' && result.card) cardStore.set(result.card.code, result.card);
    return { ok: true, card: result.card };
  }
  switch (action) {
    case 'create': return { ok: true, card: createCard(data.name, data.phone) };
    case 'get': const card = getCard(data.code); return card ? { ok: true, card } : { ok: false, error: 'Carte non trouvée' };
    case 'addStamp': const updated = addStamps(data.code, parseInt(data.qty) || 1); return updated ? { ok: true, card: updated } : { ok: false, error: 'Carte non trouvée' };
    default: return { ok: false, error: 'Action inconnue' };
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN, "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "86400" } });
    }
    if (url.pathname !== "/api/loyalty" || request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Not found" }), { status: 404, headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN, "Content-Type": "application/json" } });
    }
    try {
      const body = await request.json();
      const action = body.action;
      delete body.action;
      const result = await handleLoyaltyRequest(action, body);
      return new Response(JSON.stringify(result), { status: 200, headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN, "Content-Type": "application/json" } });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, error: error.message || "Erreur de traitement" }), { status: 500, headers: { "Access-Control-Allow-Origin": ALLOWED_ORIGIN, "Content-Type": "application/json" } });
    }
  },
};
