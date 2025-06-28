function filterWatches(brand) {
  const watches = document.querySelectorAll('.watch-item');

  watches.forEach((watch) => {
    const watchBrand = watch.getAttribute('data-brand');
    
    if (brand === 'all') {
      watch.style.display = 'block';
    } else if (brand === 'other') {
      if (watchBrand === 'iwc' || watchBrand === 'omega' || watchBrand === 'longines') {
        watch.style.display = 'none';
      } else {
        watch.style.display = 'block';
      }
    } else {
      if (watchBrand === brand) {
        watch.style.display = 'block';
      } else {
        watch.style.display = 'none';
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const languageButton = document.getElementById("language-button");
  const languageDropdown = document.getElementById("language-dropdown");

  // Öffnet oder schließt das Dropdown
  languageButton.addEventListener("click", () => {
      languageDropdown.parentElement.classList.toggle("active");
  });

  // Wechselt die Sprache und aktualisiert die Anzeige
  const languageOptions = document.querySelectorAll(".language-dropdown li");
  languageOptions.forEach(option => {
      option.addEventListener("click", () => {
          const selectedLanguage = option.dataset.lang; // Gewählte Sprache
          const selectedFlag = option.querySelector("img").src; // Gewählte Flagge
          const selectedText = option.textContent.trim(); // Text der gewählten Sprache

          // Aktuell ausgewählte Sprache (vorherige Anzeige)
          const currentLanguage = languageButton.dataset.lang;
          const currentFlag = languageButton.querySelector("img").src;
          const currentText = languageButton.textContent.trim();

          // Aktualisiere die Anzeige des Buttons
          languageButton.innerHTML = `<img src="${selectedFlag}" alt="${selectedText}"> ${selectedText}`;
          languageButton.dataset.lang = selectedLanguage; // Speichere die aktuelle Sprache

          // Aktualisiere das Dropdown-Menü
          option.innerHTML = `<img src="${currentFlag}" alt="${currentText}"> ${currentText}`;
          option.dataset.lang = currentLanguage;

          // Schließe das Dropdown
          languageDropdown.parentElement.classList.remove("active");

          // Sprachwechsel-Logik hier einfügen (z. B. Nachladen der Seite oder Übersetzungen)
          console.log(`Sprache gewechselt zu: ${selectedLanguage}`);
      });
  });

  // Schließt das Dropdown, wenn außerhalb geklickt wird
  document.addEventListener("click", (e) => {
      if (!languageDropdown.parentElement.contains(e.target)) {
          languageDropdown.parentElement.classList.remove("active");
      }
  });
});
