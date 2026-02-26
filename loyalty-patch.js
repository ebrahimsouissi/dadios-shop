/* =====================================================
   LOYALTY CARD - JAVASCRIPT PATCH
   À COLLER dans app.js (après les constantes, avant les fonctions)
===================================================== */

// ===== CONFIG =====
const LOYALTY_API_URL = "https://script.google.com/macros/s/AKfycbwRtuAc7O3zL66ZuZGXXf0dpPghJ_h7-b6G3UrRGq2zGgIofFGfB3lyoSQOIxdoSNbnwA/exec";
const LOYALTY_KEY = 'dadios_loyalty_card';

// ===== DOM ELEMENTS =====
const loyModal = document.getElementById('loyModal');
const loyOverlay = loyModal?.querySelector('.loy-overlay');
const loyCloseBtn = loyModal?.querySelector('.loy-close');

// Sections
const loyOptions = document.getElementById('loyOptions');
const loyCreate = document.getElementById('loyCreate');
const loyImport = document.getElementById('loyImport');
const loySuccess = document.getElementById('loySuccess');
const loyLoading = document.getElementById('loyLoading');

// Buttons
const loyBtnCreate = document.getElementById('loyBtnCreate');
const loyBtnImport = document.getElementById('loyBtnImport');
const loyBtnSkip = document.getElementById('loyBtnSkip');
const loyBtnSubmitCreate = document.getElementById('loyBtnSubmitCreate');
const loyBtnBackCreate = document.getElementById('loyBtnBackCreate');
const loyBtnSubmitImport = document.getElementById('loyBtnSubmitImport');
const loyBtnBackImport = document.getElementById('loyBtnBackImport');
const loyBtnContinue = document.getElementById('loyBtnContinue');

// Form inputs
const loyNameInput = document.getElementById('loyName');
const loyPhoneInput = document.getElementById('loyPhone');
const loyCodeInput = document.getElementById('loyCodeInput');
const loyPhoneImportInput = document.getElementById('loyPhoneImport');

// Display elements
const loyCardCode = document.getElementById('loyCardCode');
const loyCardName = document.getElementById('loyCardName');
const loyStampsCount = document.getElementById('loyStampsCount');
const loyRewardsCount = document.getElementById('loyRewardsCount');
const loyStampsDisplay = document.getElementById('loyStampsDisplay');
const loyMessage = document.getElementById('loyMessage');

// ===== STATE =====
let loyPendingCheckout = null; // Stocke le panier en attente

// ===== API FUNCTIONS =====
async function apiPost(action, data = {}) {
  const formData = new FormData();
  formData.append('action', action);
  Object.keys(data).forEach(key => formData.append(key, data[key]));
  
  try {
    const response = await fetch(LOYALTY_API_URL, { method: 'POST', body: formData });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return { success: false, error: 'Erreur de connexion' };
  }
}

// ===== LOCAL STORAGE =====
function saveCardLocal(card) {
  localStorage.setItem(LOYALTY_KEY, JSON.stringify(card));
}

function loadCardLocal() {
  const data = localStorage.getItem(LOYALTY_KEY);
  return data ? JSON.parse(data) : null;
}

function clearCardLocal() {
  localStorage.removeItem(LOYALTY_KEY);
}

// ===== MODAL FUNCTIONS =====
function openLoyModal() {
  loyModal?.classList.remove('hidden');
  showLoySection('options');
}

function closeLoyModal() {
  loyModal?.classList.add('hidden');
  // Reset form inputs
  loyNameInput.value = '';
  loyPhoneInput.value = '';
  loyCodeInput.value = '';
  loyPhoneImportInput.value = '';
}

function showLoySection(sectionName) {
  // Hide all sections
  loyOptions?.classList.add('hidden');
  loyCreate?.classList.add('hidden');
  loyImport?.classList.add('hidden');
  loySuccess?.classList.add('hidden');
  loyLoading?.classList.add('hidden');
  
  // Show requested section
  switch(sectionName) {
    case 'options': loyOptions?.classList.remove('hidden'); break;
    case 'create': loyCreate?.classList.remove('hidden'); break;
    case 'import': loyImport?.classList.remove('hidden'); break;
    case 'success': loySuccess?.classList.remove('hidden'); break;
    case 'loading': loyLoading?.classList.remove('hidden'); break;
  }
}

function showLoyLoading() {
  showLoySection('loading');
}

// ===== CARD DISPLAY =====
function displayCard(card) {
  if (!loyCardCode || !loyCardName || !loyStampsCount || !loyRewardsCount) return;
  
  loyCardCode.textContent = card.code;
  loyCardName.textContent = card.name;
  loyStampsCount.textContent = card.stamps;
  loyRewardsCount.textContent = card.rewards;
  
  // Update stamps visual
  const stamps = loyStampsDisplay?.querySelectorAll('.loy-stamp') || [];
  stamps.forEach((stamp, i) => {
    stamp.classList.toggle('filled', i < card.stamps);
  });
  
  // Message
  if (loyMessage) {
    if (card.rewards > 0) {
      loyMessage.textContent = `🎉 Félicitations ! Vous avez ${card.rewards} parfum${card.rewards > 1 ? 's' : ''} offert${card.rewards > 1 ? 's' : ''} !`;
    } else {
      const remaining = 8 - card.stamps;
      loyMessage.textContent = `Plus que ${remaining} tampon${remaining > 1 ? 's' : ''} pour votre prochain parfum offert !`;
    }
  }
}

// ===== CHECKOUT FLOW =====
function initCheckout() {
  const cart = loadCart();
  
  if (!cart || cart.length === 0) {
    return; // Ne rien faire si panier vide
  }
  
  loyPendingCheckout = cart;
  openLoyModal();
}

// Calculate total perfumes qty
function getCartPerfumesQty() {
  if (!loyPendingCheckout || !loyPendingCheckout.length) return 0;
  return loyPendingCheckout.reduce((sum, item) => sum + (item.qty || 0), 0);
}

// Build loyalty message section
function buildLoyaltyMessage(card) {
  return `\n\n💎 CARTE FIDÉLITÉ:\nCode: ${card.code}\nTampons: ${card.stamps} / 8\nRécompenses: ${card.rewards}`;
}

// Process checkout with loyalty
async function processCheckoutWithLoyalty(card) {
  const qty = getCartPerfumesQty();
  
  if (qty > 0) {
    showLoyLoading();
    
    // Add stamps
    const result = await apiPost('addStamp', { code: card.code, qty: qty });
    
    if (result.success) {
      // Update local storage with new card data
      saveCardLocal(result.card);
      displayCard(result.card);
    }
  }
  
  // Build and open WhatsApp message
  const loyaltyMsg = buildLoyaltyMessage(card);
  const checkoutMsg = buildCheckoutMessage(loyPendingCheckout);
  const fullMsg = checkoutMsg + loyaltyMsg;
  
  closeLoyModal();
  window.open(waLink(fullMsg), '_blank');
}

// Process checkout without loyalty
function processCheckoutWithoutLoyalty() {
  const checkoutMsg = buildCheckoutMessage(loyPendingCheckout);
  closeLoyModal();
  window.open(waLink(checkoutMsg), '_blank');
}

// ===== EVENT HANDLERS =====

// Close modal
loyCloseBtn?.addEventListener('click', closeLoyModal);
loyOverlay?.addEventListener('click', closeLoyModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !loyModal?.classList.contains('hidden')) {
    closeLoyModal();
  }
});

// Options buttons
loyBtnSkip?.addEventListener('click', () => {
  processCheckoutWithoutLoyalty();
});

loyBtnCreate?.addEventListener('click', () => {
  showLoySection('create');
});

loyBtnImport?.addEventListener('click', () => {
  showLoySection('import');
});

// Back buttons
loyBtnBackCreate?.addEventListener('click', () => {
  showLoySection('options');
});

loyBtnBackImport?.addEventListener('click', () => {
  showLoySection('options');
});

// Create card
loyBtnSubmitCreate?.addEventListener('click', async () => {
  const name = loyNameInput.value.trim();
  const phone = loyPhoneInput.value.trim();
  
  if (!name || !phone) {
    alert('Veuillez remplir tous les champs');
    return;
  }
  
  showLoyLoading();
  
  const result = await apiPost('create', { name, phone });
  
  if (result.success) {
    saveCardLocal(result.card);
    displayCard(result.card);
    showLoySection('success');
  } else {
    alert(result.error || 'Erreur lors de la création');
    showLoySection('create');
  }
});

// Import card
loyBtnSubmitImport?.addEventListener('click', async () => {
  const code = loyCodeInput.value.trim().toUpperCase();
  const phone = loyPhoneImportInput.value.trim();
  
  if (!code) {
    alert('Veuillez entrer le code de votre carte');
    return;
  }
  
  showLoyLoading();
  
  const result = await apiPost('get', { code });
  
  if (result.success) {
    saveCardLocal(result.card);
    displayCard(result.card);
    showLoySection('success');
  } else {
    alert(result.error || 'Carte non trouvée');
    showLoySection('import');
  }
});

// Continue button (after seeing card)
loyBtnContinue?.addEventListener('click', async () => {
  const card = loadCardLocal();
  if (card) {
    await processCheckoutWithLoyalty(card);
  } else {
    processCheckoutWithoutLoyalty();
  }
});

// ===== CHECKOUT INTERCEPT =====
const originalCartCheckout = document.getElementById('cartCheckout');
if (originalCartCheckout) {
  // Remplacer le href par notre handler
  originalCartCheckout.removeAttribute('href');
  originalCartCheckout.style.pointerEvents = 'auto';
  originalCartCheckout.style.cursor = 'pointer';
  
  originalCartCheckout.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    initCheckout();
  });
}

/* =====================================================
   FIN DU PATCH LOYALTY
===================================================== */
