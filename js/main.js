'use strict';

var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');

var listResults = document.querySelector('.main__results--list');


buttonSubmit.addEventListener('click', searchIt);

function searchIt() {
  getFromAPI(inputSearch.value);
  console.log(inputSearch.value);
}


function getFromAPI(text2Search) {

  fetch('http://api.tvmaze.com/search/shows?q=' + text2Search)

    .then(function(result) {

      return result.json();
    })

    .then(function(resultJSON) {

      for (var i = 0; i < resultJSON.length; i++) {


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


function add2Favorites(event) {
  event.currentTarget.classList.toggle('favorite');
}


// -------------------- TEST AREA


var tryIt = document.querySelector('.try');

tryIt.addEventListener('click', tryResult);


function tryResult() {

  var testeLS = localStorage.getItem('TVMaze-search');
  testeLS = JSON.parse(testeLS);

  for (var i = 0; i < testeLS.length; i++) {

    var searchResultDIV = document.createElement('div');
    var searchResultText = document.createTextNode(testeLS[i].show.name);

    searchResultDIV.appendChild(searchResultText);


    fieldResults.append(searchResultDIV);

  }


}