(function ($) {
  ("use strict");

  /* ============================================================ */
  /* PRELOADER
    /* ============================================================ */
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });

  // ==================Lightbox Popup ====================\\
  const lightbox = GLightbox();

  /* ==================== Animation ==================== */
  AOS.init({
    duration: 1500,
  });

  //=============  Mobile Menu Integration  =============\\
  //Clone Mobile Menu
  function cloneMobileMenu($cloneItem, $mobileLoc) {
    var $combinedmenu = $($cloneItem).clone();
    $combinedmenu.appendTo($mobileLoc);
  }
  cloneMobileMenu("header .header-bottom .main_menu", ".offcanvas__menu .menu");

  function mobile_menu(selector, actionSelector) {
    var mobile_menu = $(selector);
    mobile_menu.on("click", function () {
      $(selector).toggleClass("menu_active");
    });

    var hamburgerbtn = $(selector);
    hamburgerbtn.on("click", function () {
      $(actionSelector).toggleClass("menu_active");
    });

    $(document).on("click", function (e) {
      var selectorType = $(actionSelector).add(mobile_menu);
      if (
        selectorType.is(e.target) !== true &&
        selectorType.has(e.target).length === 0
      ) {
        $(actionSelector).removeClass("menu_active");
        $(selector).removeClass("menu_active");
      }
    });
  }
  mobile_menu(".navbar-toggler, .offcanvas__close", ".offcanvas__menu");
  $(".offcanvas__menu ul li.menu-item-has-children > a").on(
    "click",
    function () {
      var link = $(this);
      var closestUl = link.closest("ul");
      var parallelActiveLinks = closestUl.find(".active");
      var closestLi = link.closest("li");
      var linkStatus = closestLi.hasClass("active");
      var count = 0;

      closestUl.find("ul").slideUp(function () {
        if (++count == closestUl.find("ul").length)
          parallelActiveLinks.removeClass("active");
      });

      if (!linkStatus) {
        closestLi.children("ul").slideDown();
        closestLi.addClass("active");
      }
    }
  );

  // Add a scroll event listener to the window object
  var header = $("header");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 60) {
      header.addClass("sticky");
    } else {
      header.removeClass("sticky");
    }
  });

  // Homepage:: NEWS
  let newsSwiper = new Swiper("#newsSwiper", {
    loop: true,
    //autoplay: { delay: 4500, disableOnInteraction: false },
    speed: 650,
    spaceBetween: 16,
    pagination: { el: "#newsSwiper .swiper-pagination", clickable: true },
    /*navigation: {
      nextEl: "#newsSwiper .swiper-button-next",
      prevEl: "#newsSwiper .swiper-button-prev",
    },*/
  });

  // Homepage:: Upcoming Work Anniversaries
  let workAnnivSwiper = new Swiper("#workAnnivSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 20,
    allowTouchMove: true,
    navigation: {
      nextEl: ".work_card .qg_card_next",
      prevEl: ".work_card .qg_card_prev",
    },
    pagination: {
      el: ".work_card .qg_card_pagination",
      clickable: true,
    },
  });

  // Homepage:: Upcoming Work Anniversaries
  let comingBodSwiper = new Swiper("#comingBodSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 20,
    allowTouchMove: true,
    navigation: {
      nextEl: ".bod_card .qg_card_next",
      prevEl: ".bod_card .qg_card_prev",
    },
    pagination: {
      el: ".bod_card .qg_card_pagination",
      clickable: true,
    },
  });

  // Homepage:: Employees of the Month
  let empMonthSwiper = new Swiper("#empMonthSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 0,
    allowTouchMove: true,
    navigation: {
      nextEl: ".qg_emp_next",
      prevEl: ".qg_emp_prev",
    },
    pagination: {
      el: ".qg_emp_pagination",
      clickable: true,
    },
  });

  // Homepage:: PROMOS
  let offersSwiper = new Swiper("#offersSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 18,
    navigation: { nextEl: ".qg_off_next", prevEl: ".qg_off_prev" },
    pagination: { el: ".qg_off_pagination", clickable: true },
  });

  // Homepage::  Digital Voices Forum
  let dvfMainSwiper = new Swiper("#dvfMainSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 18,
    navigation: {
      nextEl: ".dvf_next",
      prevEl: ".dvf_prev",
    },
    pagination: {
      el: ".dvf_pagination",
      clickable: true,
    },
  });

  // Homepage:: Recently Uploaded Photos
  const photosSwiper = new Swiper("#recentPhotosSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 20,
    navigation: {
      nextEl: ".qg_photos_next",
      prevEl: ".qg_photos_prev",
    },
    breakpoints: {
      0: { slidesPerView: 1.15 },
      576: { slidesPerView: 2.15 },
      992: { slidesPerView: 4 },
    },
    watchOverflow: true,
  });

  const photosFill = document.getElementById("photosProgressFill");

  function updatePhotosProgress() {
    if (!photosFill) return;
    const total = Math.max(photosSwiper.snapGrid.length, 1);
    const index = Math.min(Math.max(photosSwiper.snapIndex + 1, 1), total);
    const pct = total === 1 ? 100 : (index / total) * 100;
    photosFill.style.width = `${Math.max(12, pct)}%`;
  }
  photosSwiper.on("slideChange", updatePhotosProgress);
  photosSwiper.on("resize", updatePhotosProgress);
  photosSwiper.on("breakpoint", updatePhotosProgress);
  updatePhotosProgress();

  // Homepage:: Discussion Forum
  const dfSwiper = new Swiper("#discussionSwiper", {
    loop: false,
    speed: 450,
    spaceBetween: 16,
    navigation: {
      nextEl: ".df_next",
      prevEl: ".df_prev",
    },
    watchOverflow: true,
  });

  const dfFill = document.getElementById("dfProgressFill");

  function updateDfProgress() {
    if (!dfFill) return;

    const total = Math.max(dfSwiper.snapGrid.length, 1);
    const index = Math.min(Math.max(dfSwiper.snapIndex + 1, 1), total);

    const pct = total === 1 ? 100 : (index / total) * 100;
    dfFill.style.width = `${Math.max(12, pct)}%`;
  }

  dfSwiper.on("slideChange", updateDfProgress);
  dfSwiper.on("resize", updateDfProgress);
  dfSwiper.on("breakpoint", updateDfProgress);
  updateDfProgress();

  // News Details HERO Swiper
  const mediaHeroSwiper = new Swiper(".media_hero_swiper", {
    loop: true,
    speed: 550,
    autoplay: {
      delay: 4200,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".media_hero_swiper .swiper-pagination",
      clickable: true,
    },
  });
})(jQuery);
