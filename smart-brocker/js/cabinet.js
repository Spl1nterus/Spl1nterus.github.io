$(document).ready(function () {

  $('.ref-link__icon').on('click', function () {
    $(this).addClass('visibility-hidden');
  });


  $('.custom-select__option input').change(function () {
    $('.custom-select').removeClass('custom-select--active');
  });

  $('.custom-select').click(function () {
    $(this).addClass('custom-select--active');
    $(this).mouseleave(function () {
      $('.custom-select').removeClass('custom-select--active');
    });
  });


  $('.form input').change(function () {
    $(this).addClass('form__input--active');
  });


  $(".chat__textarea").on('change keyup paste', function () {
    $('.chat__submit').addClass('chat__submit--active');
  });

  $('#forgot-btn').click(function (e) {
    e.preventDefault();
    $(this).parents('.autorisation__form').css("display", "none");
    $('.autorisation__popup').fadeIn(1000);
  });


  $('.header__btn').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('header__btn--active');
    $('.mobile-menu').addClass('mobile-menu--active');
  });

  $('.mobile-menu__close').click(function () {
    $('.mobile-menu').removeClass('mobile-menu--active');
    $('.header__btn').removeClass('header__btn--active');
  });


  $('.ref-list').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 1,
    dots: true,
    arrows: false,
    infinite: true,
    responsive: [{
        breakpoint: 9999,
        settings: "unslick",
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  });




})

var acc = document.getElementsByClassName('history-table__row');
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].onclick = function () {

    this.classList.toggle("history-table__row--active");

    var panel = this.children[0].children[1];
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  }
}