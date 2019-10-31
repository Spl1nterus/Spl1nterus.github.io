$(document).ready(function () {


  /* Слайдеры */
  $('.index-heading__slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    prevArrow: '<div class="index-heading__prev"><svg  role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg></div>',
    nextArrow: '<div class="index-heading__next"><svg  role="img" width="9" height="16"><use xlink:href="img/sprite.svg#arrow"></use></svg></div>',
     responsive: [{
      breakpoint: 767,
      settings: {
        arrows: false,
      }
    }]

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
        breakpoint: 767,
        settings: {
          arrows: false,
        }
      }]

    });




  /* Слайдеры */


  /* Дропдауны */
  var acc = document.getElementsByClassName('dropdown-btn');
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function (e) {
      e.preventDefault();
      var id = $(this).attr('data-dropdown');
      var panel = document.querySelector('#' + id);
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        this.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + "px";
      }

    }
  }
  /* Дропдауны */


  /* Галлерея */
  $(".gallery__block").fancybox()
  /* Галлерея */





  /* Закрытие модалок */
  $('.overlay-close').click(function (e) {
    e.preventDefault();
    $(".overlay").fadeOut('400');
    $(this).parents('.popup').fadeOut('400');
  });
  /* Закрытие модалок */





});