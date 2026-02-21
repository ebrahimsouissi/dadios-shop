// ✅ 1) بدّل رقمك هنا:
const WHATSAPP_NUMBER = "21690338691"; // مثال: 21612345678

// ✅ 2) بدّل المنتجات هنا:
const PRODUCTS = [
  {
    name: "Dadios — Inspired by Armani Code",
    size: "50ML",
    price: "— TND",
    img: "https://images.unsplash.com/photo-1523293836415-1d84c9f1a0c1?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dadios — Version Night",
    size: "50ML",
    price: "— TND",
    img: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=80",
  }
];

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("waHeader").href = waLink("Bonjour, je veux commander un parfum Dadios 50ML.");

const root = document.getElementById("products");
root.innerHTML = PRODUCTS.map((p, i) => {
  const msg = `Bonjour, je veux commander: ${p.name} (${p.size}).`;
  return `
  <article class="card">
    <img src="${p.img}" alt="${p.name}" loading="lazy" />
    <div class="p">
      <h3>${p.name}</h3>
      <div class="meta">
        <span>${p.size}</span>
        <span class="price">${p.price}</span>
      </div>
      <div class="actions">
        <a class="btn primary" href="${waLink(msg)}" target="_blank" rel="noopener">Commander</a>
        <a class="btn" href="${waLink(`Bonjour, j'ai une question sur: ${p.name}.`)}" target="_blank" rel="noopener">Question</a>
      </div>
      <div class="small">Commande عبر WhatsApp • Paiement à la livraison</div>
    </div>
  </article>
  `;
}).join("");
