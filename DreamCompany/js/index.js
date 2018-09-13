$(document).ready(function(){	

$('.reviews__slider-wrapper').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
      prevArrow: '<img class="slick-arrow__left" src="img/sliderBefore.png">',
      nextArrow: '<img class="slick-arrow__right" src="img/sliderAfter.png">',
   });

});

$('.parallax').parallaxed({
start: 'always',

});
		