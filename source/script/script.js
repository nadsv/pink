
	
<!--Google map-->

		function initialize() {
			var mapOptions = {
			zoom: 16,
			center: new google.maps.LatLng(59.9363137,30.3206343)
			};
		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		var image = "img/map-marker.svg";
		var myLatLng = new google.maps.LatLng(59.9363137,30.3206343);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);

