$(document).ready(function() {
  mtDatapp = {
    /**
     * @return {undefined}
     */
    appinit : function() {
      mtDatapp.HandleSidebartoggle();
      mtDatapp.Handlelpanel();
      mtDatapp.Handlelpanelmenu();
      mtDatapp.Handlethemeoption();
      mtDatapp.Handlesidebareffect();
      mtDatapp.Handlesidebarposition();
      mtDatapp.Handlecontentheight();
      mtDatapp.Handlethemecolor();
      mtDatapp.Handlenavigationtype();
      mtDatapp.Handlesidebarside();
      mtDatapp.Handleactivestatemenu();
      mtDatapp.Handlethemelayout();
      mtDatapp.Handlethemebackground();
    },
    /**
     * @return {undefined}
     */
    Handlethemebackground : function() {
      /**
       * @return {undefined}
       */
      function attach() {
        $("#theme-color > a.theme-bg").on('click', function() {
          $("body").attr("theme-bg", $(this).attr("mt-themebg-type"));
        });
      }
      attach();
    },
    /**
     * @return {undefined}
     */
    Handlethemelayout : function() {
      $("#theme-layout").on('change', function() {
        if ($(this).val() == "box-layout") {
          $("body").attr("theme-layout", "box-layout");
        } else {
          $("body").attr("theme-layout", "wide-layout");
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handleactivestatemenu : function() {
      $(".panel-list li > a").on('click', function() {
        if ($("body").attr("mt-navigation-type") == "vertical" || $("body").attr("mt-navigation-type") == "vertical-compact") {
          if ($(this).parent("li.mt-has-menu").length === 0) {
            $(this).parents(".panel-list").find("li.active").removeClass("active");
            $(this).parent().addClass("active");
          }
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handlesidebarside : function() {
      $("#navigation-side").on('change', function() {
        if ($(this).val() == "rightside") {
          $("body").attr("mt-nav-placement", "right");
          $("body").attr("mt-navigation-type", "vertical");
          $("#mtapp-wrapper").removeClass("compact-hmenu");
        } else {
          $("body").attr("mt-nav-placement", "left");
          $("body").attr("mt-navigation-type", "vertical");
          $("#mtapp-wrapper").removeClass("compact-hmenu");
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handlenavigationtype : function() {
      $("#navigation-type").on('change', function() {
        if ($(this).val() == "horizontal") {
          $("body").attr("mt-navigation-type", "horizontal");
          $("#mtapp-wrapper").removeClass("compact-hmenu");
          $("#mt-header, #mtapp-container").removeClass("mt-minimized-lpanel");
          $("body").attr("mt-nav-placement", "left");
          $("#mt-header").attr("mt-color-type", "logo-bg7");
        } else {
          if ($(this).val() == "horizontal-compact") {
            $("body").attr("mt-navigation-type", "horizontal");
            $("#mtapp-wrapper").addClass("compact-hmenu");
            $("#mt-header, #mtapp-container").removeClass("mt-minimized-lpanel");
            $("body").attr("mt-nav-placement", "left");
            $("#mt-header").attr("mt-color-type", "logo-bg7");
          } else {
            if ($(this).val() == "vertical-compact") {
              $("body").attr("mt-navigation-type", "vertical-compact");
              $("#mtapp-wrapper").removeClass("compact-hmenu");
              $("#mt-header, #mtapp-container").addClass("mt-minimized-lpanel");
              $("body").attr("mt-nav-placement", "left");
            } else {
              $("body").attr("mt-navigation-type", "vertical");
              $("#mtapp-wrapper").removeClass("compact-hmenu");
              $("#mt-header, #mtapp-container").removeClass("mt-minimized-lpanel");
              $("body").attr("mt-nav-placement", "left");
            }
          }
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handlethemecolor : function() {
      /**
       * @return {undefined}
       */
      function attach() {
        $("#theme-color > a.header-bg").on('click', function() {
          $("#mt-header > .mt-right-header").attr("mt-color-type", $(this).attr("mt-color-type"));
        });
      }
      /**
       * @return {undefined}
       */
      function domReady() {
        $("#theme-color > a.lpanel-bg").on('click', function() {
          $("#mtapp-container").attr("mt-color-type", $(this).attr("mt-color-type"));
        });
      }
      /**
       * @return {undefined}
       */
      function unfold() {
        $("#theme-color > a.logo-bg").on('click', function() {
          $("#mt-header").attr("mt-color-type", $(this).attr("mt-color-type"));
        });
      }
      attach();
      domReady();
      unfold();
    },
    /**
     * @return {undefined}
     */
    Handlecontentheight : function() {
      /**
       * @return {undefined}
       */
      function shim() {
        var mobileConnectionCount = $(window).height();
        var index = $("#mt-header").innerHeight();
        var stringLength = $("#footer").innerHeight();
        /** @type {number} */
        var r20 = mobileConnectionCount - index - stringLength - 2;
        /** @type {number} */
        var restoreScript = mobileConnectionCount - index - 2;
        $("#main-content").css("min-height", r20);
        $(".inner-left-panel ").css("height", restoreScript);
      }
      shim();
      $(window).resize(function() {
        shim();
      });
    },
    /**
     * @return {undefined}
     */
    Handlesidebarposition : function() {
      $("#sidebar-position").on("change", function() {
        if ($(this).val() == "fixed") {
          $("#mt-left-panel,.mt-left-header").attr("mt-position-type", "fixed");
        } else {
          $("#mt-left-panel,.mt-left-header").attr("mt-position-type", "absolute");
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handlesidebareffect : function() {
      $("#leftpanel-effect").on('change', function() {
        if ($(this).val() == "overlay") {
          $("#mt-header, #mtapp-container").attr("mt-lpanel-effect", "overlay");
        } else {
          if ($(this).val() == "push") {
            $("#mt-header, #mtapp-container").attr("mt-lpanel-effect", "push");
          } else {
            $("#mt-header, #mtapp-container").attr("mt-lpanel-effect", "shrink");
          }
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handlethemeoption : function() {
      $(".selector-toggle > a").on('click', function() {
        $("#styleSelector").toggleClass("open");
      });
    },
    /**
     * @return {undefined}
     */
    Handlelpanelmenu : function() {
      $(".mt-has-menu > a").on("click", function() {
        var choice = $(this).closest(".mt-minimized-lpanel").length;
        if (choice === 0) {
          $(this).parent(".mt-has-menu").parent("ul").find("ul:visible").slideUp("fast");
          $(this).parent(".mt-has-menu").parent("ul").find(".opened").removeClass("opened");
          var choice2 = $(this).parent(".mt-has-menu").find(">.mt-sub-menu");
          if (choice2.is(":hidden")) {
            choice2.slideDown("fast");
            $(this).parent(".mt-has-menu").addClass("opened");
          } else {
            $(this).parent(".mt-has-menu").parent("ul").find("ul:visible").slideUp("fast");
            $(this).parent(".mt-has-menu").removeClass("opened");
          }
        }
      });
    },
    /**
     * @return {undefined}
     */
    HandleSidebartoggle : function() {
      $(".mt-sidebar-toggle a").on("click", function() {
        if ($("#mtapp-wrapper").attr("mt-device-type") !== "phone") {
          $("#mtapp-container").toggleClass("mt-minimized-lpanel");
          $("#mt-header").toggleClass("mt-minimized-lpanel");
          if ($("body").attr("mt-navigation-type") !== "vertical-compact") {
            $("body").attr("mt-navigation-type", "vertical-compact");
          } else {
            $("body").attr("mt-navigation-type", "vertical");
          }
        } else {
          if (!$("#mtapp-wrapper").hasClass("mt-hide-lpanel")) {
            $("#mtapp-wrapper").addClass("mt-hide-lpanel");
          } else {
            $("#mtapp-wrapper").removeClass("mt-hide-lpanel");
          }
        }
      });
    },
    /**
     * @return {undefined}
     */
    Handlelpanel : function() {
      /**
       * @return {undefined}
       */
      function clearMenus() {
        var marker = $(window)[0].innerWidth;
        if (marker >= 768 && marker <= 1024) {
          $("#mtapp-wrapper").attr("mt-device-type", "tablet");
          $("mt-minimized-lpanel").addClass("mt-minimized-lpanel");
          $("li.theme-option select").attr("disabled", false);
		  $("#mt-header").attr("mt-lpanel-effect", "shrink");
			$("#mtapp-container").attr("mt-lpanel-effect", "shrink");
		} else {
          if (marker < 768) {
            $("#mtapp-wrapper").attr("mt-device-type", "phone");
            $("mt-minimized-lpanel").removeClass("mt-minimized-lpanel");
            $("li.theme-option select").attr("disabled", "disabled");
			$("#mt-header").attr("mt-lpanel-effect", "overlay");
			$("#mtapp-container").attr("mt-lpanel-effect", "overlay");
          } else {
            if ($("body").attr("mt-navigation-type") !== "vertical-compact") {
              $("#mtapp-wrapper").attr("mt-device-type", "desktop");
              $("mt-minimized-lpanel").removeClass("mt-minimized-lpanel");
              $("li.theme-option select").attr("disabled", false);
			  $("#mt-header").attr("mt-lpanel-effect", "shrink");
			$("#mtapp-container").attr("mt-lpanel-effect", "shrink");
            } else {
              $("#mtapp-wrapper").attr("mt-device-type", "desktop");
              $("mt-minimized-lpanel").addClass("mt-minimized-lpanel");
              $("li.theme-option select").attr("disabled", false);
			  $("#mt-header").attr("mt-lpanel-effect", "shrink");
			$("#mtapp-container").attr("mt-lpanel-effect", "shrink");
            }
          }
        }
      }
      clearMenus();
      $(window).resize(clearMenus);
    }
  };
  mtDatapp.appinit();
});

/*!
 * rippler v0.1.1
 * http://blivesta.github.io/rippler/
 * Licensed under MIT
 * Author : blivesta
 * http://blivesta.com/
 */
(function($){"use strict";var namespace="rippler";var methods={init:function(options){options=$.extend({effectClass:"rippler-effect",effectSize:16,addElement:"div",duration:600},options);return this.each(function(){var _this=this;var $this=$(this);var data=$this.data(namespace);if(!data){options=$.extend({},options);$this.data(namespace,{options:options});if(typeof document.ontouchstart!="undefined"){$this.on("touchstart."+namespace,function(event){var $self=$(this);methods.elementAdd.call(_this,$self,event)});$this.on("touchend."+namespace,function(event){var $self=$(this);methods.effect.call(_this,$self,event)})}else{$this.on("mousedown."+namespace,function(event){var $self=$(this);methods.elementAdd.call(_this,$self,event)});$this.on("mouseup."+namespace,function(event){var $self=$(this);methods.effect.call(_this,$self,event)})}}})},template:function(options){var $this=$(this);options=$this.data(namespace).options;var element;var svgElementClass="rippler-svg";var divElementClass="rippler-div";var circle='<circle cx="'+options.effectSize+'" cy="'+options.effectSize+'" r="'+options.effectSize/2+'">';var svgElement='<svg class="'+options.effectClass+" "+svgElementClass+'" xmlns="http://www.w3.org/2000/svg" viewBox="'+options.effectSize/2+" "+options.effectSize/2+" "+options.effectSize+" "+options.effectSize+'">'+circle+"</svg>";var divElement='<div class="'+options.effectClass+" "+divElementClass+'"></div>';if(options.addElement==="svg"){element=svgElement}else{element=divElement}return element},elementAdd:function($self,event,options){var _this=this;var $this=$(this);options=$this.data(namespace).options;$self.append(methods.template.call(_this));var $effect=$self.find("."+options.effectClass);var selfOffset=$self.offset();var eventX=methods.targetX.call(_this,event);var eventY=methods.targetY.call(_this,event);$effect.css({width:options.effectSize,height:options.effectSize,left:eventX-selfOffset.left-options.effectSize/2,top:eventY-selfOffset.top-options.effectSize/2});return _this},effect:function($self,event,options){var _this=this;var $this=$(this);options=$this.data(namespace).options;var $effect=$("."+options.effectClass);var selfOffset=$self.offset();var thisW=$this.outerWidth();var thisH=$this.outerHeight();var effectMaxWidth=methods.diagonal(thisW,thisH)*2;var eventX=methods.targetX.call(_this,event);var eventY=methods.targetY.call(_this,event);$effect.css({width:effectMaxWidth,height:effectMaxWidth,left:eventX-selfOffset.left-effectMaxWidth/2,top:eventY-selfOffset.top-effectMaxWidth/2,transition:"all "+options.duration/1e3+"s ease-out"});return methods.elementRemove.call(_this)},elementRemove:function(options){var _this=this;var $this=$(this);options=$this.data(namespace).options;var $effect=$("."+options.effectClass);setTimeout(function(){$effect.css({opacity:0,transition:"all "+options.duration/1e3+"s ease-out"});setTimeout(function(){$effect.remove()},options.duration*1.5)},options.duration);return _this},targetX:function(event){var e=event.originalEvent;var eventX;if(typeof document.ontouchstart!="undefined"){eventX=e.changedTouches[0].pageX}else{eventX=e.pageX}return eventX},targetY:function(event){var e=event.originalEvent;var eventY;if(typeof document.ontouchstart!="undefined"){eventY=e.changedTouches[0].pageY}else{eventY=e.pageY}return eventY},diagonal:function(x,y){if(x>0&&y>0)return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));else return false},destroy:function(){return this.each(function(){var $this=$(this);$(window).unbind("."+namespace);$this.removeData(namespace)})}};$.fn.rippler=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof method==="object"||!method){return methods.init.apply(this,arguments)}else{$.error("Method "+method+" does not exist on jQuery."+namespace)}}})(jQuery);

$(document).ready(function() {
	$(".rippler").rippler({
		effectClass      :  'rippler-effect'
		,effectSize      :  16      // Default size (width & height)
		,addElement      :  'div'   // e.g. 'svg'(feature)
		,duration        :  400
	});
});

$(document).ready(function(){												
       
       //Navigation Menu Slider
        $('.nav-expand').on('click',function(e){
      		e.preventDefault();
      		$('body').toggleClass('nav-expanded');
      	});
      	$('.nav-close').on('click',function(e){
      		e.preventDefault();
      		$('body').removeClass('nav-expanded');
      	});
		
	  });

(function($) {

  $.fn.extend({
    slimScroll: function(options) {

      var defaults = {

        // width in pixels of the visible scroll area
        width : 'auto',

        // height in pixels of the visible scroll area
        height : '250px',

        // width in pixels of the scrollbar and rail
        size : '7px',

        // scrollbar color, accepts any hex/color value
        color: '#000',

        // scrollbar position - left/right
        position : 'right',

        // distance in pixels between the side edge and the scrollbar
        distance : '1px',

        // default scroll position on load - top / bottom / $('selector')
        start : 'top',

        // sets scrollbar opacity
        opacity : .4,

        // enables always-on mode for the scrollbar
        alwaysVisible : false,

        // check if we should hide the scrollbar when user is hovering over
        disableFadeOut : false,

        // sets visibility of the rail
        railVisible : false,

        // sets rail color
        railColor : '#333',

        // sets rail opacity
        railOpacity : .2,

        // whether  we should use jQuery UI Draggable to enable bar dragging
        railDraggable : true,

        // defautlt CSS class of the slimscroll rail
        railClass : 'slimScrollRail',

        // defautlt CSS class of the slimscroll bar
        barClass : 'slimScrollBar',

        // defautlt CSS class of the slimscroll wrapper
        wrapperClass : 'slimScrollDiv',

        // check if mousewheel should scroll the window if we reach top/bottom
        allowPageScroll : false,

        // scroll amount applied to each mouse wheel step
        wheelStep : 20,

        // scroll amount applied when user is using gestures
        touchScrollStep : 200,

        // sets border radius
        borderRadius: '7px',

        // sets border radius of the rail
        railBorderRadius : '7px'
      };

      var o = $.extend(defaults, options);

      // do it for every element that matches selector
      this.each(function(){

      var isOverPanel, isOverBar, isDragg, queueHide, touchDif,
        barHeight, percentScroll, lastScroll,
        divS = '<div></div>',
        minBarHeight = 30,
        releaseScroll = false;

        // used in event handlers and for better minification
        var me = $(this);

        // ensure we are not binding it again
        if (me.parent().hasClass(o.wrapperClass))
        {
            // start from last bar position
            var offset = me.scrollTop();

            // find bar and rail
            bar = me.parent().find('.' + o.barClass);
            rail = me.parent().find('.' + o.railClass);

            getBarHeight();

            // check if we should scroll existing instance
            if ($.isPlainObject(options))
            {
              // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
              if ( 'height' in options && options.height == 'auto' ) {
                me.parent().css('height', 'auto');
                me.css('height', 'auto');
                var height = me.parent().parent().height();
                me.parent().css('height', height);
                me.css('height', height);
              }

              if ('scrollTo' in options)
              {
                // jump to a static point
                offset = parseInt(o.scrollTo);
              }
              else if ('scrollBy' in options)
              {
                // jump by value pixels
                offset += parseInt(o.scrollBy);
              }
              else if ('destroy' in options)
              {
                // remove slimscroll elements
                bar.remove();
                rail.remove();
                me.unwrap();
                return;
              }

              // scroll content by the given offset
              scrollContent(offset, false, true);
            }

            return;
        }
        else if ($.isPlainObject(options))
        {
            if ('destroy' in options)
            {
            	return;
            }
        }

        // optionally set height to the parent's height
        o.height = (o.height == 'auto') ? me.parent().height() : o.height;

        // wrap content
        var wrapper = $(divS)
          .addClass(o.wrapperClass)
          .css({
            position: 'relative',
            overflow: 'hidden',
            width: o.width,
            height: o.height
          });

        // update style for the div
        me.css({
          overflow: 'hidden',
          width: o.width,
          height: o.height
        });

        // create scrollbar rail
        var rail = $(divS)
          .addClass(o.railClass)
          .css({
            width: o.size,
            height: '100%',
            position: 'absolute',
            top: 0,
            display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
            'border-radius': o.railBorderRadius,
            background: o.railColor,
            opacity: o.railOpacity,
            zIndex: 90
          });

        // create scrollbar
        var bar = $(divS)
          .addClass(o.barClass)
          .css({
            background: o.color,
            width: o.size,
            position: 'absolute',
            top: 0,
            opacity: o.opacity,
            display: o.alwaysVisible ? 'block' : 'none',
            'border-radius' : o.borderRadius,
            BorderRadius: o.borderRadius,
            MozBorderRadius: o.borderRadius,
            WebkitBorderRadius: o.borderRadius,
            zIndex: 99
          });

        // set position
        var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
        rail.css(posCss);
        bar.css(posCss);

        // wrap it
        me.wrap(wrapper);

        // append to parent div
        me.parent().append(bar);
        me.parent().append(rail);

        // make it draggable and no longer dependent on the jqueryUI
        if (o.railDraggable){
          bar.bind("mousedown", function(e) {
            var $doc = $(document);
            isDragg = true;
            t = parseFloat(bar.css('top'));
            pageY = e.pageY;

            $doc.bind("mousemove.slimscroll", function(e){
              currTop = t + e.pageY - pageY;
              bar.css('top', currTop);
              scrollContent(0, bar.position().top, false);// scroll content
            });

            $doc.bind("mouseup.slimscroll", function(e) {
              isDragg = false;hideBar();
              $doc.unbind('.slimscroll');
            });
            return false;
          }).bind("selectstart.slimscroll", function(e){
            e.stopPropagation();
            e.preventDefault();
            return false;
          });
        }

        // on rail over
        rail.hover(function(){
          showBar();
        }, function(){
          hideBar();
        });

        // on bar over
        bar.hover(function(){
          isOverBar = true;
        }, function(){
          isOverBar = false;
        });

        // show on parent mouseover
        me.hover(function(){
          isOverPanel = true;
          showBar();
          hideBar();
        }, function(){
          isOverPanel = false;
          hideBar();
        });

        // support for mobile
        me.bind('touchstart', function(e,b){
          if (e.originalEvent.touches.length)
          {
            // record where touch started
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        me.bind('touchmove', function(e){
          // prevent scrolling the page if necessary
          if(!releaseScroll)
          {
  		      e.originalEvent.preventDefault();
		      }
          if (e.originalEvent.touches.length)
          {
            // see how far user swiped
            var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
            // scroll content
            scrollContent(diff, true);
            touchDif = e.originalEvent.touches[0].pageY;
          }
        });

        // set up initial height
        getBarHeight();

        // check start position
        if (o.start === 'bottom')
        {
          // scroll content to bottom
          bar.css({ top: me.outerHeight() - bar.outerHeight() });
          scrollContent(0, true);
        }
        else if (o.start !== 'top')
        {
          // assume jQuery selector
          scrollContent($(o.start).position().top, null, true);

          // make sure bar stays hidden
          if (!o.alwaysVisible) { bar.hide(); }
        }

        // attach scroll events
        attachWheel();

        function _onWheel(e)
        {
          // use mouse wheel only when mouse is over
          if (!isOverPanel) { return; }

          var e = e || window.event;

          var delta = 0;
          if (e.wheelDelta) { delta = -e.wheelDelta/120; }
          if (e.detail) { delta = e.detail / 3; }

          var target = e.target || e.srcTarget || e.srcElement;
          if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
            // scroll content
            scrollContent(delta, true);
          }

          // stop window scroll
          if (e.preventDefault && !releaseScroll) { e.preventDefault(); }
          if (!releaseScroll) { e.returnValue = false; }
        }

        function scrollContent(y, isWheel, isJump)
        {
          releaseScroll = false;
          var delta = y;
          var maxTop = me.outerHeight() - bar.outerHeight();

          if (isWheel)
          {
            // move bar with mouse wheel
            delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();

            // move bar, make sure it doesn't go out
            delta = Math.min(Math.max(delta, 0), maxTop);

            // if scrolling down, make sure a fractional change to the
            // scroll position isn't rounded away when the scrollbar's CSS is set
            // this flooring of delta would happened automatically when
            // bar.css is set below, but we floor here for clarity
            delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

            // scroll the scrollbar
            bar.css({ top: delta + 'px' });
          }

          // calculate actual scroll amount
          percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
          delta = percentScroll * (me[0].scrollHeight - me.outerHeight());

          if (isJump)
          {
            delta = y;
            var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
            offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
            bar.css({ top: offsetTop + 'px' });
          }

          // scroll content
          me.scrollTop(delta);

          // fire scrolling event
          me.trigger('slimscrolling', ~~delta);

          // ensure bar is visible
          showBar();

          // trigger hide when scroll is stopped
          hideBar();
        }

        function attachWheel()
        {
          if (window.addEventListener)
          {
            this.addEventListener('DOMMouseScroll', _onWheel, false );
            this.addEventListener('mousewheel', _onWheel, false );
          }
          else
          {
            document.attachEvent("onmousewheel", _onWheel)
          }
        }

        function getBarHeight()
        {
          // calculate scrollbar height and make sure it is not too small
          barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
          bar.css({ height: barHeight + 'px' });

          // hide scrollbar if content is not long enough
          var display = barHeight == me.outerHeight() ? 'none' : 'block';
          bar.css({ display: display });
        }

        function showBar()
        {
          // recalculate bar height
          getBarHeight();
          clearTimeout(queueHide);

          // when bar reached top or bottom
          if (percentScroll == ~~percentScroll)
          {
            //release wheel
            releaseScroll = o.allowPageScroll;

            // publish approporiate event
            if (lastScroll != percentScroll)
            {
                var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                me.trigger('slimscroll', msg);
            }
          }
          else
          {
            releaseScroll = false;
          }
          lastScroll = percentScroll;

          // show only when required
          if(barHeight >= me.outerHeight()) {
            //allow window scroll
            releaseScroll = true;
            return;
          }
          bar.stop(true,true).fadeIn('fast');
          if (o.railVisible) { rail.stop(true,true).fadeIn('fast'); }
        }

        function hideBar()
        {
          // only hide when options allow it
          if (!o.alwaysVisible)
          {
            queueHide = setTimeout(function(){
              if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg)
              {
                bar.fadeOut('slow');
                rail.fadeOut('slow');
              }
            }, 1000);
          }
        }

      });

      // maintain chainability
      return this;
    }
  });

  $.fn.extend({
    slimscroll: $.fn.slimScroll
  });

})(jQuery);

    function a() {
                $("#tab2").addClass("chat-opened");
            }

            function b() {
                $("#tab2").removeClass("chat-opened");
            }

            function c(a, b) {
                var c = $('<li class="' + (b ? "self" : "friend") + '"></li>');
                "" != a && ($('<div class="msg">' + a + "</div>").appendTo(c), c.appendTo(i), j.stop().animate({
                    scrollTop: j.prop("scrollHeight")
                }, 900, "swing"))
            }
            var d = $(".off-canvas-right .tab-pane .chat"),
                e = $(".chat-contacts", d),
                f = $(".chat-window", d),
                h = $(".chat-messages", f),
                i = $(".content > ul", h),
                j = $(".nano-content", h),
                k = $(".chat-input", f),
                l = $("input", k),aaa
                m = $(".send-msg", k);
    

			$(".user a").click(function(b) {
				a(), b.preventDefault()
            });
			$("#return").click(function(a) {
                b()
            });
        