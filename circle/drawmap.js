var drawMap = function() {
	var map = new google.maps.Map(d3.select("#map").node(), {
		  zoom: 2,
		  minZoom:1,
		  maxzoom:5,
		  center: new google.maps.LatLng(15, 5),
		  mapTypeId: google.maps.MapTypeId.TERRAIN,
	});
	var radius = 4
	var country = new Array(255);

	overlay = new google.maps.OverlayView();

	map.addListener("zoom_changed", function(d) {
		radius = map.getZoom();
		//console.log("radius " + radius);
		newdata = []
		overlay.draw();
		newdata = sample;
		overlay.draw();
	});
	

	// Add the container when the overlay is added to the map.
	overlay.onAdd = function() {
		var layer = d3.select(this.getPanes().overlayMouseTarget)
				.append("div")
				.attr("class", "map");

		overlay.draw = function() {
			var padding = 10;
			var projection = this.getProjection();
			var index = 0;
			var red = new Array(255);
			var green = new Array(255);
			var color = [];
			country.fill(0);
			red.fill(0);
			green.fill(0);

			for (geo in geolocation) {
				getCountryStats(geo, index);
				index++;
			}

			var marker = layer.selectAll("svg")
			.data(d3.entries(color))
			.each(transform)
			.enter().append("svg")
			.each(transform)
			.attr("class", "marker")
			.on("click", function(d) {
			})
			.on("mouseover", function(d) {
			})
			.on("mouseout", function(d) {
			});

			if (newdata.length == 0) {
				layer.selectAll("svg").remove()
			};

			marker.append("circle")
			.attr("fill", function(d) {
				return (d.value["color"]);
			})
			.attr("stroke", "#fff")
			.attr("r", function(d, i) {
				if (d.value["count"] < 10) {
					return radius;
				}	
				return (d.value["count"]/radius);
			})
			.attr("cx", function(d) {
				return (d.value["count"]/radius);
			})
			.attr('fill-opacity', 0.4)
			.attr("cy", function(d) {
				return (d.value["count"]/radius);
			}); 
			function getCountryStats(d, i) {
				for (index in newdata) {
					if (d == newdata[index][2]) {
						if (newdata[index][5] == "Certified") {
							green[i]++;
						} else {
							red[i]++;
						}
					}
				}
				color.push({country:d, color: "red", count: red[i]});
				color.push({country:d, color: "green", count: green[i]});
			}
				
			function transform(d, i) {
/*				console.log("color country index " + JSON.stringify(d));
				console.log("key " + d.key);
				console.log("value  " + d.value["country"]);
				console.log("value  " + d.value["color"]); 
				console.log("value  " + d.value["count"]);  */

				e = new google.maps.LatLng(geolocation[d.value["country"]].lat,
								geolocation[d.value["country"]].lng)
				e = projection.fromLatLngToDivPixel(e);
				return d3.select(this)
					.style("left", (e.x - padding) + "px")
					.style("top", (e.y - padding) + "px"); 
			} 
		};
	};

	var styles = [{
		featureType:"all",
		elementType:"all",
		stylers: [
			{saturation: -100}
		]
	}];
	
	var mapType = new google.maps.StyledMapType(styles, {name:"Grayscale"});
	map.mapTypes.set('grey', mapType)
	map.setMapTypeId('grey');
	// Bind our overlay to the map…
	overlay.setMap(map);
	return overlay
}
