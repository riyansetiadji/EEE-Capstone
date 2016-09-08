	<!-- Status Seven -->
			$(function() {
			
				/* Bar sparklines */
				$('.seven-bar-one').sparkline("html",{type: "bar", barWidth:"4",barColor:"#ff0000", height: "65"}); 
				
				$('.seven-bar-two').sparkline("html",{type: "bar", barWidth:"4",barColor:"#32c8de", height: "65"}); 
				
			});
			$(function() {
				/* Pie sparklines */
				$('.five-pie-one').sparkline("html",{type: "pie",width: "18",sliceColors:["#ed5441","#609cec","#51d466","#fcd419"]}); 
				
				$('.five-pie-two').sparkline("html",{type: "pie",width: "18",sliceColors:["#ed5441","#609cec","#51d466","#fcd419","#cb79e6"]}); 
				
				$('.five-pie-three').sparkline("html",{type: "pie",width: "18",sliceColors:["#ed5441","#609cec","#51d466","#fcd419"]}); 
				
				$('.five-pie-four').sparkline("html",{type: "pie",width: "18",sliceColors:["#ed5441","#609cec","#51d466","#fcd419","#cb79e6"]}); 
				
			});
			
			
		
		
		/* Plot chart */
		$(function() {
			/* Chart data #1 */
			var d1 = [[0, 4], [1, 3], [2, 7], [3, 5],[4, 4], [5, 6], [6, 4], [7, 4],[8, 5], [9, 5], [10, 8]];
			var options = {
				series: {
				  lines: {
					 show: true, fill: true, lineWidth:1, fillColor: { colors: [ { opacity: 0.5 }, { opacity: 0.5}] }
				  },
				  points: {
					 show: true, fill: true, lineWidth:2, radius:3, fillColor: "#fff"
				  },
				  shadowSize: 0
			   },
				colors :["#3498DB"],
			   grid: {
				show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#eee", labelMargin:10
			   },
			   xaxis: {
					ticks: 6,
					font: {
						size: 12,
						color: ["#9a9a9a"]
					}
			   },
			   yaxis: {
					ticks: 3,
					font: {
						size: 12,
						color: ["#9a9a9a"]
					}
			   }, 
			   legend: {
				  backgroundOpacity:0,
				  noColumns:2,
				  labelBoxBorderColor: "#ddd"
			   }
			};
			
			$("<div id='tooltip'></div>").css({
				position: "absolute",
				display: "none",
				"border-radius":"5px",
				padding: "5px 5px",
				color:"#999",
				"font-size":"11px",
				"background-color": "#fff",
				"border":"1px solid #ccc"
			}).appendTo("body");

			$("#plot-chart-two").bind("plothover", function (event, pos, item) {
					if (item) {
						var x = item.datapoint[0].toFixed(2),
							y = item.datapoint[1].toFixed(2);

						$("#tooltip").html(x + ", " + y)
							.css({top: item.pageY+5, left: item.pageX+5})
							.fadeIn(200);
					} else {
						$("#tooltip").hide();
					}
			});

			$.plot("#plot-chart-two", [ {data: d1} ], options);
		});
		/* Plot chart end */	
		
		
