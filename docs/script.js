/*
  Version robuste du script pour iKIP - gère le clic sur l'icône Téléphone,
  l'ouverture de l'écran contacts, le retour, et l'overlay d'options GSM/VoIP/Mesh.
  Fonctionne même si les id/classes varient un peu.
*/
document.addEventListener("DOMContentLoaded", function() {
  const phoneSelectors = [
    "#phone-icon",
    "#phone-app",
    "[data-app='phone']",
    ".phone-icon",
    ".app-phone",
    "button.call",
    "button.phone"
  ];

  let phoneElement = null;
  for (const sel of phoneSelectors) {
    phoneElement = document.querySelector(sel);
    if (phoneElement) break;
  }

  const homeScreen = document.getElementById("home-screen") || document.querySelector(".home-screen") || document.getElementById("home") || document.querySelector(".home");
  const contactsScreen = document.getElementById("contacts-screen") || document.querySelector(".contacts-screen") || document.getElementById("contacts") || document.querySelector(".contacts");
  const backButton = document.getElementById("back-button") || document.querySelector(".back-button") || document.querySelector(".back");

  if (phoneElement) {
    phoneElement.style.cursor = "pointer";
    phoneElement.addEventListener("click", () => {
      if (homeScreen) homeScreen.style.display = "none";
      if (contactsScreen) contactsScreen.style.display = "flex";
      else {
        const cl = document.querySelector(".contact-list");
        if (cl) cl.style.display = "flex";
      }
    });
  } else {
    console.warn("Phone icon not found - check HTML ids/classes.");
  }

  if (backButton) {
    backButton.addEventListener("click", () => {
      if (contactsScreen) contactsScreen.style.display = "none";
      if (homeScreen) homeScreen.style.display = "flex";
      const ov = document.querySelectorAll(".ikip-overlay");
      ov.forEach(o => o.remove());
    });
  }

  const contacts = document.querySelectorAll(".contact, .contact-item, li.contact, .contact-row");
  contacts.forEach(contact => {
    contact.style.cursor = "pointer";
    contact.addEventListener("click", () => {
      const name = (contact.textContent || contact.innerText || "Contact").trim();
      const overlay = document.createElement("div");
      overlay.className = "ikip-overlay";
      overlay.style.position = "fixed";
      overlay.style.left = 0;
      overlay.style.top = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.background = "rgba(0,0,0,0.45)";
      overlay.style.zIndex = 9999;
      overlay.innerHTML = `
        <div style="background:#fff;color:#000;padding:18px;border-radius:10px;max-width:90%;width:360px;text-align:center;font-family:Arial,Helvetica,sans-serif;">
          <p style="margin:0 0 12px;font-size:16px;">Souhaitez-vous appeler <strong>${name}</strong> par :</p>
          <div style="display:flex;gap:10px;justify-content:center;">
            <button data-method="gsm" style="padding:8px 12px;border-radius:6px;border:1px solid #ccc;background:#f7f7f7;cursor:pointer;">GSM</button>
            <button data-method="mesh" style="padding:8px 12px;border-radius:6px;border:1px solid #ccc;background:#f7f7f7;cursor:pointer;">Mesh</button>
            <button data-method="voip" style="padding:8px 12px;border-radius:6px;border:1px solid #ccc;background:#f7f7f7;cursor:pointer;">VoIP</button>
          </div>
          <div style="margin-top:12px;"><button id="ikip-dismiss" style="padding:6px 10px;border-radius:6px;border:0;background:#222;color:#fff;cursor:pointer;">Annuler</button></div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.querySelectorAll("button[data-method]").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const method = btn.getAttribute("data-method");
          alert(`${method.toUpperCase()} choisi pour ${name}`);
          overlay.remove();
        });
      });

      const dismiss = overlay.querySelector("#ikip-dismiss");
      if (dismiss) dismiss.addEventListener("click", () => overlay.remove());

      overlay.addEventListener("click", (ev) => {
        if (ev.target === overlay) overlay.remove();
      });
    });
  });

  if (!contacts.length) console.warn("No .contact elements found (check DOM).");
});