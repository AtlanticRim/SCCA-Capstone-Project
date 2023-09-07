$(document).ready(function() {


    if (localStorage.getItem('popStateC') != 'visited') {
        setTimeout(function () {
            $.featherlight($('#donate-popup'));
            localStorage.setItem('popStateC', 'visited');
        }, 300);
    };
    

	$('.menu-expand').click(function(){
		$('.nav-button').toggle();
		$('.mobile-menu').slideToggle();
	});

	$('.mobile-sub-expand').click(function(){
		$(this).toggleClass('fa-plus-circle');
		$(this).toggleClass('fa-minus-circle');	
		$(this).closest("li").children('.mobile-sub').toggleClass('active');	
	});

    // cancer plan nav
    $('.nav-toggle').click(function () {
        var that = this;

        if ($(that).hasClass('active')) {
            $(that).find('img').attr('src', '/img/nav-open-01.svg');
            $(that).next('.nav-container').removeClass('active');
            $(that).removeClass('active')
        } else {
            $(that).find('img').attr('src', '/img/nav-close-01.svg')
            $(that).next('.nav-container').addClass('active');
            $(that).addClass('active')
        }
    });

	$('.accordion').each(function () {
	    var that = this;

	    $(this).find('.accordion-heading').click(function () {
            
	        if($(that).hasClass('active')) {
	            $('.accordion').removeClass('active');
	            $('.accordion-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');
	        } else {

	            $('.accordion').removeClass('active');
	            $('.accordion-icon').removeClass('fa-chevron-up').addClass('fa-chevron-down');

	            $(that).addClass('active');
	            $(that).find('.accordion-icon').addClass('fa-chevron-up').removeClass('fa-chevron-down');
	        }
	    });
	});


    //Cancer Plan Tab Sections

    $('.process-tab').click(function () {
        var tabName = $(this).data('target');

        //remove active class from all tabs and add class to currently selected tab
        $('.process-tab').removeClass('active');
        $(this).addClass('active');

        //remove active class from all info boxes then add active class to currently selected tab content
        $('.mobile-process').removeClass('active');
        $('.process-info').removeClass('active');
        $("." + tabName + "").addClass('active');
    });

    $('.changes-tab').click(function () {
        var tabName = $(this).data('target');

        //remove active class from all tabs and add class to currently selected tab
        $('.changes-tab').removeClass('active');
        $(this).addClass('active');

        //remove active class from all info boxes then add active class to currently selected tab content
        $('.mobile-changes').removeClass('active');
        $('.changes-info').removeClass('active');
        $("." + tabName + "").addClass('active');
    });

    // Timeline- https://codepen.io/alanhouser/pen/PzpBpm
    $(document).ready(function ($) {
        var $timeline_block = $('.cd-timeline-block');

        //hide timeline blocks which are outside the viewport
        $timeline_block.each(function () {
            if ($(this).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
                $(this).find('.cd-timeline-dot, .cd-timeline-content').addClass('is-hidden');
            }
        });

        //on scolling, show/animate timeline blocks when enter the viewport
        $(window).on('scroll', function () {
            $timeline_block.each(function () {
                if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(this).find('.cd-timeline-dot').hasClass('is-hidden')) {
                    $(this).find('.cd-timeline-dot, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                }
            });
        });
    });


	var slidesWrapper = $('.hero-slider');

	//check if a .hero-slider exists in the DOM 
	if ( slidesWrapper.length > 0 ) {
		var primaryNav = $('.hero-slider-primary-nav'),
			sliderNav = $('.hero-slider-slider-nav'),
			navigationMarker = $('.hero-slider-marker'),
			slidesNumber = slidesWrapper.children('li').length,
			visibleSlidePosition = 0,
			autoPlayId,
			autoPlayDelay = 5000;

		//upload videos (if not on mobile devices)
		uploadVideo(slidesWrapper);

		//autoplay slider
		setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

		//on mobile - open/close primary navigation clicking/tapping the menu icon
		primaryNav.on('click', function(event){
			if($(event.target).is('.hero-slider-primary-nav')) $(this).children('ul').toggleClass('is-visible');
		});
		
		//change visible slide
		sliderNav.on('click', 'li', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if(!selectedItem.hasClass('selected')) {
				// if it's not already selected
				var selectedPosition = selectedItem.index(),
					activePosition = slidesWrapper.find('li.selected').index();
				
				if( activePosition < selectedPosition) {
					nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				} else {
					prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
				}

				//this is used for the autoplay
				visibleSlidePosition = selectedPosition;

				updateSliderNavigation(sliderNav, selectedPosition);
				updateNavigationMarker(navigationMarker, selectedPosition+1);
				//reset autoplay
				setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
			}
		});
	}

	function nextSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function prevSlide(visibleSlide, container, pagination, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
		checkVideo(visibleSlide, container, n);
	}

	function updateSliderNavigation(pagination, n) {
		var navigationDot = pagination.find('.selected');
		navigationDot.removeClass('selected');
		pagination.find('li').eq(n).addClass('selected');
	}

	function setAutoplay(wrapper, length, delay) {
		if(wrapper.hasClass('autoplay')) {
			clearInterval(autoPlayId);
			autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
		}
	}

	function autoplaySlider(length) {
		if( visibleSlidePosition < length - 1) {
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
			visibleSlidePosition +=1;
		} else {
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
			visibleSlidePosition = 0;
		}
		updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
		updateSliderNavigation(sliderNav, visibleSlidePosition);
	}

	function uploadVideo(container) {
		container.find('.hero-slider-bg-video-wrapper').each(function(){
			var videoWrapper = $(this);
			if( videoWrapper.is(':visible') ) {
				// if visible - we are not on a mobile device 
				var	videoUrl = videoWrapper.data('video'),
					video = $('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');
				video.appendTo(videoWrapper);
				// play video if first slide
				if(videoWrapper.parent('.hero-slider-bg-video.selected').length > 0) video.get(0).play();
			}
		});
	}

	function checkVideo(hiddenSlide, container, n) {
		//check if a video outside the viewport is playing - if yes, pause it
		var hiddenVideo = hiddenSlide.find('video');
		if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();

		//check if the select slide contains a video element - if yes, play the video
		var visibleVideo = container.children('li').eq(n).find('video');
		if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
	}

	function updateNavigationMarker(marker, n) {
		marker.removeClassPrefix('item').addClass('item-'+n);
	}

	$.fn.removeClassPrefix = function(prefix) {
		//remove all classes starting with 'prefix'
	    this.each(function(i, el) {
	        var classes = el.className.split(" ").filter(function(c) {
	            return c.lastIndexOf(prefix, 0) !== 0;
	        });
	        el.className = $.trim(classes.join(" "));
	    });
	    return this;
	};
});

function fireEvent(element, event) {
  if (document.createEventObject) {
    var evt = document.createEventObject();
    return element.fireEvent('on' + event, evt)
  }
  else {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent(event, false, true);
    return !element.dispatchEvent(evt);
  }
}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};