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
 							"photo-name": file.name
 							});

						var div = document.createElement("div");
						div.classList.add("recall-form__loaded-photo");
 						div.innerHTML = html;
						gallery.appendChild(div); 
						queue.push({file: file, div: div});
						div.querySelector(".recall-form__delete-photo").addEventListener("click",
						function(event) {
							event.preventDefault();
 							removePreview(div);
						});
 					});

 					reader.readAsDataURL(file);
 				}
			}

			function removePreview(div) {
 				queue = queue.filter(function(element) {
 				return element.div != div;
 				});
 				div.parentNode.removeChild(div);
			}		
		}
//Submit
		form.addEventListener("submit", function(event) {
			event.preventDefault();
			var data = new FormData(form);

			queue.forEach(function(element) {
 				data.append("images", element.file);
 			});

			request(data, function(response) {
			console.log(response);
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
}) ();