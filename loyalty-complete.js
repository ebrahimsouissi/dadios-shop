// ============================================
// DADIOS CARTE FIDÉLITÉ - Apps Script
// Feuille: Cards avec colonnes:
// code | phone | name | stamps | rewards | createdAt | updatedAt
// ============================================

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  var action = null;
  
  if (e.parameter && e.parameter.action) {
    action = e.parameter.action;
  } else if (e.postData && e.postData.contents) {
    try {
      var data = JSON.parse(e.postData.contents);
      action = data.action;
    } catch(err) {
      return ContentService.createTextOutput(JSON.stringify({ok: false, error: 'Invalid JSON'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  if (!action) {
    return ContentService.createTextOutput(JSON.stringify({ok: false, error: 'Action requise'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var result;
  
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
      result = {ok: false, error: 'Action inconnue: ' + action};
  }
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// FONCTIONS
// ============================================

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Cards');
  
  if (!sheet) {
    sheet = ss.insertSheet('Cards');
    sheet.appendRow(['code', 'phone', 'name', 'stamps', 'rewards', 'createdAt', 'updatedAt']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#C7A657').setFontColor('#000000');
  }
  
  return sheet;
}

function generateCode() {
  var chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; // Pas 0/1/O/I
  var code = '';
  for (var i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getCardByCode(code) {
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
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
  var phone, name;
  
  if (e.postData && e.postData.contents) {
    var data = JSON.parse(e.postData.contents);
    phone = (data.phone || '').trim();
    name = (data.name || '').trim();
  } else {
    phone = (e.parameter.phone || '').trim();
    name = (e.parameter.name || '').trim();
  }
  
  if (!phone || !name) {
    return {ok: false, error: 'Téléphone et nom requis'};
  }
  
  var code;
  var attempts = 0;
  do {
    code = generateCode();
    attempts++;
    if (attempts > 10) {
      return {ok: false, error: 'Erreur génération code'};
    }
  } while (getCardByCode(code));
  
  var now = new Date().toISOString();
  var sheet = getSheet();
  
  sheet.appendRow([code, phone, name, 0, 0, now, now]);
  
  return {
    ok: true,
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
  var code, phone;
  
  if (e.postData && e.postData.contents) {
    var data = JSON.parse(e.postData.contents);
    code = (data.code || '').trim();
    phone = (data.phone || '').trim();
  } else {
    code = (e.parameter.code || '').trim();
    phone = (e.parameter.phone || '').trim();
  }
  
  if (!code && !phone) {
    return {ok: false, error: 'Code ou téléphone requis'};
  }
  
  var card = null;
  
  if (code) {
    card = getCardByCode(code);
  }
  
  if (!card && phone) {
    var sheet = getSheet();
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][1].toString().trim() === phone.trim()) {
        card = {
          code: data[i][0],
          phone: data[i][1],
          name: data[i][2],
          stamps: parseInt(data[i][3]) || 0,
          rewards: parseInt(data[i][4]) || 0,
          createdAt: data[i][5],
          updatedAt: data[i][6]
        };
        break;
      }
    }
  }
  
  if (!card) {
    return {ok: false, error: 'Carte non trouvée'};
  }
  
  return {ok: true, card: card};
}

function addStamp(e) {
  var code, qty;
  
  if (e.postData && e.postData.contents) {
    var data = JSON.parse(e.postData.contents);
    code = (data.code || '').trim();
    qty = parseInt(data.qty) || 1;
  } else {
    code = (e.parameter.code || '').trim();
    qty = parseInt(e.parameter.qty) || 1;
  }
  
  if (!code) {
    return {ok: false, error: 'Code requis'};
  }
  
  var sheet = getSheet();
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0].toString().toUpperCase() === code.toUpperCase()) {
      rowIndex = i + 1;
      break;
    }
  }
  
  if (rowIndex === -1) {
    return {ok: false, error: 'Carte non trouvée'};
  }
  
  var stamps = parseInt(data[rowIndex - 1][3]) || 0;
  var rewards = parseInt(data[rowIndex - 1][4]) || 0;
  
  stamps += qty;
  
  var newRewards = Math.floor(stamps / 8);
  var remainingStamps = stamps % 8;
  
  if (newRewards > 0) {
    rewards += newRewards;
    stamps = remainingStamps;
  }
  
  var now = new Date().toISOString();
  
  sheet.getRange(rowIndex, 4).setValue(stamps);
  sheet.getRange(rowIndex, 5).setValue(rewards);
  sheet.getRange(rowIndex, 7).setValue(now);
  
  return {
    ok: true,
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
