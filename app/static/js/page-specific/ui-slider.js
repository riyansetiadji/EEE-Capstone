$('#ex1').slider({
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});

$("#ex2").slider({});

var RGBChange = function() {
	$('#RGB').css('background', 'rgb('+r.getValue()+','+g.getValue()+','+b.getValue()+')')
};

var r = $('#R').slider()
		.on('slide', RGBChange)
		.data('slider');
var g = $('#G').slider()
		.on('slide', RGBChange)
		.data('slider');
var b = $('#B').slider()
		.on('slide', RGBChange)
		.data('slider');

		
		// With JQuery
$("#ex5").slider();


$("#destroyEx5Slider").click(function() {

	// With JQuery
	$("#ex5").slider('destroy');

	// Without JQuery
	slider.destroy();
});

// With JQuery
$("#ex6").slider();
$("#ex6").on("slide", function(slideEvt) {
	$("#ex6SliderVal").text(slideEvt.value);
});


// With JQuery
$("#ex7").slider();



$("#ex7-enabled").click(function() {
	if(this.checked) {
		// With JQuery
		$("#ex7").slider("enable");

		// Without JQuery
		slider.enable();
	}
	else {
		// With JQuery
		$("#ex7").slider("disable");

		// Without JQuery
		slider.disable();
	}
});

// With JQuery
$("#ex8").slider({
	tooltip: 'always'
});


$("#ex9").slider({
	precision: 2,
	value: 8.115 // Slider will instantiate showing 8.12 due to specified precision
});

// With JQuery
$("#ex10").slider({});

$("#ex11").slider({step: 20000, min: 0, max: 200000});

$("#ex12a").slider({ id: "slider12a", min: 0, max: 10, value: 5 });
$("#ex12b").slider({ id: "slider12b", min: 0, max: 10, range: true, value: [3, 7] });
$("#ex12c").slider({ id: "slider12c", min: 0, max: 10, range: true, value: [3, 7] });

// With JQuery
$("#ex13").slider({
    ticks: [0, 100, 200, 300, 400],
    ticks_labels: ['$0', '$100', '$200', '$300', '$400'],
    ticks_snap_bounds: 30
});

$("#ex15").slider({
	min: 1000,
	max: 10000000,
	scale: 'logarithmic',
	step: 10
});

$("#ex4").slider({
	reversed : true
});

