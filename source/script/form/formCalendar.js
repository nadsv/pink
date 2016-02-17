//Calendar

(function formCalendar() {
	"use strict";
	 moment.locale('ru'); 
	 var disable = false, picker = new Pikaday({
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
        	var beginDate = this.getMoment(),
        	duration = parseInt(document.getElementById('duration').value),
       		momentDuration = moment.duration(duration, 'd'),
      	    endDuration  = beginDate.add(momentDuration);
            document.getElementById('end-journey').value = endDuration.format('Do MMMM YYYY');
        }
        
    });
})();