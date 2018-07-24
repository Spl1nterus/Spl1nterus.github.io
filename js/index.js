$('.page-header__btn').on('click', function(e) {
  e.preventDefault();
  $(this).toggleClass('page-header__btn--active');
  $('.main-nav__list').toggleClass('main-nav__list--active');
  $('.page-header').toggleClass('page-header--active');
});


if ( matchMedia('screen and (min-width: 1201px)').matches ) {
var options = {
  prevNextButtons: false,
};
  options.prevNextButtons = true;
  options.asNavFor = ".carousel-main";
  options.contain = true;
  options.pageDots = false;
  options.draggable = false;
  $('.carousel-nav').flickity( options ); 
}











