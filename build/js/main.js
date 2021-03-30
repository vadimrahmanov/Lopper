'use strict';

var header = document.querySelector('.header__container');
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
}

function hideMobileNavigation() {
  navigationList.classList.add('header__navigation-list--hide');
}

function init() {
  navigationButton.addEventListener('click', hideNavigation);
  hideMobileNavigation();
}

window.onload = init;