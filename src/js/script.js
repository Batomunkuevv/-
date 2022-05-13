"use strict";

//*<Import>=====================================================================================================

import * as myFunctions from "./modules/functions.js";
import Swiper, { Navigation, Pagination, Scrollbar } from "swiper";

//*</Import>====================================================================================================

window.addEventListener("DOMContentLoaded", () => {
    //*<Web-p>=================================================================================================

    myFunctions.isWebp();

    //*</Web-p>=================================================================================================

    //*<Slider1>=================================================================================================

    new Swiper(".preparation-slider", {
        modules: [Navigation, Pagination, Scrollbar],
        simulateTouch: false,
        spaceBetween: 10,
        slidesPerGroup: 2,
        speed: 800,
        // effect: '', эффект смены слайдов
        // centeredSlides: true Делает 1 слайд по центру

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            320: {
                slidesPerView: 1.1,
            },
            480: {
                slidesPerView: 1.5,
            },
            992: {
                slidesPerView: 2.75,
            },
        },

        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
    });

    //*</Slider1>=================================================================================================

    //*<Slider2>=================================================================================================

    new Swiper(".how-slider", {
        modules: [Navigation, Pagination],
        // simulateTouch: false,
        slidesPerView: 1.05,
        spaceBetween: 10,
        speed: 800,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //*</Slider2>=================================================================================================

    //*<Slider3>=================================================================================================

    new Swiper(".howmany-slider", {
        modules: [Navigation, Pagination, Scrollbar],
        // simulateTouch: false,
        slidesPerView: 1.05,
        spaceBetween: 10,
        speed: 800,

        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
    });

    //*</Slider3>=================================================================================================

    //*<Slider4>=================================================================================================

    new Swiper(".menu-slider", {
        modules: [Navigation, Pagination],
        // simulateTouch: false,
        slidesPerView: 1.05,
        spaceBetween: 10,
        speed: 800,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    //*</Slider4>=================================================================================================

    //*<Burger>=================================================================================================

    const headerBurger = document.querySelector(".header__burger"),
        menuList = document.querySelector(".menu-header__list"),
        menuLink = menuList.querySelectorAll(".menu-header__link"),
        body = document.body;

    headerBurger.addEventListener("click", () => {
        headerBurger.classList.toggle("header__burger_active");
        menuList.classList.toggle("menu-header__list_active");
        menuLink.forEach((link) => {
            link.addEventListener("click", () => {
                headerBurger.classList.remove("header__burger_active");
                menuList.classList.remove("menu-header__list_active");
            });
        });
        body.classList.toggle("lock");
    });

    //*</Burger>=================================================================================================

    //*<Form-validate>=================================================================================================

    const forms = document.querySelectorAll("form");

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(e.target);
        let formData = new FormData(e.target); //! Вытягивание из полей

        if (error === 0) {
            e.target.classList.add("_sending");
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                e.target.reset();
                e.target.classList.remove("_sending");
            } else {
                alert("Ошибка");
                e.target.classList.remove("_sending");
            }
        } else {
        }
    }

    function formAddError(input) {
        input.classList.add("_error");
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    // function isIncorrectPhone(input) {
    //     return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    // }

    function formValidate(form) {
        let error = 0;

        let formReq = form.querySelectorAll("._req");

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];

            formRemoveError(input);

            if (input.value === "") {
                formAddError(input);
                error++;
            }
        }
        return error;
    }

    forms.forEach((form) => {
        form.addEventListener("submit", formSend);
    });

    //*</Form-validate>=================================================================================================

    //*<Poppap>=================================================================================================

    const images = document.querySelectorAll("[data-image]"),
        modalClose = document.querySelectorAll(".modal__close"),
        overlay = document.querySelector(".overlay"),
        modal = overlay.querySelector(".modal");

    function openModal() {
        overlay.classList.remove("hide");
        overlay.classList.add("fadeIn");
        modal.classList.remove("hide");
        modal.classList.add("fadeIn");
        document.body.style.cssText = "overflow: hidden";
    }

    function closeModal() {
        overlay.classList.add("hide");
        overlay.classList.remove("fadeIn");
        modal.classList.add("hide");
        document.body.style.cssText = "overflow: auto";
    }

    images.forEach((item) => {
        item.addEventListener("click", (e) => {
            const target = e.target;
            openModal();
            let imageSrc = target.getAttribute("src").replace(".jpg", "original.jpg");
            modal.style.cssText = `background: url('${imageSrc}') center / cover no-repeat;`;
        });
    });

    modalClose.forEach((item) => {
        item.addEventListener("click", () => {
            closeModal();
        });
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            closeModal();
        }
    });

    //*</Poppap>=================================================================================================
});

//*<Mask>=================================================================================================

$(document).ready(function () {
    $("._phone").mask("+7 999-999-99-99");

    //*<Scroll>=================================================================================================

    var $page = $("html, body");
    $('a[href*="#"]').click(function () {
        $page.animate(
            {
                scrollTop: $($.attr(this, "href")).offset().top,
            },
            1000
        );
        return false;
    });
    //*</Scroll>=================================================================================================
});

//*</Mask>=================================================================================================
