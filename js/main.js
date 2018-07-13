'use strict';

var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');

var listResults = document.querySelector('.main__results--list');

var seriesData;

var favoriteTVShow;
var selectedTVshow;
var tvMazeFavorites;


var body;

var searchResultLI;
var searchResultDIV;
var searchResultH2;
var searchResultText;
var searchResultImg;
var episodies;

buttonSubmit.addEventListener('click', searchIt);

function searchIt() {
  clearResults();

  getFromAPI(inputSearch.value);

  if (inputSearch.value === ':fav') {

    if ((localStorage.getItem('TVMaze-favorites')) === null || (localStorage.getItem('TVMaze-favorites') === '[]')) {
      var noFavorites = document.createTextNode('No tienes guardado ningún favorito.');
      listResults.appendChild(noFavorites);

    } else {
      seeFavoritesOnly();
    }

  } else {

    getFromAPI(inputSearch.value);
  }
}

function getFromAPI(text2Search) {

  fetch('https://api.tvmaze.com/search/shows?q=' + text2Search)

    .then(function(result) {

      return result.json();
    })

    .then(function(resultJSON) {

      for (var i = 0; i < resultJSON.length; i++) {


        episodies = resultJSON[i].show.id;
        var nameSeries = resultJSON[i].show.name;

        var searchResultLI = document.createElement('li');
        searchResultLI.classList.add('serie-LI');

        var searchResultDIV = document.createElement('div');
        searchResultDIV.classList.add('serie-DIV');

        var searchResultH2 = document.createElement('h2');
        searchResultH2.classList.add('serie-H2');

        var searchResultText = document.createTextNode(resultJSON[i].show.name);
        var searchResultImg = document.createElement('img');
        searchResultImg.classList.add('serie-IMG');

        if (resultJSON[i].show.image === null) {
          searchResultImg.src = noImage;
        } else {
          searchResultImg.src = resultJSON[i].show.image.medium;
        }

        getNumberEpisodies(nameSeries);

        searchResultDIV.appendChild(searchResultImg);
        searchResultH2.appendChild(searchResultText);
        searchResultDIV.appendChild(searchResultH2);
        // llamar función favorites() aquí y pasar el DIV como argumento
        searchResultLI.appendChild(searchResultDIV);
        listResults.append(searchResultLI);
      }
      favorites();

    });
}


function getNumberEpisodies(nameSeries) {

  fetch('https://api.tvmaze.com/shows/' + episodies + '/episodes')

    .then(function(result) {

      return result.json();
    })
    .then(function(episodiosJSON) {

      var numberEpisodies = episodiosJSON.length;
      console.log(nameSeries + ': ' + numberEpisodies);

    });


}


function favorites() {
  var allSeries = document.querySelectorAll('.serie-DIV');

  for (var i = 0; i < allSeries.length; i++) {
    allSeries[i].addEventListener('click', add2Favorites);
  }
}

function add2Favorites(event) {
  event.currentTarget.classList.toggle('favorite');
}

function clearResults() {
  var allResults = document.querySelectorAll('.serie-LI');
  console.log(allResults);
  for (var i = 0; i < allResults.length; i++) {
    allResults[i].remove();

  }
}

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
}