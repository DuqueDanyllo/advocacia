/* =========================================================
   MODELO 1 — ADVOCACIA
   JavaScript nativo
========================================================= */

"use strict";


/* =========================================================
   HEADER AO ROLAR
========================================================= */

const header = document.getElementById("siteHeader");

function updateHeader() {

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", updateHeader);

updateHeader();


/* =========================================================
   SCROLL SUAVE
========================================================= */

const anchorLinks = document.querySelectorAll(
    'a[href^="#"]'
);

anchorLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (
            !targetId ||
            targetId === "#" ||
            !document.querySelector(targetId)
        ) {
            return;
        }

        event.preventDefault();

        const target = document.querySelector(targetId);

        const headerHeight = header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });


        /* Fecha o menu mobile após clicar */

        const navbarCollapse =
            document.getElementById("mainNavbar");

        if (
            navbarCollapse &&
            navbarCollapse.classList.contains("show")
        ) {

            const bsCollapse =
                bootstrap.Collapse.getInstance(navbarCollapse);

            if (bsCollapse) {
                bsCollapse.hide();
            }

        }

    });

});


/* =========================================================
   ANIMAÇÃO DE ENTRADA
========================================================= */

const animatedElements =
    document.querySelectorAll(".reveal, .reveal-card");


const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -50px 0px"
};


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        observerOptions
    );


animatedElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   EFEITO INTERATIVO NOS CARDS
========================================================= */

const cards =
    document.querySelectorAll(".service-card");


cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -2;

        const rotateY =
            ((x - centerX) / centerX) * 2;

        card.style.transform = `
            translateY(-8px)
            perspective(700px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   VALIDAÇÃO VISUAL DE CTAs
========================================================= */

const whatsappButtons =
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );


whatsappButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const originalContent =
            this.innerHTML;

        this.classList.add("cta-clicked");

        this.innerHTML = `
            <i class="bi bi-check2"></i>
            Abrindo WhatsApp...
        `;


        setTimeout(() => {

            this.innerHTML = originalContent;

            this.classList.remove("cta-clicked");

        }, 1800);

    });

});


/* =========================================================
   ANO AUTOMÁTICO DO RODAPÉ
========================================================= */

const yearElement =
    document.getElementById("currentYear");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   EFEITO DE ENTRADA INICIAL
========================================================= */

window.addEventListener("load", () => {

    const initialElements =
        document.querySelectorAll(
            ".hero-section .reveal"
        );

    initialElements.forEach((element, index) => {

        setTimeout(() => {

            element.classList.add("visible");

        }, 150 + (index * 120));

    });

});