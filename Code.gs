// ============================================
// DADIOS CARTE FIDÉLITÉ - Google Apps Script
// Support FormData POST, optimized, production-ready
// ============================================

/**
 * Handle GET requests
 */
function doGet(e) {
  return handleRequest(e);
}

/**
 * Handle POST requests (FormData and JSON)
 */
function doPost(e) {
  return handleRequest(e);
}

/**
 * Central request handler
 * IMPORTANT: Uses e.parameter for ALL field reads (works with GET + POST FormData)
 */
function handleRequest(e) {
  // Extract action from query params - works with both GET and FormData POST
  const action = (e.parameter.action || '').toString().trim();
  
  if (!action) {
    return jsonResponse({ ok: false, error: 'Action requise' });
  }

  try {
    let result;
    
    switch (action) {
      case 'create':
        result = createCard(e);
        break;
      case 'get':
        result = getCard(e);
        break;
      case 'addStamp':
        result = addStamp(e);
        break;
      default:
        result = { ok: false, error: 'Action inconnue: ' + action };
    }
    
    return jsonResponse(normalizeResponse(result));
    
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  }
}

/**
 * Return JSON response with proper MIME type
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Normalize response: convert 'success' to 'ok' if present
 * Always returns { ok: boolean }
 */
function normalizeResponse(result) {
  if (!result || typeof result !== 'object') {
    return { ok: false, error: 'Invalid result' };
  }
  
  // If ok exists, ensure boolean
  if ('ok' in result) {
    return { ...result, ok: Boolean(result.ok) };
  }
  
  // Convert success to ok
  if ('success' in result) {
    return { ...result, ok: Boolean(result.success), success: undefined };
  }
  
  return { ok: false, error: 'Unknown error' };
}

// ============================================
// SHEET OPERATIONS
// ============================================

/**
 * Get or create the Cards sheet
 */
function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Cards');
  
  if (!sheet) {
    sheet = ss.insertSheet('Cards');
    // Exact headers as specified
    const headers = ['code', 'phone', 'name', 'stamps', 'rewards', 'createdAt', 'updatedAt'];
    sheet.appendRow(headers);
    // Format header row
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#C7A657').setFontColor('#000000');
    sheet.setColumnWidths(1, 7, 150);
  }
  
  return sheet;
}

/**
 * Get data rows (excluding header) - cached for performance
 */
function getDataRows() {
  const sheet = getSheet();
  const lastRow = sheet.getLastRow();
  
  if (lastRow <= 1) {
    return [];
  }
  
  return sheet.getRange(2, 1, lastRow - 1, 7).getValues();
}

/**
 * Find card by code (uppercase) OR phone (without spaces)
 * Single pass optimization
 * Returns { card: object, rowIndex: number } or null
 */
function findCard(query) {
  const queryClean = query.toString().toUpperCase().replace(/\s/g, '');
  const rows = getDataRows();
  
  for (let i = 0; i < rows.length; i++) {
    const [code, phone, name, stamps, rewards, createdAt, updatedAt] = rows[i];
    
    const codeMatch = code.toString().toUpperCase() === queryClean;
    const phoneMatch = phone.toString().replace(/\s/g, '').toUpperCase() === queryClean;
    
    if (codeMatch || phoneMatch) {
      return {
        card: {
          code: code.toString(),
          phone: phone.toString(),
          name: name.toString(),
          stamps: parseInt(stamps) || 0,
          rewards: parseInt(rewards) || 0,
          createdAt: createdAt ? new Date(createdAt).toISOString() : '',
          updatedAt: updatedAt ? new Date(updatedAt).toISOString() : ''
        },
        rowIndex: i + 2 // +2: +1 for 0-index, +1 for header row
      };
    }
  }
  
  return null;
}

/**
 * Check if code already exists
 */
function codeExists(code) {
  const rows = getDataRows();
  const codeUpper = code.toString().toUpperCase();
  
  return rows.some(row => row[0].toString().toUpperCase() === codeUpper);
}

// ============================================
// CODE GENERATION
// ============================================

/**
 * Generate unique 4-character code
 * Excludes: O, I (to avoid confusion)
 * Numbers: 2-9 (excludes 0, 1)
 */
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No O, I, 0, 1
  let code = '';
  
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return code;
}

/**
 * Generate unique code that doesn't exist
 */
function generateUniqueCode() {
  let code;
  let attempts = 0;
  const maxAttempts = 10;
  
  do {
    code = generateCode();
    attempts++;
  } while (codeExists(code) && attempts < maxAttempts);
  
  if (attempts >= maxAttempts) {
    throw new Error('Erreur génération code');
  }
  
  return code;
}

// ============================================
// CARD OPERATIONS
// ============================================

/**
 * Read parameter safely from e.parameter (works with GET + FormData POST)
 */
function getParam(e, key, defaultValue) {
  const value = e.parameter[key];
  return value !== undefined && value !== null ? value.trim() : defaultValue;
}

/**
 * Create a new loyalty card
 * - Requires phone and name
 * - Generates unique 4-character code
 * - Gives 1 WELCOME STAMP (stamps = 1)
 * - rewards = 0
 * - Saves timestamps in ISO format
 * - Prevents duplicate code
 */
function createCard(e) {
  // Read from e.parameter (works with FormData and GET)
  const phone = getParam(e, 'phone', '');
  const name = getParam(e, 'name', '');
  
  // Validation
  if (!phone || !name) {
    return { ok: false, error: 'Téléphone et nom requis' };
  }
  
  // Generate unique code
  const code = generateUniqueCode();
  const now = new Date().toISOString();
  
  const sheet = getSheet();
  
  // Add welcome stamp: stamps = 1
  sheet.appendRow([code, phone, name, 1, 0, now, now]);
  
  return {
    ok: true,
    card: {
      code: code,
      phone: phone,
      name: name,
      stamps: 1, // Welcome stamp!
      rewards: 0,
      createdAt: now,
      updatedAt: now
    }
  };
}

/**
 * Get card by code OR phone
 * Returns full card object
 */
function getCard(e) {
  // Read from e.parameter (works with FormData and GET)
  const code = getParam(e, 'code', '');
  const phone = getParam(e, 'phone', '');
  
  const query = code || phone;
  
  if (!query) {
    return { ok: false, error: 'Code ou téléphone requis' };
  }
  
  const result = findCard(query);
  
  if (!result) {
    return { ok: false, error: 'Carte non trouvée' };
  }
  
  return { ok: true, card: result.card };
}

/**
 * Add stamps to card
 * - Requires code
 * - qty default = 1
 * - stamps += qty
 * - rewards += floor(stamps / 8)
 * - stamps = stamps % 8
 * - Update updatedAt only (NOT createdAt)
 */
function addStamp(e) {
  // Read from e.parameter (works with FormData and GET)
  const code = getParam(e, 'code', '');
  const qty = parseInt(e.parameter.qty) || 1;
  
  // Validation
  if (!code) {
    return { ok: false, error: 'Code requis' };
  }
  
  // Protection: reject negative qty
  if (qty < 0) {
    return { ok: false, error: 'Quantité négative non autorisée' };
  }
  
  // Protection: reject qty > 20
  if (qty > 20) {
    return { ok: false, error: 'Quantité maximale: 20' };
  }
  
  // Find card - single search
  const result = findCard(code);
  
  if (!result) {
    return { ok: false, error: 'Carte non trouvée' };
  }
  
  const { card, rowIndex } = result;
  const sheet = getSheet();
  
  // Calculate new stamps and rewards
  let newStamps = card.stamps + qty;
  let newRewards = card.rewards + Math.floor(newStamps / 8);
  newStamps = newStamps % 8;
  
  const now = new Date().toISOString();
  
  // Update ONLY stamps, rewards, updatedAt (NOT createdAt) - 3 separate updates
  sheet.getRange(rowIndex, 4).setValue(newStamps);   // stamps
  sheet.getRange(rowIndex, 5).setValue(newRewards);  // rewards
  sheet.getRange(rowIndex, 7).setValue(now);        // updatedAt
  
  return {
    ok: true,
    card: {
      code: card.code,
      phone: card.phone,
      name: card.name,
      stamps: newStamps,
      rewards: newRewards,
      createdAt: card.createdAt, // Preserved!
      updatedAt: now
    }
  };
}
