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
			$('.model-gallery__img-wrapper').slick({
				arrows: true,
				infinite: true,
				slidesToShow: 6,
				slidesToScroll: 6,
				prevArrow: '<img class="model-gallery__btn" src="../img/model-gallery__btn1.png">',
				nextArrow: '<img class="model-gallery__btn" src="../img/model-gallery__btn2.png">',
				responsive: [
					{
						breakpoint: 1350,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5,
						}
					}, 
					{
						breakpoint: 1000,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4,
						}
					},
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 3,
								slidesToScroll: 3,
							}
						},
						{
							breakpoint: 540,
							settings: {
								slidesToShow: 2,
								slidesToScroll: 2,
							}
						},
					
				]
			});

	$('.styles__img-wrapper').slick({
		arrows: true,
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		vertical: true,
		prevArrow: '<img class="styles__btn" src="../img/styles_btn1.png">',
		nextArrow: '<img class="styles__btn" src="../img/styles_btn2.png">',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},

		]
	});

	$('.styles__img').on('click', function (e) {
		e.preventDefault();
		$('.styles__img').removeClass('styles__img--active');
		$(this).addClass('styles__img--active');
	});
	


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


$(".product-nav__item").on("click", function (event) {
	event.preventDefault();
	var id = $(this).attr('href'),
		top = $(id).offset().top - 100;
	$('body,html').animate({
		scrollTop: top
	}, 1500);
});

	/* ---------------------------------------------- /*
	 * Animation
	/* ---------------------------------------------- */
	AOS.refresh(true)
});


   


