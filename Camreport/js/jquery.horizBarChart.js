(function ($) {
    "use strict"; //You will be happier

    $.fn.horizBarChart = function (options) {

        var settings = $.extend({
            // default settings
            selector: '.bar',
            speed: 3000
        }, options);

        // Cycle through all charts on page
        return this.each(function () {
            // Start highest number variable as 0
            // Nowhere to go but up!
            var highestNumber = 0;

            // Set highest number and use that as 100%
            // This will always make sure the graph is a decent size and all numbers are relative to each other
            $(this).find($(settings.selector)).each(function () {
                var bar = $(this);
                var num = bar.data('number');
                if (num > highestNumber) {
                    highestNumber = num;
                }
                var percentage = Math.round(num / highestNumber * 100) + '%';
                $(this).animate({ 'width': percentage }, settings.speed);
                $(this).animate({ 'left': percentage }, settings.speed);
            });
        });

    }; // horizChart

}(jQuery));