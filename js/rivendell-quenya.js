//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var calendar             = new Calendar();
    var tengwarHandler       = new Tengwar();
    var gregorianAbsoluteDay = calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var elvishCalendar       = calendar.assembleElvishCalendar(gregorianAbsoluteDay);
    var seasons              = [1, 54, 72, 54, 1, 1, 1];
    var seasonQuenyaNormal   = [
        'Yestarë',
        'Tuilë',
        'Lairë',
        'Yavië',
        'Enderi 1',
        'Enderi 2',
        'Enderi 3'
    ];
    var seasonQuenyaTengwar = [
        'hÎF81D7F', // Yestarë
        '1lJj$',    // Tuilë
        'jlE7F',    // Lairë
        'hÎ~CyG`V', // Yavië
        '`V2$7G ñ', // Enderi 1
        '`V2$7G ò', // 2
        '`V2$7G ó'
    ];
    if (elvishCalendar.leapLoa) {
        seasons.push(1, 1, 1);
        seasonQuenyaNormal.push('Enderi 4', 'Enderi 5', 'Enderi 6');
        seasonQuenyaTengwar.push('`V2$7G ô', '`V2$7G õ', '`V2$7G ö');
    }
    seasons.push(54, 72, 54, 1);
    seasonQuenyaNormal.push(
        'Quellë',
        'Hrivë',
        'Coirë',
        'Mettarë'
    );
    seasonQuenyaTengwar.push(
        'zVj°R',  // Quellë
        '½7~ByF', // Hrivë
        'alH7V',  // Coirë
        't$1;E7V' // Mettarë
    );
    var seasonCounter = 0;
    var dayCounter    = 0;

    while (seasonCounter < seasons.length) {
        if (dayCounter + seasons[seasonCounter] >= elvishCalendar.day) {
            break;
        }
        dayCounter += seasons[seasonCounter];
        seasonCounter++;
    }

    var formattedYen = (elvishCalendar.period - 1) * elvishCalendar.yeniCycle + elvishCalendar.yen;
    var formattedLoa = (elvishCalendar.cycle - 1) * 12 + elvishCalendar.loa;
    var formattedDay = elvishCalendar.day - dayCounter;
    var formattedSST = seasonQuenyaTengwar[seasonCounter];
    var formattedSSN = seasonQuenyaNormal[seasonCounter];

    var quenyaTengwarReadableDate = "";
    var quenyaNormalReadableDate  = "";
    var englishNormalReadableDate = "";

    if (seasons[seasonCounter] !== 1) {
        quenyaTengwarReadableDate = tengwarHandler.duodecimal(formattedDay) + ' ';
        quenyaNormalReadableDate  = formattedDay.toString(12).toUpperCase() + ' ';
        englishNormalReadableDate = formattedDay + ' of ';
    }

    quenyaTengwarReadableDate += formattedSST + ' ' +
                                 tengwarHandler.duodecimal(formattedLoa) + '- ' +
                                 tengwarHandler.duodecimal(formattedYen);

    quenyaNormalReadableDate  += formattedSSN + ' ' +
                                 formattedLoa.toString(12).toUpperCase() + ', ' +
                                 formattedYen.toString(12).toUpperCase();

    englishNormalReadableDate += formattedSSN + ' of ' +
                                 formattedLoa + ' of ' +
                                 formattedYen;

    var quenyaTengwarReadable = doc.createTextNode(quenyaTengwarReadableDate);
    doc.getElementById("quenyaTengwar").appendChild(quenyaTengwarReadable);

    var quenyaNormalReadable = doc.createTextNode(quenyaNormalReadableDate);
    doc.getElementById("quenyaNormal").appendChild(quenyaNormalReadable);

    var englishNormalReadable = doc.createTextNode(englishNormalReadableDate);
    doc.getElementById("englishNormal").appendChild(englishNormalReadable);

},false);
})();