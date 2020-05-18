function TimeConverter(targetClass) {
    var timeElementsArray = document.getElementsByClassName(targetClass);
    for (var i = 0; i < timeElementsArray.length; i++) {
        var item = timeElementsArray[i];
        var jsDate = new Date(item.innerText);
        item.innerText = jsDate.toString();
    }
}
function FormatDateToHuman(targetClass) {
    TimeConverter(targetClass);
    var timeElementsArray = document.getElementsByClassName(targetClass);
    for (var i = 0; i < timeElementsArray.length; i++) {
        var item = timeElementsArray[i];
        var nowDate = new Date;
        var yesterdayDate = new Date;
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        var jsDate = new Date(item.innerText);
        var dd = jsDate.getDate().toString();
        var mm = (jsDate.getMonth() + 1).toString();
        var hh = jsDate.getHours().toString();
        var minutes = jsDate.getMinutes().toString();
        var yyyy = jsDate.getFullYear();
        if (jsDate.getDate() < 10) {
            dd = '0' + dd;
        }
        if (jsDate.getMonth() + 1 < 10) {
            mm = '0' + mm;
        }
        if (jsDate.getHours() < 10) {
            hh = '0' + hh;
        }
        if (jsDate.getMinutes() < 10) {
            minutes = '0' + minutes;
        }
        var dateFormat = dd + '.' + mm + '.' + yyyy;
        var timeFormat = hh + ':' + minutes;
        if (nowDate.getFullYear() === jsDate.getFullYear() && nowDate.getMonth() === jsDate.getMonth() && nowDate.getDate() === jsDate.getDate()) {
            dateFormat = "сегодня в";
        }
        else if (yesterdayDate.getFullYear() === jsDate.getFullYear() && yesterdayDate.getMonth() === jsDate.getMonth() && yesterdayDate.getDate() === jsDate.getDate()) {
            dateFormat = "вчера в";
        }
        else if (nowDate.getFullYear() === jsDate.getFullYear()) {
            dateFormat = dd + '.' + mm + ' в';
        }
        item.innerText = dateFormat + " " + timeFormat;
        item.classList.remove('text-white');
    }
}
//# sourceMappingURL=TimeConverter.js.map