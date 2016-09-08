$(function () {
        $('#uidemo-modals-effects-btn').on('click', function (e) {
            anim = $("#uidemo-modals-effects-select").val();
			$('#testModalanimation').modal('show');
			$('.demoanimation').addClass('animated ' + anim).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $(this).removeClass('animated ' + anim);
                });;
			e.preventDefault();
        });
    });
	$('.bootbox-alert').on('click', function (e) {
		bootbox.alert("Hello world!", function() {
			alert("Hello world callback");
		});
	});
	
	$('.bootbox-confirm').on('click', function (e) {
	bootbox.confirm("Are you sure?", function(result) {
		alert("Confirm result: "+result);
	}); 
	}); 
	
	$('.bootbox-prompt').on('click', function (e) {
	bootbox.prompt("What is your name?", function(result) {                
		if (result === null) {                                             
			alert("Prompt dismissed");                              
		} else {
			alert("Hi <b>"+result+"</b>");                          
		}
	});
	});
	
	$('.bootbox-def-value').on('click', function (e) {
	bootbox.prompt({
  title: "What is your real name?",
  value: "makeusabrew",
  callback: function(result) {
    if (result === null) {
      alert("Prompt dismissed");
    } else {
      alert("Hi <b>"+result+"</b>");
    }
  }
});
});

$('.bootbox-dialog-custom').on('click', function (e) {
bootbox.dialog({
  message: "I am a custom dialog",
  title: "Custom title",
  buttons: {
    success: {
      label: "Success!",
      className: "btn-success",
      callback: function() {
        alert("great success");
      }
    },
    danger: {
      label: "Danger!",
      className: "btn-danger",
      callback: function() {
        alert("uh oh, look out!");
      }
    },
    main: {
      label: "Click ME!",
      className: "btn-primary",
      callback: function() {
        alert("Primary button");
      }
    }
  }
});
});

$('.bootbox-dialog-html').on('click', function (e) {
bootbox.dialog({
  title: "That html",
  message: '<img src="images/photography/1.jpg" width="100px"/><br/> You can also use <b>html</b>'
});
});

