document.addEventListener("DOMContentLoaded", function() {
  const phoneApp = document.getElementById("phone-app");
  const homeScreen = document.getElementById("home-screen");
  const contactsScreen = document.getElementById("contacts-screen");
  const backButton = document.getElementById("back-button");
  const contactList = document.querySelectorAll(".contact");

  // Quand on clique sur l'appli Téléphone
  phoneApp.addEventListener("click", () => {
    homeScreen.style.display = "none";
    contactsScreen.style.display = "flex";
  });

  // Quand on clique sur Retour
  backButton.addEventListener("click", () => {
    contactsScreen.style.display = "none";
    homeScreen.style.display = "flex";
  });

  // Quand on clique sur un contact
  contactList.forEach(contact => {
    contact.addEventListener("click", () => {
      const contactName = contact.textContent;
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      overlay.innerHTML = `
        <div class="contact-options">
          <p>Souhaitez-vous appeler <strong>${contactName}</strong> par :</p>
          <div class="methods">
            <button>GSM</button>
            <button>Mesh</button>
            <button>VoIP</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.remove();
        }
      });
    });
  });
});