//Send form
(function sendForm() {
	if (!("FormData" in window)) {
		return;
		}

	var form = document.querySelector(".review-form");
	if (form) {
		var queue = [];
		var template = document.querySelector("#photo-template").innerHTML; 

		if ("FileReader" in window) {
        	var gallery = document.querySelector(".review__gallery"); 

			form.querySelector("#upload-photo").addEventListener("change", function() {
				var files = this.files;
 				for (var i = 0; i < files.length; i++) {
 					preview(files[i]);
 				}
 				this.value = "";
			});

//Preview
			function preview(file) {
				if (file.type.match(/image.*/)) {

					var reader = new FileReader();

					reader.addEventListener("load", function(event) {
						var html = Mustache.render(template, {
 							"src": event.target.result,
 							"image-name": file.name.substring(0,15)
 							});

						var div = document.createElement("div");
						div.classList.add("review__loaded-photo");
 						div.innerHTML = html;
						gallery.appendChild(div); 
						queue.push({file: file, div: div});
						addDeleteEvent(div);
 					});

 					reader.readAsDataURL(file);
 				}
			}

			function addDeleteEvent(div) {
				div.querySelector(".review__delete-photo").addEventListener("click",
						function(event) {
							event.preventDefault();
 							removePreview(div);
						});
			}

			function removePreview(div) {
 				queue = queue.filter(function(element) {
 				return element.div != div;
 				});
 				div.parentNode.removeChild(div);
			}

			//reduce data  

			var deleteCrosses = document.getElementsByClassName('review__delete-photo');
			for (var i = 0; i < deleteCrosses.length; i++) {
					var parent = deleteCrosses[i].parentNode;
					deleteCrosses[i].addEventListener("click", addDeleteEvent(parent));
				}		
		}
//Submit
		form.addEventListener("submit", function(event) {
			event.preventDefault();

			var v = formValidate();

			if (v === false) {
				return false;
			}

			var data = new FormData(form);

			queue.forEach(function(element) {
 				data.append("images", element.file);
 			});

			request(data, function(response) {
				//console.log(response);
				document.querySelector(".answer--success").classList.remove("hidden");
			});
		});
	}

	function request(data, fn) {
		var xhr = new XMLHttpRequest();
		var time = (new Date()).getTime();
		xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
		xhr.addEventListener("readystatechange", function() {
		if (xhr.readyState == 4) {
			fn(xhr.responseText);
		}
	});
		xhr.send(data);
	}

	//Form Validate
	function formValidate() {
		var answer = document.querySelector(".answer--failure");
		var requiredFields = document.querySelectorAll('[required]');
			for (var i = 0; i < requiredFields.length; i++) {
				var input = requiredFields[i];
				if (input.value.trim() === "") {
					answer.classList.remove("hidden");
					return false;
				}
			}
		return true;
	};
}) ();


