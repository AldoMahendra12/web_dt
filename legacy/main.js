// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Mobile menu toggle (placeholder for future expansion)
console.log('Dakwah Tulungagung site initialized.');

// Counter Animation for Achievements
const animateCounter = () => {
    const counter = document.getElementById('viewer-count-v2');
    if (!counter) return;

    const target = 2500000;
    const duration = 2500; // 2.5 seconds
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.innerText = target.toLocaleString('id-ID');
            clearInterval(timer);
        } else {
            counter.innerText = Math.floor(current).toLocaleString('id-ID');
        }
    }, stepTime);
};

// Arabic Text Shuffle Animation
const animateArabicText = () => {
    const target = document.getElementById('animated-hadith');
    if (!target) return;

    const originalText = target.innerText;
    const arabicChars = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي";
    let iterations = 0;
    
    const interval = setInterval(() => {
        target.innerText = originalText
            .split("")
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                if (char === " ") return " ";
                return arabicChars[Math.floor(Math.random() * arabicChars.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }

        iterations += 1/3;
    }, 30);
};

// Intersection Observer for animations
const observerOptions = { threshold: 0.2 };
const generalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('achievements-v2')) {
                animateCounter();
            } else if (entry.target.classList.contains('hadith-section-white')) {
                animateArabicText();
            }
            generalObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const achievementsSection = document.querySelector('.achievements-v2');
if (achievementsSection) generalObserver.observe(achievementsSection);

const hadithSection = document.querySelector('.hadith-section-white');
if (hadithSection) generalObserver.observe(hadithSection);
