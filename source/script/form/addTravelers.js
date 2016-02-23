//Add travelers and days 

(function changeTravelersDays() {
	"use strict";

	var MAX_OF_TRAVELERS = 10;
	var MIN_OF_TRAVELERS = 0;
	var MAX_DAYS = 100;
	var MIN_DAYS = 1;
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
		if (btnClass === 'btn--add') {
			addTravelers(index);
			delBtns = document.querySelector('#del-traveler-' + index);
			delBtns.addEventListener("click", deleteRandonTraveler());	
		}
		if (btnClass === 'btn--reduce') {
			deleteLastTraveler(index);
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

function minValue(unit) {
	switch (unit) {
  		case "чел.":
  			return MIN_OF_TRAVELERS;
  		case "дн.":
  			return MIN_DAYS;
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
   		var min = minValue(units(input));
   		var count = newValue < min ? min : newValue;
		input.value = count + ' ' + units(input);
		var parent = input.parentElement;
		if (parent.classList.contains("review__field-group--travelers")) {
					changeTravelers(input, oldValue, 'btn--reduce');
		}
		if (parent.classList.contains("review__field-group--duration")) {
					setEndDate(picker);
		}
    };
}

function replaceIndexes(elem) { 
	var postfix = elem.id.substring('traveler-'.length);
	var tmpl = elem.innerHTML;
	var newPostfix = parseInt(postfix) - 1;
	var rexp = new RegExp(postfix + '"', 'gm');
	var newTmpl = tmpl.replace(rexp, newPostfix + '"');
	var travelerName = elem.querySelector('#traveler-name-' + postfix).value;
	var travelerNick = elem.querySelector('#traveler-nick-' + postfix).value;
	elem.innerHTML = newTmpl;
	elem.querySelector('#traveler-name-' + newPostfix).value = travelerName;
	elem.querySelector('#traveler-nick-' + newPostfix).value = travelerNick;
	elem.id = 'traveler-' + newPostfix;
	var delBtns = document.querySelector('#del-traveler-' + newPostfix);
	delBtns.addEventListener("click", deleteRandonTraveler());
}

function updateIndexes(postfix) {
	//update counter of travelers
	var travelerCount = document.querySelector('#travelers');
   	var oldValue = parseInt(travelerCount.value);
	var newValue = oldValue - 1;
   	var count = newValue < MIN_OF_TRAVELERS ? MIN_OF_TRAVELERS : newValue;
	travelerCount.value = count + ' ' + units(travelerCount);
	//update indexes
	var index = postfix - 2;
	var travelers = document.getElementsByClassName('traveler');
	for (var i = index; i < travelers.length; i++) {
		replaceIndexes(travelers[i]);	
	}
}

function deleteRandonTraveler() {
	return function () {
		var postfix = this.id.substring('del-traveler-'.length);
		var removedTraveler = document.querySelector('#traveler-' + postfix);
		area.removeChild(removedTraveler);
		var startPostfix = parseInt(postfix) + 1;
		updateIndexes(startPostfix);
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
		var parent = input.parentElement;
		if (parent.classList.contains("review__field-group--travelers")) {
					changeTravelers(input, count, 'btn--add');
		}
		if (parent.classList.contains("review__field-group--duration")) {
			setEndDate(picker);
		}
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

//Calendar
	 moment.locale('ru'); 
	 var disable = false, 
	    picker = new Pikaday({
        field: document.getElementById('begin-journey'),
        firstDay: 1,
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000,2020],
        format: 'Do MMMM YYYY',
        i18n: {
            previousMonth : 'Пред. мес.',
            nextMonth     : 'След. мес.',
            months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
            weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
        },
        onSelect: function() {
        	var self = this;
        	setEndDate(self); 
        }
        
    });

	picker.setMoment(moment());

	function setEndDate(elem) {
	    	var beginDate = elem.getMoment(),
        	duration = parseInt(document.getElementById('duration').value) - 1,
       		momentDuration = moment.duration(duration, 'd'),
      	    endDuration  = beginDate.add(momentDuration);
            document.getElementById('end-journey').value = endDuration.format('Do MMMM YYYY');
	    }

})();