//Toggle-menu animation
(function mainMenuAnimate() {
	"use strict";
	
	var pageNavToggle = document.querySelector(".page-nav__toggle");
	
	pageNavToggle.onclick = function(e) {
	 	e.preventDefault();

	  	this.classList.toggle('page-nav__toggle--closed');

	  	var mainMenuWrapper = document.querySelector(".page-nav__wrapper");
        mainMenuWrapper.classList.toggle("page-nav__wrapper--closed");

        var mainMenu = document.querySelector(".main-menu");
        mainMenu.classList.toggle("main-menu--closed");
	};
})();