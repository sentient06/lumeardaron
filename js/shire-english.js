//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var calendar             = new Calendar();
    var gregorianAbsoluteDay = calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var shireCalendar        = calendar.assembleShireCalendar(gregorianAbsoluteDay);
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
    if (shireCalendar.leapYear) {
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
        if (dayCounter + months[monthCounter] >= shireCalendar.day) {
            break;
        }
        dayCounter += months[monthCounter];
        monthCounter++;
    }

    var formattedYear  = shireCalendar.year;
    var formattedDay   = shireCalendar.day - dayCounter;
    var formattedMonth = monthsEnglishNormal[monthCounter];

    var englishNormalReadableDate = "";

    if (months[monthCounter] !== 1) {
        englishNormalReadableDate = formattedDay + ' of ';
    }

    englishNormalReadableDate += formattedMonth + ' of ' + formattedYear;

    var englishNormalReadable = document.createTextNode(englishNormalReadableDate);
    document.getElementById("englishNormal").appendChild(englishNormalReadable);

},false);
})();
