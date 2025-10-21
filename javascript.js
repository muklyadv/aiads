document.addEventListener('DOMContentLoaded', function() {
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            // Deactivate all triggers
            tabTriggers.forEach(t => t.classList.remove('active'));
            // Deactivate all content
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate the clicked trigger
            this.classList.add('active');
            
            // Activate the corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});

// --- Carousel Logic for Social Trust Section ---
const carousel = document.querySelector('#social-trust-section');
if (carousel) {
    const leftBtn = carousel.querySelector('.carousel-arrow.left');
    const rightBtn = carousel.querySelector('.carousel-arrow.right');
    const slidesContainer = carousel.querySelector('.carousel-slides-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const heading = carousel.querySelector('#carousel-main-heading');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    const updateCarousel = () => {
        // Move the slides container
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update the heading
        if (currentIndex === 0) {
            heading.textContent = "Branded Ads";
        } else {
            heading.textContent = "Cinematic Ads";
        }

        // Update button states
        leftBtn.disabled = currentIndex === 0;
        rightBtn.disabled = currentIndex >= totalSlides - 1;
    };

    rightBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    leftBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Initialize the carousel state
    updateCarousel();
}

// --- Veo 3.1 Style Video Carousel Logic (Revised) ---
const veoCarousel = document.getElementById('veo-carousel');
if (veoCarousel) {
    const slidesContainer = veoCarousel.querySelector('.veo-slides-container');
    const slides = veoCarousel.querySelectorAll('.veo-slide');
    const dots = veoCarousel.querySelectorAll('.veo-dot');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Drag-to-scroll functionality
    slidesContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        slidesContainer.classList.add('active');
        startX = e.pageX - slidesContainer.offsetLeft;
        scrollLeft = slidesContainer.scrollLeft;
    });

    slidesContainer.addEventListener('mouseleave', () => {
        isDown = false;
        slidesContainer.classList.remove('active');
    });

    slidesContainer.addEventListener('mouseup', () => {
        isDown = false;
        slidesContainer.classList.remove('active');
    });

    slidesContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slidesContainer.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        slidesContainer.scrollLeft = scrollLeft - walk;
    });

    // Update active slide and dots based on scroll position
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const slideIndex = Array.from(slides).indexOf(entry.target);
            const dot = dots[slideIndex];
            
            if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
                entry.target.classList.add('is-in-view');
                dot.classList.add('active');
                entry.target.querySelector('video').play();
            } else {
                entry.target.classList.remove('is-in-view');
                dot.classList.remove('active');
                entry.target.querySelector('video').pause();
            }
        });
    }, {
        root: slidesContainer,
        threshold: 0.75 // 75% of the slide must be visible
    });

    slides.forEach(slide => observer.observe(slide));

    // Clicking dots scrolls to the slide
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            slides[slideIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });
}
