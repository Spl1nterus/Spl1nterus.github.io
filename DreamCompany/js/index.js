$(document).ready(function(){	

$('.reviews__slider-wrapper').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
      prevArrow: '<img class="slick-arrow__left" src="img/sliderBefore.png">',
      nextArrow: '<img class="slick-arrow__right" src="img/sliderAfter.png">',
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        dots: true,
        arrows: false
      }
    },
  ]


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


 


 $(".full-text__btn").on('click', function(e) {
  e.preventDefault();
   $(".full-text__btn").removeClass('offer__button--not-active');
   $(".base-text__btn").addClass('offer__button--not-active');
   $(".offer__item").removeClass('offer__item--fade');
    $(".offer__base-text").css("display", "none");
    $(".offer__full-text").css("display", "block");
  $(".offer__full-text").addClass('animate zoomIn');
    
}); 

  $(".base-text__btn").on('click', function(e) {
  e.preventDefault();
   $(".base-text__btn").removeClass('offer__button--not-active');
   $(".full-text__btn").addClass('offer__button--not-active');
    $(".offer__item:nth-child(n+3)").addClass('offer__item--fade');
    $(".offer__full-text").css("display", "none");
    $(".offer__base-text").css("display", "block");
    $(".offer__base-text").addClass('animate zoomIn');
}); 
    
    


$('.parallax').parallaxed({
start: 'always',
});

$(".parallux").parallux({
onImageLoad: 'fadeIn',
 fullHeight: true,
 


});
var wow = new WOW;
wow.init();
});

 