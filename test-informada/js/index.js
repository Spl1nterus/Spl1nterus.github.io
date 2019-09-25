$(document).ready(function () {


  $('.search__icon, .search__close').click(function () {
    $(this).closest('.header-nav__search').toggleClass('header-nav__search--active');
  })


  $('#header__burger').click(function (e) {
    e.preventDefault();
     $(this).addClass('header__burger--active');
    $('#mobile-menu').addClass('mobile-menu--active');
  })

    $('#mobile-menu__close').click(function (e) {
      e.preventDefault();
      $('#header__burger').removeClass('header__burger--active');
      $('#mobile-menu').removeClass('mobile-menu--active');
    })



});