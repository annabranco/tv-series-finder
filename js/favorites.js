'use strict';

/* global	favoriteSeries:true noImage:true seeFavoritesOnly listResults:true	*/

let selectedTVshow;


// ------------ Función que gestiona los favoritos (guarda y recoge sus datos en localStorage)

function add2Favorites(event) {
	let favoriteTVShow;

	selectedTVshow = event.currentTarget.parentElement.parentElement.parentElement;

	selectedTVshow.classList.toggle('favorite');

	event.currentTarget.firstChild.classList.toggle('fas');
	event.currentTarget.firstChild.classList.toggle('far');


	// El IF está invertido porque añadi un toggle antes. Así que en el IF abajo, si el elemento tiene la clase 'favorite' es porque acabó de recibirla y no está todavía guardada en el localStorage
	if (selectedTVshow.classList.contains('favorite')) {

		event.currentTarget.children[1].innerHTML = 'Unfavorite';

		favoriteTVShow = {
			show: {
				'id': selectedTVshow.getAttribute('data-id'),
				'image': {
					'medium': selectedTVshow.getAttribute('data-image')
				},
				'name': selectedTVshow.getAttribute('data-name'),
				'rating': {
					average: selectedTVshow.getAttribute('data-rating'),
				},
				'summary': selectedTVshow.getAttribute('data-summary')
			}
		};

		if (localStorage.getItem('AB TV Series finder favorites') === null) {

			favoriteSeries = [];

		} else {
			favoriteSeries = localStorage.getItem('AB TV Series finder favorites');
			favoriteSeries = JSON.parse(favoriteSeries);
		}

		favoriteSeries.push(favoriteTVShow);

		favoriteSeries = JSON.stringify(favoriteSeries);

		localStorage.setItem('AB TV Series finder favorites', favoriteSeries);
	} else {

		event.currentTarget.children[1].innerHTML = 'Favorite it';

		checkFavorites(); // Si se hace click en una serie ya marcada como favorita. Función definida abajo.
	}
}

// ------------ Función que verifica si una serie buscada ya había sido añadida a los favoritos
// Si la serie ya era favorita y se hace click otra vez en ella, la misma es removida de los favoritos
function checkFavorites() {
	const selectedID = selectedTVshow.getAttribute('data-id');

	favoriteSeries = localStorage.getItem('AB TV Series finder favorites');
	favoriteSeries = JSON.parse(favoriteSeries);

	for (let i = 0; i < favoriteSeries.length; i++) {
		if (selectedID === favoriteSeries[i].show.id) {
			favoriteSeries.splice(i, 1);
		}

		localStorage.setItem('AB TV Series finder favorites', JSON.stringify(favoriteSeries));
	}

}

// ------------ Función para ver solo los favoritos como resultado de búsqueda
function seeFavoritesOnly() {
	favoriteSeries = localStorage.getItem('AB TV Series finder favorites');
	favoriteSeries = JSON.parse(favoriteSeries);

	createResults(favoriteSeries);


}
