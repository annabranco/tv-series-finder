'use strict';

/* global addTriggers favorites seeFavoritesOnly  */

// ============================ DECLARACIONES GLOBALES


// ------------ Query Selectors
var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');
var listResults = document.querySelector('.main__results--list');
var body = document.querySelector('body');

// ------------ Variables globales
var tvMazeFavorites;
var selectedTVshow;
// ------------ Imagen de exhibición cuando la serie descargada no la tiene
var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
var noSummary = '<p>This Tv show has no summary</p>';


// ------------ Global event listeners
buttonSubmit.addEventListener('click', searchIt); // EL#1
body.addEventListener('keydown', enterKey);


// ------------ Funciones globales
function enterKey(event) {
  if (event.keyCode === 13) { // 13 es en código de "enter"
    buttonSubmit.click(); // Simula apretar el botón Buscar (buttonSubmit - EL#1) al presionar "enter"
  }
}


// ============================ BÚSQUEDA Y GESTIÓN DE LOS RESULTADOS


// ------------ Función principal de búsqueda. Activada por event listener (EL#1)
function searchIt() {
  var noFavoritesLI;
  var noFavorites;

  clearResults(); // Limpia los resultados anteriores. Función definida abajo.

  if (inputSearch.value === ':fav') { // Posibilita el usuario usar la string :fav para ver los favoritos

    if ((localStorage.getItem('TVMaze-favorites')) === null || (localStorage.getItem('TVMaze-favorites') === '[]')) {
      inputSearch.value = '';
      noFavoritesLI = document.createElement('li');
      noFavorites = document.createTextNode('No tienes guardado ningún favorito.');
      noFavoritesLI.appendChild(noFavorites);
      noFavoritesLI.classList.add('serie-LI');
      listResults.appendChild(noFavoritesLI);

    } else {
      seeFavoritesOnly(); // Enseña solo los favoritos. Función definida abajo.
    }

  } else {

    getFromAPI(inputSearch.value); // Función de búsqueda que pasa el valor del input como argumento
  }
}


// ------------ Función que hace la petición GET a la API

function getFromAPI(text2Search) {

  fetch('https://api.tvmaze.com/search/shows?q=' + text2Search) // Envía una petición con el valor del input

    .then(function(result) {

      return result.json(); // Convierte la respuesta en formato JSON
    })

    .then(function(resultJSON) {
      var searchResultLI;
      var searchResultDIV;
      var detailsContainer;
      var detailsContainerSummary;
      var detailsContainerOptions;
      var detailsOptions;
      var detailsFavoritesBox;
      var iconFavorites;
      var detailsLegendFav;
      var detailsLegendFavTXT;
      var detailsSummaryBox;
      var iconSummary;
      var detailsLegendSum;
      var detailsLegendSumTXT;
      var detailsRatingBox;
      var seriesRating;
      var seriesRatingIcon;
      var seriesRatingIconColor;
      var iconRating;
      var detailsLegendRat;
      var detailsLegendRatTXT;
      var detailsRate;
      var searchResultH2;
      var searchResultText;
      var searchResultImg;
      var i;
      var j;

      for (i = 0; i < resultJSON.length; i++) { // Pasa por todos los resultados retornados para crear un item LI en la pantalla para cada uno de los resultados

        searchResultLI = document.createElement('li');
        searchResultLI.classList.add('serie-LI');

        searchResultDIV = document.createElement('div');
        searchResultDIV.classList.add('serie-DIV');
        // Los data-... son añadidos al DIV para guardar informaciones sobre la serie en el propio código

        searchResultDIV.setAttribute('data-id', resultJSON[i].show.id);
        searchResultDIV.setAttribute('data-name', resultJSON[i].show.name);
        searchResultDIV.setAttribute('data-rating', resultJSON[i].show.rating.average);
        searchResultDIV.setAttribute('data-summary', resultJSON[i].show.summary);

        // Condicional para verificar si las series ya están añadidas como favoritas
        if ((localStorage.getItem('TVMaze-favorites')) === null || (localStorage.getItem('TVMaze-favorites') === '[]')) {} else {
          tvMazeFavorites = localStorage.getItem('TVMaze-favorites'); // Baja el localStorage
          tvMazeFavorites = JSON.parse(tvMazeFavorites); // Convierte el LS en formato objecto JavaScript

          for (j = 0; j < tvMazeFavorites.length; j++) { // Pasa por todos los DIVs creados y verifica si alguno de ellos ya está añadido a los favoritos (descargados del LS arriba)
            if (tvMazeFavorites[j].id === searchResultDIV.getAttribute('data-id')) {
              searchResultDIV.classList.add('favorite');
            }
          }
        }

        detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details__container');

        detailsContainerSummary;
        if (resultJSON[i].show.summary === null) {
          detailsContainerSummary = noSummary;
        } else {
          detailsContainerSummary = resultJSON[i].show.summary;
        }

        detailsContainer.innerHTML = detailsContainerSummary;

        detailsContainerOptions = document.createElement('div');
        detailsContainerOptions.classList.add('details__container--options');

        detailsOptions = document.createElement('div');
        detailsOptions.classList.add('details--options');

        detailsFavoritesBox = document.createElement('div');
        detailsFavoritesBox.classList.add('details__favorites--box');

        iconFavorites = document.createElement('i');
        iconFavorites.classList.add('far', 'fa-star', 'details--icon');

        detailsLegendFav = document.createElement('span');
        detailsLegendFav.classList.add('details--legend');
        detailsLegendFavTXT = document.createTextNode('Añadir a favoritos');
        detailsLegendFav.appendChild(detailsLegendFavTXT);

        detailsSummaryBox = document.createElement('div');
        detailsSummaryBox.classList.add('details__summary--box');

        iconSummary = document.createElement('i');
        iconSummary.classList.add('fas', 'fa-info', 'details--icon');

        detailsLegendSum = document.createElement('span');
        detailsLegendSum.classList.add('details--legend');
        detailsLegendSumTXT = document.createTextNode('Sinopsis (inglés)');
        detailsLegendSum.appendChild(detailsLegendSumTXT);

        detailsRatingBox = document.createElement('div');
        detailsRatingBox.classList.add('details__rating--box');

        seriesRating = resultJSON[i].show.rating.average;
        seriesRatingIcon;
        seriesRatingIconColor;

        if (seriesRating === null) {
          seriesRatingIcon = 'fa-meh-blank';
          seriesRatingIconColor = 'notrated-show';

        } else if (seriesRating < 4) {
          seriesRatingIcon = 'fa-angry';
          seriesRatingIconColor = 'bad-show';
        } else if (seriesRating >= 4 && seriesRating < 6) {
          seriesRatingIcon = 'fa-frown';
          seriesRatingIconColor = 'bad-show';

        } else if (seriesRating >= 6 && seriesRating < 7) {
          seriesRatingIcon = 'fa-meh-rolling-eyes';
          seriesRatingIconColor = 'notbad-show';

        } else if (seriesRating >= 7 && seriesRating < 8) {
          seriesRatingIcon = 'fa-smile';
          seriesRatingIconColor = 'good-show';

        } else if (seriesRating >= 8 && seriesRating < 9) {
          seriesRatingIcon = 'fa-laugh-beam';
          seriesRatingIconColor = 'good-show';

        } else if (seriesRating >= 9 && seriesRating <= 10) {
          seriesRatingIcon = 'fa-grin-hearts';
          seriesRatingIconColor = 'amazing-show';

        }

        iconRating = document.createElement('i');
        iconRating.classList.add('fas', seriesRatingIcon, 'details--icon', 'details--icon-rating', seriesRatingIconColor);

        detailsLegendRat = document.createElement('span');
        detailsLegendRat.classList.add('details--legend');
        detailsLegendRatTXT = document.createTextNode('Valoración TVMaze');
        detailsLegendRat.appendChild(detailsLegendRatTXT);

        detailsRate = document.createElement('p');
        detailsRate.classList.add('details__rating--rate', seriesRatingIconColor);

        detailsLegendRatTXT;
        if (seriesRating === null) {
          detailsLegendRatTXT = 'N/A';
        } else {
          detailsLegendRatTXT = resultJSON[i].show.rating.average;
        }

        detailsLegendRatTXT = document.createTextNode(detailsLegendRatTXT);

        detailsRate.appendChild(detailsLegendRatTXT);

        detailsOptions.appendChild(detailsFavoritesBox);
        detailsOptions.appendChild(detailsSummaryBox);
        detailsOptions.appendChild(detailsRatingBox);
        detailsContainerOptions.appendChild(detailsOptions);


        searchResultH2 = document.createElement('h2');
        searchResultH2.classList.add('serie-H2');

        searchResultText = document.createTextNode(resultJSON[i].show.name);
        searchResultImg = document.createElement('img');
        searchResultImg.classList.add('serie-IMG');

        if (resultJSON[i].show.image === null) {
          searchResultImg.src = noImage;
        } else {
          searchResultImg.src = resultJSON[i].show.image.medium;
          searchResultDIV.setAttribute('data-image', searchResultImg.src);
        }

        searchResultDIV.appendChild(searchResultImg);
        searchResultDIV.appendChild(detailsContainer);
        searchResultDIV.appendChild(detailsContainerOptions);
        detailsFavoritesBox.appendChild(iconFavorites);

        detailsFavoritesBox.appendChild(detailsLegendFav);

        detailsOptions.appendChild(detailsFavoritesBox);

        detailsSummaryBox.appendChild(iconSummary);
        detailsSummaryBox.appendChild(detailsLegendSum);

        detailsOptions.appendChild(detailsSummaryBox);

        detailsRatingBox.appendChild(iconRating);
        detailsRatingBox.appendChild(detailsLegendRat);
        detailsRatingBox.appendChild(detailsRate);

        detailsOptions.appendChild(detailsRatingBox);

        detailsContainerOptions.appendChild(detailsOptions);

        searchResultH2.appendChild(searchResultText);
        searchResultDIV.appendChild(searchResultH2);
        searchResultLI.appendChild(searchResultDIV);
        listResults.append(searchResultLI);

      }
      addTriggers();
      // favorites(); // Llama función para añadir Event Listeners a los DIV para gestión de favoritos. Definida en favoritos.js

    });
}


// ------------ Función para limpiar los resultados. Es accionada a cada nueva búsqueda.
function clearResults() {
  var allResults;
  var i;

  allResults = document.querySelectorAll('.serie-LI');
  for (i = 0; i < allResults.length; i++) {
    allResults[i].remove();
  }
}