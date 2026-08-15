// --- LIGHTBOX PHOTO ---
function openLightbox(card) {
    const img = card.querySelector('img');
    const title = card.querySelector('.photo-title').textContent;
    const category = card.querySelector('.photo-category').textContent;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');

    lightboxImg.src = img.src;
    lightboxCaption.textContent = `${category} — ${title}`;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// --- MODAL CONTACT ---
function openContactModal() {
    document.getElementById('contactModal').classList.add('active');
}

function closeContactModal() {
    document.getElementById('contactModal').classList.remove('active');
}

// Fermeture avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeContactModal();
    }
});

// --- ENVOI FORMSPREE SANS REDIRECTION ---
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const btnSubmit = document.getElementById('btnSubmit');

form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Empêche l'ouverture du site Formspree

    btnSubmit.textContent = 'Envoi en cours...';
    btnSubmit.disabled = true;

    const data = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            status.style.color = '#4CAF50';
            status.textContent = '✓ Message envoyé avec succès !';
            form.reset();
            
            // Fermeture automatique de la fenêtre après 2 secondes
            setTimeout(() => {
                closeContactModal();
                status.textContent = '';
                btnSubmit.textContent = 'Envoyer le message';
                btnSubmit.disabled = false;
            }, 2000);
        } else {
            throw new Error();
        }
    } catch (error) {
        status.style.color = '#FF5252';
        status.textContent = 'Une erreur est survenue, veuillez réessayer.';
        btnSubmit.textContent = 'Envoyer le message';
        btnSubmit.disabled = false;
    }
});
// --- GESTION DE LA MODAL À PROPOS ---
function openAboutModal() {
    document.getElementById('aboutModal').classList.add('active');
}

function closeAboutModal() {
    document.getElementById('aboutModal').classList.remove('active');
}

// Mettez à jour la fermeture avec la touche Échap :
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
        closeContactModal();
        closeAboutModal();
    }
});