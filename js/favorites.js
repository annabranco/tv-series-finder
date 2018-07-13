'use strict';

/* global  tvMazeFavorites:true  selectedTVshow:true noImage:true seeFavoritesOnly listResults:true  */


// ============================ GESTIÓN DE LOS FAVORITOS

// ------------ Función que añade Event Listeners a todos los DIVs ya creados
// function favorites() {
//   var i;
//   var allSeries = document.querySelectorAll('.serie-DIV');
//
//   for (i = 0; i < allSeries.length; i++) {
//     allSeries[i].addEventListener('click', add2Favorites);
//   }
// }


// ------------ Función que gestiona los favoritos (guarda y recoge sus datos en localStorage)
function add2Favorites(event) {
  var favoriteTVShow;

  selectedTVshow = event.currentTarget.parentElement.parentElement.parentElement;

  selectedTVshow.classList.toggle('favorite');

  console.log(event.currentTarget.firstChild);
  event.currentTarget.firstChild.classList.toggle('fas');
  event.currentTarget.firstChild.classList.toggle('far');


  // El IF está invertido porque añadi un toggle antes. Así que si el elemento tiene en ese momento la clase 'favorite' es porque acabó de recibirla y no está todavía guardada en el localStorage
  if (selectedTVshow.classList.contains('favorite')) {

    event.currentTarget.children[1].innerHTML = 'Quitar de favoritos';


    favoriteTVShow = {
      'id': selectedTVshow.getAttribute('data-id'),
      'name': selectedTVshow.getAttribute('data-name'),
      'rating': selectedTVshow.getAttribute('data-rating'),
      'summary': selectedTVshow.getAttribute('data-summary'),
      'image': selectedTVshow.getAttribute('data-image')
    };

    if (localStorage.getItem('TVMaze-favorites') === null) {

      tvMazeFavorites = [];

    } else {
      tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
      tvMazeFavorites = JSON.parse(tvMazeFavorites);
    }



    tvMazeFavorites.push(favoriteTVShow);

    tvMazeFavorites = JSON.stringify(tvMazeFavorites);

    localStorage.setItem('TVMaze-favorites', tvMazeFavorites);
  } else {

    event.currentTarget.children[1].innerHTML = 'Añadir a favoritos';

    checkFavorites(); // Si se hace click en una serie ya marcada como favorita. Función definida abajo.

  }
}

// ------------ Función que verifica si una serie buscada ya había sido añadida a los favoritos
// Si la serie ya era favorita y se hace click otra vez en ella, la misma es removida de los favoritos
function checkFavorites() {
  var i;
  var selectedID = selectedTVshow.getAttribute('data-id');

  tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
  tvMazeFavorites = JSON.parse(tvMazeFavorites);

  for (i = 0; i < tvMazeFavorites.length; i++) {
    if (selectedID === tvMazeFavorites[i].id) {
      tvMazeFavorites.splice(i, 1);
    }

    localStorage.setItem('TVMaze-favorites', JSON.stringify(tvMazeFavorites));
  }

}

// ------------ Función para ver solo los favoritos como resultado de búsqueda
function seeFavoritesOnly() {
  var searchResultLI;
  var searchResultDIV;
  var searchResultH2;
  var searchResultText;
  var searchResultImg;
  var z;

  tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
  tvMazeFavorites = JSON.parse(tvMazeFavorites);

  for (z = 0; z < tvMazeFavorites.length; z++) {


    searchResultLI = document.createElement('li');
    searchResultLI.classList.add('serie-LI');

    searchResultDIV = document.createElement('div');
    searchResultDIV.classList.add('serie-DIV');
    searchResultDIV.setAttribute('data-id', tvMazeFavorites[z].id);
    searchResultDIV.setAttribute('data-name', tvMazeFavorites[z].name);
    searchResultDIV.setAttribute('data-rating', tvMazeFavorites[z].rating);
    searchResultDIV.setAttribute('data-summary', tvMazeFavorites[z].summary);
    searchResultDIV.classList.add('favorite');


    searchResultH2 = document.createElement('h2');
    searchResultH2.classList.add('serie-H2');

    searchResultText = document.createTextNode(tvMazeFavorites[z].name);
    searchResultImg = document.createElement('img');
    searchResultImg.classList.add('serie-IMG');

    if (tvMazeFavorites[z].image === null) {
      searchResultImg.src = noImage;
    } else {
      searchResultImg.src = tvMazeFavorites[z].image;
    }

    searchResultDIV.appendChild(searchResultImg);
    searchResultH2.appendChild(searchResultText);
    searchResultDIV.appendChild(searchResultH2);
    searchResultLI.appendChild(searchResultDIV);
    listResults.append(searchResultLI);
  }
  favorites();
}