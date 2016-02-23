//Slider Initialization
(function mainMenuAnimate() {
	"use strict";
	 
     if (document.querySelector('.review')) {
	    var swiper = new Swiper('.review', {
            pagination: '.review__pagination',
            paginationClickable: true,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30,
            loop: true
        });
    }
})();