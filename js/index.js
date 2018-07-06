$(document).ready(function(){	
$('.menu-btn').on('click', function(e) {
  e.preventDefault;
  $('.product-card').addClass('product-card--hide');
	 $('.product-form').addClass('product-form--show');
});
$('.product-popup--close').on('click', function(e) { 
	e.preventDefault;
  $('.product-card').removeClass('product-card--hide');
	 $('.product-form').removeClass('product-form--show');
});
	
});