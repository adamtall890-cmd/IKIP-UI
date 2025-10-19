// debug minimal iKIP - téléphone
console.log("script.js chargé - iKIP");

document.addEventListener("DOMContentLoaded", function () {
  // 1) sélécteur explicite pour ton bouton (id dans ton HTML)
  const phoneButton = document.getElementById("app-phone") || document.querySelector("#app-phone");
  console.log("phoneButton:", phoneButton);

  // 2) éléments d'écran (fallbacks)
  const homeScreen = document.getElementById("home-screen") || document.querySelector(".home-screen") || document.querySelector(".home");
  const contactsScreen = document.getElementById("contacts-screen") || document.querySelector(".contacts-screen") || document.querySelector(".contacts");
  console.log("homeScreen:", !!homeScreen, "contactsScreen:", !!contactsScreen);

  // 3) handler minimal pour le bouton téléphone
  if (phoneButton) {
    phoneButton.style.cursor = "pointer";
    phoneButton.addEventListener("click", () => {
      console.log("Téléphone cliqué");
      // afficher contacts si ils existent
      if (homeScreen) homeScreen.style.display = "none";
      if (contactsScreen) {
        contactsScreen.style.display = "flex";
      } else {
        // si pas de contactsScreen, on affiche la section .contact-list si présente
        const cl = document.querySelector(".contact-list") || document.querySelector("ul.contacts");
        if (cl) cl.style.display = "flex";
      }
    });
  } else {
    console.warn("Icône téléphone introuvable (#app-phone).");
  }

  // 4) gestion des contacts -> affichage overlay GSM/Mesh/VoIP si cliqué
  const contacts = document.querySelectorAll(".contact, .contact-item, li.contact");
  contacts.forEach(contact => {
    contact.style.cursor = "pointer";
    contact.addEventListener("click", () => {
      const name = (contact.textContent || contact.innerText).trim();
      console.log("Contact cliqué:", name);
      // simple overlay
      const overlay = document.createElement("div");
      overlay.className = "ikip-overlay";
      overlay.style = "position:fixed;left:0;top:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);z-index:9999;";
      overlay.innerHTML = `
        <div style="background:#fff;color:#000;padding:18px;border-radius:10px;max-width:90%;width:360px;text-align:center;">
          <p style="margin:0 0 12px;">Souhaitez-vous appeler <strong>${name}</strong> par :</p>
          <div style="display:flex;gap:10px;justify-content:center;">
            <button data-method="gsm">GSM</button>
            <button data-method="mesh">Mesh</button>
            <button data-method="voip">VoIP</button>
          </div>
          <div style="margin-top:12px;"><button id="ikip-dismiss">Annuler</button></div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelectorAll("button[data-method]").forEach(btn => {
        btn.addEventListener("click", () => {
          const method = btn.getAttribute("data-method");
          console.log("Method choisi:", method, "pour", name);
          alert(`${method.toUpperCase()} choisi pour ${name}`);
          overlay.remove();
        });
      });
      overlay.querySelector("#ikip-dismiss").addEventListener("click", () => overlay.remove());
      overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
    });
  });

  if (!contacts.length) console.log("Aucun élément .contact trouvé pour tester.");
});