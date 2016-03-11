var drawMap = function() {
	var map = new google.maps.Map(d3.select("#map").node(), {
		  zoom: 2,
		  minZoom:1,
		  maxzoom:5,
		  center: new google.maps.LatLng(15, 5),
		  mapTypeId: google.maps.MapTypeId.TERRAIN,
	});
	var radius = 3
	var country = new Array(255);

	overlay = new google.maps.OverlayView();

	map.addListener("zoom_changed", function(d) {
		radius = map.getZoom();
		console.log("radius " + radius);
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
			var projection = this.getProjection();
			var xpad = new Array(255);
			var ypad = new Array(255);
			country.fill(0);
			xpad.fill(0);
			ypad.fill(0);
			//console.log("Draw Certified List " + certifiedList['JAPAN']);
			//console.log("Draw UnCertified List " + uncertifiedList['JAPAN']);
			var marker = layer.selectAll("svg")
			.data(d3.entries(newdata))
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
				if (d.value[5] == "Certified") {
					//console.log("Certified ..\n");
					return "green";
				} else {
					//console.log("Non Certified ..\n");
					return "red";
				}
			})
			.attr("stroke", "#fff")
			.attr("r", function(d) {
				return radius; 
			})
			.attr("cx", function(d) {
				return radius + Math.random(); 
			})
			.attr("cy", function(d) {
				return radius + Math.random();
			});
			function findIndex(d) {
				var index = 0;
				for (var i in geolocation) {
					if (i == d) {
						break;
					}
					index++;
				}
				return index;
			}
				
			function transform(d, i) {
				if (geolocation[d.value[2]] == undefined) {	
					console.log("Country " + d.value[2]);
					return;
				}
				if (geolocation[d.value[2]] == "USA") {	
					console.log("USA ");
					return;
				}
				var index = findIndex(d.value[2]);
				console.log("index of " + country[index] + " " + d.value[2]);
				if (country[index] % geolocation[d.value[2]].plotdepth != 0) {
					xpad[index]+= radius;
				} else {
					ypad[index] = country[index]/10 * radius;
					xpad[index] = radius;
				}
				country[index]++;
				
				e = new google.maps.LatLng(geolocation[d.value[2]].lat, geolocation[d.value[2]].lng)
				e = projection.fromLatLngToDivPixel(e);
				return d3.select(this)
					.style("left", (e.x - xpad[index]+1) + "px")
					.style("top", (e.y - ypad[index]+1) + "px");
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
