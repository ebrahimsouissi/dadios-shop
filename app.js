// Rebuilt app.js — modular, defensive, and production-ready
(function(){
  'use strict';

  // ---- Config / Constants ----
  const PRICE_DT = 25;
  const SIZE = '50ML';
  const CART_KEY = 'dadios_cart_v1';

  // ---- DOM helpers ----
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---- Data ----
  const PRODUCTS = [
    {id:"alien",name:"Alien",brand:"Mugler",gender:"pour femme",category:"femme",thumbImg:"images/Alien.jpeg",rating:4.0,votes:34239,accords:[{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Ambre",color:"#b55a14"},{label:"Floral",color:"#ff5b91"},{label:"Animal",color:"#8b4b19"},{label:"Poudré",color:"#e7d7c8"}],notes:["Jasmin","Ambre","Cashmeran"],longevity:"8 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Hiver","Printemps","Été","Automne"]},
    {id:"armani-code-parfum",name:"Armani Code Parfum",brand:"Giorgio Armani",gender:"pour homme",category:"homme",thumbImg:"images/Armani Code.jpeg",rating:4.4,votes:6114,accords:[{label:"Iris",color:"#b5a8d7"},{label:"Aromatique",color:"#3aa58c"},{label:"Poudré",color:"#e7d7c8"},{label:"Boisé",color:"#7a4a17"},{label:"Agrume",color:"#f1ff5b"}],notes:["Iris","Fève Tonka","Bergamote","Cèdre","Aldéhydes","Sauge sclarée"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Hiver","Printemps","Été","Automne"]},
    {id:"azzaro-wanted-elixir",name:"Forever Wanted Elixir",brand:"Azzaro",gender:"pour homme",category:"homme",thumbImg:"images/Azzaro Wanted.jpeg",rating:4.2,votes:1699,accords:[{label:"Cuir",color:"#7a4a3f"},{label:"Fruité",color:"#ff4a2b"},{label:"Sucré",color:"#f13d41"},{label:"Aromatique",color:"#3aa58c"},{label:"Animal",color:"#8b4b19"}],notes:["Cuir","Framboise","Cardamome","Lavande","Mandarine","Wolfwood"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Hiver","Printemps","Été","Automne"]},
    {id:"baccarat-rouge-540",name:"Baccarat Rouge 540",brand:"Maison Francis Kurkdjian",gender:"pour homme et femme",category:"mixte",thumbImg:"images/Baccarat Rouge 540.jpeg",rating:3.8,votes:27163,accords:[{label:"Boisé",color:"#7a4a17"},{label:"Ambre",color:"#b55a14"},{label:"Épicé Chaud",color:"#c93a1a"},{label:"Métallique",color:"#97aab1"},{label:"Épicé Frais",color:"#7cc83a"}],notes:["Amberwood","Safran","Ambre gris","Sapin","Cèdre","Jasmin"],longevity:"8 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Hiver","Printemps","Été","Automne"]},
    {id:"bleu-de-chanel-edp",name:"Bleu de Chanel Eau de Parfum",brand:"Chanel",gender:"pour homme",category:"homme",thumbImg:"images/Bleu de Chanel.jpeg",rating:4.4,votes:20095,accords:[{label:"Agrume",color:"#f1ff5b"},{label:"Ambre",color:"#b55a14"},{label:"Boisé",color:"#7a4a17"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Aromatique",color:"#3aa58c"}],notes:["Pamplemousse","Encens","Citron","Ambre","Gingembre","Cèdre"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Printemps","Été","Automne"]},
    {id:"bvlgari-man-in-black",name:"Bvlgari Man In Black",brand:"Bvlgari",gender:"pour homme",category:"homme",thumbImg:"images/Bvlgari Man in Black.jpeg",rating:4.3,votes:9979,accords:[{label:"Épicé Chaud",color:"#c93a1a"},{label:"Boisé",color:"#7a4a17"},{label:"Cuir",color:"#7a4a3f"},{label:"Rhum",color:"#b2170d"},{label:"Ambre",color:"#b55a14"}],notes:["Notes Épicées","Rhum","Cuir","Tabac","Fève Tonka","Bois de Gaïac"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Hiver","Automne"]},
    {id:"chloe-edp",name:"Chloé Eau de Parfum",brand:"Chloé",gender:"pour femme",category:"femme",thumbImg:"images/Chloé Eau de Parfum.jpeg",rating:4.0,votes:22860,accords:[{label:"Floral",color:"#ff5b91"},{label:"Rose",color:"#ff007a"},{label:"Frais",color:"#8ed1c6"},{label:"Fruité",color:"#ff4a2b"},{label:"Fleurs Blanches",color:"#e9edf3"}],notes:["Rose","Pivoine","Litchi","Freesia","Muguet","Magnolia"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Printemps","Été"]},
    {id:"aventus-for-her",name:"Aventus for Her",brand:"Creed",gender:"pour femme",category:"femme",thumbImg:"images/Aventus for Her.jpeg",rating:3.6,votes:3214,accords:[{label:"Fruité",color:"#ff4a2b"},{label:"Agrume",color:"#f1ff5b"},{label:"Boisé",color:"#7a4a17"},{label:"Poudré",color:"#e7d7c8"},{label:"Musqué",color:"#cbbdd3"}],notes:["Musc","Pomme","Bergamote","Cassis","Citron","Patchouli"],longevity:"7 h",sillage:"Fort",time:["Jour"],seasons:["Printemps","Été"]},
    {id:"dareej-homme",name:"Dareej pour Homme",brand:"Rasasi",gender:"pour homme",category:"homme",thumbImg:"images/Dareej.jpeg",rating:4.1,votes:3063,accords:[{label:"Vanille",color:"#f2e7a3"},{label:"Épicé Chaud",color:"#c93a1a"},{label:"Poudré",color:"#e7d7c8"},{label:"Ambre",color:"#b55a14"},{label:"Aromatique",color:"#3aa58c"}],notes:["Vanille","Fève Tonka","Cumin","Cardamome","Rose","Ambre"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Hiver","Automne"]},
    {id:"k-dg-edp",name:"K by Dolce & Gabbana Eau de Parfum",brand:"Dolce & Gabbana",gender:"pour homme",category:"homme",thumbImg:"images/K Dolce Gabbana.jpeg",rating:4.0,votes:3243,accords:[{label:"Aromatique",color:"#3aa58c"},{label:"Boisé",color:"#7a4a17"},{label:"Agrume",color:"#f1ff5b"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Épicé Chaud",color:"#c93a1a"}],notes:["Figue","Orange Sanguine","Baies de Genièvre","Piment","Cèdre","Lavande"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Printemps","Été","Automne"]},
    {id:"interdit-rouge-ultime",name:"L'Interdit Eau de Parfum Rouge Ultime",brand:"Givenchy",gender:"pour femme",category:"femme",thumbImg:"images/L’Interdit Rouge.jpeg",rating:4.1,votes:2326,accords:[{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Tubéreuse",color:"#d7f2ea"},{label:"Cacao",color:"#8a3a12"},{label:"Épicé Chaud",color:"#c93a1a"},{label:"Sucré",color:"#f13d41"}],notes:["Tubéreuse","Cabosse de Cacao","Fleur d'Oranger","Jasmin","Patchouli","Tabac"],longevity:"7 h",sillage:"Fort",time:["Nuit"],seasons:["Hiver","Automne"]},
    {id:"libre-le-parfum",name:"Libre Le Parfum",brand:"Yves Saint Laurent",gender:"pour femme",category:"femme",thumbImg:"images/Libre Le Parfum.jpeg",rating:4.3,votes:4665,accords:[{label:"Vanille",color:"#f2e7a3"},{label:"Sucré",color:"#f13d41"},{label:"Agrume",color:"#f1ff5b"},{label:"Miel",color:"#ffb000"},{label:"Fleurs Blanches",color:"#e9edf3"}],notes:["Vanille","Miel","Fleur d'Oranger","Lavande","Fève Tonka","Gingembre"],longevity:"8 h",sillage:"Fort",time:["Nuit"],seasons:["Hiver","Automne"]},
    {id:"my-way-ylang",name:"My Way Ylang",brand:"Giorgio Armani",gender:"pour femme",category:"femme",thumbImg:"images/My Way Ylang.jpeg",rating:4.0,votes:722,accords:[{label:"Sucré",color:"#f13d41"},{label:"Tropical",color:"#ffb000"},{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Fleurs Jaunes",color:"#ffe000"},{label:"Fruité",color:"#ff4a2b"}],notes:["Mangue","Ylang-Ylang","Noix de Coco","Tubéreuse","Fleur d'Oranger","Vanille"],longevity:"6 h",sillage:"Fort",time:["Jour"],seasons:["Printemps","Été"]},
    {id:"prada-paradoxe",name:"Prada Paradoxe",brand:"Prada",gender:"pour femme",category:"femme",thumbImg:"images/Prada Paradoxe.jpeg",rating:3.9,votes:9265,accords:[{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Agrume",color:"#f1ff5b"},{label:"Ambre",color:"#b55a14"},{label:"Sucré",color:"#f13d41"},{label:"Vanille",color:"#f2e7a3"}],notes:["Fleur d'Oranger","Néroli","Vanille","Jasmin","Poire","Ambre"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Printemps","Été","Automne"]},
    {id:"sauvage-elixir",name:"Sauvage Elixir",brand:"Dior",gender:"pour homme",category:"homme",thumbImg:"images/Sauvage Elixir.jpeg",rating:4.3,votes:17190,accords:[{label:"Épicé Chaud",color:"#c93a1a"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Boisé",color:"#7a4a17"},{label:"Aromatique",color:"#3aa58c"},{label:"Lavande",color:"#b8a3e0"}],notes:["Lavande","Réglisse","Noix de muscade","Cannelle","Santal","Cardamome"],longevity:"9 h",sillage:"Énorme",time:["Jour","Nuit"],seasons:["Hiver","Automne"]},
    {id:"terre-hermes",name:"Terre d'Hermès",brand:"Hermès",gender:"pour homme",category:"homme",thumbImg:"images/Terre d’Hermès.jpeg",rating:4.3,votes:26439,accords:[{label:"Agrume",color:"#f1ff5b"},{label:"Boisé",color:"#7a4a17"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Aromatique",color:"#3aa58c"},{label:"Terreux",color:"#6b5a44"}],notes:["Orange","Vétiver","Poivre","Pamplemousse","Cèdre","Patchouli"],longevity:"7 h",sillage:"Fort",time:["Jour"],seasons:["Printemps","Été","Automne"]},
    {id:"tommy",name:"Tommy",brand:"Tommy Hilfiger",gender:"pour homme",category:"homme",thumbImg:"images/Tommy.jpeg",rating:3.9,votes:4951,accords:[{label:"Vert",color:"#1f8a2d"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Agrume",color:"#f1ff5b"},{label:"Fruité",color:"#ff4a2b"},{label:"Aromatique",color:"#3aa58c"}],notes:["Pomme","Menthe","Bergamote","Pamplemousse","Lavande","Canneberge"],longevity:"6 h",sillage:"Modéré",time:["Jour"],seasons:["Printemps","Été"]},
    {id:"vert-malachite",name:"Armani Privé Vert Malachite",brand:"Giorgio Armani",gender:"pour homme et femme",category:"mixte",thumbImg:"images/Vert Malachite.jpeg",rating:4.1,votes:1826,accords:[{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Vanille",color:"#f2e7a3"},{label:"Fleurs Jaunes",color:"#ffe000"},{label:"Agrume",color:"#f1ff5b"},{label:"Sucré",color:"#f13d41"}],notes:["Jasmin","Lys","Ylang-Ylang","Vanille","Benjoin","Orange Amère"],longevity:"7 h",sillage:"Fort",time:["Nuit"],seasons:["Hiver","Automne"]},
  ];

  const BEST_SELLERS_IDS = ["alien","prada-paradoxe","sauvage-elixir","bleu-de-chanel-edp"];

  // ---- State ----
  let currentCategory = 'all';
  const selectedBrands = new Set();
  const selectedSeasons = new Set();
  const selectedTimes = new Set();
  const selectedNotes = new Set();

  // ---- Utility functions ----
  const WHATSAPP_NUMBER = '21656731891';

  function waLink(message){
    return 'https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(message);
  }
  // Expose globally so other IIFEs (e.g. quiz) can reuse the same number
  window.dadiosWaLink = waLink;

  function getCurrentSeason(){
    const m = new Date().getMonth() + 1;
    if ([12,1,2].includes(m)) return 'Hiver';
    if ([3,4,5].includes(m)) return 'Printemps';
    if ([6,7,8].includes(m)) return 'Été';
    return 'Automne';
  }
  function getCurrentTimeSlot(){
    const h = new Date().getHours();
    return (h >= 6 && h < 18) ? 'Jour' : 'Nuit';
  }

  function getBestSeason(p){
    const s = p.seasons || [];
    const cur = getCurrentSeason();
    if (s.includes(cur)) return cur;
    return s[0] || cur;
  }
  function getBestTime(p){
    const t = p.time || [];
    const cur = getCurrentTimeSlot();
    if (t.includes(cur)) return cur;
    return t[0] || cur;
  }

  function sortBySmartSeason(list){
    const cur = getCurrentSeason();
    return [...list].sort(function(a,b){
      const aBest = getBestSeason(a);
      const bBest = getBestSeason(b);
      const aScore = aBest === cur ? 1 : 0;
      const bScore = bBest === cur ? 1 : 0;
      return bScore - aScore;
    });
  }

  // ---- Elements ----
  const container = $('#productContainer');
  const searchInput = $('#searchInput');
  const filterButtons = $$('.fbtn');
  const menuBtn = $('#menuBtn');
  const menuDrop = $('#menuDrop');
  const menuCloseBtn = $('#menuCloseBtn');
  const brandContainer = $('#brandFilters');
  const seasonContainer = $('#seasonFilters');
  const timeContainer = $('#timeFilters');
  const noteContainer = $('#noteFilters');
  const applyFiltersBtn = $('#applyFiltersBtn');
  const clearFiltersBtn = $('#clearFilters');
  const pmodal = $('#perfumeModal');
  const pclose = $('#pmodalClose');
  const cartBtn = $('#cartBtn');
  const cartCountEl = $('#cartCount');
  const cartOverlay = $('#cartOverlay');
  const cartDrawer = $('#cartDrawer');
  const cartClose = $('#cartClose');
  const cartItemsEl = $('#cartItems');
  const cartTotalEl = $('#cartTotal');
  const cartClearBtn = $('#cartClear');
  const cartCheckout = $('#cartCheckout');

  // ---- Render ----
  function render(list){
    if(!container) return;
    container.innerHTML = '';
    if(!list || list.length === 0){
      container.innerHTML = '<p style="opacity:.8">Aucun produit trouvé.</p>';
      return;
    }
    var html = list.map(function(p){
      return '<div class="card"><img src="'+p.thumbImg+'" alt="'+p.name+'" data-id="'+p.id+'" class="thumb"><div class="img-overlay">Cliquez pour voir les détails</div><span class="name">'+p.name+'</span><div class="card-actions"><button class="addBtn" type="button" data-add="'+p.id+'">Ajouter</button></div></div>';
    }).join('');
    container.innerHTML = html;
    $$('#productContainer .thumb').forEach(function(img){
      img.addEventListener('click', function(){ openPerfumeModalById(img.dataset.id); });
    });
    $$('#productContainer [data-add]').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.preventDefault(); e.stopPropagation();
        var id = btn.getAttribute('data-add');
        var p = PRODUCTS.find(function(x){return x.id === id;});
        if(p) addToCart(p);
      });
    });
  }

  // ---- Filters ----
  function createToggleOption(container, group, value, label){
    if(!container) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menuOption';
    btn.dataset.group = group;
    btn.dataset.value = value;
    btn.textContent = label;
    btn.addEventListener('click', function(){
      var map = { brand: selectedBrands, season: selectedSeasons, time: selectedTimes, note: selectedNotes };
      var s = map[group];
      if(!s) return;
      if(s.has(value)){
        s.delete(value); btn.classList.remove('active');
      } else { s.add(value); btn.classList.add('active'); }
    });
    container.appendChild(btn);
  }

  function populateFilters(){
    if(brandContainer) brandContainer.innerHTML = '';
    if(seasonContainer) seasonContainer.innerHTML = '';
    if(timeContainer) timeContainer.innerHTML = '';
    if(noteContainer) noteContainer.innerHTML = '';
    var brands = new Set(PRODUCTS.map(function(p){return p.brand;}).filter(Boolean));
    [...brands].sort(function(a,b){return a.localeCompare(b,'fr');}).forEach(function(b){ createToggleOption(brandContainer,'brand',b,b);});
    var seasonsOrder = ['Hiver','Printemps','Été','Automne'];
    seasonsOrder.forEach(function(s){ createToggleOption(seasonContainer,'season',s,s);});
    ['Jour','Nuit'].forEach(function(t){ createToggleOption(timeContainer,'time',t,t);});
    var notes = new Set();
    PRODUCTS.forEach(function(p){ (p.notes || []).forEach(function(n){notes.add(n);}); });
    [...notes].sort(function(a,b){return a.localeCompare(b,'fr');}).forEach(function(n){ createToggleOption(noteContainer,'note',n,n);});
  }

  function clearAdvancedSelections(){
    selectedBrands.clear(); selectedSeasons.clear(); selectedTimes.clear(); selectedNotes.clear();
    document.querySelectorAll('.menuOption.active').forEach(function(b){b.classList.remove('active');});
  }

  function applyFilters(){
    var q = (searchInput ? searchInput.value : '') ? (searchInput.value || '').toLowerCase().trim() : '';
    var filtered = PRODUCTS.filter(function(p){
      var matchCat = currentCategory === 'all' ? true : p.category === currentCategory;
      var matchSearch = p.name.toLowerCase().includes(q);
      var matchBrand = selectedBrands.size === 0 ? true : selectedBrands.has(p.brand);
      var matchSeason = selectedSeasons.size === 0 ? true : (p.seasons || []).some(function(s){return selectedSeasons.has(s);});
      var matchTime = selectedTimes.size === 0 ? true : (p.time || []).some(function(t){return selectedTimes.has(t);});
      var matchNote = selectedNotes.size === 0 ? true : (p.notes || []).some(function(n){return selectedNotes.has(n);});
      return matchCat && matchSearch && matchBrand && matchSeason && matchTime && matchNote;
    });
    filtered = sortBySmartSeason(filtered);
    render(filtered);
  }

  // ---- Category buttons ----
  filterButtons.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterButtons.forEach(function(b){b.classList.remove('active');});
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      applyFilters();
    });
  });
  if(searchInput) searchInput.addEventListener('input', applyFilters);

  // ---- Menu open/close ----
  function openMenu(){ 
    if(menuDrop){ menuDrop.classList.remove('hidden'); if(menuBtn) menuBtn.setAttribute('aria-expanded','true'); } 
  }
  function closeMenu(){ 
    if(menuDrop){ menuDrop.classList.add('hidden'); if(menuBtn) menuBtn.setAttribute('aria-expanded','false'); } 
  }
  if(menuBtn){
    menuBtn.addEventListener('click', function(e){ 
      e.stopPropagation(); 
      if(menuDrop && menuDrop.classList.contains('hidden')){ openMenu(); } else { closeMenu(); }
    });
  }
  if(menuCloseBtn){ menuCloseBtn.addEventListener('click', function(){ closeMenu(); }); }
  
  // Menu action buttons wiring for Loyalty/Filters
  const menuLoyalty = document.getElementById('menuLoyalty');
  const menuFilters = document.getElementById('menuFilters');
  
  if(menuLoyalty){
    menuLoyalty.addEventListener('click', function(){
      closeMenu();
      var cart = loadCart();
      if(cart && cart.length > 0){
        if(typeof initCO === 'function'){
          initCO();
        } else {
          loyPC = cart;
          if(typeof openLM === 'function'){
            openLM();
          } else {
            var loyModal = document.getElementById('loyModal');
            if(loyModal) loyModal.classList.remove('hidden');
          }
        }
      } else {
        if(typeof openLM === 'function'){
          openLM();
        } else {
          var loyModal = document.getElementById('loyModal');
          if(loyModal) loyModal.classList.remove('hidden');
        }
      }
    });
  }
  
  if(menuFilters){
    menuFilters.addEventListener('click', function(){
      openMenu();
      const filterPanels = document.querySelector('.filterPanels');
      if(filterPanels){
        setTimeout(function(){
          filterPanels.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }
  
  // Loyalty button in navbar - opens loyalty modal directly
  const loyaltyBtn = document.getElementById('loyaltyBtn');
  if(loyaltyBtn){
    loyaltyBtn.addEventListener('click', function(){
      closeMenu();
      var savedCard = loadC();
      var cart = loadCart();
      loyPC = cart && cart.length > 0 ? cart : null;
      openLM();
      if(savedCard){
      // Has card locally — show connect screen to refresh stamps from server
        showLS('connect');
      } else {
        showLS('options');
      }
    });
  }
  
  document.addEventListener('click',function(e){ if(!menuDrop) return; if(!menuDrop.contains(e.target) && e.target !== menuBtn) closeMenu(); });
  document.addEventListener('keydown',function(e){ if(e.key === 'Escape') closeMenu(); });

  if(applyFiltersBtn){ applyFiltersBtn.addEventListener('click', function(){ applyFilters(); closeMenu(); }); }
  if(clearFiltersBtn){
    clearFiltersBtn.addEventListener('click', function(){
      clearAdvancedSelections();
      if(searchInput) searchInput.value = '';
      currentCategory = 'all';
      filterButtons.forEach(function(b){b.classList.remove('active');});
      var allBtn = document.querySelector('.fbtn[data-cat="all"]');
      if(allBtn) allBtn.classList.add('active');
      applyFilters();
      closeMenu();
    });
  }

  function showBestSellers(){
    if(searchInput) searchInput.value = '';
    currentCategory = 'all';
    filterButtons.forEach(function(b){b.classList.remove('active');});
    var allBtn = document.querySelector('.fbtn[data-cat="all"]');
    if(allBtn) allBtn.classList.add('active');
    clearAdvancedSelections();
    var best = PRODUCTS.filter(function(p){ return BEST_SELLERS_IDS.includes(p.id); });
    render(best);
  }
  var bestBtn = $('#bestBtn');
  if(bestBtn){ bestBtn.addEventListener('click', function(e){ e.preventDefault(); showBestSellers(); var pc = $('#productContainer'); if(pc) pc.scrollIntoView({behavior:'smooth'}); }); }

  // ---- Modal ----
  function openPerfumeModalById(id){
    var p = PRODUCTS.find(function(x){return x.id === id;});
    if(!p) return;
    var pmTitle = $('#pmTitle'); if(pmTitle) pmTitle.textContent = p.name;
    var pmBrand = $('#pmBrand'); if(pmBrand) pmBrand.textContent = p.brand+' - '+p.gender;
    var pmRating = $('#pmRating'); if(pmRating) pmRating.textContent = p.rating || '-';
    var pmVotes = $('#pmVotes'); if(pmVotes) pmVotes.textContent = '('+(p.votes || 0)+')';
    var img = $('#pmImg'); if(img){ img.src = p.thumbImg; img.alt = p.name; }
    var pmAccords = $('#pmAccords'); if(pmAccords) pmAccords.innerHTML = (p.accords || []).map(function(a){return '<div class="pm-accord" style="background:'+(a.color || '#c7a657')+'">'+a.label+'</div>';}).join('');
    var pmNotes = $('#pmNotes'); if(pmNotes) pmNotes.innerHTML = (p.notes || []).map(function(n){return '<div class="pm-note">'+n+'</div>';}).join('');
    var pmLongevity = $('#pmLongevity'); if(pmLongevity) pmLongevity.textContent = p.longevity || '-';
    var pmSillage = $('#pmSillage'); if(pmSillage) pmSillage.textContent = p.sillage || '-';
    var pmTime = $('#pmTime'); if(pmTime) pmTime.innerHTML = '<span class="pm-pill on">'+getBestTime(p)+'</span>';
    var pmSeasons = $('#pmSeasons'); if(pmSeasons) pmSeasons.innerHTML = '<span class="pm-pill on">'+getBestSeason(p)+'</span>';
    var pmOrder = $('#pmOrder'); if(pmOrder) pmOrder.href = waLink('Je veux commander '+p.name+' ('+SIZE+' - '+PRICE_DT+' DT)');
    if(pmodal){ pmodal.classList.add('open'); pmodal.setAttribute('aria-hidden','false'); }
    document.body.style.overflow = 'hidden';
  }
  function closePerfumeModal(){ if(pmodal){ pmodal.classList.remove('open'); pmodal.setAttribute('aria-hidden','true'); } document.body.style.overflow = 'auto'; }
  if(pclose) pclose.addEventListener('click', closePerfumeModal);
  if(pmodal) pmodal.addEventListener('click',function(e){ if(e.target === pmodal) closePerfumeModal(); });
  document.addEventListener('keydown',function(e){ if(e.key === 'Escape' && pmodal && pmodal.classList.contains('open')) closePerfumeModal(); });

  // ---- CART ----
  function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function cartCount(cart){ return cart.reduce(function(s,it){return s+it.qty;},0); }
  function cartTotal(cart){ return cart.reduce(function(s,it){return s+(it.qty*it.price);},0); }
  function addToCart(p){ var cart = loadCart(); var found = cart.find(function(x){return x.id===p.id;}); if(found) found.qty += 1; else cart.push({ id:p.id, name:p.name, img:p.thumbImg, qty:1, price:PRICE_DT, size:SIZE }); saveCart(cart); refreshCartUI(); }
  function incQty(id){ var cart = loadCart(); var it = cart.find(function(x){return x.id===id;}); if(!it) return; it.qty += 1; saveCart(cart); refreshCartUI(); }
  function decQty(id){ var cart = loadCart(); var it = cart.find(function(x){return x.id===id;}); if(!it) return; it.qty -= 1; if(it.qty<=0) cart = cart.filter(function(x){return x.id!==id;}); saveCart(cart); refreshCartUI(); }
  function removeItem(id){ var cart = loadCart().filter(function(x){return x.id!==id;}); saveCart(cart); refreshCartUI(); }
  function clearCart(){ saveCart([]); refreshCartUI(); }
  function buildCheckoutMessage(cart){
    var lines = cart.map(function(it){ return '- '+it.name+' x'+it.qty+' ('+it.size+') = '+(it.qty*it.price)+' DT'; });
    var total = cartTotal(cart);
    return 'Bonjour, je veux commander (DADIOS):\n'+lines.join('\n')+'\n\nTotal: '+total+' DT.\nNom: \nAdresse: \nTéléphone:';
  }
  function openCart(){ if(cartOverlay) cartOverlay.classList.remove('hidden'); if(cartDrawer){cartDrawer.classList.remove('hidden'); cartDrawer.setAttribute('aria-hidden','false');} }
  function closeCart(){ if(cartOverlay) cartOverlay.classList.add('hidden'); if(cartDrawer){cartDrawer.classList.add('hidden'); cartDrawer.setAttribute('aria-hidden','true');} }

  function refreshCartUI(){
    if(!cartCountEl || !cartItemsEl || !cartTotalEl || !cartCheckout) return;
    var cart = loadCart();
    cartCountEl.textContent = String(cartCount(cart));
    cartItemsEl.innerHTML = cart.length ? cart.map(function(it){ return '<div class="cartRow"><img src="'+it.img+'" alt="'+it.name+'"><div><div style="font-weight:700">'+it.name+'</div><div style="opacity:.8;font-size:.9rem">'+it.size+' - '+it.price+' DT</div><div class="qty"><button class="qbtn" data-dec="'+it.id+'">−</button><strong>'+it.qty+'</strong><button class="qbtn" data-inc="'+it.id+'">+</button><button class="qbtn" data-rm="'+it.id+'">🗑</button></div></div><strong>'+(it.qty*it.price)+' DT</strong></div>'; }).join('') : '<p style="opacity:.8">Panier vide.</p>';
    cartTotalEl.textContent = cartTotal(cart)+' DT';
    cartCheckout.href = waLink(buildCheckoutMessage(cart));
    cartItemsEl.querySelectorAll('[data-inc]').forEach(function(b){b.addEventListener('click',function(){incQty(b.dataset.inc);});});
    cartItemsEl.querySelectorAll('[data-dec]').forEach(function(b){b.addEventListener('click',function(){decQty(b.dataset.dec);});});
    cartItemsEl.querySelectorAll('[data-rm]').forEach(function(b){b.addEventListener('click',function(){removeItem(b.dataset.rm);});});
  }

  if(cartBtn) cartBtn.addEventListener('click', openCart);
  if(cartClose) cartClose.addEventListener('click', closeCart);
  if(cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if(cartClearBtn) cartClearBtn.addEventListener('click', clearCart);

  // ---- Filter Tabs in Menu Dropdown ----
  const filterTabs = document.querySelectorAll('.filterTab');
  const filterPanels = document.querySelectorAll('.filterPanel');
  
  filterTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      filterTabs.forEach(function(t) { t.classList.remove('active'); });
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Get the filter type from data-filter attribute
      var filterType = tab.getAttribute('data-filter');
      
      // Hide all panels
      filterPanels.forEach(function(panel) { 
        panel.classList.remove('active'); 
      });
      
      // Show the corresponding panel
      var targetPanel = document.querySelector('.filterPanel[data-panel="' + filterType + '"]');
      if(targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // ---- Init ----
  populateFilters();
  applyFilters();
  refreshCartUI();

  window.DADIOS = { PRODUCTS: PRODUCTS, applyFilters: applyFilters, populateFilters: populateFilters, refreshCartUI: refreshCartUI };

// ===== THEME TOGGLE =====
  const themeSwitch = $('#themeSwitch');
  
  function initTheme() {
    const saved = localStorage.getItem('dadios-theme');
    if (saved === 'beige') {
      document.documentElement.classList.add('beige');
      if (themeSwitch) {
        themeSwitch.classList.add('beige-mode');
      }
    }
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const isBeige = html.classList.toggle('beige');
    localStorage.setItem('dadios-theme', isBeige ? 'beige' : 'green');
    if (themeSwitch) {
      themeSwitch.classList.toggle('beige-mode', isBeige);
    }
  }
  
  if (themeSwitch) {
    themeSwitch.addEventListener('click', toggleTheme);
  }
  
  // Init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
  
  // ===== LOYALTY =====
  var LOYALTY_API = '/api/loyalty';
  var LOYALTY_KEY = 'dadios_loyalty_card';

  var loyModal    = document.getElementById('loyModal');
  var loyOverlay  = loyModal ? loyModal.querySelector('.loy-overlay') : null;
  var loyCloseBtn = loyModal ? loyModal.querySelector('.loy-close') : null;
  var loyOpt      = document.getElementById('loyOptions');
  var loyCon      = document.getElementById('loyConnect');
  var loyCre      = document.getElementById('loyCreate');
  var loySuc      = document.getElementById('loySuccess');
  var loyLoa      = document.getElementById('loyLoading');
  var loyConInput = document.getElementById('loyConnectInput');
  var loyNI       = document.getElementById('loyName');
  var loyPI       = document.getElementById('loyPhone');
  var loyCC       = document.getElementById('loyCardCode');
  var loyCN       = document.getElementById('loyCardName');
  var loySC       = document.getElementById('loyStampsCount');
  var loyRC       = document.getElementById('loyRewardsCount');
  var loySD       = document.getElementById('loyStampsDisplay');
  var loyMsg      = document.getElementById('loyMessage');
  var loyPC       = null;

  function apiP(action, data) {
    return fetch(LOYALTY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ action: action }, data))
    })
    .then(function(r) { return r.json(); })
    .catch(function() { return { ok: false, error: 'Erreur de connexion' }; });
  }

  function saveC(c) { localStorage.setItem(LOYALTY_KEY, JSON.stringify(c)); }
  function loadC()  { var d = localStorage.getItem(LOYALTY_KEY); return d ? JSON.parse(d) : null; }
  function clearC() { localStorage.removeItem(LOYALTY_KEY); }

  function openLM() {
    if(loyModal) loyModal.classList.remove('hidden');
    showLS('options');
  }
  function closeLM() {
    if(loyModal) loyModal.classList.add('hidden');
    if(loyConInput) loyConInput.value = '';
    if(loyNI) loyNI.value = '';
    if(loyPI) loyPI.value = '';
  }

  function showLS(s) {
    [loyOpt, loyCon, loyCre, loySuc, loyLoa].forEach(function(x) { if(x) x.classList.add('hidden'); });
    if(s === 'options' && loyOpt) loyOpt.classList.remove('hidden');
    if(s === 'connect' && loyCon) {
      loyCon.classList.remove('hidden');
      var saved = loadC();
      if(loyConInput && saved && saved.code) loyConInput.value = saved.code;
      if(loyConInput) loyConInput.focus();
    }
    if(s === 'create'  && loyCre) { loyCre.classList.remove('hidden'); if(loyNI) loyNI.focus(); }
    if(s === 'success' && loySuc) loySuc.classList.remove('hidden');
    if(s === 'loading' && loyLoa) loyLoa.classList.remove('hidden');
  }

  function dispC(c) {
    if(!loyCC) return;
    loyCC.textContent = c.code || '----';
    if(loyCN) loyCN.textContent = c.name || '----';
    var ph = document.getElementById('loyCardPhone');
    if(ph) ph.textContent = c.phone || 'Non renseigné';
    var dt = document.getElementById('loyCardDate');
    if(dt) dt.textContent = c.createdAt ? new Date(c.createdAt).toLocaleDateString('fr-TN') : 'Non disponible';
    if(loySC) loySC.textContent = c.stamps || 0;
    if(loyRC) loyRC.textContent = c.rewards || 0;
    if(loySD) loySD.querySelectorAll('.loy-stamp').forEach(function(el, i) {
      el.classList.toggle('filled', i < (c.stamps || 0));
    });
    var remaining = 8 - (c.stamps || 0);
    if(loyMsg) loyMsg.textContent = (c.rewards > 0)
      ? 'Vous avez ' + c.rewards + ' parfum' + (c.rewards > 1 ? 's' : '') + ' offert' + (c.rewards > 1 ? 's' : '') + ' !'
      : 'Plus que ' + remaining + ' tampon' + (remaining > 1 ? 's' : '') + ' pour un parfum offert !';
  }

  function getPQ() { return loyPC ? loyPC.reduce(function(s,i){ return s+(i.qty||0); }, 0) : 0; }
  function buildLM(c) { return '\n\n💎 CARTE FIDÉLITÉ:\nCode: '+c.code+'\nTampons: '+c.stamps+'/8\nRécompenses: '+c.rewards; }

  function procWL(c) {
    var q = getPQ();
    if(q > 0) {
      showLS('loading');
      apiP('addStamp', { code: c.code, qty: q }).then(function(r) {
        if(r.ok) { saveC(r.card); }
        var m = buildCheckoutMessage(loyPC) + buildLM(r.ok ? r.card : c);
        closeLM();
        window.open(waLink(m), '_blank');
      });
    } else {
      closeLM();
      window.open(waLink(buildCheckoutMessage(loyPC) + buildLM(c)), '_blank');
    }
  }

  function procWOL() {
    closeLM();
    if(loyPC) window.open(waLink(buildCheckoutMessage(loyPC)), '_blank');
  }

  function initCO() {
    var cart = loadCart();
    if(!cart || !cart.length) return;
    loyPC = cart;
    openLM();
    showLS(loadC() ? 'connect' : 'options');
  }

  if(loyCloseBtn) loyCloseBtn.addEventListener('click', closeLM);
  if(loyOverlay)  loyOverlay.addEventListener('click', closeLM);
  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && loyModal && !loyModal.classList.contains('hidden')) closeLM();
  });

  var loyBtnConnect = document.getElementById('loyBtnConnect');
  var loyBtnCreate  = document.getElementById('loyBtnCreate');
  var loyBtnSkip    = document.getElementById('loyBtnSkip');
  if(loyBtnConnect) loyBtnConnect.addEventListener('click', function() { showLS('connect'); });
  if(loyBtnCreate)  loyBtnCreate.addEventListener('click',  function() { showLS('create'); });
  if(loyBtnSkip)    loyBtnSkip.addEventListener('click', procWOL);

  var loyBtnSubmitConnect = document.getElementById('loyBtnSubmitConnect');
  var loyBtnBackConnect   = document.getElementById('loyBtnBackConnect');
  if(loyBtnSubmitConnect) loyBtnSubmitConnect.addEventListener('click', function() {
    var identifier = loyConInput ? loyConInput.value.trim() : '';
    if(!identifier) { alert('Veuillez entrer votre code carte ou numéro de téléphone'); return; }
    showLS('loading');
    apiP('get', { identifier: identifier }).then(function(r) {
      if(r.ok) { saveC(r.card); dispC(r.card); showLS('success'); }
      else { alert(r.error || 'Carte introuvable. Vérifiez votre code ou téléphone.'); showLS('connect'); }
    });
  });
  if(loyConInput) loyConInput.addEventListener('keypress', function(e) {
    if(e.key === 'Enter' && loyBtnSubmitConnect) loyBtnSubmitConnect.click();
  });
  if(loyBtnBackConnect) loyBtnBackConnect.addEventListener('click', function() { showLS('options'); });

  var loyBtnSubmitCreate = document.getElementById('loyBtnSubmitCreate');
  var loyBtnBackCreate   = document.getElementById('loyBtnBackCreate');
  if(loyBtnSubmitCreate) loyBtnSubmitCreate.addEventListener('click', function() {
    var n = loyNI ? loyNI.value.trim() : '';
    var p = loyPI ? loyPI.value.trim() : '';
    if(!n || !p) { alert('Veuillez remplir tous les champs'); return; }
    showLS('loading');
    apiP('create', { name: n, phone: p }).then(function(r) {
      if(r.ok) { saveC(r.card); dispC(r.card); showLS('success'); }
      else { alert(r.error || 'Erreur lors de la création'); showLS('create'); }
    });
  });
  if(loyBtnBackCreate) loyBtnBackCreate.addEventListener('click', function() { showLS('options'); });

  var loyBtnContinue   = document.getElementById('loyBtnContinue');
  var loyBtnChangeCard = document.getElementById('loyBtnChangeCard');
  if(loyBtnContinue)   loyBtnContinue.addEventListener('click', function() { var c = loadC(); if(c) procWL(c); else procWOL(); });
  if(loyBtnChangeCard) loyBtnChangeCard.addEventListener('click', function() { clearC(); showLS('options'); });

  var chkBtn = document.getElementById('cartCheckout');
  if(chkBtn) {
    chkBtn.removeAttribute('href');
    chkBtn.style.pointerEvents = 'auto';
    chkBtn.style.cursor = 'pointer';
    chkBtn.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); initCO(); });
  }

})();
/* ===== QUIZ POPUP DADIOS ===== */
(function () {

  const QUIZ_PRODUCTS = [
  {
    id: "my-way",
    nom: "My Way",
    genre: "femme",
    saisons: ["printemps", "été"],
    temps: ["jour", "quotidien"],
    notes: ["floral", "fruité", "doux"],
    profil: {
      fr: "Féminin, élégant, lumineux",
      tn: "Neswi, chic w mdhawi"
    },
    moment: {
      fr: "Parfait en journée et au quotidien.",
      tn: "Yji barcha fel nhar w lel usage kol nhar."
    },
    description: {
      fr: "Un parfum féminin élégant, doux et lumineux.",
      tn: "Parfum neswi chic, hedi w mdhawi."
    }
  },
  {
    id: "alien",
    nom: "Alien",
    genre: "femme",
    saisons: ["automne", "hiver"],
    temps: ["soir", "événement"],
    notes: ["floral", "ambre", "intense"],
    profil: {
      fr: "Mystérieux, affirmé, magnétique",
      tn: "Ghamedh, 9awi w yjbed"
    },
    moment: {
      fr: "Idéal en soirée et pendant les saisons fraîches.",
      tn: "Ynesbek fel lil w fi sa9a l bard."
    },
    description: {
      fr: "Une fragrance puissante et envoûtante pour une présence forte.",
      tn: "Ri7a 9awiya w mghariya li t7eb torodh belha."
    }
  },
  {
    id: "chloe",
    nom: "Chloé",
    genre: "femme",
    saisons: ["printemps", "été"],
    temps: ["jour", "quotidien"],
    notes: ["floral", "frais", "doux"],
    profil: {
      fr: "Délicat, chic, naturel",
      tn: "R9i9, chic w tabi3i"
    },
    moment: {
      fr: "Très agréable en journée.",
      tn: "Yji barcha fel nhar."
    },
    description: {
      fr: "Un parfum tendre et raffiné, idéal pour un sillage propre.",
      tn: "Parfum hedi w raffiné, ykhalik nadhifa w chic."
    }
  },
  {
    id: "armani-code",
    nom: "Armani Code",
    genre: "homme",
    saisons: ["automne", "hiver"],
    temps: ["soir", "événement"],
    notes: ["boisé", "oriental", "sensuel"],
    profil: {
      fr: "Élégant, séduisant, sûr de lui",
      tn: "Chic, yghri w thi9a fel rou7"
    },
    moment: {
      fr: "Excellent pour le soir et les sorties.",
      tn: "Yji barcha fel lil w fel kharjat."
    },
    description: {
      fr: "Une signature élégante et sensuelle.",
      tn: "Ri7a chic w hassasa barcha."
    }
  },
  {
    id: "wanted",
    nom: "Azzaro Wanted",
    genre: "homme",
    saisons: ["automne", "hiver"],
    temps: ["soir", "événement"],
    notes: ["épicé", "boisé", "intense"],
    profil: {
      fr: "Énergique, charismatique, audacieux",
      tn: "Ta9a, charisme w جرأة"
    },
    moment: {
      fr: "Très adapté pour les soirées.",
      tn: "Yji barcha lel soireyat."
    },
    description: {
      fr: "Un parfum masculin puissant, dynamique et accrocheur.",
      tn: "Parfum rajeli 9awi, dynamique w يلفت الانتباه."
    }
  },
  {
    id: "king",
    nom: "Dolce & Gabbana King",
    genre: "homme",
    saisons: ["printemps", "été"],
    temps: ["jour", "quotidien"],
    notes: ["frais", "boisé", "aromatique"],
    profil: {
      fr: "Moderne, propre, confiant",
      tn: "3asri, nadhif w thi9a"
    },
    moment: {
      fr: "Très bon en journée et au travail.",
      tn: "Yji fel nhar w hata fel khedma."
    },
    description: {
      fr: "Une fragrance fraîche et moderne pour un style propre.",
      tn: "Ri7a fresh w 3asriya li style nadhif."
    }
  },
  {
    id: "vert-malachite",
    nom: "Vert Malachite",
    genre: "mixte",
    saisons: ["automne", "hiver"],
    temps: ["soir", "événement"],
    notes: ["floral", "oriental", "luxueux"],
    profil: {
      fr: "Luxe, caractère, singularité",
      tn: "Luxe, présence w caractère"
    },
    moment: {
      fr: "Parfait pour les occasions spéciales.",
      tn: "Yji barcha lel occasions l khasa."
    },
    description: {
      fr: "Un parfum mixte au caractère luxueux et remarquable.",
      tn: "Parfum mixte luxueux w moumyez."
    }
  },
  {
    id: "marshmallow",
    nom: "Marshmallow",
    genre: "mixte",
    saisons: ["automne", "hiver"],
    temps: ["soir"],
    notes: ["gourmand", "vanillé", "doux"],
    profil: {
      fr: "Réconfortant, gourmand, attachant",
      tn: "Hnin, hlou w yerta7lek"
    },
    moment: {
      fr: "Idéal pour les amateurs de senteurs sucrées.",
      tn: "Ynesbek ken t7eb ri7et skar w douceur."
    },
    description: {
      fr: "Une senteur gourmande et chaleureuse.",
      tn: "Ri7a hloua w dfiya."
    }
  }
];

  const QUIZ_QUESTIONS = [
  {
    titre: {
      fr: "Pour qui cherchez-vous un parfum ?",
      tn: "Lchkoun t7eb t5tar l parfum ?"
    },
    aide: {
      fr: "Choisissez le profil principal.",
      tn: "Ikhtar chkoun bch yesta3melou."
    },
    key: "genre",
    reponses: [
      { label: { fr: "Pour femme", tn: "Lil mara" }, value: "femme" },
      { label: { fr: "Pour homme", tn: "Lil rajel" }, value: "homme" },
      { label: { fr: "Mixte / Unisexe", tn: "Mixte / Unisexe" }, value: "mixte" },
      { label: { fr: "Je veux voir large", tn: "N7eb nchouf kol chay" }, value: "all" }
    ]
  },
  {
    titre: {
      fr: "À quel moment sera-t-il le plus porté ?",
      tn: "Wa9tech bch تستعملو akther ?"
    },
    aide: {
      fr: "Le moment compte beaucoup dans la recommandation.",
      tn: "El wa9t yfar9 barcha fel choix."
    },
    key: "temps",
    reponses: [
      { label: { fr: "En journée", tn: "Fel nhar" }, value: "jour" },
      { label: { fr: "En soirée", tn: "Fel lil" }, value: "soir" },
      { label: { fr: "Au quotidien", tn: "Kol nhar" }, value: "quotidien" },
      { label: { fr: "Pour un événement", tn: "Fi occasion" }, value: "événement" }
    ]
  },
  {
    titre: {
      fr: "Quelle saison vous correspond le plus ?",
      tn: "Anéhi saison tnaasbek akther ?"
    },
    aide: {
      fr: "Choisissez l’ambiance générale.",
      tn: "Ikhtar l ambiance elli t7eb 3liha."
    },
    key: "saison",
    reponses: [
      { label: { fr: "Printemps", tn: "Printemps" }, value: "printemps" },
      { label: { fr: "Été", tn: "Été" }, value: "été" },
      { label: { fr: "Automne", tn: "Automne" }, value: "automne" },
      { label: { fr: "Hiver", tn: "Hiver" }, value: "hiver" }
    ]
  },
  {
    titre: {
      fr: "Quelle famille de notes aimez-vous le plus ?",
      tn: "Anéhi note t7ebha akther ?"
    },
    aide: {
      fr: "Votre préférence principale.",
      tn: "Ikhtar el note elli temchilhom akther."
    },
    key: "note",
    reponses: [
      { label: { fr: "Floral", tn: "Floral" }, value: "floral" },
      { label: { fr: "Boisé", tn: "Boisé" }, value: "boisé" },
      { label: { fr: "Vanillé / Gourmand", tn: "Vanillé / Gourmand" }, value: "vanillé" },
      { label: { fr: "Frais", tn: "Frais" }, value: "frais" }
    ]
  }
];

  const state = {
    step: 0,
    answers: {}
  };
  state.lang = "fr";

const QUIZ_TEXT = {
  fr: {
    badge: "DADIOS • Quiz parfum",
    welcomeTitle: "Trouvez votre parfum idéal",
    welcomeText: "Répondez à quelques questions et découvrez la fragrance qui vous correspond.",
    start: "Commencer",
    skip: "Plus tard",
    progress: "Question",
    helper: "Choisissez une réponse.",
    resultBadge: "Votre résultat",
    resultTitle: "Parfum recommandé",
    profile: "Profil",
    moment: "Moment idéal",
    notes: "Notes dominantes",
    order: "Commander sur WhatsApp",
    replay: "Rejouer"
  },
  tn: {
    badge: "DADIOS • Quiz parfum",
    welcomeTitle: "Chnouwa l parfum elli yel9ik ?",
    welcomeText: "Jawb 3la chwaya as2la w اكتشف parfum elli ychbeh lik.",
    start: "Ibda",
    skip: "Ba3d",
    progress: "Sou2el",
    helper: "Ikhtar ijeba.",
    resultBadge: "Natijtek",
    resultTitle: "El parfum elli ynesbek",
    profile: "Profil",
    moment: "Wa9tech ynesbek",
    notes: "Notes principales",
    order: "Commander taw",
    replay: "عاود"
  }
};
  
const popup = document.getElementById("quizPopup");
const closeBtn = document.getElementById("quizPopupClose");
const startBtn = document.getElementById("quizStartBtn");
const skipBtn = document.getElementById("quizSkipBtn");
const restartBtn = document.getElementById("quizRestartBtn");
const openQuizBtn = document.getElementById("openQuizBtn");
const langFrBtn = document.getElementById("langFrBtn");
const langTnBtn = document.getElementById("langTnBtn");

  const welcomeStep = document.getElementById("quizWelcome");
  const gameStep = document.getElementById("quizGame");
  const resultStep = document.getElementById("quizResult");

  const questionTitle = document.getElementById("quizQuestionTitle");
  const questionHelper = document.getElementById("quizQuestionHelper");
  const answersWrap = document.getElementById("quizAnswers");
  const progressText = document.getElementById("quizProgressText");
  const progressFill = document.getElementById("quizProgressFill");

  const resultName = document.getElementById("quizResultName");
  const resultDescription = document.getElementById("quizResultDescription");
  const resultProfile = document.getElementById("quizResultProfile");
  const resultMoment = document.getElementById("quizResultMoment");
  const resultNotes = document.getElementById("quizResultNotes");
  const whatsappBtn = document.getElementById("quizWhatsappBtn");

  if (!popup) return;

  function applyQuizLanguage() {
  const t = QUIZ_TEXT[state.lang];

  const welcomeBadge = document.querySelector("#quizWelcome .quiz-badge");
  const welcomeTitle = document.querySelector("#quizWelcome h2");
  const welcomeText = document.querySelector("#quizWelcome p");

  const resultBadge = document.querySelector("#quizResult .quiz-badge");
  const resultTitleDefault = document.querySelector("#quizResultName");
  const resultProfileLabel = document.querySelector('#quizResult .quiz-result-card:nth-child(1) strong');
  const resultMomentLabel = document.querySelector('#quizResult .quiz-result-card:nth-child(2) strong');
  const resultNotesLabel = document.querySelector('.quiz-result-notes strong');

  if (welcomeBadge) welcomeBadge.textContent = t.badge;
  if (welcomeTitle) welcomeTitle.textContent = t.welcomeTitle;
  if (welcomeText) welcomeText.textContent = t.welcomeText;

  if (startBtn) startBtn.textContent = t.start;
  if (skipBtn) skipBtn.textContent = t.skip;

  if (questionHelper && !state.answers[QUIZ_QUESTIONS[state.step]?.key]) {
    questionHelper.textContent = t.helper;
  }

  if (resultBadge) resultBadge.textContent = t.resultBadge;
  if (resultTitleDefault && !resultTitleDefault.dataset.filled) {
    resultTitleDefault.textContent = t.resultTitle;
  }

  if (resultProfileLabel) resultProfileLabel.textContent = t.profile;
  if (resultMomentLabel) resultMomentLabel.textContent = t.moment;
  if (resultNotesLabel) resultNotesLabel.textContent = t.notes;

  if (whatsappBtn) whatsappBtn.textContent = t.order;
  if (restartBtn) restartBtn.textContent = t.replay;

  if (langFrBtn) langFrBtn.classList.toggle("active", state.lang === "fr");
  if (langTnBtn) langTnBtn.classList.toggle("active", state.lang === "tn");
}
  function openPopup() {
    popup.classList.remove("hidden");
    popup.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closePopup() {
    // Blur any focused element inside the popup before hiding it,
    // otherwise aria-hidden on the ancestor traps focus (browser warning)
    const focused = popup.querySelector(":focus");
    if (focused) focused.blur();
    popup.classList.add("hidden");
    popup.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function resetSteps() {
    welcomeStep.classList.remove("hidden");
    gameStep.classList.add("hidden");
    resultStep.classList.add("hidden");
    state.step = 0;
    state.answers = {};
    progressFill.style.width = "0%";
  }

  function startQuiz() {
    welcomeStep.classList.add("hidden");
    resultStep.classList.add("hidden");
    gameStep.classList.remove("hidden");
    state.step = 0;
    state.answers = {};
    renderQuestion();
  }

  function renderQuestion() {
    const q = QUIZ_QUESTIONS[state.step];
    const total = QUIZ_QUESTIONS.length;
    const current = state.step + 1;
    const percent = ((current - 1) / total) * 100;

progressText.textContent = `${QUIZ_TEXT[state.lang].progress} ${current} / ${total}`;
    progressFill.style.width = `${percent}%`;

   questionTitle.textContent = q.titre[state.lang];
questionHelper.textContent = q.aide[state.lang];
    answersWrap.innerHTML = "";

    q.reponses.forEach((rep) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quiz-answer-btn";
btn.textContent = rep.label[state.lang];
      btn.addEventListener("click", () => {
        state.answers[q.key] = rep.value;

        if (state.step < QUIZ_QUESTIONS.length - 1) {
          state.step += 1;
          renderQuestion();
        } else {
          showResult();
        }
      });
      answersWrap.appendChild(btn);
    });
  }

  function computeBestProduct() {
    const { genre, temps, saison, note } = state.answers;

    const ranked = QUIZ_PRODUCTS.map((item) => {
      let score = 0;

      if (genre === "all") {
        score += 1;
      } else if (item.genre === genre) {
        score += 4;
      }

      if (item.temps.includes(temps)) score += 3;
      if (item.saisons.includes(saison)) score += 3;

      if (note === "vanillé") {
        if (item.notes.includes("vanillé") || item.notes.includes("gourmand")) score += 4;
      } else {
        if (item.notes.includes(note)) score += 4;
      }

      return { ...item, score };
    });

    ranked.sort((a, b) => b.score - a.score);
    return ranked[0];
  }

  function showResult() {
    const best = computeBestProduct();
    if (!best) return;

    gameStep.classList.add("hidden");
    resultStep.classList.remove("hidden");
    progressFill.style.width = "100%";

    resultName.textContent = best.nom;
  resultDescription.textContent = best.description[state.lang];
resultProfile.textContent = best.profil[state.lang];
resultMoment.textContent = best.moment[state.lang];

    resultNotes.innerHTML = "";
    best.notes.forEach((n) => {
      const tag = document.createElement("span");
      tag.textContent = n.charAt(0).toUpperCase() + n.slice(1);
      resultNotes.appendChild(tag);
    });

    const msg =
      `Bonjour DADIOS,%0A` +
      `J'ai fait le quiz parfum sur votre site.%0A` +
      `Mon résultat est : ${best.nom}.%0A` +
      `Je souhaite commander ou avoir plus d’informations.%0A` +
      `Merci.`;

    whatsappBtn.href = window.dadiosWaLink
      ? window.dadiosWaLink(decodeURIComponent(msg))
      : `https://wa.me/21656731891?text=${msg}`;
  }

  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (skipBtn) skipBtn.addEventListener("click", closePopup);
  if (startBtn) startBtn.addEventListener("click", startQuiz);
  if (restartBtn) restartBtn.addEventListener("click", startQuiz);

  if (openQuizBtn) {
    openQuizBtn.addEventListener("click", () => {
      resetSteps();
      openPopup();
    });
  }

  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("quiz-popup-overlay")) {
      closePopup();
    }
  });
if (langFrBtn) {
  langFrBtn.addEventListener("click", () => {
    state.lang = "fr";
    applyQuizLanguage();
    if (!gameStep.classList.contains("hidden")) renderQuestion();
  });
}

if (langTnBtn) {
  langTnBtn.addEventListener("click", () => {
    state.lang = "tn";
    applyQuizLanguage();
    if (!gameStep.classList.contains("hidden")) renderQuestion();
  });
}
 window.addEventListener("load", () => {
  resetSteps();
  applyQuizLanguage();

  setTimeout(() => {
    openPopup();
  }, 1200);
  });
})();
