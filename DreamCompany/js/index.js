$(document).ready(function(){	

$('.reviews__slider-wrapper').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true, 
      prevArrow: '<img class="slick-arrow__left" src="img/sliderBefore.png">',
      nextArrow: '<img class="slick-arrow__right" src="img/sliderAfter.png">',
});


  $(".buttonModal").on('click', function(e) {
  e.preventDefault();
    $("#login").removeClass("fade");
    $("#login").css("display", "block");
    $("#signup").addClass("fade");
    $("#signup").css("display", "none");
});
    $(".registration__btn").on('click', function(e) {
  e.preventDefault();
    $("#login").addClass("fade");
    $("#login").css("display", "none");
    $("#signup").removeClass("fade");
    $("#signup").css("display", "block");
});
 $(".pass-restore").on('click', function(e) {
  e.preventDefault();
    $("#login").addClass("fade");
    $("#login").css("display", "none");
    $("#signup").addClass("fade");
    $("#signup").css("display", "none");
    $("#forgot").removeClass("fade");
    $("#forgot").css("display", "block");
});
 $(".close").on('click', function(e) {
  e.preventDefault();
    $("#login").addClass("fade");
    $("#login").css("display", "none");
    $("#signup").addClass("fade");
    $("#signup").css("display", "none");
    $("#forgot").addClass("fade");
    $("#forgot").css("display", "none");
});
 
 
    $(".modal").click( function(event){
      if( $(event.target).closest(".modal-dialog").length ) 
        return;
    $("#login").addClass("fade");
    $("#login").css("display", "none");
    $("#signup").addClass("fade");
    $("#signup").css("display", "none");
    $("#forgot").addClass("fade");
    $("#forgot").css("display", "none");
      event.stopPropagation();
    });

jQuery(function($){
  $(".modal").on('click', function (e){ 
    var div = $(".modal-content");
    if (!div.is(e.target) 
        && div.has(e.target).length === 0) { 
    $("#login").addClass("fade");
    $("#login").css("display", "none");
    $("#signup").addClass("fade");
    $("#signup").css("display", "none");
    $("#forgot").addClass("fade");
    $("#forgot").css("display", "none"); 
    }
  });
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

/* $(".parallux").parallux({
onImageLoad: 'fadeIn',
 fullHeight: true,
}); */


  var wow = new WOW();
  wow.init();
     var $body = $('body');
           var $box = $('.box');
          for (var i = 0; i < 20; i++) {
          $box.clone().appendTo($body);
            }

          // Helper function for add element box list in WOW
         WOW.prototype.addBox = function(element) {
         this.boxes.push(element);
        };

        // Init WOW.js and get instance
       var wow = new WOW();
       wow.init();

      // Attach scrollSpy to .wow elements for detect view exit events,
        // then reset elements and add again for animation
         $('.wow').on('scrollSpy:exit', function() {
        $(this).css({
         'visibility': 'hidden',
         'animation-name': 'none'
        }).removeClass('animated');
        wow.addBox(this);
       }).scrollSpy();
});

