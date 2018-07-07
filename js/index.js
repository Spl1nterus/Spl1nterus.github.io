$(document).ready(function(){	
$('.product__btn').on('click', function(e) {
  e.preventDefault;
  $('.product-card').addClass('product-card--hide');
	 $('.product-form').addClass('product-form--show');
});
$('.product-popup--close').on('click', function(e) { 
	e.preventDefault;
  $('.product-card').removeClass('product-card--hide');
	 $('.product-form').removeClass('product-form--show');
});
$('.form__button').on('click', function(e) {
  e.preventDefault;
  $('.overlay').show();
  $('.popup').show();
 });
 $(document).mouseup(function (e) {
    var container = $(".popup");
    if (container.has(e.target).length === 0){
        container.hide();
        $('.overlay').hide();
    }
});



});