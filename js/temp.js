'use strict';

// ============================ DECLARACIONES GLOBALE∫S

// ------------ Query Selectors
var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');
var listResults = document.querySelector('.main__results--list');
var body = document.querySelector('body');

// ------------ Variables globales
var favoriteTVShow;
var selectedTVshow;
var tvMazeFavorites;
var searchResultLI;
var searchResultDIV;
var searchResultH2;
var searchResultText;
var searchResultImg;
var noFavorites;
var noFavoritesLI;

// ------------ Imagen de exhibición cuando la serie descargada no la tiene
var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

// ------------ Global event listeners
buttonSubmit.addEventListener('click', searchIt); // EL#1
body.addEventListener('keydown', enterKey);

// ------------ Funciones globales
function enterKey(event) {
  if (event.keyCode === 13) { // 13 es en código de "enter"
    buttonSubmit.click(); // Simula apretar el botón Buscar (EL#1) al presionar "enter"
  }
}


// ============================ BÚSQUEDA Y GESTIÓN DE LOS RESULTADOS

// ------------ Función principal de búsqueda. Activada por event listener (EL#1)
function searchIt() {

  clearResults(); // Limpia los resultados anteriores. Función definida abajo.

  if (inputSearch.value === ':fav') { // Posibilita el usuario usar la string :fav para ver los favoritos

    if ((localStorage.getItem('TVMaze-favorites')) === null || (localStorage.getItem('TVMaze-favorites') === '[]')) {
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
      var i;
      var j;

      for (i = 0; i < resultJSON.length; i++) { // Pasa por todos los resultados retornados para crear un item LI en la pantalla para cada uno de los resultados

        searchResultLI = document.createElement('li');
        searchResultLI.classList.add('serie-LI');

        searchResultDIV = document.createElement('div');
        searchResultDIV.classList.add('serie-DIV');
        // Los data-... son añadidos al DIV para guardar informaciones sobre la serie en el propio código
        searchResultDIV.setAttribute('data-id', resultJSON[i].show.id);
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
        searchResultH2.appendChild(searchResultText);
        searchResultDIV.appendChild(searchResultH2);
        searchResultLI.appendChild(searchResultDIV);
        listResults.append(searchResultLI);
      }
      favorites(); // Llama función para añadir Event Listeners a los DIV para gestión de favoritos. Definida abajo.

    });
}

// ------------ Función para limpiar los resultados. Es accionada a cada nueva búsqueda.
function clearResults() {
  var i;
  var allResults = document.querySelectorAll('.serie-LI');
  for (i = 0; i < allResults.length; i++) {
    allResults[i].remove();
  }
}


// ============================ GESTIÓN DE LOS FAVORITOS

// ------------ Función que añade Event Listeners a todos los DIVs ya creados
function favorites() {
  var i;
  var allSeries = document.querySelectorAll('.serie-DIV');

  for (i = 0; i < allSeries.length; i++) {
    allSeries[i].addEventListener('click', add2Favorites);
  }
}


// ------------ Función que gestiona los favoritos (guarda y recoge sus datos en localStorage)
function add2Favorites(event) {
  event.currentTarget.classList.toggle('favorite');

  selectedTVshow = event.currentTarget;

  // El IF está invertido porque añadi un toggle antes. Así que si el elemento tiene en ese momento la clase 'favorite' es porque acabó de recibirla y no está todavía guardada en el localStorage
  if (event.currentTarget.classList.contains('favorite')) {
    favoriteTVShow = {
      'id': event.currentTarget.getAttribute('data-id'),
      'name': event.currentTarget.children[1].innerHTML,
      'rating': event.currentTarget.getAttribute('data-rating'),
      'summary': event.currentTarget.getAttribute('data-summary'),
      'image': event.currentTarget.getAttribute('data-image')
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
  var z;

  tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
  tvMazeFavorites = JSON.parse(tvMazeFavorites);

  for (z = 0; z < tvMazeFavorites.length; z++) {


    searchResultLI = document.createElement('li');
    searchResultLI.classList.add('serie-LI');

    searchResultDIV = document.createElement('div');
    searchResultDIV.classList.add('serie-DIV');
    searchResultDIV.setAttribute('data-id', tvMazeFavorites[z].id);
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
