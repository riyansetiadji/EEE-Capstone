	  jQuery(document).ready(function () {
        jQuery('#world').vectorMap({
          map: 'world_en',
          enableZoom: true,
          showTooltip: true
        });
      });
	
	/* Plot Chart One */
			$(function() {
				/* Chart data */
				var d1 = [[0, 3], [1, 2.5], [2, 3.2], [3, 4.5],[4, 6.5], [5, 5], [6, 6], [7, 6],[8, 8], [9, 7], [10, 7.5], [11, 8], [12, 9], [13, 12], [14, 13], [15, 14]];

				var options = {
					series: {
						lines: {
							show: true, fill: true, lineWidth:2, fillColor: { colors: [ { opacity: 0 }, { opacity: 0}] }
						},
						points: {
							show: true, fill: true, lineWidth:2, radius:3, fillColor: "rgba(0,0,0,0.3)"
						},
						shadowSize: 0
					},
					colors :["#fff "],
					grid: {
						show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#ddd", labelMargin:10
					},
					xaxis: {
						show: false,
						ticks: 10,
						font: {
							size: 12,
							color: ["#9a9a9a"]
						}
					},
					yaxis: {
						show: false,
						ticks: 8,
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
					padding: "5px 10px",
					color:"#fff",
					"font-size":"15px",
					"background-color": "#555",
					"border-top": "2px solid rgba(0,0,0,0.1)"
				}).appendTo("body");

				$("#plot-chart-one").bind("plothover", function (event, pos, item) {
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

				$.plot("#plot-chart-one", [ {data: d1} ], options);
			});
			/* Plot Chart end */
			
			/* Plot Chart Two */
			$(function() {
				/* Chart data */
				var d1 = [[0, 2], [1, 2.5], [2, 4.2], [3, 6],[4, 2.5], [5, 5], [6, 7], [7, 6],[8, 5.5], [9, 6.7], [10, 7.5], [11, 5], [12, 7], [13, 5.6], [14, 9], [15, 8]];

				var options = {
					series: {
						lines: {
							show: true, fill: true, lineWidth:2, fillColor: { colors: [ { opacity: 0 }, { opacity: 0}] }
						},
						points: {
							show: true, fill: true, lineWidth:2, radius:3, fillColor: "rgba(0,0,0,0.3)"
						},
						shadowSize: 0
					},
					colors :["#fff "],
					grid: {
						show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#ddd", labelMargin:10
					},
					xaxis: {
						show: false,
						ticks: 10,
						font: {
							size: 12,
							color: ["#9a9a9a"]
						}
					},
					yaxis: {
						show: false,
						ticks: 8,
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
					"position": "absolute",
					"display": "none",
					"border-radius":"5px",
					padding: "30px 14px",
					color:"#fff",
					"font-size":"15px",
					"background-color": "#555",
					"border-top": "2px solid rgba(0,0,0,0.1)"
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
			/* Plot Chart end */
			
			/* Plot Chart Three */
			$(function() {
				/* Chart data #1 */
				var d1 = [[0, 4], [1, 7.5], [2, 6.2], [3, 4.5],[4, 8], [5, 6], [6, 8], [7, 9],[8, 6], [9, 4], [10, 5.5], [11, 8], [12, 6], [13, 10], [14, 8], [15, 11]];

				var options = {
					series: {
						lines: {
							show: true, fill: true, lineWidth:2, fillColor: { colors: [{ opacity: 0 }, { opacity: 0}] }
						},
						points: {
							show: true, fill: true, lineWidth:2, radius:3, fillColor: "rgba(0,0,0,0.3)"
						},
						shadowSize: 0
					},
					colors :["#fff "],
					grid: {
						show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#ddd", labelMargin:10
					},
					xaxis: {
						show: false,
						ticks: 10,
						font: {
							size: 12,
							color: ["#9a9a9a"]
						}
					},
					yaxis: {
						show: false,
						ticks: 8,
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
					padding: "30px 14px",
					color:"#fff",
					"font-size":"15px",
					"background-color": "#555",
					"border-top": "2px solid rgba(0,0,0,0.1)"
				}).appendTo("body");

				$("#plot-chart-three").bind("plothover", function (event, pos, item) {
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

				$.plot("#plot-chart-three", [ {data: d1} ], options);
			});
			/* Plot Chart end */
			
			/* Plot Chart Four */
			$(function() {
				/* Chart data */
				var d1 = [[0, 6], [1, 7], [2, 8], [3, 4],[4, 6], [5, 5], [6, 6], [7, 6],[8, 8], [9, 7], [10, 7.5], [11, 8], [12, 9], [13, 8], [14, 9], [15, 10]];

				var options = {
					series: {
						lines: {
							show: true, fill: true, lineWidth:2, fillColor: { colors: [ { opacity: 0 }, { opacity: 0}] }
						},
						points: {
							show: true, fill: true, lineWidth:2, radius:3, fillColor: "rgba(0,0,0,0.3)"
						},
						shadowSize: 0
					},
					colors :["#fff "],
					grid: {
						show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#ddd", labelMargin:10
					},
					xaxis: {
						show: false,
						ticks: 10,
						font: {
							size: 12,
							color: ["#9a9a9a"]
						}
					},
					yaxis: {
						show: false,
						ticks: 8,
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
					padding: "30px 14px",
					color:"#fff",
					"font-size":"15px",
					"background-color": "#555",
					"border-top": "2px solid rgba(0,0,0,0.1)"
				}).appendTo("body");

				$("#plot-chart-four").bind("plothover", function (event, pos, item) {
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

				$.plot("#plot-chart-four", [ {data: d1} ], options);
			});
			/* Plot Chart end */
			
			
			/* Plot Chart Five */
			$(function() {
				/* Chart data */
				var d1 = [[0, 8], [1, 5], [2, 6.7], [3, 4],[4, 5.4], [5, 8.5], [6, 7.6], [7, 4.5],[8, 6.7], [9, 3.5], [10, 8], [11, 10], [12, 12], [13, 9], [14, 6.7], [15, 10]];

				var options = {
					series: {
						lines: {
							show: true, fill: true, lineWidth:2, fillColor: { colors: [ { opacity: 0 }, { opacity: 0}] }
						},
						points: {
							show: true, fill: true, lineWidth:2, radius:3, fillColor: "rgba(0,0,0,0.3)"
						},
						shadowSize: 0
					},
					colors :["#fff "],
					grid: {
						show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#ddd", labelMargin:10
					},
					xaxis: {
						show: false,
						ticks: 10,
						font: {
							size: 12,
							color: ["#9a9a9a"]
						}
					},
					yaxis: {
						show: false,
						ticks: 8,
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
					padding: "30px 14px",
					color:"#fff",
					"font-size":"15px",
					"background-color": "#555",
					"border-top": "2px solid rgba(0,0,0,0.1)"
				}).appendTo("body");

				$("#plot-chart-five").bind("plothover", function (event, pos, item) {
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

				$.plot("#plot-chart-five", [ {data: d1} ], options);
			});
			/* Plot Chart end */
			
			
			/* Plot Chart Six */
			$(function() {
				/* Chart data #1 */
				var d1 = [[0, 6], [1, 4.5], [2, 7], [3, 4.5],[4, 8.7], [5, 7.7], [6, 3.3], [7, 6.5],[8, 7.8], [9, 7], [10, 8], [11, 12], [12, 10], [13, 8], [14, 6], [15, 8]];

				var options = {
					series: {
						lines: {
							show: true, fill: true, lineWidth:2, fillColor: { colors: [ { opacity: 0 }, { opacity: 0}] }
						},
						points: {
							show: true, fill: true, lineWidth:2, radius:3, fillColor: "rgba(0,0,0,0.3)"
						},
						shadowSize: 0
					},
					colors :["#fff "],
					grid: {
						show: false, hoverable: true, color: "#aaa", backgroundColor:"#fff" ,borderWidth:1, borderColor:"#ddd", labelMargin:10
					},
					xaxis: {
						show: false,
						ticks: 10,
						font: {
							size: 12,
							color: ["#9a9a9a"]
						}
					},
					yaxis: {
						show: false,
						ticks: 8,
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
					padding: "30px 14px",
					color:"#fff",
					"font-size":"15px",
					"background-color": "#555",
					"border-top": "2px solid rgba(0,0,0,0.1)"
				}).appendTo("body");

				$("#plot-chart-six").bind("plothover", function (event, pos, item) {
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

				$.plot("#plot-chart-six", [ {data: d1} ], options);
			});
			/* Plot Chart end */
	
    
	<!-- On Click Event -->
			$(document).ready(function(){
				$(".ui-player a").click(function(e){
					e.preventDefault();
					if(!($(this).hasClass("active"))){
						$(this).addClass("active");		//Add Class
					}
					else{
						$(this).removeClass("active");	//Remove Class
					}
				});			
			});

			<!-- Sparkline -->
			$("#status-chart").sparkline([20,23,25,19,20,19,18,17,16,20,18,17,19,23,25,19,22,25], {
			type: 'bar',
			height: '70',
			barColor: 'rgba(255,255,255,1)'});    
			
			/* Status slide */

			$('.status-button').click(function() {
				var $slidebtn=$(this);
				var $slidebox=$(this).parent();
				if($slidebox.css('right')=="-282px"){
				  $slidebox.animate({
					right:0
				  },500);
				  $slidebtn.find(".status-circle").hide();
				  $slidebtn.width(41);
				  $slidebtn.animate({
					 left:-42
				  },100);
				  $slidebtn.children().children("i").removeClass().addClass("fa fa-chevron-right");
				}
				else{
				  $slidebox.animate({
					right:-282
				  },100);
				  $slidebtn.animate({
					 left:-120
				  },500);
				  $slidebtn.width(120);
				  $slidebtn.find(".status-circle").show(700);
				  $slidebtn.children().children("i").removeClass().addClass("fa fa-chevron-left");
				}
			});  
