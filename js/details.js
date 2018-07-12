'use strict'



var summaryTrigger = document.querySelector('.details__summary--box');
var summaryContainer = document.querySelector('.details__container');
var favoritesTrigger = document.querySelector('.details__favorites--box');
var favoritesIcon = document.querySelector('.fa-star');

summaryTrigger.addEventListener('click', showSummary);
favoritesTrigger.addEventListener('click', favoriteIt);

function showSummary() {
  summaryContainer.classList.add('summary__container-visible');
  summaryContainer.innerHTML = summary;
  setTimeout(removeSummary, 10000);
}

function removeSummary() {
  summaryContainer.classList.remove('summary__container-visible');
}

function favoriteIt() {
  favoritesIcon.classList.toggle('fas');
  favoritesIcon.classList.toggle('far');
}