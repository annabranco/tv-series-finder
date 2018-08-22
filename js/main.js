'use strict';

/* global addTriggers seeFavoritesOnly  */

// ============================ DECLARACIONES GLOBALES


// ------------ Query Selectors
const inputSearch = document.querySelector('.header__input--search');
const buttonSubmit = document.querySelector('.header__button--submit');
const listResults = document.querySelector('.main__results--list');
const seeCredits = document.querySelector('.footer__credits--text');
const creditsBox = document.querySelector('.footer__credits--details');
const seeCreditsBox = document.querySelector('.footer__credits--text-box');
const body = document.querySelector('body');

// ------------ Variables globales
let favoriteSeries;
// ------------ Imagen de exhibición cuando la serie descargada no la tiene
const noImage = 'https://via.placeholder.com/210x295/584f66/ffffff/?text=no%20image';
const noSummary = '<p>This Tv show has no summary</p>';


// ------------ Global event listeners
buttonSubmit.addEventListener('click', searchIt); // EL#1
inputSearch.addEventListener('mouseover', changePlaceholder);
inputSearch.addEventListener('mouseout', changePlaceholder);
seeCredits.addEventListener('click', showCredits);
body.addEventListener('keydown', enterKey);


// ------------ Funciones globales
function enterKey(event) {
	if (event.keyCode === 13) { // 13 es en código de "enter"
		buttonSubmit.click(); // Simula apretar el botón Buscar (buttonSubmit - EL#1) al presionar "enter"
	}
}

function changePlaceholder(event) {
	if ( event.currentTarget.placeholder === '' ) {
		event.currentTarget.placeholder = ':fav for favorites only';
	} else {
		event.currentTarget.placeholder = '';
	}
}

// ============================ WALLPAPERS aleatorios

function changeWallpaper() {
	const mainBackground = document.querySelector('.main__inner');
	const wallpaperNumber = Math.floor(Math.random() * 10);

	mainBackground.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7),rgb(0, 0, 0)), url('images/wallpapers/${wallpaperNumber}.jpg')`;
}

changeWallpaper();


// ============================ BÚSQUEDA Y GESTIÓN DE LOS RESULTADOS


// ------------ Función principal de búsqueda. Activada por event listener (EL#1)
function searchIt() {
	let noFavoritesLI;
	let noFavorites;

	clearResults(); // Limpia los resultados anteriores. Función definida abajo.

	if (inputSearch.value.toLowerCase() === ':fav') { // Posibilita el usuario usar la string :fav para ver los favoritos

		if ((localStorage.getItem('AB TV Series finder favorites')) === null || (localStorage.getItem('AB TV Series finder favorites') === '[]')) {
			inputSearch.value = '';
			noFavoritesLI = document.createElement('li');
			noFavorites = document.createTextNode("You still don't have any favorites");
			noFavoritesLI.appendChild(noFavorites);
			noFavoritesLI.classList.add('serie-LI','no-favorites');
			listResults.appendChild(noFavoritesLI);

		} else {
			seeFavoritesOnly(); // Enseña solo los favoritos. Función definida en favorites.js
		}

	} else {

		getFromAPI(inputSearch.value); // Función de búsqueda que pasa el valor del input como argumento
	}
}


// ------------ Hace la petición GET a la API

function getFromAPI(text2Search) {

	fetch('https://api.tvmaze.com/search/shows?q=' + text2Search) // Envía una petición con el valor del input

		.then(function(result) {

			return result.json(); // Convierte la respuesta en formato JSON
		})

		.then(function(resultJSON) {
			createResults(resultJSON);
		});
}

// ------------ Pinta los resultados en la pantalla


function createResults(allReturnedSeries) {
	let searchResultLI;
	let searchResultDIV;
	let detailsContainer;
	let detailsContainerSummary;
	let detailsContainerOptions;
	let detailsOptions;
	let detailsFavoritesBox;
	let iconFavorites;
	let detailsLegendFav;
	let detailsLegendFavTXT;
	let detailsSummaryBox;
	let iconSummary;
	let detailsLegendSum;
	let detailsLegendSumTXT;
	let detailsRatingBox;
	let seriesRating;
	let seriesRatingIcon;
	let seriesRatingIconColor;
	let iconRating;
	let detailsLegendRat;
	let detailsLegendRatTXT;
	let detailsRate;
	let searchResultH2;
	let searchResultText;
	let searchResultImg;

	for (const serie of allReturnedSeries) { // Pasa por todos los resultados retornados para crear un item LI en la pantalla para cada uno de los resultados


		searchResultLI = document.createElement('li');
		searchResultLI.classList.add('serie-LI');

		searchResultDIV = document.createElement('div');
		searchResultDIV.classList.add('serie-DIV');
		// Los data-... son añadidos al DIV para guardar informaciones sobre la serie en el propio código

		searchResultDIV.setAttribute('data-id', serie.show.id);
		searchResultDIV.setAttribute('data-name', serie.show.name);
		searchResultDIV.setAttribute('data-rating', serie.show.rating.average);
		searchResultDIV.setAttribute('data-summary', serie.show.summary);

		// Condicional para verificar si las series ya están añadidas como favoritas
		if ((localStorage.getItem('AB TV Series finder favorites') === null) || (localStorage.getItem('AB TV Series finder favorites') === '[]')) {
			// No he conseguido hacer las condicionales por negación... :/
		} else {

			favoriteSeries = localStorage.getItem('AB TV Series finder favorites'); // Baja el localStorage
			favoriteSeries = JSON.parse(favoriteSeries); // Convierte el LS en formato objecto JavaScript

			for (const favorite of favoriteSeries) { // Pasa por todos los DIVs creados y verifica si alguno de ellos ya está añadido a los favoritos (descargados del LS arriba)
				if (favorite.show.id === searchResultDIV.getAttribute('data-id')) {
					searchResultDIV.classList.add('favorite');
				}
			}
		}

		detailsContainer = document.createElement('div');
		detailsContainer.classList.add('details__container');

		detailsContainerSummary;
		if (serie.show.summary === null) {
			detailsContainerSummary = noSummary;
		} else {
			detailsContainerSummary = serie.show.summary;
		}

		detailsContainer.innerHTML = detailsContainerSummary;

		detailsContainerOptions = document.createElement('div');
		detailsContainerOptions.classList.add('details__container--options');

		detailsOptions = document.createElement('div');
		detailsOptions.classList.add('details--options');

		detailsFavoritesBox = document.createElement('div');
		detailsFavoritesBox.classList.add('details__favorites--box');

		iconFavorites = document.createElement('i');
		iconFavorites.classList.add('far', 'fa-star', 'icon--favorite');

		detailsLegendFav = document.createElement('span');
		detailsLegendFav.classList.add('details--legend');

		detailsLegendFavTXT = document.createTextNode('Favorite it');

		if (searchResultDIV.classList.contains('favorite')) {
			iconFavorites.classList.remove('far');
			iconFavorites.classList.add('fas');
			detailsLegendFavTXT = document.createTextNode('Unfavorite');
		}

		detailsLegendFav.appendChild(detailsLegendFavTXT);

		detailsSummaryBox = document.createElement('div');
		detailsSummaryBox.classList.add('details__summary--box');

		iconSummary = document.createElement('i');
		iconSummary.classList.add('fas', 'fa-info', 'icon--summary');

		detailsLegendSum = document.createElement('span');
		detailsLegendSum.classList.add('details--legend');
		detailsLegendSumTXT = document.createTextNode('Summary');
		detailsLegendSum.appendChild(detailsLegendSumTXT);

		detailsRatingBox = document.createElement('div');
		detailsRatingBox.classList.add('details__rating--box');

		seriesRating = serie.show.rating.average;
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
		iconRating.classList.add('fas', seriesRatingIcon, 'icon--rating', seriesRatingIconColor);

		detailsLegendRat = document.createElement('span');
		detailsLegendRat.classList.add('details--legend');
		detailsLegendRatTXT = document.createTextNode('Rating');
		detailsLegendRat.appendChild(detailsLegendRatTXT);

		detailsRate = document.createElement('p');
		detailsRate.classList.add('details__rating--rate', seriesRatingIconColor);

		detailsLegendRatTXT;
		if (seriesRating === null) {
			detailsLegendRatTXT = 'N/A';
		} else {
			detailsLegendRatTXT = serie.show.rating.average;
		}

		detailsLegendRatTXT = document.createTextNode(detailsLegendRatTXT);

		detailsRate.appendChild(detailsLegendRatTXT);

		detailsOptions.appendChild(detailsFavoritesBox);
		detailsOptions.appendChild(detailsSummaryBox);
		detailsOptions.appendChild(detailsRatingBox);
		detailsContainerOptions.appendChild(detailsOptions);


		searchResultH2 = document.createElement('h2');
		searchResultH2.classList.add('serie-H2');

		searchResultText = document.createTextNode(serie.show.name);
		searchResultImg = document.createElement('img');
		searchResultImg.classList.add('serie-IMG');

		if (serie.show.image === null) {
			searchResultImg.src = noImage;
			searchResultImg.classList.add('serie-IMG-no');

		} else {
			searchResultImg.src = serie.show.image.medium;
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

		addTriggers();
	}
}

// ------------ Función para limpiar los resultados. Es accionada a cada nueva búsqueda.
function clearResults() {
	let allResults;

	allResults = document.querySelectorAll('.serie-LI');
	for (const eachResult of allResults) {
		eachResult.remove();
	}
}

function showCredits() {
	toggleCredits();
	creditsBox.addEventListener('mouseleave',hideCreditsBox );

	setTimeout(() => {
		creditsBox.classList.add('hidden');
		seeCreditsBox.classList.remove('hidden');
		creditsBox.removeEventListener('mouseleave',hideCreditsBox );
	},4000);
}

function toggleCredits() {
	creditsBox.classList.toggle('hidden');
	seeCreditsBox.classList.toggle('hidden');
}

function hideCreditsBox() {
	toggleCredits();
	creditsBox.removeEventListener('mouseleave',hideCreditsBox );
}
