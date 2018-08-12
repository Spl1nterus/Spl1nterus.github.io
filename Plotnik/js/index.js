$(document).ready(function(){
$('.page-header__btn').on('click', function(e) {
  e.preventDefault();
  $(this).toggleClass('page-header__btn--active');
  $('.header-nav__list').toggleClass('header-nav__list--active');
  $('.page-header').toggleClass('page-header--active');
});
});













