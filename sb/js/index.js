$(document).ready(function () {


    $('.index-info__exchange-list').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 8000,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: 'linear',

    });

    $('.cta__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        infinite: false,
        vertical: true,
        verticalSwiping: true,
    });
    
    $('.cta__slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.cta-nav__item--active').removeClass('cta-nav__item--active');
        $('.cta-nav__item').eq(nextSlide).addClass('cta-nav__item--active');
    });



    $('.cta-nav__item').click(function () {
        var slideno = $(this).attr('data-slide');
        $('.cta__slider').slick('slickGoTo', slideno);
        $('.cta-nav__item').removeClass("cta-nav__item--active");
        $(this).addClass("cta-nav__item--active");
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


    $(".tabs-nav__link").click(function (e) {
        e.preventDefault();
        var tabId = $(this).attr('data-tab');
        $(".tabs-nav__link").removeClass('tabs-nav__link--active');
        $(this).addClass('tabs-nav__link--active');
        $(".tab").css("display", 'none');
        $('#' + tabId).fadeIn(700);
    });





    var acc = document.getElementsByClassName('faq-list__item');
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function () {

            this.classList.toggle("faq-list__item--active");

            var panel = this.children[2];
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }









});