// Ciblage des éléments
const phoneApp = document.getElementById("app-phone");
const phoneScreen = document.getElementById("phoneScreen");
const backBtn = document.getElementById("btnBack");
const contacts = document.querySelectorAll(".contact-item");
const callText = document.getElementById("callText");

// Ouvrir l’écran téléphone
phoneApp.addEventListener("click", () => {
  phoneScreen.classList.remove("hidden");
});

// Retour à l’accueil
backBtn.addEventListener("click", () => {
  phoneScreen.classList.add("hidden");
});

// Interaction avec les contacts
contacts.forEach(contact => {
  contact.addEventListener("click", () => {
    const name = contact.textContent.trim();
    callText.textContent = `Souhaitez-vous appeler ${name} par`;
  });
});