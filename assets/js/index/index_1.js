var marker;

(function(ultimate){

mapboxgl.accessToken = apiKey;
var myPlace = [77.580768, 12.983405];

ultimate.map = new mapboxgl.Map({
    container: 'mapbox',
    center: myPlace,
    zoom: 13,
    style: 'mapbox://styles/mapbox/light-v9'
});

var el = document.createElement('div');
el.id="markers"
el.classList.add('red');

var popup = new mapboxgl.Popup({offset: 25})
    .setText('Construction on the Washington Monument began in 1848.');

// create the marker
ultimate.marker = new mapboxgl.Marker(el, {offset:[-5, -25]});

ultimate.marker.setLngLat(myPlace)
    .setPopup(popup) // sets a popup on this marker

})(window)