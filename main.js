document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-ul-section ul li");
    const navLinks = document.querySelectorAll(".nav-ul-section ul li a");
    const mobileMenu = document.getElementById("mobile-menu");
    const navUlSection = document.querySelector(".nav-ul-section");
    const contactBtn = document.getElementById("nav-btn-contact");
    const sections = document.querySelectorAll("section, .about-me-section");

    // 1. Click Handler for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId.startsWith("#")) {
                e.preventDefault();

                // Remove active class from all items
                navItems.forEach(li => li.classList.remove("active"));

                // Add active class to clicked parent list item
                this.parentElement.classList.add("active");

                // Smooth Scroll to Target Section
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }

                // Close Mobile Menu if Open
                if (navUlSection.classList.contains("open")) {
                    navUlSection.classList.remove("open");
                    mobileMenu.classList.remove("is-active");
                }
            }
        });
    });

    // 2. Mobile Menu Toggle Action
    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            mobileMenu.classList.toggle("is-active");
            navUlSection.classList.toggle("open");
        });
    }

    // 3. Contact Button Action
    if (contactBtn) {
        contactBtn.addEventListener("click", () => {
            const contactSection = document.querySelector("#contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
            }
            if (navUlSection.classList.contains("open")) {
                navUlSection.classList.remove("open");
                mobileMenu.classList.remove("is-active");
            }
        });
    }

    // 4. Scroll-Spy: Auto Highlight Navigation Item on Mouse Scroll
    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (currentSectionId) {
            navItems.forEach(li => {
                li.classList.remove("active");
                const link = li.querySelector("a");
                if (link && link.getAttribute("href") === `#${currentSectionId}`) {
                    li.classList.add("active");
                }
            });
        }
    });
});




































const cards = document.querySelectorAll(".project-card");

const nextButton = document.querySelector(".next-btn");
const prevButton = document.querySelector(".prev-btn");

const dotsContainer = document.querySelector(".carousel-dots");

let currentIndex = 0;

let autoPlay;


/* =========================
   CREATE DOTS
========================= */

cards.forEach((card, index) => {

    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");

    dot.setAttribute(
        "aria-label",
        `Go to project ${index + 1}`
    );

    dot.addEventListener("click", () => {

        currentIndex = index;

        updateCarousel();

        restartAutoPlay();

    });

    dotsContainer.appendChild(dot);

});


const dots = document.querySelectorAll(".carousel-dot");


/* =========================
   UPDATE CAROUSEL
========================= */

function updateCarousel() {

    const total = cards.length;

    cards.forEach((card, index) => {

        let position = index - currentIndex;


        /*
        Makes the carousel circular.
        */

        if (position > total / 2) {

            position -= total;

        }

        if (position < -total / 2) {

            position += total;

        }


        /* =========================
           CENTER CARD
        ========================= */

        if (position === 0) {

            card.style.transform =
                "translateX(0) translateZ(180px) rotateY(0deg) scale(1)";

            card.style.opacity = "1";

            card.style.filter = "brightness(1)";

            card.style.zIndex = "10";

            card.classList.add("active");

        }


        /* =========================
           RIGHT CARD
        ========================= */

        else if (position === 1) {

            card.style.transform =
                "translateX(430px) translateZ(-100px) rotateY(-18deg) scale(.84)";

            card.style.opacity = ".75";

            card.style.filter =
                "brightness(.7)";

            card.style.zIndex = "5";

            card.classList.remove("active");

        }


        /* =========================
           LEFT CARD
        ========================= */

        else if (position === -1) {

            card.style.transform =
                "translateX(-430px) translateZ(-100px) rotateY(18deg) scale(.84)";

            card.style.opacity = ".75";

            card.style.filter =
                "brightness(.7)";

            card.style.zIndex = "5";

            card.classList.remove("active");

        }


        /* =========================
           FAR RIGHT
        ========================= */

        else if (position === 2) {

            card.style.transform =
                "translateX(760px) translateZ(-250px) rotateY(-30deg) scale(.65)";

            card.style.opacity = ".2";

            card.style.filter =
                "brightness(.4)";

            card.style.zIndex = "2";

            card.classList.remove("active");

        }


        /* =========================
           FAR LEFT
        ========================= */

        else if (position === -2) {

            card.style.transform =
                "translateX(-760px) translateZ(-250px) rotateY(30deg) scale(.65)";

            card.style.opacity = ".2";

            card.style.filter =
                "brightness(.4)";

            card.style.zIndex = "2";

            card.classList.remove("active");

        }


        /* =========================
           HIDDEN CARDS
        ========================= */

        else {

            card.style.transform =
                "translateX(0) translateZ(-400px) scale(.4)";

            card.style.opacity = "0";

            card.style.zIndex = "0";

            card.classList.remove("active");

        }

    });


    /* =========================
       UPDATE DOTS
    ========================= */

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentIndex
        );

    });

}


/* =========================
   NEXT
========================= */

function nextSlide() {

    currentIndex++;

    if (currentIndex >= cards.length) {

        currentIndex = 0;

    }

    updateCarousel();

}


/* =========================
   PREVIOUS
========================= */

function previousSlide() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex = cards.length - 1;

    }

    updateCarousel();

}


/* =========================
   BUTTON EVENTS
========================= */

nextButton.addEventListener(
    "click",
    () => {

        nextSlide();

        restartAutoPlay();

    }
);


prevButton.addEventListener(
    "click",
    () => {

        previousSlide();

        restartAutoPlay();

    }
);


/* =========================
   KEYBOARD CONTROL
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "ArrowRight") {

            nextSlide();

            restartAutoPlay();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();

            restartAutoPlay();

        }

    }
);


/* =========================
   AUTOPLAY
========================= */

function startAutoPlay() {

    autoPlay = setInterval(() => {

        nextSlide();

    }, 5000);

}


function stopAutoPlay() {

    clearInterval(autoPlay);

}


function restartAutoPlay() {

    stopAutoPlay();

    startAutoPlay();

}


/* =========================
   PAUSE ON HOVER
========================= */

const carousel = document.querySelector(".carousel");

carousel.addEventListener(
    "mouseenter",
    stopAutoPlay
);

carousel.addEventListener(
    "mouseleave",
    startAutoPlay
);


/* =========================
   INITIALIZE
========================= */

updateCarousel();

startAutoPlay();








/* =========================================================
   SERVICES SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =====================================================
   EDUCATION JOURNEY SCROLL ANIMATION
===================================================== */

const journeyElements =
    document.querySelectorAll(".reveal-journey");


const journeyObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


journeyElements.forEach((element) => {

    journeyObserver.observe(element);

});


/* =====================================================
   WHY WORK WITH ME - SCROLL REVEAL
===================================================== */

const approachElements =
    document.querySelectorAll(".approach-reveal");


const approachObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


approachElements.forEach((element) => {

    approachObserver.observe(element);

});



/* =====================================================
   CONTACT SCROLL REVEAL
===================================================== */

const contactElements =
    document.querySelectorAll(".contact-reveal");


const contactObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


contactElements.forEach((element) => {

    contactObserver.observe(element);

});



  
/* =====================================================
   CONTACT FORM ELEMENTS
===================================================== */

const contactForm = document.getElementById("contactForm");
const sendButton = document.getElementById("sendButton");
const formMessage = document.getElementById("formMessage");
const formTime = document.getElementById("formTime");


/* =====================================================
   CONTACT FORM SUBMIT
===================================================== */

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        /* Clear previous message */

        formMessage.textContent = "";
        formMessage.className = "form-message";


        /* Add current date and time */

        if (formTime) {
            formTime.value = new Date().toLocaleString();
        }


        /* Button loading state */

        sendButton.classList.add("loading");
        sendButton.disabled = true;


        /* =================================================
           SEND MESSAGE THROUGH EMAILJS
        ================================================= */

        emailjs.sendForm(

            "YOUR_SERVICE_ID",

            "YOUR_TEMPLATE_ID",

            contactForm

        )

        .then(function (response) {

            console.log(
                "Message sent successfully:",
                response.status,
                response.text
            );


            /* Remove loading */

            sendButton.classList.remove("loading");


            /* Success animation */

            sendButton.classList.add("success");


            /* Success message */

            formMessage.textContent =
                "Message sent successfully! I'll get back to you soon.";

            formMessage.classList.add(
                "success-message"
            );


            /* Clear form */

            contactForm.reset();


            /* Remove success state */

            setTimeout(function () {

                sendButton.classList.remove(
                    "success"
                );

                sendButton.disabled = false;

            }, 3500);

        })

        .catch(function (error) {

            console.error(
                "EmailJS Error:",
                error
            );


            /* Remove loading */

            sendButton.classList.remove(
                "loading"
            );


            /* Enable button again */

            sendButton.disabled = false;


            /* Error message */

            formMessage.textContent =
                "Message could not be sent. Please try again.";

            formMessage.classList.add(
                "error-message"
            );

        });

    });

}


 /* =====================================================
    BACK TO TOP
 ===================================================== */

const backToTop =
    document.getElementById("backToTop");


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);