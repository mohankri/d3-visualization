<!DOCTYPE html>
<meta charset="utf-8">
<style>
  circle {
    //fill: rgb(31, 119, 180);
    //fill-opacity: .0;
    //stroke: rgb(31, 119, 180);
    //stroke-width: 1px;
  }
  .leaf circle {
    fill: #ff7f0e;
    fill-opacity: 1;
  }
  text {
    font: 10px sans-serif;
  }
</style>

<body>
  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min.js"></script>
  <script src="data.js"></script>
  <script>
  var viewColors = [ "white", "blue", "gold", "green", "red", "maroon" ];
  var newColor = [ "#C7C0C0", "#C7C7C7" ];

  function getJSONObject(week, length){
    //Step 1: Author a string to JSON format.
    var viewsJSONString = "{ \"name\": \"week" + week + "\", \"children\": [" ;
    for (var count=0; count<statusData.length; count++   ){
      viewsJSONString += "{ \"name\": \"" + statusData[count][1] + " \", \"total\": " +
  statusData[count][2] + " }   ";
      if (count<statusData.length-1) viewsJSONString += ",";
     }
     viewsJSONString += "]}"
     //Step 2: Parse the string to create a JSON object.
     return JSON.parse(viewsJSONString);
   }

   function compare(a, b) {
      return (b.total - a.total);
   }

   topFrequency = getJSONObject(0, statusData.length);

   var diameter = 510;
   var color = d3.scale.category10();

     // create new pack layout
    var bubble = d3.layout.pack()
      .sort(compare)
      .value(function(d, i) {
        console.log("bubble dia " + d.total);
        return (d.total);
      })
      .size([diameter, diameter]);

    // select chart3 div and append svg canvas for graph
    var canvas = d3.select("body").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
  
    canvas.append("rect")
	.attr("width", "100%")
    	.attr("height", "100%")
	.attr("fill", "#C7C0C0"); 

     canvas.append("g");
       
    var nodes = bubble.nodes(topFrequency);

    canvas.append("text")
	.attr("x", "0")
	.attr("y", "15")
	.attr("fill", "black")
	.text("Hello Bubble")

    var node = canvas.selectAll(".node")
   		.data(nodes)
      		.enter()
	        .append("g")
	     // give nodes a class name for referencing
		.attr("class", "node")
		.attr("transform", function(d) {
			return "translate(" + d.x + "," + d.y + ")";
      });
      
      node.append("circle")
      .style("fill", function(d, i){
        if (i == 0) {
           return "#C7C0C0";
        }
        return "#f46a0d";
       }) 
      .attr("r", function(d) {
	console.log("append circle d.r " + d.r);
	return d.r;
      }); 

	node.append("title")
	.text(function(d) {
		console.log("d.name " + d.name);
      		return d.name;
	});

	node.append("text")
	.attr("dy", ".3em")
	.style("text-anchor", "middle")
	.text(function(d) { return (d.name + ":" + d.total).substring(0, d.r/3); });

</script>
</body>
</html>
