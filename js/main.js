'use strict';

var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');

var listResults = document.querySelector('.main__results--list');
var seriesData;


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
  getFromAPI(inputSearch.value);
  console.log(inputSearch.value);
}


function getFromAPI(text2Search) {

  fetch('https://api.tvmaze.com/search/shows?q=' + text2Search)

    .then(function(result) {

      return result.json();
    })

    .then(function(resultJSON) {

      for (var i = 0; i < resultJSON.length; i++) {


        var searchResultLI = document.createElement('li');
        searchResultLI.classList.add('serie-LI');

        var searchResultDIV = document.createElement('div');
        searchResultDIV.classList.add('serie-DIV');
        searchResultDIV.setAttribute('data-id', resultJSON[i].show.id);
        searchResultDIV.setAttribute('data-rating', resultJSON[i].show.rating.average);
        searchResultDIV.setAttribute('data-summary', resultJSON[i].show.summary);


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

function favorites() {
  var allSeries = document.querySelectorAll('.serie-DIV');

  for (var i = 0; i < allSeries.length; i++) {
    allSeries[i].addEventListener('click', add2Favorites);
  }
}

var favoriteTVShow;
var selectedTVshow;

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
      var tvMazeFavorites =
        localStorage.getItem('TVMaze-favorites');
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
  alert(selectedID);

  var tvMazeFavorites =
    localStorage.getItem('TVMaze-favorites');
  tvMazeFavorites = JSON.parse(tvMazeFavorites);

  for (var i = 0; i < tvMazeFavorites.length; i++) {
    if (selectedID === tvMazeFavorites[i].id) {
      tvMazeFavorites.splice(i, 1);
      console.log(tvMazeFavorites);

    }
    // tvMazeFavorites = JSON.stringify(tvMazeFavorites);
    //
    // localStorage.setItem("TVMaze-favorites", tvMazeFavorites);
  }



}

function clearResults() {
  var allResults = document.querySelectorAll('.serie-LI');
  console.log(allResults);
  for (var i = 0; i < allResults.length; i++) {
    allResults[i].remove();
  }
}