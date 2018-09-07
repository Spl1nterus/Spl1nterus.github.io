$(window).on('load', function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		$('body').addClass('ios');
	};
	$('body').removeClass('loaded'); 
});

$(function(){


	/* ---------------------------------------------- /*
	 * Play Video
	/* ---------------------------------------------- */

	$('.video__play').on('click', function(){
		var dataYoutubeLink = $(this).parents('.js-video').attr('data-youtube-link');
		$(this).parents('.js-video').html('<iframe class="video-frame" src="https://www.youtube.com/embed/'+ dataYoutubeLink +'?autoplay=1" allowfullscreen></iframe>');
		$('.js-video').addClass('active');
	});

	/* ---------------------------------------------- /*
	 * Reviews Slider
	/* ---------------------------------------------- */
	if($('.reviews-slider').length){
		$('.reviews-slider').slick({
			dots: true,
			arrows: false,
			fade: true,
			adaptiveHeight: true
		});

	};

	/* ---------------------------------------------- /*
	 * Open Mobile Menu
	/* ---------------------------------------------- */
	$('.navbar-toggle').on('click', function(){
		$(this).toggleClass('active');
		$('.navbar-list').toggleClass('open');
	})
	
	/* ---------------------------------------------- /*
	 * Fixed Header
	/* ---------------------------------------------- */
		
	$(".header").removeClass("fixed");
	$(window).on('scroll load', function(){

		var homeHeight = $('.sec-home').innerHeight();
		if ($(this).scrollTop() > homeHeight) {
			$(".header").addClass("fixed");
		} else {
			 $(".header").removeClass("fixed");
		};

	});

	$(".header").removeClass("fixed");
	$(window).on('scroll load', function(){

		var homeHeight = $('.form__bg').innerHeight();
		if ($(this).scrollTop() > homeHeight) {
			$(".header").addClass("fixed");
		} else {
			 $(".header").removeClass("fixed");
		};

	});

	/* ---------------------------------------------- /*
	 * Animation
	/* ---------------------------------------------- */
	AOS.refresh(true)
});

   


