let heroElement;
let heroImages;
let heroCurrentIndex = 0;
let heroSlideshowInterval;

function personalApp_init() {
    bindEvents();
    initSwiper();
    initHeroSlideshow();
}

function bindEvents() {
    // Smooth scrolling for navigation links
    $('.scroll-link').on('click', handleSmoothScroll);
}

function handleSmoothScroll(event) {
    if (this.hash !== "") {
        event.preventDefault();
        const hash = this.hash;

        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function () {
            window.location.hash = hash;
        });
    }
}

function initSwiper() {
    if (typeof Swiper !== "undefined") {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
        });
    } else {
        console.warn("Swiper is not loaded!");
    }
}

function initHeroSlideshow() {
    heroElement = document.getElementById("hero");
    if (!heroElement) return;

    heroImages = [
        "images/slideshow1.jpg",
        "images/slideshow2.jpg",
        "images/slideshow3.jpg",
        "images/slideshow4.jpg",
        "images/slideshow5.jpg"
    ];
    heroCurrentIndex = 0;

    // Initialize first background
    heroElement.style.backgroundImage = `url(${heroImages[0]})`;

    startHeroSlideshow();

    heroElement.addEventListener("mouseenter", stopHeroSlideshow);
    heroElement.addEventListener("mouseleave", startHeroSlideshow);
}

function changeHeroSlide() {
    heroCurrentIndex = (heroCurrentIndex + 1) % heroImages.length;
    heroElement.style.backgroundImage = `url(${heroImages[heroCurrentIndex]})`;
    heroElement.style.transition = "background-image 1s ease-in-out";
}

function startHeroSlideshow() {
    heroSlideshowInterval = setInterval(changeHeroSlide, 2500);
}

function stopHeroSlideshow() {
    clearInterval(heroSlideshowInterval);
}

// Run when DOM ready
$(document).ready(function () {
    personalApp_init();
});
