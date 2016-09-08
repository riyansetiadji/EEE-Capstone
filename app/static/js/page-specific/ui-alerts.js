		
		
		!function ($) {
  $(function(){

    // tooltip demo
    $("[data-toggle=tooltip]").tooltip();

    // popover demo
    $("[data-toggle=popover]").popover();
    

  })
}(window.jQuery)

// notification body's can be any html string or just string
var notification_html = [];
notification_html[0] = '<div class="activity-item">  <div class="activity"> There are <a href="#">6 new tasks</a> waiting for you. Don\'t forget! <span>About 3 hours ago</span> </div> </div>',
    notification_html[1] = '<div class="activity-item"> <div class="activity"> Mail server was updated. See <a href="#">changelog</a> <span>About 2 hours ago</span> </div> </div>',
    notification_html[2] = '<div class="activity-item"> <div class="activity"> Your <a href="#">latest post</a> was liked by <a href="#">Audrey Mall</a> <span>35 minutes ago</span> </div> </div>',
    notification_html[3] = '<div class="activity-item"> <div class="activity"> <a href="#">Eugene</a> ordered 2 copies of <a href="#">OEM license</a> <span>14 minutes ago</span> </div> </div>';
	
	
        function generate(type, text) {

            var n = noty({
                text        : text,
                type        : type,
                dismissQueue: true,
                layout      : 'topRight',
                closeWith   : ['click'],
                theme       : 'relax',
                maxVisible  : 10,
                animation   : {
                    open  : 'animated bounceInRight',
                    close : 'animated bounceOutRight',
                    easing: 'swing',
                    speed : 500
                }
            });
            console.log('html: ' + n.options.id);
        }

        function generateAll() {
            generate('warning', notification_html[0]);
            generate('error', notification_html[1]);
            generate('information', notification_html[2]);
            generate('success', notification_html[3]);
//            generate('notification');
//            generate('success');
        }

        $(document).ready(function () {

            setTimeout(function() {
                generateAll();
            }, 500);

        });
		
		$(function() {
    $('.page-alert').hide();
    //Show alert
    $('button[data-toggle="page-alert"]').click(function(e) {
        e.preventDefault();
        var id = $(this).attr('data-toggle-id');
        var alert = $('#alert-' + id);
        var timeOut;
        alert.appendTo('.page-alerts');
        alert.slideDown();
        
        //Is autoclosing alert
        var delay = $(this).attr('data-delay');
        if(delay != undefined)
        {
            delay = parseInt(delay);
            clearTimeout(timeOut);
            timeOut = window.setTimeout(function() {
                    alert.slideUp();
                }, delay);
        }
    });
    
    //Close alert
    $('.page-alert .close').click(function(e) {
        e.preventDefault();
        $(this).closest('.page-alert').slideUp();
    });
    
    //Clear all
    $('.clear-page-alerts').click(function(e) {
        e.preventDefault();
        $('.page-alert').slideUp();
    });
});

		
		