//Add travelers and days

(function changeTravelersDays() {
	"use strict";

	var MAX_OF_TRAVELERS = 10;
	var MIN_OF_TRAVELERS = 0;
	var MAX_DAYS = 100;
	var area = document.querySelector('.review-fldset--travelers');
	var templateElement = document.querySelector('#traveler-template');

function deleteLastTraveler(index) {
	if (index > MIN_OF_TRAVELERS) {
			var removedTraveler = document.querySelector('#traveler-' + index);
			area.removeChild(removedTraveler); 
	}
}

function addTravelers(index) {
	var templateElement = document.querySelector('#traveler-template');
	var template = templateElement.innerHTML;
	var html = Mustache.render(template, {"number": index}); 
	var newTraveler = document.createElement("div");
	newTraveler.classList.add("traveler");
	newTraveler.id = "traveler-" + index;
	newTraveler.innerHTML = html;
	area.appendChild(newTraveler);
}

function changeTravelers(input, index, btnClass) {
	var parent = input.parentElement;
	if (parent.classList.contains("review__field-group--travelers")) {
		if (btnClass === 'btn--add') {
			addTravelers(index);
		}
		if (btnClass === 'btn--reduce') {
			deleteLastTraveler(index);
		}
	}
}
	

function units(input) {
	return input.dataset.units;
}

function maxValue(unit) {
	switch (unit) {
  		case "чел.":
  			return MAX_OF_TRAVELERS;
  		case "дн.":
  			return MAX_DAYS;
  		default:
    		return '';
	}
}

function reduce() {
	return function () {
       	var parent = this.parentElement;
		var input = parent.querySelector('.review__input');
		var oldValue = parseInt(input.value);
		var newValue = oldValue - 1;
   		var count = newValue < MIN_OF_TRAVELERS ? MIN_OF_TRAVELERS : newValue;
		input.value = count + ' ' + units(input);
		changeTravelers(input, oldValue, 'btn--reduce'); 
    };
}

function replaceIndexes(elem, index) {
	var tmpl = elem.innerHTML,
		newIndex = parseInt(index) - 1,
		oldPostfix = index + '"',
		rexp = new RegExp(oldPostfix, 'g'), 
    	newPostfix = newIndex + '"',
		newTmpl = tmpl.replace(rexp, newPostfix);
	elem.innerHTML = newTmpl;
}

function updateIndexes(index) {
	//update counter of travelers
	var travelerCount = document.querySelector('#travelers');
   	var oldValue = parseInt(travelerCount.value);
	var newValue = oldValue - 1;
   	var count = newValue < MIN_OF_TRAVELERS ? MIN_OF_TRAVELERS : newValue;
	travelerCount.value = count + ' ' + units(travelerCount);
	//update indexes
	var travelers = document.getElementsByClassName('traveler');
	for (var i = (index-1); i < travelers.length; i++) {
		var oldIndex = i+2;
		replaceIndexes(travelers[i], oldIndex);	
	}
}

function deleteRandonTraveler() {
	return function () {
		var index = this.id.substring('del-traveler-'.length);
		var removedTraveler = document.querySelector('#traveler-' + index);
		area.removeChild(removedTraveler);
		updateIndexes(index);
    };
}

function add() {
	return function () {
		var parent = this.parentElement;
		var input = parent.querySelector('.review__input');
		var count = parseInt(input.value) + 1;
		var max = maxValue(units(input));
   		count = count < max ? count : max;  		
		input.value = count + ' ' + units(input);
		changeTravelers(input, count, 'btn--add'); 
		delBtns = document.querySelector('#del-traveler-' + count);
		delBtns.addEventListener("click", deleteRandonTraveler());	
    };
}


//reduce data

var reduceBtns = document.getElementsByClassName('btn--reduce');
for (var i = 0; i < reduceBtns.length; i++) {
	reduceBtns[i].addEventListener("click", reduce());
}

//add data
var addBtns = document.getElementsByClassName('btn--add');
for (var i = 0; i < addBtns.length; i++) {
	addBtns[i].addEventListener("click", add());	
}

//delete traveler
var delBtns = document.getElementsByClassName('del-traveler');
for (var i = 0; i < delBtns.length; i++) {
	delBtns[i].addEventListener("click", deleteRandonTraveler());	
}

})();