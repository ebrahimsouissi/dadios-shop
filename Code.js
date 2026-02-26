// ============================================
// DADIOS CARTE FIDÉLITÉ - Apps Script
// ============================================

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const action = e.parameter.action || (e.postData ? JSON.parse(e.postData.contents).action : null);
  
  if (!action) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Action requise' }))
      .setMimeType(ContentService.MimeType.JSON);
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
        result = { success: false, error: 'Action inconnue: ' + action };
    }
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// FONCTIONS PRINCIPALES
// ============================================

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Cards');
  
  if (!sheet) {
    sheet = ss.insertSheet('Cards');
    // En-têtes exacts
    sheet.appendRow(['code', 'phone', 'name', 'stamps', 'rewards', 'createdAt', 'updatedAt']);
    // Formatage
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#C7A657').setFontColor('#000000');
    sheet.setColumnWidths(1, 7, 150);
  }
  
  return sheet;
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getCardByCode(code) {
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString().toUpperCase() === code.toUpperCase()) {
      return {
        code: data[i][0],
        phone: data[i][1],
        name: data[i][2],
        stamps: parseInt(data[i][3]) || 0,
        rewards: parseInt(data[i][4]) || 0,
        createdAt: data[i][5],
        updatedAt: data[i][6]
      };
    }
  }
  return null;
}

function createCard(e) {
  const body = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
  const phone = (body.phone || '').trim();
  const name = (body.name || '').trim();
  
  if (!phone || !name) {
    return { success: false, error: 'Téléphone et nom requis' };
  }
  
  // Générer code unique
  let code;
  let attempts = 0;
  do {
    code = generateCode();
    attempts++;
    if (attempts > 10) {
      return { success: false, error: 'Erreur génération code' };
    }
  } while (getCardByCode(code));
  
  const now = new Date().toISOString();
  const sheet = getSheet();
  
  sheet.appendRow([code, phone, name, 0, 0, now, now]);
  
  return {
    success: true,
    card: {
      code: code,
      phone: phone,
      name: name,
      stamps: 0,
      rewards: 0,
      createdAt: now,
      updatedAt: now
    }
  };
}

function getCard(e) {
  const body = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
  const code = (body.code || '').trim();
  
  if (!code) {
    return { success: false, error: 'Code requis' };
  }
  
  const card = getCardByCode(code);
  
  if (!card) {
    return { success: false, error: 'Carte non trouvée' };
  }
  
  return { success: true, card: card };
}

function addStamp(e) {
  const body = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
  const code = (body.code || '').trim();
  const qty = parseInt(body.qty) || 1;
  
  if (!code) {
    return { success: false, error: 'Code requis' };
  }
  
  const sheet = getSheet();
  const data = sheet.getDataRange().getValues();
  let rowIndex = -1;
  
  // Trouver la ligne
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toString().toUpperCase() === code.toUpperCase()) {
      rowIndex = i + 1;
      break;
    }
  }
  
  if (rowIndex === -1) {
    return { success: false, error: 'Carte non trouvée' };
  }
  
  // Lire valeurs actuelles
  let stamps = parseInt(data[rowIndex - 1][3]) || 0;
  let rewards = parseInt(data[rowIndex - 1][4]) || 0;
  
  // Ajouter stamps
  stamps += qty;
  
  // Calculer rewards (8 stamps = 1 reward)
  const newRewards = Math.floor(stamps / 8);
  const remainingStamps = stamps % 8;
  
  if (newRewards > 0) {
    rewards += newRewards;
    stamps = remainingStamps;
  }
  
  const now = new Date().toISOString();
  
  // Mettre à jour
  sheet.getRange(rowIndex, 4).setValue(stamps);
  sheet.getRange(rowIndex, 5).setValue(rewards);
  sheet.getRange(rowIndex, 7).setValue(now);
  
  return {
    success: true,
    card: {
      code: data[rowIndex - 1][0],
      phone: data[rowIndex - 1][1],
      name: data[rowIndex - 1][2],
      stamps: stamps,
      rewards: rewards,
      createdAt: data[rowIndex - 1][5],
      updatedAt: now
    }
  };
}
