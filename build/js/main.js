/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
'use strict';

(function () {
  var header = document.querySelector('.header__container');
  var body = document.querySelector('body');
  var navigationList = document.querySelector('.header__navigation-list');
  var navigationButton = document.querySelector('.header__navigation-btn');
  var navigationPhone = document.querySelector('.header__navigation-callus');

  function hideNavigation() {
    navigationList.classList.toggle('header__navigation-list--opened');
    navigationPhone.classList.toggle('header__navigation-callus--opened');
    showMobileNavigation();
  }

  function showMobileNavigation() {
    header.classList.toggle('header__container--change-bg');
    body.classList.toggle('nav-opened');
    navigationButton.classList.toggle('header__navigation-btn--opened');
  }

  function hideMobileNavigation() {
    navigationList.classList.add('header__navigation-list--hide');
  }

  function init() {
    navigationButton.addEventListener('click', hideNavigation);
    hideMobileNavigation();
  }

  var swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
      renderCustom: function renderCustom(_swiper, current, total) {
        return current + '/' + total;
      }
    },
    loop: true,
    navigation: {
      nextEl: '.swiper-button__btn--next',
      prevEl: '.swiper-button__btn--prev'
    },
    breakpoints: {
      1024: {
        allowTouchMove: false,
        slidesPerView: 1,
        spaceBetween: 1
      },
      768: {
        allowTouchMove: true
      },
      320: {
        spaceBetween: 2
      }
    }
  });
  var swiperSubscription = new Swiper('.subscription__slider-container', {
    loop: true,
    navigation: {
      nextEl: '.swiper-buttons__btn--next',
      prevEl: '.swiper-buttons__btn--prev'
    },
    breakpoints: {
      1024: {
        allowTouchMove: false,
        slidesPerView: 1
      },
      768: {
        pagination: false
      },
      320: {
        pagination: {
          el: '.swiper-pagination-subscription',
          type: 'custom',
          renderCustom: function renderCustom(_swiper, current, total) {
            return current + ' of ' + total;
          }
        }
      }
    }
  });
  window.onload = init;
})();