const images = document.querySelectorAll('.watch-image');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentImageIndex = 0;

// Open lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImage.src = img.src;
    currentImageIndex = index;
  });
});

// Close lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navigate images
prevBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  lightboxImage.src = images[currentImageIndex].src;
});

nextBtn.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  lightboxImage.src = images[currentImageIndex].src;
});
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

const zoomBox = document.querySelector('.zoom-box');
const zoomedImage = document.querySelector('.zoomed-image');

lightboxImage.addEventListener('mousemove', (e) => {
  zoomBox.style.display = 'block';
  zoomedImage.src = lightboxImage.src;

  const rect = lightboxImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const percentX = x / rect.width;
  const percentY = y / rect.height;

  const zoomWidth = zoomedImage.width / 7;  // Breite des Zoom-Bildes halbieren für zentrierte Maus
  const zoomHeight = zoomedImage.height / 7; // Höhe ebenfalls halbieren

  zoomedImage.style.left = `-${percentX * zoomedImage.width - zoomWidth}px`;
  zoomedImage.style.top = `-${percentY * zoomedImage.height - zoomHeight}px`;
});

lightboxImage.addEventListener('mouseleave', () => {
  zoomBox.style.display = 'none';
});
