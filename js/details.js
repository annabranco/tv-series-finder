'use strict'

var summary = '<p>A mysterious event at the Sunshine Motel caused ordinary things in Room 10 to transform into indestructible objects with extraordinary powers. Detective Joe Miller discovers the dangerous potential of these objects when his daughter becomes lost in the room. His only hope of saving her is to find The Key, but shadowy figures will stop at nothing to keep it - and the other objects - for themselves.</p>';

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