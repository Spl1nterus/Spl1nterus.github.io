$(document).ready(function(){
$('.page-header__btn').on('click', function(e) {
  e.preventDefault();
  $(this).toggleClass('page-header__btn--active');
  $('.header-nav__list').toggleClass('header-nav__list--active');
  $('.page-header').toggleClass('page-header--active');
});
});

var options = {
  prevNextButtons: false,
};
if ( matchMedia('screen and (min-width: 1330px)').matches ) {
  options.prevNextButtons = true;
  options.asNavFor = ".carousel-main";
  options.contain = true;
  options.pageDots = false;
  options.draggable = false;
  $('.carousel-nav').flickity( options ); 
}












