mapboxgl.accessToken = 'pk.eyJ1IjoicGpkcyIsImEiOiJVNEdDc3RjIn0.kmBUhtCdHZI_21ySyX56CQ';

var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/light-v10'
});


var trackPopup = new mapboxgl.Popup({
	// closeButton: false,
	closeOnClick: false
});

var getJSON = function (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};

map.on('load', function () {

	// getJSON('https://api.roambee.com/v2/shipment/summary?uuid=d2f388be-f054-4a1b-bb18-bff615a1e7f7&apikey=069b6dee-6091-4241-90b9-b1976859e2c3',
	// function(err, data) {
	// 	if (err !== null) {
	// 		console.error('Something went wrong. The map couldn\'t connect to the roambee server. (Error ' + err + '). Vite & Rêves last known position cannot be plotted.\n\nDon\'t worry. This will probably work again soon.');
	// 	} else {
	// 		var lastKnownPosition = data.geo_summary.current_location;
	// 		console.log('lastKnownPosition:', lastKnownPosition);
	// 		plotPosition(lastKnownPosition);
	// 	}
	// });

	const callbacks = [];
	const routeData = [];

	routeFiles.forEach((routeFile) => {
		callbacks.push('working');
		getJSON(`/route/${routeFile}`,
			function (err, data) {
				if (err !== null) {
					console.error('Something went wrong. We couldn\'t load route file ' + routeFile + '. (Error ' + err + ')');
				} else {
					plotRoute(data, routeFile);
					routeData.push(data);
					console.log(routeFile + ' plotted');
				}
				callbacks.pop();
				if (callbacks.length === 0) fitBounds(routeData);
			});
		});
});

function plotPosition(position) {
	var geojson = {
		"type": "FeatureCollection",
		"features": [
			{
				"type": "Feature",
				"properties": {
					"message": "<h6>Vite & Rêves' current position</h6><br/><small>(Tracking data provided by <a href='https://www.logisticsplus.net' target=_blank>Logistics Plus</a>, thanks Fre and Read!)</small>",
					"iconSize": [60, 60]
				},
				"geometry": {
					"type": "Point",
					"coordinates": [
						position.lng,
						position.lat
					]
				}
			},
		]
	};

	geojson.features.forEach(function(marker) {
	// create a DOM element for the marker
	var el = document.createElement('div');
	el.className = 'marker';
	el.style.backgroundImage = 'url(//images.weserv.nl/?url=https://vite-et-reves.s3.eu-west-3.amazonaws.com/vite-et-reves-sailing.jpg&w=60&h=60&fit=cover&mask=circle)';

	el.style.width = marker.properties.iconSize[0] + 'px';
	el.style.height = marker.properties.iconSize[1] + 'px';

	var popup = new mapboxgl.Popup({ offset: 25 })
		.setHTML(marker.properties.message)

	// add marker to map
	new mapboxgl.Marker(el)
		.setLngLat(marker.geometry.coordinates)
		.setPopup(popup) // sets a popup on this marker
		.addTo(map);
	});

}

function plotRoute(data, routeFile) {
	map.addLayer({
		"id": routeFile,
		"type": "line",
		"source": {
			"type": "geojson",
			"data": data,
		},
		"layout": {
			"line-join": "round",
			"line-cap": "round"
		},
		"paint": {
			"line-color": "#67adb7",
			"line-width": 6
		}
	});

	map.on('mouseenter', routeFile, function(e) {
		var correspondingPost = posts.find(function(post) {
			return post.gpx === e.features[0].properties.source;
		});

		if (correspondingPost) {
			// Change the cursor style as a UI indicator.
			map.getCanvas().style.cursor = 'pointer';

			// set coordinates to the middel of the geojson
			var coordinates = e.features[0].geometry.coordinates[Math.floor(e.features[0].geometry.coordinates.length / 2)];
			// Populate the popup and set its coordinates
			// based on the feature found.
			trackPopup.setLngLat(coordinates)
				.setHTML(correspondingPost.description)
				.addTo(map);
		}
	});
}

function fitBounds(data) {
	console.log('fitting bounds');

	// Geographic coordinates of the LineString
	var coordinates = data
		.map(o => o.features)
		.reduce((p,c) => p.concat(c), [])
		.map(feature => feature.geometry.coordinates)
		.reduce((p,c) => p.concat(c), []);

	// Pass the first coordinates in the LineString to `lngLatBounds` &
	// wrap each coordinate pair in `extend` to include them in the bounds
	// result. A variation of this technique could be applied to zooming
	// to the bounds of multiple Points or Polygon geomteries - it just
	// requires wrapping all the coordinates with the extend method.
	var bounds = coordinates.reduce(function (bounds, coord) {
		return bounds.extend(coord);
	}, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

	map.fitBounds(bounds, {
		padding: 100
	});
}
