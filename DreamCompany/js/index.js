$(document).ready(function () {
  $('.reviews__slider-wrapper').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<img class="slick-arrow__left" src="img/sliderBefore.png">',
    nextArrow: '<img class="slick-arrow__right" src="img/sliderAfter.png">',
    responsive: [{
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        dots: true,
        arrows: false
      }
    }, ]

  });

  $(".full-text__btn").on('click', function (e) {
    e.preventDefault();
    $(".full-text__btn").removeClass('offer__button--not-active');
    $(".base-text__btn").addClass('offer__button--not-active');
    $(".offer__item").removeClass('offer__item--fade');
    $(".offer__base-text").css("display", "none");
    $(".offer__full-text").css("display", "block");
    $('.offer__text').addClass('magictime vanishIn');
    $(".full-text__btn").prop('disabled', true);
    $(".base-text__btn").prop('disabled', true);
    setTimeout(function () {
      $('.offer__text').delay(2000).removeClass("vanishIn");
      $('.offer__text').delay(2000).removeClass("magictime");
      $(".full-text__btn").prop('disabled', false);
      $(".base-text__btn").prop('disabled', false);
    }, 2000);
  });
  $(".base-text__btn").on('click', function (e) {
    e.preventDefault();
    $(".base-text__btn").removeClass('offer__button--not-active');
    $(".full-text__btn").addClass('offer__button--not-active');
    $(".offer__item:nth-child(n+3)").addClass('offer__item--fade');
    $(".offer__full-text").css("display", "none");
    $(".offer__base-text").css("display", "block");
    $('.offer__text').addClass('magictime vanishIn');
    $(".full-text__btn").prop('disabled', true);
    $(".base-text__btn").prop('disabled', true);
    setTimeout(function () {
      $('.offer__text').delay(2000).removeClass("vanishIn");
      $('.offer__text').delay(2000).removeClass("magictime");
      $(".full-text__btn").prop('disabled', false);
      $(".base-text__btn").prop('disabled', false);
    }, 2000);
  });
  $('.parallax').parallaxed({
    start: 'always',
  });
  var wow = new WOW();
  wow.init();
  var $body = $('body');
  var $box = $('.box');
  for (var i = 0; i < 20; i++) {
    $box.clone().appendTo($body);
  }
  WOW.prototype.addBox = function (element) {
    this.boxes.push(element);
  };
  var wow = new WOW();
  wow.init();
  $('.wow').on('scrollSpy:exit', function () {
    $(this).css({
      'visibility': 'hidden',
      'animation-name': 'none'
    }).removeClass('animated');
    wow.addBox(this);
  }).scrollSpy();
});