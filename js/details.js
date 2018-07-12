'use strict'

function addTriggers() {
  var summaryTrigger = document.querySelectorAll('.details__summary--box');
  // var summaryContainer = document.querySelectorAll('.details__container');
  var favoritesTrigger = document.querySelectorAll('.details__favorites--box');

  var favoritesIcon = document.querySelectorAll('.fa-star');


  for (var i = 0; i < summaryTrigger.length; i++) {
    summaryTrigger[i].addEventListener('click', showSummary);
  }

  for (var i = 0; i < favoritesTrigger.length; i++) {
    console.log(favoritesTrigger[i]);

    favoritesTrigger[i].addEventListener('click', favoriteIt);
  }
}

var summaryContainer;

function showSummary(event) {
  summaryContainer = event.currentTarget.parentElement.parentElement.parentElement.children[1];
  summaryContainer.classList.add('summary__container-visible');
  // summaryContainer.innerHTML = summaryContainer.childNodes[0].text;
  console.log(summaryContainer);

  setTimeout(removeSummary, 10000);
}

function removeSummary() {
  summaryContainer.classList.remove('summary__container-visible');
}

function favoriteIt(event) {
  event.currentTarget.firstChild.classList.toggle('fas');
  event.currentTarget.firstChild.classList.toggle('far');
  event.currentTarget.parentElement.parentElement.parentElement.classList.toggle('favorite');

  if (event.currentTarget.parentElement.parentElement.parentElement.classList.contains('favorite')) {
    event.currentTarget.children[1].innerHTML = 'Quitar de favoritos';
  } else {
    event.currentTarget.children[1].innerHTML = 'Añadir a favoritos';
  }

}