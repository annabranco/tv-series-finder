'use strict'

/* global addTriggers add2Favorites */

// ------------ Variables globales (details.js)
let summaryContainer;

function addTriggers() { // exported addTriggers
	const summaryTrigger = document.querySelectorAll('.details__summary--box');
	const favoritesTrigger = document.querySelectorAll('.details__favorites--box');

	for (const trigger of summaryTrigger) {
		trigger.addEventListener('click', showSummary);
	}

	for (const trigger of favoritesTrigger) {
		trigger.addEventListener('click', add2Favorites);
	}
}


function showSummary(event) {
	summaryContainer = event.currentTarget.parentElement.parentElement.parentElement.children[1];
	summaryContainer.classList.add('summary__container-visible');
	setTimeout(removeSummary, 10000);
}

function removeSummary() {
	summaryContainer.classList.remove('summary__container-visible');
}
