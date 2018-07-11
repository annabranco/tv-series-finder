'use strict';

var noImage = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

var inputSearch = document.querySelector('.main__input--search');
var buttonSubmit = document.querySelector('.main__button--submit');

var listResults = document.querySelector('.main__results--list');
var littleStar;

buttonSubmit.addEventListener('click', searchIt);

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


        var detailsContainer = document.createElement('div');
        detailsContainer.classList.add('details__container');

        var detailsContainerOptions = document.createElement('div');
        detailsContainerOptions.classList.add('details__container--options');

        var detailsOptions = document.createElement('div');
        detailsOptions.classList.add('details--options');

        var detailsFavoritesBox = document.createElement('div');
        detailsFavoritesBox.classList.add('details__favorites--box');

        var iconFavorites = document.createElement('i');
        iconFavorites.classList.add('far', 'fa-star', 'details--icon');

        var detailsLegendFav = document.createElement('span');
        detailsLegendFav.classList.add('details--legend');
        var detailsLegendFavTXT = document.createTextNode('Añadir a favoritos');
        detailsLegendFav.appendChild(detailsLegendFavTXT);

        var detailsSummaryBox = document.createElement('div');
        detailsSummaryBox.classList.add('details__summary--box');

        var iconSummary = document.createElement('i');
        iconSummary.classList.add('fas', 'fa-info', 'details--icon');

        var detailsLegendSum = document.createElement('span');
        detailsLegendSum.classList.add('details--legend');
        var detailsLegendSumTXT = document.createTextNode('Sinopsis (inglés)');
        detailsLegendSum.appendChild(detailsLegendSumTXT);

        var detailsRatingBox = document.createElement('div');
        detailsRatingBox.classList.add('details__rating--box');

        var iconRating = document.createElement('i');
        iconRating.classList.add('fas', 'fa-smile', 'details--icon', 'details--icon-rating');

        var detailsLegendRat = document.createElement('span');
        detailsLegendRat.classList.add('details--legend');
        var detailsLegendRatTXT = document.createTextNode('Valoración TVMaze');
        detailsLegendRat.appendChild(detailsLegendRatTXT);

        var detailsRate = document.createElement('p');
        detailsRate.classList.add('details__rating--rate');

        var detailsLegendRatTXT = document.createTextNode('5.0');

        detailsRate.appendChild(detailsLegendRatTXT);

        detailsOptions.appendChild(detailsFavoritesBox);
        detailsOptions.appendChild(detailsSummaryBox);
        detailsOptions.appendChild(detailsRatingBox);
        detailsContainerOptions.appendChild(detailsOptions);


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
  event.currentTarget.firstChild.classList.toggle('visible');
}

function clearResults() {
  var allResults = document.querySelectorAll('.serie-LI');
  console.log(allResults);
  for (var i = 0; i < allResults.length; i++) {
    allResults[i].remove();
  }
}