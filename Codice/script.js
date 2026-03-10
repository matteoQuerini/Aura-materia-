const video = document.getElementById('bg-video');
const header = document.querySelector('header');
const siteBody = document.querySelector('.site-body');
let triggered = false;

function triggerReveal() {
    triggered = true;
    header.classList.add('moved');
    siteBody.classList.add('visible');
    setTimeout(initReveal, 900);
}

video.addEventListener('ended', () => {
    if (!triggered) triggerReveal();
    video.loop = true;
    video.play();
});

document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && !triggered) {
        triggerReveal();
        if (!video.ended) video.currentTime = video.duration;
    }
});

function initReveal() {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

document.querySelectorAll('.menu a, .nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        alert('Messaggio inviato con successo! Ti risponderemo presto.');
        contactForm.reset();
    });
}

document.addEventListener('scroll', () => {
    const images = document.querySelectorAll('.materiale-image img, .opera-image img');
    
    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrolled = window.scrollY;
        const yPos = (scrolled - rect.top) * 0.3;
    });
});

let lastScrollY = 0;
window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (lastScrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('opera-card')) {
                entry.target.classList.add('animate-in');
            }
            if (entry.target.classList.contains('testimonial-card')) {
                entry.target.classList.add('animate-in');
            }
        }
    });
}, { threshold: 0.2 });


document.querySelectorAll('.opera-card, .testimonial-card').forEach(card => {
    animationObserver.observe(card);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight &&
        rect.bottom > 0
    );
}
