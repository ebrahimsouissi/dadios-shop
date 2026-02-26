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

  // ---- Data (unchanged) ----
  const PRODUCTS = [
    {
      id:"alien",
      name:"Alien",
      brand:"Mugler",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/Alien.jpeg",
      rating:4.0, votes:34239,
      accords:[
        {label:"Fleurs Blanches", color:"#e9edf3"},
        {label:"Ambre", color:"#b55a14"},
        {label:"Floral", color:"#ff5b91"},
        {label:"Animal", color:"#8b4b19"},
        {label:"Poudré", color:"#e7d7c8"},
      ],
      notes:["Jasmin","Ambre","Cashmeran"],
      longevity:"8 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Hiver","Printemps","Été","Automne"]
    },
    {
      id:"armani-code-parfum",
      name:"Armani Code Parfum",
      brand:"Giorgio Armani",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Armani Code.jpeg",
      rating:4.4, votes:6114,
      accords:[
        {label:"Iris", color:"#b5a8d7"},
        {label:"Aromatique", color:"#3aa58c"},
        {label:"Poudré", color:"#e7d7c8"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Agrume", color:"#f1ff5b"},
      ],
      notes:["Iris","Fève Tonka","Bergamote","Cèdre","Aldéhydes","Sauge sclarée"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Hiver","Printemps","Été","Automne"]
    },
    {
      id:"azzaro-wanted-elixir",
      name:"Forever Wanted Elixir",
      brand:"Azzaro",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Azzaro Wanted.jpeg",
      rating:4.2, votes:1699,
      accords:[
        {label:"Cuir", color:"#7a4a3f"},
        {label:"Fruité", color:"#ff4a2b"},
        {label:"Sucré", color:"#f13d41"},
        {label:"Aromatique", color:"#3aa58c"},
        {label:"Animal", color:"#8b4b19"},
      ],
      notes:["Cuir","Framboise","Cardamome","Lavande","Mandarine","Wolfwood"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Hiver","Printemps","Été","Automne"]
    },
    {
      id:"baccarat-rouge-540",
      name:"Baccarat Rouge 540",
      brand:"Maison Francis Kurkdjian",
      gender:"pour homme et femme",
      category:"mixte",
      thumbImg:"images/Baccarat Rouge 540.jpeg",
      rating:3.8, votes:27163,
      accords:[
        {label:"Boisé", color:"#7a4a17"},
        {label:"Ambre", color:"#b55a14"},
        {label:"Épicé Chaud", color:"#c93a1a"},
        {label:"Métallique", color:"#97aab1"},
        {label:"Épicé Frais", color:"#7cc83a"},
      ],
      notes:["Amberwood","Safran","Ambre gris","Sapin","Cèdre","Jasmin"],
      longevity:"8 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Hiver","Printemps","Été","Automne"]
    },
    {
      id:"bleu-de-chanel-edp",
      name:"Bleu de Chanel Eau de Parfum",
      brand:"Chanel",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Bleu de Chanel.jpeg",
      rating:4.4, votes:20095,
      accords:[
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Ambre", color:"#b55a14"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Épicé Frais", color:"#7cc83a"},
        {label:"Aromatique", color:"#3aa58c"},
      ],
      notes:["Pamplemousse","Encens","Citron","Ambre","Gingembre","Cèdre"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Printemps","Été","Automne"]
    },
    {
      id:"bvlgari-man-in-black",
      name:"Bvlgari Man In Black",
      brand:"Bvlgari",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Bvlgari Man in Black.jpeg",
      rating:4.3, votes:9979,
      accords:[
        {label:"Épicé Chaud", color:"#c93a1a"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Cuir", color:"#7a4a3f"},
        {label:"Rhum", color:"#b2170d"},
        {label:"Ambre", color:"#b55a14"},
      ],
      notes:["Notes Épicées","Rhum","Cuir","Tabac","Fève Tonka","Bois de Gaïac"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Hiver","Automne"]
    },
    {
      id:"chloe-edp",
      name:"Chloé Eau de Parfum",
      brand:"Chloé",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/Chloé Eau de Parfum.jpeg",
      rating:4.0, votes:22860,
      accords:[
        {label:"Floral", color:"#ff5b91"},
        {label:"Rose", color:"#ff007a"},
        {label:"Frais", color:"#8ed1c6"},
        {label:"Fruité", color:"#ff4a2b"},
        {label:"Fleurs Blanches", color:"#e9edf3"},
      ],
      notes:["Rose","Pivoine","Litchi","Freesia","Muguet","Magnolia"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Printemps","Été"]
    },
    {
      id:"aventus-for-her",
      name:"Aventus for Her",
      brand:"Creed",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/Aventus for Her.jpeg",
      rating:3.6, votes:3214,
      accords:[
        {label:"Fruité", color:"#ff4a2b"},
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Poudré", color:"#e7d7c8"},
        {label:"Musqué", color:"#cbbdd3"},
      ],
      notes:["Musc","Pomme","Bergamote","Cassis","Citron","Patchouli"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour"],
      seasons:["Printemps","Été"]
    },
    {
      id:"dareej-homme",
      name:"Dareej pour Homme",
      brand:"Rasasi",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Dareej.jpeg",
      rating:4.1, votes:3063,
      accords:[
        {label:"Vanille", color:"#f2e7a3"},
        {label:"Épicé Chaud", color:"#c93a1a"},
        {label:"Poudré", color:"#e7d7c8"},
        {label:"Ambre", color:"#b55a14"},
        {label:"Aromatique", color:"#3aa58c"},
      ],
      notes:["Vanille","Fève Tonka","Cumin","Cardamome","Rose","Ambre"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Hiver","Automne"]
    },
    {
      id:"k-dg-edp",
      name:"K by Dolce & Gabbana Eau de Parfum",
      brand:"Dolce & Gabbana",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/K Dolce Gabbana.jpeg",
      rating:4.0, votes:3243,
      accords:[
        {label:"Aromatique", color:"#3aa58c"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Épicé Frais", color:"#7cc83a"},
        {label:"Épicé Chaud", color:"#c93a1a"},
      ],
      notes:["Figue","Orange Sanguine","Baies de Genièvre","Piment","Cèdre","Lavande"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Printemps","Été","Automne"]
    },
    {
      id:"interdit-rouge-ultime",
      name:"L’Interdit Eau de Parfum Rouge Ultime",
      brand:"Givenchy",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/L’Interdit Rouge.jpeg",
      rating:4.1, votes:2326,
      accords:[
        {label:"Fleurs Blanches", color:"#e9edf3"},
        {label:"Tubéreuse", color:"#d7f2ea"},
        {label:"Cacao", color:"#8a3a12"},
        {label:"Épicé Chaud", color:"#c93a1a"},
        {label:"Sucré", color:"#f13d41"},
      ],
      notes:["Tubéreuse","Cabosse de Cacao","Fleur d'Oranger","Jasmin","Patchouli","Tabac"],
      longevity:"7 h", sillage:"Fort",
      time:["Nuit"],
      seasons:["Hiver","Automne"]
    },
    {
      id:"libre-le-parfum",
      name:"Libre Le Parfum",
      brand:"Yves Saint Laurent",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/Libre Le Parfum.jpeg",
      rating:4.3, votes:4665,
      accords:[
        {label:"Vanille", color:"#f2e7a3"},
        {label:"Sucré", color:"#f13d41"},
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Miel", color:"#ffb000"},
        {label:"Fleurs Blanches", color:"#e9edf3"},
      ],
      notes:["Vanille","Miel","Fleur d'Oranger","Lavande","Fève Tonka","Gingembre"],
      longevity:"8 h", sillage:"Fort",
      time:["Nuit"],
      seasons:["Hiver","Automne"]
    },
    {
      id:"my-way-ylang",
      name:"My Way Ylang",
      brand:"Giorgio Armani",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/My Way Ylang.jpeg",
      rating:4.0, votes:722,
      accords:[
        {label:"Sucré", color:"#f13d41"},
        {label:"Tropical", color:"#ffb000"},
        {label:"Fleurs Blanches", color:"#e9edf3"},
        {label:"Fleurs Jaunes", color:"#ffe000"},
        {label:"Fruité", color:"#ff4a2b"},
      ],
      notes:["Mangue","Ylang-Ylang","Noix de Coco","Tubéreuse","Fleur d'Oranger","Vanille"],
      longevity:"6 h", sillage:"Fort",
      time:["Jour"],
      seasons:["Printemps","Été"]
    },
    {
      id:"prada-paradoxe",
      name:"Prada Paradoxe",
      brand:"Prada",
      gender:"pour femme",
      category:"femme",
      thumbImg:"images/Prada Paradoxe.jpeg",
      rating:3.9, votes:9265,
      accords:[
        {label:"Fleurs Blanches", color:"#e9edf3"},
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Ambre", color:"#b55a14"},
        {label:"Sucré", color:"#f13d41"},
        {label:"Vanille", color:"#f2e7a3"},
      ],
      notes:["Fleur d'Oranger","Néroli","Vanille","Jasmin","Poire","Ambre"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour","Nuit"],
      seasons:["Printemps","Été","Automne"]
    },
    {
      id:"sauvage-elixir",
      name:"Sauvage Elixir",
      brand:"Dior",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Sauvage Elixir.jpeg",
      rating:4.3, votes:17190,
      accords:[
        {label:"Épicé Chaud", color:"#c93a1a"},
        {label:"Épicé Frais", color:"#7cc83a"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Aromatique", color:"#3aa58c"},
        {label:"Lavande", color:"#b8a3e0"},
      ],
      notes:["Lavande","Réglisse","Noix de muscade","Cannelle","Santal","Cardamome"],
      longevity:"9 h", sillage:"Énorme",
      time:["Jour","Nuit"],
      seasons:["Hiver","Automne"]
    },
    {
      id:"terre-hermes",
      name:"Terre d’Hermès",
      brand:"Hermès",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Terre d’Hermès.jpeg",
      rating:4.3, votes:26439,
      accords:[
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Boisé", color:"#7a4a17"},
        {label:"Épicé Frais", color:"#7cc83a"},
        {label:"Aromatique", color:"#3aa58c"},
        {label:"Terreux", color:"#6b5a44"},
      ],
      notes:["Orange","Vétiver","Poivre","Pamplemousse","Cèdre","Patchouli"],
      longevity:"7 h", sillage:"Fort",
      time:["Jour"],
      seasons:["Printemps","Été","Automne"]
    },
    {
      id:"tommy",
      name:"Tommy",
      brand:"Tommy Hilfiger",
      gender:"pour homme",
      category:"homme",
      thumbImg:"images/Tommy.jpeg",
      rating:3.9, votes:4951,
      accords:[
        {label:"Vert", color:"#1f8a2d"},
        {label:"Épicé Frais", color:"#7cc83a"},
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Fruité", color:"#ff4a2b"},
        {label:"Aromatique", color:"#3aa58c"},
      ],
      notes:["Pomme","Menthe","Bergamote","Pamplemousse","Lavande","Canneberge"],
      longevity:"6 h", sillage:"Modéré",
      time:["Jour"],
      seasons:["Printemps","Été"]
    },
    {
      id:"vert-malachite",
      name:"Armani Privé Vert Malachite",
      brand:"Giorgio Armani",
      gender:"pour homme et femme",
      category:"mixte",
      thumbImg:"images/Vert Malachite.jpeg",
      rating:4.1, votes:1826,
      accords:[
        {label:"Fleurs Blanches", color:"#e9edf3"},
        {label:"Vanille", color:"#f2e7a3"},
        {label:"Fleurs Jaunes", color:"#ffe000"},
        {label:"Agrume", color:"#f1ff5b"},
        {label:"Sucré", color:"#f13d41"},
      ],
      notes:["Jasmin","Lys","Ylang-Ylang","Vanille","Benjoin","Orange Amère"],
      longevity:"7 h", sillage:"Fort",
      time:["Nuit"],
      seasons:["Hiver","Automne"]
    },
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
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
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
    return [...list].sort((a,b)=>{
      const aBest = getBestSeason(a);
      const bBest = getBestSeason(b);
      const aScore = aBest === cur ? 1 : 0;
      const bScore = bBest === cur ? 1 : 0;
      return bScore - aScore;
    });
  }

  // ---- Elements (queried once) ----
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

  // Defensive check
  if(!container || !searchInput){
    console.warn('Critical DOM elements missing. Ensure script is included after DOM or elements exist.');
  }

  // ---- Render ----
  function render(list){
    if(!container) return;
    container.innerHTML = '';

    if(!list || list.length === 0){
      container.innerHTML = '<p style="opacity:.8">Aucun produit trouvé.</p>';
      return;
    }

    const html = list.map(p=>{
      const msg = `Je veux commander ${p.name}`;
      return `
        <div class="card">
          <img src="${p.thumbImg}" alt="${p.name}" data-id="${p.id}" class="thumb">
          <div class="img-overlay">Cliquez pour voir les détails</div>
          <span class="name">${p.name}</span>

          <div class="card-actions">
            <button class="addBtn" type="button" data-add="${p.id}">Ajouter</button>
            <a href="${waLink(msg)}" target="_blank" rel="noopener">Commander</a>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = html;

    // attach events
    $$('#productContainer .thumb').forEach(img=>{
      img.addEventListener('click', ()=> openPerfumeModalById(img.dataset.id));
    });
    $$('#productContainer [data-add]').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        e.preventDefault(); e.stopPropagation();
        const id = btn.getAttribute('data-add');
        const p = PRODUCTS.find(x=>x.id === id);
        if(p) addToCart(p);
      });
    });
  }

  // ---- Filters: dynamic population + logic ----
  function createToggleOption(container, group, value, label){
    if(!container) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menuOption';
    btn.dataset.group = group;
    btn.dataset.value = value;
    btn.textContent = label;

    btn.addEventListener('click', ()=>{
      const map = { brand: selectedBrands, season: selectedSeasons, time: selectedTimes, note: selectedNotes };
      const s = map[group];
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

    const brands = new Set(PRODUCTS.map(p=>p.brand).filter(Boolean));
    [...brands].sort((a,b)=>a.localeCompare(b,'fr')).forEach(b=> createToggleOption(brandContainer,'brand',b,b));

    const seasonsOrder = ['Hiver','Printemps','Été','Automne'];
    seasonsOrder.forEach(s=> createToggleOption(seasonContainer,'season',s,s));

    ['Jour','Nuit'].forEach(t=> createToggleOption(timeContainer,'time',t,t));

    const notes = new Set();
    PRODUCTS.forEach(p => (p.notes || []).forEach(n=>notes.add(n)));
    [...notes].sort((a,b)=>a.localeCompare(b,'fr')).forEach(n=> createToggleOption(noteContainer,'note',n,n));
  }

  function clearAdvancedSelections(){
    selectedBrands.clear(); selectedSeasons.clear(); selectedTimes.clear(); selectedNotes.clear();
    document.querySelectorAll('.menuOption.active').forEach(b=>b.classList.remove('active'));
  }

  // ---- Apply filters function integrated with existing search/category filters ----
  function applyFilters(){
    const q = (searchInput?.value || '').toLowerCase().trim();

    let filtered = PRODUCTS.filter(p=>{
      const matchCat = currentCategory === 'all' ? true : p.category === currentCategory;
      const matchSearch = p.name.toLowerCase().includes(q);

      const matchBrand = selectedBrands.size === 0 ? true : selectedBrands.has(p.brand);
      const matchSeason = selectedSeasons.size === 0 ? true : (p.seasons || []).some(s => selectedSeasons.has(s));
      const matchTime = selectedTimes.size === 0 ? true : (p.time || []).some(t => selectedTimes.has(t));
      const matchNote = selectedNotes.size === 0 ? true : (p.notes || []).some(n => selectedNotes.has(n));

      return matchCat && matchSearch && matchBrand && matchSeason && matchTime && matchNote;
    });

    filtered = sortBySmartSeason(filtered);
    render(filtered);
  }

  // ---- Category buttons
  filterButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat');
      applyFilters();
    });
  });

  if(searchInput) searchInput.addEventListener('input', applyFilters);

  // ---- Menu open/close + apply/clear
  function openMenu(){ 
    if(menuDrop){ 
      menuDrop.classList.remove('hidden'); 
      menuBtn?.setAttribute('aria-expanded','true'); 
    } 
  }
  function closeMenu(){ 
    if(menuDrop){ 
      menuDrop.classList.add('hidden'); 
      menuBtn?.setAttribute('aria-expanded','false'); 
    } 
  }

  menuBtn?.addEventListener('click', (e)=>{ 
    e.stopPropagation(); 
    if(menuDrop?.classList.contains('hidden')){
      openMenu();
    } else {
      closeMenu();
    }
  });
  menuCloseBtn?.addEventListener('click', ()=> closeMenu());

  document.addEventListener('click',(e)=>{ if(!menuDrop) return; if(!menuDrop.contains(e.target) && e.target !== menuBtn) closeMenu(); });
  document.addEventListener('keydown',(e)=>{ if(e.key === 'Escape') closeMenu(); });

  // ---- Filter Tabs Switching ----
  const filterTabs = $$('.filterTab');
  const filterPanels = $$('.filterPanel');
  
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding panel
      filterPanels.forEach(panel => {
        if (panel.dataset.panel === filter) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ---- Note Search Functionality ----
  const noteSearch = $('#noteSearch');
  const allNoteButtons = [];
  
  // Store all notes and create search
  function initNoteSearch() {
    if (!noteContainer || !noteSearch) return;
    
    // Get all note buttons
    const noteButtons = noteContainer.querySelectorAll('.menuOption');
    noteButtons.forEach(btn => allNoteButtons.push(btn));
  }
  
  if (noteSearch) {
    noteSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      allNoteButtons.forEach(btn => {
        const noteText = btn.textContent.toLowerCase();
        if (query === '' || noteText.includes(query)) {
          btn.style.display = '';
        } else {
          btn.style.display = 'none';
        }
      });
    });
  }
  
  // Initialize note search after populateFilters
  const originalPopulateFilters = populateFilters;
  populateFilters = function() {
    originalPopulateFilters();
    initNoteSearch();
  };

  applyFiltersBtn?.addEventListener('click', ()=>{ applyFilters(); closeMenu(); });
  clearFiltersBtn?.addEventListener('click', ()=>{
    clearAdvancedSelections();
    if(searchInput) searchInput.value = '';
    currentCategory = 'all';
    filterButtons.forEach(b=>b.classList.remove('active'));
    document.querySelector('.fbtn[data-cat="all"]')?.classList.add('active');
    applyFilters();
    closeMenu();
  });

  function showBestSellers(){
    if(searchInput) searchInput.value = '';
    currentCategory = 'all';
    filterButtons.forEach(b=>b.classList.remove('active'));
    document.querySelector('.fbtn[data-cat="all"]')?.classList.add('active');
    clearAdvancedSelections();
    const best = PRODUCTS.filter(p => BEST_SELLERS_IDS.includes(p.id));
    render(best);
  }
  $('#bestBtn')?.addEventListener('click', (e)=>{ e.preventDefault(); showBestSellers(); $('#productContainer')?.scrollIntoView({behavior:'smooth'}); });

  // ---- Modal (perfume details)
  function openPerfumeModalById(id){
    const p = PRODUCTS.find(x => x.id === id);
    if(!p) return;
    $('#pmTitle').textContent = p.name;
    $('#pmBrand').textContent = `${p.brand} • ${p.gender}`;
    $('#pmRating').textContent = p.rating ?? '—';
    $('#pmVotes').textContent = `(${p.votes ?? 0})`;
    const img = $('#pmImg'); img.src = p.thumbImg; img.alt = p.name;
    $('#pmAccords').innerHTML = (p.accords || []).map(a=>`<div class="pm-accord" style="background:${a.color || '#c7a657'}">${a.label}</div>`).join('');
    $('#pmNotes').innerHTML = (p.notes || []).map(n=>`<div class="pm-note">${n}</div>`).join('');
    $('#pmLongevity').textContent = p.longevity || '—';
    $('#pmSillage').textContent = p.sillage || '—';
    $('#pmTime').innerHTML = `<span class="pm-pill on">${getBestTime(p)}</span>`;
    $('#pmSeasons').innerHTML = `<span class="pm-pill on">${getBestSeason(p)}</span>`;
    $('#pmOrder').href = waLink(`Je veux commander ${p.name} (${SIZE} - ${PRICE_DT} DT)`);
    pmodal?.classList.add('open'); pmodal?.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden';
  }
  function closePerfumeModal(){ pmodal?.classList.remove('open'); pmodal?.setAttribute('aria-hidden','true'); document.body.style.overflow = 'auto'; }
  pclose?.addEventListener('click', closePerfumeModal);
  pmodal?.addEventListener('click',(e)=>{ if(e.target === pmodal) closePerfumeModal(); });
  document.addEventListener('keydown',(e)=>{ if(e.key === 'Escape' && pmodal?.classList.contains('open')) closePerfumeModal(); });

  // ---- CART ----
  function loadCart(){ try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
  function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function cartCount(cart){ return cart.reduce((s,it)=>s+it.qty,0); }
  function cartTotal(cart){ return cart.reduce((s,it)=>s+(it.qty*it.price),0); }

  function addToCart(p){ const cart = loadCart(); const found = cart.find(x=>x.id===p.id); if(found) found.qty += 1; else cart.push({ id:p.id, name:p.name, img:p.thumbImg, qty:1, price:PRICE_DT, size:SIZE }); saveCart(cart); refreshCartUI(); }
  function incQty(id){ const cart = loadCart(); const it = cart.find(x=>x.id===id); if(!it) return; it.qty += 1; saveCart(cart); refreshCartUI(); }
  function decQty(id){ let cart = loadCart(); const it = cart.find(x=>x.id===id); if(!it) return; it.qty -= 1; if(it.qty<=0) cart = cart.filter(x=>x.id!==id); saveCart(cart); refreshCartUI(); }
  function removeItem(id){ const cart = loadCart().filter(x=>x.id!==id); saveCart(cart); refreshCartUI(); }
  function clearCart(){ saveCart([]); refreshCartUI(); }

  function buildCheckoutMessage(cart){
    const lines = cart.map(it => `- ${it.name} x${it.qty} (${it.size}) = ${it.qty*it.price} DT`);
    const total = cartTotal(cart);
    return `Bonjour, je veux commander (DADIOS):\n${lines.join("\n")}\n\nTotal: ${total} DT.\nNom: \nAdresse: \nTéléphone:`;
  }

  function openCart(){ cartOverlay?.classList.remove('hidden'); cartDrawer?.classList.remove('hidden'); cartDrawer?.setAttribute('aria-hidden','false'); }
  function closeCart(){ cartOverlay?.classList.add('hidden'); cartDrawer?.classList.add('hidden'); cartDrawer?.setAttribute('aria-hidden','true'); }

  function refreshCartUI(){
    if(!cartCountEl || !cartItemsEl || !cartTotalEl || !cartCheckout) return;
    const cart = loadCart();
    cartCountEl.textContent = String(cartCount(cart));
    cartItemsEl.innerHTML = cart.length ? cart.map(it => `
      <div class="cartRow">
        <img src="${it.img}" alt="${it.name}">
        <div>
          <div style="font-weight:700">${it.name}</div>
          <div style="opacity:.8;font-size:.9rem">${it.size} • ${it.price} DT</div>
          <div class="qty">
            <button class="qbtn" data-dec="${it.id}">−</button>
            <strong>${it.qty}</strong>
            <button class="qbtn" data-inc="${it.id}">+</button>
            <button class="qbtn" data-rm="${it.id}">🗑</button>
          </div>
        </div>
        <strong>${it.qty*it.price} DT</strong>
      </div>
    `).join('') : `<p style="opacity:.8">Panier vide.</p>`;

    cartTotalEl.textContent = `${cartTotal(cart)} DT`;
    cartCheckout.href = waLink(buildCheckoutMessage(cart));

    cartItemsEl.querySelectorAll('[data-inc]').forEach(b=>b.addEventListener('click', ()=>incQty(b.dataset.inc)));
    cartItemsEl.querySelectorAll('[data-dec]').forEach(b=>b.addEventListener('click', ()=>decQty(b.dataset.dec)));
    cartItemsEl.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click', ()=>removeItem(b.dataset.rm)));
  }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);
  cartClearBtn?.addEventListener('click', clearCart);

  // ---- Init ----
  populateFilters();
  applyFilters();
  refreshCartUI();

  // Expose a small debug hook if needed
  window.DADIOS = {
    PRODUCTS, applyFilters, populateFilters, refreshCartUI
  };

})();
