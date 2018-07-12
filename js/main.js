'use strict';

var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');

var listResults = document.querySelector('.main__results--list');
var seriesData;
var favoriteTVShow;
var selectedTVshow;
var tvMazeFavorites;
<<<<<<< HEAD
var body;
<<<<<<< HEAD
=======
var searchResultLI;
var searchResultDIV;
var searchResultH2;
var searchResultText;
var searchResultImg;
>>>>>>> parent of fa0a7ce... Fix: show only favorites
=======
>>>>>>> parent of e49c518... Enhanc: cleaning the code

buttonSubmit.addEventListener('click', searchIt);


var body = document.querySelector('body');

body.addEventListener('keydown', enterKey);

function enterKey(event) {
  if (event.keyCode === 13) {
    buttonSubmit.click();
  }
}

function searchIt() {
  clearResults();
<<<<<<< HEAD
  getFromAPI(inputSearch.value);
  console.log(inputSearch.value);
}

=======

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
>>>>>>> parent of fa0a7ce... Fix: show only favorites

function getFromAPI(text2Search) {

  fetch('https://api.tvmaze.com/search/shows?q=' + text2Search)

    .then(function(result) {

      return result.json();
    })

    .then(function(resultJSON) {

      for (var i = 0; i < resultJSON.length; i++) {

<<<<<<< HEAD
=======

      for (i = 0; i < resultJSON.length; i++) {

>>>>>>> parent of fa0a7ce... Fix: show only favorites

        var searchResultLI = document.createElement('li');
        searchResultLI.classList.add('serie-LI');

        var searchResultDIV = document.createElement('div');
        searchResultDIV.classList.add('serie-DIV');
        searchResultDIV.setAttribute('data-id', resultJSON[i].show.id);
        searchResultDIV.setAttribute('data-rating', resultJSON[i].show.rating.average);
        searchResultDIV.setAttribute('data-summary', resultJSON[i].show.summary);

        if ((localStorage.getItem('TVMaze-favorites')) === null || (localStorage.getItem('TVMaze-favorites') === '[]')) {

        } else {
          tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
          tvMazeFavorites = JSON.parse(tvMazeFavorites);
          console.log(tvMazeFavorites.length);

          for (var j = 0; j < tvMazeFavorites.length; j++) {
            if (tvMazeFavorites[j].id === searchResultDIV.getAttribute('data-id')) {
              searchResultDIV.classList.add('favorite');
            }
          }
        }


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

        searchResultDIV.appendChild(searchResultImg);
        searchResultH2.appendChild(searchResultText);
        searchResultDIV.appendChild(searchResultH2);
        searchResultLI.appendChild(searchResultDIV);
        listResults.append(searchResultLI);
      }
      favorites();

    });
}

<<<<<<< HEAD
=======

>>>>>>> parent of fa0a7ce... Fix: show only favorites
function favorites() {
  var allSeries = document.querySelectorAll('.serie-DIV');

  for (var i = 0; i < allSeries.length; i++) {
    allSeries[i].addEventListener('click', add2Favorites);
  }
}



function add2Favorites(event) {
  event.currentTarget.classList.toggle('favorite');

  selectedTVshow = event.currentTarget;

  if (event.currentTarget.classList.contains('favorite')) {
    favoriteTVShow = {
      'id': event.currentTarget.getAttribute('data-id'),
      'name': event.currentTarget.children[1].innerHTML,
      'rating': event.currentTarget.getAttribute('data-rating'),
      'summary': event.currentTarget.getAttribute('data-summary')
    };

    if (localStorage.getItem('TVMaze-favorites') === null) {

      tvMazeFavorites = [];

    } else {
      tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
      tvMazeFavorites = JSON.parse(tvMazeFavorites);
    }

    tvMazeFavorites.push(favoriteTVShow);
    console.log(tvMazeFavorites);

    tvMazeFavorites = JSON.stringify(tvMazeFavorites);
    console.log(tvMazeFavorites);

    localStorage.setItem('TVMaze-favorites', tvMazeFavorites);
  } else {

    checkFavorites();

  }
}

function checkFavorites() {
  var selectedID = selectedTVshow.getAttribute('data-id');

  tvMazeFavorites = localStorage.getItem('TVMaze-favorites');
  tvMazeFavorites = JSON.parse(tvMazeFavorites);

  for (var i = 0; i < tvMazeFavorites.length; i++) {
    if (selectedID === tvMazeFavorites[i].id) {
      console.log(tvMazeFavorites[i]);
      tvMazeFavorites.splice(i, 1);
      console.log(tvMazeFavorites);
    }

    localStorage.setItem('TVMaze-favorites', JSON.stringify(tvMazeFavorites));
  }

}

function clearResults() {
  var allResults = document.querySelectorAll('.serie-LI');
  console.log(allResults);
  for (var i = 0; i < allResults.length; i++) {
    allResults[i].remove();
<<<<<<< HEAD
=======
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
>>>>>>> parent of fa0a7ce... Fix: show only favorites
  }
}