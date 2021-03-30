'use strict';

let header = document.querySelector('.header__container');
let navigationList = document.querySelector('.header__navigation-list');
let navigationButton = document.querySelector('.header__navigation-btn');
let navigationPhone = document.querySelector('.header__navigation-callus');

function hideNavigation() {
  navigationList.classList.toggle('header__navigation-list--opened');
  navigationPhone.classList.toggle('header__navigation-callus--opened');
  showMobileNavigation();
}

function showMobileNavigation() {
  header.classList.toggle('header__container--change-bg');
}

function hideMobileNavigation() {
  navigationList.classList.add('header__navigation-list--hide');
}

function init() {
  navigationButton.addEventListener('click', hideNavigation);
  hideMobileNavigation();
}

window.onload = init;
