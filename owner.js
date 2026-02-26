// Owner/Admin functionality for DADIOS Fragrance
(function() {
  'use strict';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOwner);
  } else {
    initOwner();
  }

  function initOwner() {
    var ownerModal = document.getElementById('ownerModal');
    var ownerAdmin = document.getElementById('ownerAdmin');
    var ownerPassword = document.getElementById('ownerPassword');
    var ownerError = document.getElementById('ownerError');
    var ownerSubmitBtn = document.getElementById('ownerSubmitBtn');
    var ownerCloseBtn = document.getElementById('ownerCloseBtn');
    var ownerAdminClose = document.getElementById('ownerAdminClose');
    var ownerCardsBody = document.getElementById('ownerCardsBody');
    var ownerNoCards = document.getElementById('ownerNoCards');
    var ownerLoading = document.getElementById('ownerLoading');
    var ownerAdminTable = document.getElementById('ownerAdminTable');
    var menuOwner = document.getElementById('menuOwner');
    var ownerPasswordStored = null;

    function openOwnerModal() {
      if (ownerModal) ownerModal.classList.remove('hidden');
      if (ownerPassword) ownerPassword.value = '';
      if (ownerError) ownerError.classList.add('hidden');
    }

    function closeOwnerModal() {
      if (ownerModal) ownerModal.classList.add('hidden');
    }

    function openOwnerAdmin() {
      if (ownerAdmin) ownerAdmin.classList.remove('hidden');
      loadOwnerCards();
    }

    function closeOwnerAdmin() {
      if (ownerAdmin) ownerAdmin.classList.add('hidden');
    }

    function loadOwnerCards() {
      if (!ownerPasswordStored || !ownerCardsBody) return;
      if (ownerAdminTable) ownerAdminTable.classList.add('hidden');
      if (ownerLoading) ownerLoading.classList.remove('hidden');
      
      fetch('/api/loyalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'admin_list', password: ownerPasswordStored })
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (ownerLoading) ownerLoading.classList.add('hidden');
        if (res.ok && res.cards && res.cards.length > 0) {
          if (ownerNoCards) ownerNoCards.classList.add('hidden');
          if (ownerAdminTable) ownerAdminTable.classList.remove('hidden');
          
          ownerCardsBody.innerHTML = res.cards.map(function(card) {
            var dateStr = card.createdAt ? new Date(card.createdAt).toLocaleDateString('fr-FR') : '-';
            return '<tr>' +
              '<td class="code-cell">' + card.code + '</td>' +
              '<td>' + (card.name || '-') + '</td>' +
              '<td>' + (card.phone || '-') + '</td>' +
              '<td class="stamps-cell">' + card.stamps + '/8</td>' +
              '<td class="rewards-cell">' + card.rewards + '</td>' +
              '<td>' + dateStr + '</td>' +
              '<td><div class="owner-actions">' +
                '<button class="owner-btn" data-action="addStamp" data-code="' + card.code + '">+1 Tampon</button>' +
                '<button class="owner-btn delete" data-action="delete" data-code="' + card.code + '">Supprimer</button>' +
              '</div></td></tr>';
          }).join('');

          ownerCardsBody.querySelectorAll('.owner-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
              var action = btn.getAttribute('data-action');
              var code = btn.getAttribute('data-code');
              if (action === 'addStamp') ownerAddStamp(code);
              else if (action === 'delete') ownerDeleteCard(code);
            });
          });
        } else {
          if (ownerNoCards) ownerNoCards.classList.remove('hidden');
          if (ownerAdminTable) ownerAdminTable.classList.add('hidden');
        }
      })
      .catch(function() {
        if (ownerLoading) ownerLoading.classList.add('hidden');
        alert('Erreur de chargement des cartes');
      });
    }

    function ownerAddStamp(code) {
      if (!ownerPasswordStored) return;
      fetch('/api/loyalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'admin_addStamp', password: ownerPasswordStored, code: code, qty: 1 })
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.ok) loadOwnerCards();
        else alert(res.error || 'Erreur');
      });
    }

    function ownerDeleteCard(code) {
      if (!ownerPasswordStored) return;
      if (!confirm('Etes-vous sur de vouloir supprimer cette carte?')) return;
      fetch('/api/loyalty', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'admin_delete', password: ownerPasswordStored, code: code })
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.ok) loadOwnerCards();
        else alert(res.error || 'Erreur');
      });
    }

    // Event listeners
    if (menuOwner) {
      menuOwner.addEventListener('click', function() {
        var menuDrop = document.getElementById('menuDrop');
        if (menuDrop) menuDrop.classList.add('hidden');
        openOwnerModal();
      });
    }

    if (ownerSubmitBtn && ownerPassword) {
      ownerSubmitBtn.addEventListener('click', function() {
        var pwd = ownerPassword.value.trim();
        if (!pwd) {
          if (ownerError) { 
            ownerError.textContent = 'Veuillez entrer un mot de passe'; 
            ownerError.classList.remove('hidden'); 
          }
          return;
        }
        
        ownerSubmitBtn.disabled = true;
        ownerSubmitBtn.textContent = 'Verification...';
        
        fetch('/api/loyalty', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'admin_list', password: pwd })
        })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          ownerSubmitBtn.disabled = false;
          ownerSubmitBtn.textContent = 'Acceder';
          
          if (res.ok) {
            ownerPasswordStored = pwd;
            closeOwnerModal();
            openOwnerAdmin();
          } else {
            if (ownerError) { 
              ownerError.textContent = 'Mot de passe incorrect'; 
              ownerError.classList.remove('hidden'); 
            }
          }
        })
        .catch(function() {
          ownerSubmitBtn.disabled = false;
          ownerSubmitBtn.textContent = 'Acceder';
          if (ownerError) { 
            ownerError.textContent = 'Erreur de connexion'; 
            ownerError.classList.remove('hidden'); 
          }
        });
      });
    }

    if (ownerPassword) {
      ownerPassword.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && ownerSubmitBtn) ownerSubmitBtn.click();
      });
    }

    if (ownerCloseBtn) ownerCloseBtn.addEventListener('click', closeOwnerModal);
    if (ownerAdminClose) ownerAdminClose.addEventListener('click', closeOwnerAdmin);
    
    if (ownerModal) {
      var ownerOverlay = ownerModal.querySelector('.loy-overlay');
      if (ownerOverlay) ownerOverlay.addEventListener('click', closeOwnerModal);
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (ownerModal && !ownerModal.classList.contains('hidden')) closeOwnerModal();
        if (ownerAdmin && !ownerAdmin.classList.contains('hidden')) closeOwnerAdmin();
      }
    });
  }
})();
