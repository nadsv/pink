//Popups
(function () {
	var btnOK = document.querySelector('#btn-ok');
	var btnFailure = document.querySelector('#btn-failure');
	var ansFalilure = document.querySelector('.answer--failure');
	var ansOK = document.querySelector('.answer--success');
	closeWindow(ansFalilure, btnFailure);
	closeWindow(ansOK, btnOK);

	function closeWindow(popup, closeButton) {
		closeButton.addEventListener("click", function(event) {
			event.preventDefault();
			popup.classList.add("hidden");
		})
	}

}) ();