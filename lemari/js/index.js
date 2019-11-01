$(document).ready(function () {


  /* Слайдеры */
  $('.index-heading__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: '<div class="index-heading__prev"><svg  role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg></div>',
    nextArrow: '<div class="index-heading__next"><svg  role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg></div>',
    responsive: [{
      breakpoint: 767,
      settings: {
        arrows: false,
      }
    }, ]

  });

  $('.similar-cases').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    prevArrow: '<svg  class="similar-cases__prev" role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg>',
    nextArrow: '<svg  class="similar-cases__next" role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg>',
    responsive: [{
        breakpoint: 1400,
        settings: {
          arrows: false,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        }
      },
    ]

  });

  $('.main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    arrows: false,
    asNavFor: '.nav-slider',
  });

  $('.nav-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.main-slider',
    focusOnSelect: true,
    dots: true,
    arrows: true,
    prevArrow: '<svg  class="nav-slider__prev" role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg>',
    nextArrow: '<svg  class="nav-slider__next" role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg>',
    responsive: [{
      breakpoint: 1199,
      settings: {
        slidesToShow: 2,
      }
    }, ]
  });



  /* Слайдеры */




  /* Дропдаун высоты */

  var acc = document.getElementsByClassName('dropdown-btn');
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function (e) {
      e.preventDefault();
      this.classList.toggle("active");
      var id = $(this).attr('data-dropdown');

      var panel = document.querySelector('#' + id);
      panel.classList.toggle("active");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }
  }
  /* Дропдаун высоты конец*/



  /* Открытие попапов */
  $('.popup-btn').click(function (e) {
    e.preventDefault();
    var popupId = $(this).attr('data-popup');
    $('.popup').fadeOut('400');
    $('.overlay').fadeIn('200');
    $('#' + popupId).fadeIn('400');
  });
  /* Открытие попапов конец*/


  /* Попап после формы */


  $('.contacts-form').submit(function (e) {
    /* Это временно */
    e.preventDefault();
    /* Это временно */

    var popupId = $(this).attr('data-popup');
    $('.popup').fadeOut('400');
    $('.overlay').fadeIn('200');
    $('#acceptance-popup').fadeIn('400');
  });
  /* Попап после формы конец*/



  /* Закрытие попапов */
  $('.popup__close').click(function (e) {
    e.preventDefault();
    $('.overlay').fadeOut('200');
    $(this).parents('.popup').fadeOut('400');
  });

  jQuery(function ($) {
    $(document).mouseup(function (e) { // событие клика по веб-документу
      var div = $(".popup"); // тут указываем ID элемента
      if (!div.is(e.target) // если клик был не по нашему блоку
        &&
        div.has(e.target).length === 0) { // и не по его дочерним элементам
        $('.overlay').fadeOut('200');
        $('.popup').fadeOut('400');
      }
    });
  });
  /* Закрытие попапов */




});