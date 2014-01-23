//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var calendar             = new Calendar();
    var tengwarHandler       = new Tengwar();
    var gregorianAbsoluteDay = calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var gondorCalendar       = calendar.assembleNumenoreanCalendar(gregorianAbsoluteDay);
    var months               = [1, 30, 30, 30, 30, 30, 31];
    var monthsSindarinNormal = [
        'Minien',
        'Narwain',
        'Nínui',
        'Gwaeron',
        'Gwirith',
        'Lothron',
        'Nórui'
    ];
    var monthsSindarinTengwar = [
        't5%`B5$', // Minien //Maybe the "ie" should be simply "y"
        '56EyhE5', // Narwain
        '5~B5hJ',  // Nínui
        'sèlE75Y', // Gwaeron
        'sè7T3G',  // Gwirith
        'j3H75Y',  // Lothron
        '5~N7hJ'   // Nórui
    ];
    if (gondorCalendar.leapLoa) {
        months.push(1);
        monthsSindarinNormal.push('Endien');
        monthsSindarinTengwar.push('2$`B5$');
    }
    months.push(31, 30, 30, 30, 30, 30, 1);
    monthsSindarinNormal.push(
        'Cerveth',
        'Urui',
        'Ivanneth',
        'Narbeleth',
        'Hithui',
        'Girithron',
        'Penninor'
    );
    monthsSindarinTengwar.push(
        'z6Fr3F',   // Cerveth
        '7JhJ',     // Urui
        'r%5:#3F',  // Ivanneth
        '56EwjR3F', // Narbeleth
        ';93GhJ',   // Hithui
        'x7T3G75Y', // Girithron
        'q5:$5%6H'  // Penninor
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

    var formattedYear = gondorCalendar.year;
    var formattedDay  = gondorCalendar.day - dayCounter;
    var formattedMST  = monthsSindarinTengwar[monthCounter];
    var formattedMSN  = monthsSindarinNormal[monthCounter];

    var sindarinTengwarReadableDate = "";
    var sindarinNormalReadableDate  = "";
    var englishNormalReadableDate   = "";

    if (months[monthCounter] !== 1) {
        sindarinTengwarReadableDate = tengwarHandler.decimal(formattedDay) + ' hJ5 ';
        sindarinNormalReadableDate  = formattedDay.toString(12).toUpperCase() + ' uin ';
        englishNormalReadableDate   = formattedDay + ' of ';
    }

    sindarinTengwarReadableDate += formattedMST + ' hJ5 ' + tengwarHandler.decimal(formattedYear);
    sindarinNormalReadableDate  += formattedMSN + ' uin ' + formattedYear;
    englishNormalReadableDate   += formattedMSN + ' of '  + formattedYear;

    var sindarinTengwarReadable = document.createTextNode(sindarinTengwarReadableDate);
    document.getElementById("sindarinTengwar").appendChild(sindarinTengwarReadable);

    var sindarinNormalReadable  = document.createTextNode(sindarinNormalReadableDate);
    document.getElementById("sindarinNormal").appendChild(sindarinNormalReadable);

    var englishNormalReadable   = document.createTextNode(englishNormalReadableDate);
    document.getElementById("englishNormal").appendChild(englishNormalReadable);

},false);
})();
