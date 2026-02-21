const WHATSAPP_NUMBER = "21690338691"; // بدّل رقمك هنا

const PRICE = "25 DT";
const SIZE = "50ML";

const PRODUCTS = [
  { name: "Giorgio Armani My Way", img: "images/1.jpeg" },
  { name: "Thierry Mugler Alien", img: "images/2.jpeg" },
  { name: "Prada Paradoxe", img: "images/3.jpeg" },
  { name: "Maison Francis Kurkdjian Baccarat Rouge 540", img: "images/4.jpeg" },
  { name: "Chloé", img: "images/5.jpeg" },
  { name: "Libre Le Parfum", img: "images/6.jpeg" },
  { name: "L’Interdit Rouge", img: "images/7.jpeg" },
  { name: "Rasasi Dareej", img: "images/8.jpeg" },
  { name: "Armani Code", img: "images/9.jpeg" },
  { name: "Terre d’Hermès", img: "images/10.jpeg" },
  { name: "Tommy", img: "images/11.jpeg" },
  { name: "Sauvage Elixir", img: "images/12.jpeg" },
  { name: "Bvlgari Man in Black", img: "images/13.jpeg" },
  { name: "Azzaro Wanted", img: "images/14.jpeg" },
  { name: "Bleu de Chanel", img: "images/15.jpeg" },
  { name: "Creed Aventus", img: "images/16.jpeg" },
  { name: "K by Dolce & Gabbana", img: "images/17.jpeg" },
  { name: "Alien (Purple Edition)", img: "images/18.jpeg" },
  { name: "Vert Malachite", img: "images/19.jpeg" },
];

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("waHeader").href = waLink("Bonjour, je veux commander un parfum Dadios 50ML (25 DT).");

const root = document.getElementById("products");
root.innerHTML = PRODUCTS.map((p) => {
  const msg = `Bonjour, je veux commander: ${p.name} (Dadios) - ${SIZE} - ${PRICE}.`;
  return `
  <article class="card">
    <img src="${p.img}" alt="${p.name}" loading="lazy" />
    <div class="p">
      <h3>${p.name}</h3>
      <div class="meta">
        <span>${SIZE}</span>
        <span class="price">${PRICE}</span>
      </div>
      <div class="actions">
        <a class="btn primary" href="${waLink(msg)}" target="_blank" rel="noopener">Commander</a>
        <a class="btn" href="${waLink(`Bonjour, j'ai une question sur: ${p.name}.`)}" target="_blank" rel="noopener">Question</a>
      </div>
    </div>
  </article>`;
}).join("");
