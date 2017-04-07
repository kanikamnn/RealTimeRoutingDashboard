var marker;

// This function is called back when google maps get flly loaded...
function initMap() {
	var myHome = {lat: 12.865700, lng: 77.602418};
  var map = new google.maps.Map(document.getElementById('mapbox'), {
    center: myHome,
    zoom: 15
  });

	marker = new google.maps.Marker({
    position: myHome ,
    map: map
  });
}
