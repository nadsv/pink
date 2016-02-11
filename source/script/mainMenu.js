//Toggle-menu animation
(function mainMenuAnimate() {
	var pageNavToggle = document.getElementById('page-nav__toggle');
	
	pageNavToggle.onclick = function(e) {
	 	e.preventDefault();

	  	this.classList.toggle('main-nav__toggle--closed');

	  	var mainMenuWrapper = document.querySelector(".page-nav__wrapper");
        mainMenuWrapper.classList.toggle('page-nav__wrapper--closed');

        var mainMenu = document.querySelector(".main-menu");
        mainMenu.classList.toggle('page-nav__wrapper--closed');
	};
})();