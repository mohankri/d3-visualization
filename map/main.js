$(document).ready(function() {
	var layout;
	newdata = [];
	newdata = sample;
	layout = drawMap()
	overlayPosition = $("#map").position()
	console.log("drawmap overlay " + overlayPosition);
	try {
		layout.draw();
	} catch(err) {
		console.log("draw function failed...");
	}
})
