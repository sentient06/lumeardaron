//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var base = new Base();

    var englishNormal   = base.issetElementId("shireEnglishNormal");

    var calendar             = calendar || new Calendar();
    var gregorianAbsoluteDay = gregorianAbsoluteDay || calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var gondorCalendar       = calendar.assembleNumenoreanCalendar(gregorianAbsoluteDay);

    var months               = [1, 30, 30, 30, 30, 30, 30, 1, 1];
    var monthsEnglishNormal  = [
        '2 Yule',
        'Afteryule',
        'Solmath',
        'Rethe',
        'Astron',
        'Thrimidge',
        'Forelithe',
        '1 Lithe',
        'Midyear\'s Day'
    ];
    if (gondorCalendar.leapYear) {
        months.push(1);
        monthsEnglishNormal.push('Overlithe');
    }
    months.push(1, 30, 30, 30, 30, 30, 30, 1);
    monthsEnglishNormal.push(
        '2 Lithe',
        'Afterlithe',
        'Wedmath',
        'Halimath',
        'Winterfilth',
        'Blotmath',
        'Foreyule',
        '1 Yule'
    );

    var monthCounter = 0;
    var dayCounter   = 0;

    while (monthCounter < months.length) {
        if (dayCounter + months[monthCounter] >= gondorCalendar.day) {
            break;
        }
        dayCounter += months[monthCounter];
        monthCounter++;
    }

    var formattedYear  = gondorCalendar.year;
    var formattedDay   = gondorCalendar.day - dayCounter;

    /**
     * Writes date to DOM
     */
    var writeDate = function(param) {
        var dateText     = "";
        var dateTextNode = null;
        if (months[monthCounter] !== 1) {
            dateText  = param.tengwar ? tengwarHandler.decimal(formattedDay) : formattedDay;
            dateText += param.separators[0];
        }
        dateText += param.months[monthCounter] + param.separators[1];
        if (param.tengwar) {
            dateText += tengwarHandler.decimal(formattedYear);
        } else {
            dateText += formattedYear;
        }
        dateTextNode = document.createTextNode(dateText);
        document.getElementById(param.element).appendChild(dateTextNode);
    }

    // Write to DOM:
    if (englishNormal) {
        writeDate({
            tengwar: false,
            months: monthsEnglishNormal,
            element: "shireEnglishNormal",
            separators: [' of ', ' of ']
        });
    }

},false);
})();
