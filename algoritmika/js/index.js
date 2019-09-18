$(document).ready(function () {

    /* Сролл шапки */
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 300) {
            $('.header').addClass('header--fixed');
        } else {
            $('.header').removeClass('header--fixed');
        }
    });
    /* Сролл шапки */


    /* Слайдеры */
    $('.reviews__slider').slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        variableWidth: true,
        responsive: [{
            breakpoint: 1520,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }]

    });


    /* Слайдеры */

    
    /* Галлерея */
    $(".gallery__block").fancybox()
    /* Галлерея */


    /* Плавный скрол якоря */
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
         $('.mobile-menu').removeClass('mobile-menu--active');
         $('.header__burger').removeClass('header__burger--active');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 60
        }, 1500);

    });

    /* Плавный скрол якоря */


    /* Закрытие модалок */
    $('.overlay-close').click(function (e) {
        e.preventDefault();
        $(".overlay").fadeOut('400');
        $(this).parents('.popup').fadeOut('400');
    });


    $(document).mouseup(function (e) { // событие клика по веб-документу
        var div = $(".modal"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            &&
            div.has(e.target).length === 0) { // и не по его дочерним элементам
            $(".overlay").fadeOut('400');
            div.fadeOut('400'); // скрываем его
        }
    });
    /* Закрытие модалок */



    /* Мобильное меню */

    $('.header__burger').click(function (e) {
        e.preventDefault();
        $(this).addClass('header__burger--active');
        $('.mobile-menu').addClass('mobile-menu--active');
    });

    $('.mobile-menu__close').click(function () {
        $('.mobile-menu').removeClass('mobile-menu--active');
        $('.header__burger').removeClass('header__burger--active');
    });

    /* Мобильное меню */

});