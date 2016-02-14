//Add travelers and days

(function changeTravelersDays() {
	"use strict";

	var MAX_OF_TRAVELERS = 10;
	var MAX_DAYS = 100;
	var area = document.querySelector('.review-fldset--travelers');
	var templateElement = document.querySelector('#traveler-template');

function deleteTravelers(index) {
	if (index > 1) {
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
			deleteTravelers(index);
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
   		var count = newValue < 1 ? 1 : newValue;
		input.value = count + ' ' + units(input);
		changeTravelers(input, oldValue, 'btn--reduce'); 
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

})();