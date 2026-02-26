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
    {id:"interdit-rouge-ultime",name:"L'Interdit Eau de Parfum Rouge Ultime",brand:"Givenchy",gender:"pour femme",category:"femme",thumbImg:"images/L'Interdit Rouge.jpeg",rating:4.1,votes:2326,accords:[{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Tubéreuse",color:"#d7f2ea"},{label:"Cacao",color:"#8a3a12"},{label:"Épicé Chaud",color:"#c93a1a"},{label:"Sucré",color:"#f13d41"}],notes:["Tubéreuse","Cabosse de Cacao","Fleur d'Oranger","Jasmin","Patchouli","Tabac"],longevity:"7 h",sillage:"Fort",time:["Nuit"],seasons:["Hiver","Automne"]},
    {id:"libre-le-parfum",name:"Libre Le Parfum",brand:"Yves Saint Laurent",gender:"pour femme",category:"femme",thumbImg:"images/Libre Le Parfum.jpeg",rating:4.3,votes:4665,accords:[{label:"Vanille",color:"#f2e7a3"},{label:"Sucré",color:"#f13d41"},{label:"Agrume",color:"#f1ff5b"},{label:"Miel",color:"#ffb000"},{label:"Fleurs Blanches",color:"#e9edf3"}],notes:["Vanille","Miel","Fleur d'Oranger","Lavande","Fève Tonka","Gingembre"],longevity:"8 h",sillage:"Fort",time:["Nuit"],seasons:["Hiver","Automne"]},
    {id:"my-way-ylang",name:"My Way Ylang",brand:"Giorgio Armani",gender:"pour femme",category:"femme",thumbImg:"images/My Way Ylang.jpeg",rating:4.0,votes:722,accords:[{label:"Sucré",color:"#f13d41"},{label:"Tropical",color:"#ffb000"},{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Fleurs Jaunes",color:"#ffe000"},{label:"Fruité",color:"#ff4a2b"}],notes:["Mangue","Ylang-Ylang","Noix de Coco","Tubéreuse","Fleur d'Oranger","Vanille"],longevity:"6 h",sillage:"Fort",time:["Jour"],seasons:["Printemps","Été"]},
    {id:"prada-paradoxe",name:"Prada Paradoxe",brand:"Prada",gender:"pour femme",category:"femme",thumbImg:"images/Prada Paradoxe.jpeg",rating:3.9,votes:9265,accords:[{label:"Fleurs Blanches",color:"#e9edf3"},{label:"Agrume",color:"#f1ff5b"},{label:"Ambre",color:"#b55a14"},{label:"Sucré",color:"#f13d41"},{label:"Vanille",color:"#f2e7a3"}],notes:["Fleur d'Oranger","Néroli","Vanille","Jasmin","Poire","Ambre"],longevity:"7 h",sillage:"Fort",time:["Jour","Nuit"],seasons:["Printemps","Été","Automne"]},
    {id:"sauvage-elixir",name:"Sauvage Elixir",brand:"Dior",gender:"pour homme",category:"homme",thumbImg:"images/Sauvage Elixir.jpeg",rating:4.3,votes:17190,accords:[{label:"Épicé Chaud",color:"#c93a1a"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Boisé",color:"#7a4a17"},{label:"Aromatique",color:"#3aa58c"},{label:"Lavande",color:"#b8a3e0"}],notes:["Lavande","Réglisse","Noix de muscade","Cannelle","Santal","Cardamome"],longevity:"9 h",sillage:"Énorme",time:["Jour","Nuit"],seasons:["Hiver","Automne"]},
    {id:"terre-hermes",name:"Terre d'Hermès",brand:"Hermès",gender:"pour homme",category:"homme",thumbImg:"images/Terre d'Hermès.jpeg",rating:4.3,votes:26439,accords:[{label:"Agrume",color:"#f1ff5b"},{label:"Boisé",color:"#7a4a17"},{label:"Épicé Frais",color:"#7cc83a"},{label:"Aromatique",color:"#3aa58c"},{label:"Terreux",color:"#6b5a44"}],notes:["Orange","Vétiver","Poivre","Pamplemousse","Cèdre","Patchouli"],longevity:"7 h",sillage:"Fort",time:["Jour"],seasons:["Printemps","Été","Automne"]},
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
  function waLink(message){
    const phone = '21656731891';
    return 'https://wa.me/'+phone+'?text='+encodeURIComponent(message);
  }

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
      var msg = 'Je veux commander '+p.name;
      return '<div class="card"><img src="'+p.thumbImg+'" alt="'+p.name+'" data-id="'+p.id+'" class="thumb"><div class="img-overlay">Cliquez pour voir les détails</div><span class="name">'+p.name+'</span><div class="card-actions"><button class="addBtn" type="button" data-add="'+p.id+'">Ajouter</button><a href="'+waLink(msg)+'" target="_blank" rel="noopener">Commander</a></div></div>';
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
      if(typeof openLM === 'function'){
        openLM();
      } else {
        const loyModal = document.getElementById('loyModal');
        if(loyModal) loyModal.classList.remove('hidden');
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

  // ---- Init ----
  populateFilters();
  applyFilters();
  refreshCartUI();

  window.DADIOS = { PRODUCTS: PRODUCTS, applyFilters: applyFilters, populateFilters: populateFilters, refreshCartUI: refreshCartUI };

  // ===== LOYALTY PATCH =====
  var LOYALTY_API = "https://cold-cloud-895a.dadios-fragrances.workers.dev/";
  var LOYALTY_KEY = "dadios_loyalty_card";
  var loyModal = document.getElementById('loyModal');
  var loyOverlay = loyModal ? loyModal.querySelector('.loy-overlay') : null;
  var loyCloseBtn = loyModal ? loyModal.querySelector('.loy-close') : null;
  var loyOpt = document.getElementById('loyOptions');
  var loyCre = document.getElementById('loyCreate');
  var loyImp = document.getElementById('loyImport');
  var loySuc = document.getElementById('loySuccess');
  var loyLoa = document.getElementById('loyLoading');
  var loyBC = document.getElementById('loyBtnCreate');
  var loyBI = document.getElementById('loyBtnImport');
  var loyBS = document.getElementById('loyBtnSkip');
  var loyBSC = document.getElementById('loyBtnSubmitCreate');
  var loyBBC = document.getElementById('loyBtnBackCreate');
  var loyBSI = document.getElementById('loyBtnSubmitImport');
  var loyBBI = document.getElementById('loyBtnBackImport');
  var loyBCt = document.getElementById('loyBtnContinue');
  var loyNI = document.getElementById('loyName');
  var loyPI = document.getElementById('loyPhone');
  var loyCI = document.getElementById('loyCodeInput');
  var loyPII = document.getElementById('loyPhoneImport');
  var loyCC = document.getElementById('loyCardCode');
  var loyCN = document.getElementById('loyCardName');
  var loySC = document.getElementById('loyStampsCount');
  var loyRC = document.getElementById('loyRewardsCount');
  var loySD = document.getElementById('loyStampsDisplay');
  var loyMsg = document.getElementById('loyMessage');
  var loyPC = null;
  
  function apiP(a,d){
    var fd = new FormData();
    fd.append('action', a);
    Object.keys(d).forEach(function(k){ fd.append(k, d[k]); });
    return fetch(LOYALTY_API, {method:'POST', body:fd}).then(function(r){ return r.json(); }).catch(function(){ return {ok:false, error:'Erreur'}; });
  }
  function saveC(c){ localStorage.setItem(LOYALTY_KEY, JSON.stringify(c)); }
  function loadC(){ var d = localStorage.getItem(LOYALTY_KEY); return d ? JSON.parse(d) : null; }
  function openLM(){ if(loyModal) loyModal.classList.remove('hidden'); showLS('options'); }
  function closeLM(){ if(loyModal) loyModal.classList.add('hidden'); if(loyNI) loyNI.value=''; if(loyPI) loyPI.value=''; if(loyCI) loyCI.value=''; if(loyPII) loyPII.value=''; }
  function showLS(s){ 
    var arr = [loyOpt,loyCre,loyImp,loySuc,loyLoa];
    arr.forEach(function(x){ if(x) x.classList.add('hidden'); }); 
    if(s==='options' && loyOpt) loyOpt.classList.remove('hidden');
    if(s==='create' && loyCre) loyCre.classList.remove('hidden');
    if(s==='import' && loyImp) loyImp.classList.remove('hidden');
    if(s==='success' && loySuc) loySuc.classList.remove('hidden');
    if(s==='loading' && loyLoa) loyLoa.classList.remove('hidden');
  }
  function dispC(c){ 
    if(!loyCC) return;
    if(loyCC) loyCC.textContent = c.code;
    if(loyCN) loyCN.textContent = c.name;
    if(loySC) loySC.textContent = c.stamps;
    if(loyRC) loyRC.textContent = c.rewards;
    if(loySD) loySD.querySelectorAll('.loy-stamp').forEach(function(el,i){ el.classList.toggle('filled', i < c.stamps); });
    if(loyMsg) loyMsg.textContent = c.rewards > 0 ? 'Vous avez '+c.rewards+' parfum'+(c.rewards>1?'s':'')+' offert'+(c.rewards>1?'s':'')+' !' : 'Plus que '+(8-c.stamps)+' tampon'+((8-c.stamps)>1?'s':'')+' pour un parfum offert !';
  }
  function initCO(){ var c = loadCart(); if(!c || !c.length) return; loyPC = c; openLM(); }
  function getPQ(){ return loyPC ? loyPC.reduce(function(s,i){ return s + (i.qty || 0); }, 0) : 0; }
  function buildLM(c){ return '\n\n💎 CARTE FIDÉLITÉ:\nCode: '+c.code+'\nTampons: '+c.stamps+'/8\nRécompenses: '+c.rewards; }
  
  function procWL(c){
    var q = getPQ();
    if(q > 0){
      showLS('loading');
      apiP('addStamp', {code:c.code, qty:q}).then(function(r){
        if(r.ok){ saveC(r.card); dispC(r.card); }
        var m = buildCheckoutMessage(loyPC) + buildLM(r.ok ? r.card : c);
        closeLM();
        window.open(waLink(m), '_blank');
      });
    } else {
      var m = buildCheckoutMessage(loyPC) + buildLM(c);
      closeLM();
      window.open(waLink(m), '_blank');
    }
  }
  
  function procWOL(){ 
    closeLM(); 
    window.open(waLink(buildCheckoutMessage(loyPC)), '_blank'); 
  }
  
  if(loyCloseBtn) loyCloseBtn.addEventListener('click', closeLM);
  if(loyOverlay) loyOverlay.addEventListener('click', closeLM);
  document.addEventListener('keydown', function(e){ if(e.key==='Escape' && loyModal && !loyModal.classList.contains('hidden')) closeLM(); });
  if(loyBS) loyBS.addEventListener('click', procWOL);
  if(loyBC) loyBC.addEventListener('click', function(){ showLS('create'); });
  if(loyBI) loyBI.addEventListener('click', function(){ showLS('import'); });
  if(loyBBC) loyBBC.addEventListener('click', function(){ showLS('options'); });
  if(loyBBI) loyBBI.addEventListener('click', function(){ showLS('options'); });
  if(loyBSC) loyBSC.addEventListener('click', function(){ 
    var n = loyNI.value.trim();
    var p = loyPI.value.trim();
    if(!n || !p){ alert('Veuillez remplir tous les champs'); return; }
    showLS('loading');
    apiP('create', {name:n, phone:p}).then(function(r){
      if(r.ok){ saveC(r.card); dispC(r.card); showLS('success'); }
      else{ alert(r.error || 'Erreur'); showLS('create'); }
    });
  });
  if(loyBSI) loyBSI.addEventListener('click', function(){ 
    var c = loyCI.value.trim().toUpperCase();
    if(!c){ alert('Veuillez entrer le code'); return; }
    showLS('loading');
    apiP('get', {code:c}).then(function(r){
      if(r.ok){ saveC(r.card); dispC(r.card); showLS('success'); }
      else{ alert(r.error || 'Carte non trouvée'); showLS('import'); }
    });
  });
  if(loyBCt) loyBCt.addEventListener('click', function(){ 
    var c = loadC(); 
    if(c){ procWL(c); } else { procWOL(); }
  });
  
  var chkBtn = document.getElementById('cartCheckout');
  if(chkBtn){
    chkBtn.removeAttribute('href');
    chkBtn.style.pointerEvents = 'auto';
    chkBtn.style.cursor = 'pointer';
    chkBtn.addEventListener('click', function(e){ e.preventDefault(); e.stopPropagation(); initCO(); });
  }

})();
