const WHATSAPP_NUMBER = "21656731891";

const PRICE = "25 DT";
const SIZE = "50ML";

const PRODUCTS = [
  { name: "Giorgio Armani My Way", category:"femme", img: "images/1.jpeg" },
  { name: "Thierry Mugler Alien", category:"femme", img: "images/2.jpeg" },
  { name: "Prada Paradoxe", category:"femme", img: "images/3.jpeg" },
  { name: "Baccarat Rouge 540", category:"femme", img: "images/4.jpeg" },
  { name: "Chloé", category:"femme", img: "images/5.jpeg" },
  { name: "Libre Le Parfum", category:"femme", img: "images/6.jpeg" },
  { name: "L’Interdit Rouge", category:"femme", img: "images/7.jpeg" },
  { name: "Rasasi Dareej", category:"homme", img: "images/8.jpeg" },
  { name: "Armani Code", category:"homme", img: "images/9.jpeg" },
  { name: "Terre d’Hermès", category:"homme", img: "images/10.jpeg" },
  { name: "Tommy", category:"homme", img: "images/11.jpeg" },
  { name: "Sauvage Elixir", category:"homme", img: "images/12.jpeg" },
  { name: "Bvlgari Man in Black", category:"homme", img: "images/13.jpeg" },
  { name: "Azzaro Wanted", category:"homme", img: "images/14.jpeg" },
  { name: "Bleu de Chanel", category:"homme", img: "images/15.jpeg" },
  { name: "Creed Aventus", category:"homme", img: "images/16.jpeg" },
  { name: "K by Dolce & Gabbana", category:"homme", img: "images/17.jpeg" },
  { name: "Alien Purple Edition", category:"femme", img: "images/18.jpeg" },
  { name: "Vert Malachite", category:"femme", img: "images/19.jpeg" }
];

function waLink(text){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

const container = document.getElementById("productContainer");

function displayProducts(list){
  container.innerHTML = "";
  list.forEach(p=>{
    const msg = `Bonjour, je veux commander: ${p.name} - ${SIZE} - ${PRICE}.`;
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h2>${p.name}</h2>
        <p>${SIZE}</p>
        <span>${PRICE}</span>
        <a href="${waLink(msg)}" target="_blank">Commander</a>
      </div>
    `;
  });
}

displayProducts(PRODUCTS);

function filterCategory(cat){
  if(cat === "all"){
    displayProducts(PRODUCTS);
  } else {
    displayProducts(PRODUCTS.filter(p => p.category === cat));
  }
}

const searchInput = document.getElementById("searchInput");
if(searchInput){
  searchInput.addEventListener("keyup", function(){
    const value = this.value.toLowerCase();
    displayProducts(PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(value)
    ));
  });
}
