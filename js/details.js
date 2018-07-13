'use strict'

/* global addTriggers */

// ------------ Variables globales (details.js)
var summaryContainer;


function addTriggers() { // exported addTriggers
  var i;
  var j;
  var summaryTrigger = document.querySelectorAll('.details__summary--box');
  var favoritesTrigger = document.querySelectorAll('.details__favorites--box');

  for (i = 0; i < summaryTrigger.length; i++) {
    summaryTrigger[i].addEventListener('click', showSummary);
  }

  for (j = 0; j < favoritesTrigger.length; j++) {
    // favoritesTrigger[j].addEventListener('click', favoriteIt);
    favoritesTrigger[j].addEventListener('click', add2Favorites);
  }
}


function showSummary(event) {
  summaryContainer = event.currentTarget.parentElement.parentElement.parentElement.children[1];
  summaryContainer.classList.add('summary__container-visible');
  setTimeout(removeSummary, 10000);
}

function removeSummary() {
  summaryContainer.classList.remove('summary__container-visible');
}

//
// function favoriteIt(event) {
//   event.currentTarget.firstChild.classList.toggle('fas');
//   event.currentTarget.firstChild.classList.toggle('far');
//   event.currentTarget.parentElement.parentElement.parentElement.classList.toggle('favorite');
//
//   if (event.currentTarget.parentElement.parentElement.parentElement.classList.contains('favorite')) {
//     event.currentTarget.children[1].innerHTML = 'Quitar de favoritos';
//   } else {
//     event.currentTarget.children[1].innerHTML = 'Añadir a favoritos';
//   }
// }