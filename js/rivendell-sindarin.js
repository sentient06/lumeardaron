//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var calendar             = new Calendar();
    var gregorianAbsoluteDay = calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var elvishCalendar       = calendar.assembleElvishCalendar(gregorianAbsoluteDay);
    var seasons              = [1, 54, 72, 54, 1, 1, 1];
    var seasonSindarinNormal = [
        'Minien', // 'Orerui', //Damn, where did this come from?
        'Ethuil',
        'Laer',
        'Iavas',
        'Endien 1', //'Orenidh 1',
        'Endien 2', //'Orenidh 2',
        'Endien 3'  //'Orenidh 3'
    ];
    var seasonSindarinTengwar = [
        't5%`B5$',  //Maybe the "ie" should be simply "y" // '7H7FhG',   // Orerui
        '3FhGj',    // Etuil
        'jlD6',     // Laer
        'lr#iD ',   // Iavas
        '2$`B5$ ñ',// '7H5$4% ñ', // Orenidh 1
        '2$`B5$ ò',// '7H5$4% ò', // 2
        '2$`B5$ ó' // '7H5$4% ó'  // 3
    ];
    if (elvishCalendar.leapLoa) {
        seasons.push(1, 1, 1);
        seasonSindarinNormal.push('Endien 4', 'Endien 5', 'Endien 6');// seasonSindarinNormal.push('Orenidh 4', 'Orenidh 5', 'Orenidh 6');
        seasonSindarinTengwar.push('2$`B5$ ô', '2$`B5$ õ', '2$`B5$ ö');// seasonSindarinTengwar.push('7H5$4% ô', '7H5$4% õ', '7H5$4% ö');
    }
    seasons.push(54, 72, 54, 1);
    seasonSindarinNormal.push(
        'Firith',
        'Rhîw',
        'Echuir',
        'Penninor' // 'Orvedui'
    );
    seasonSindarinTengwar.push(
        'e7G3G',   // Firith
        'u~By',    // Rhîw
        'cRhG6',   // Echuir
        'q5:$5%6H' // Penninor // '6Hr2$hG' // Orvedui
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
    var formattedSST = seasonSindarinTengwar[seasonCounter];
    var formattedSSN = seasonSindarinNormal[seasonCounter];

    var sindarinTengwarReadableDate = "";
    var sindarinNormalReadableDate  = "";
    var englishNormalReadableDate   = "";

    if (seasons[seasonCounter] !== 1) {
        sindarinTengwarReadableDate = calendar.translateNumber(formattedDay) + ' hJ5 ';
        sindarinNormalReadableDate  = formattedDay.toString(12).toUpperCase() + ' uin ';
        englishNormalReadableDate   = formattedDay + ' of ';
    }

    sindarinTengwarReadableDate += formattedSST +
                    ' hJ5 ' + calendar.translateNumber(formattedLoa) +
                    ' hJ5 ' + calendar.translateNumber(formattedYen);

    sindarinNormalReadableDate  += formattedSSN +
                    ' uin ' + formattedLoa.toString(12).toUpperCase() +
                    ' uin ' + formattedYen.toString(12).toUpperCase();

    englishNormalReadableDate   += formattedSSN +
                    ' of ' + formattedLoa +
                    ' of ' + formattedYen;

    var sindarinTengwarReadable = document.createTextNode(sindarinTengwarReadableDate);
    document.getElementById("sindarinTengwar").appendChild(sindarinTengwarReadable);

    var sindarinNormalReadable = document.createTextNode(sindarinNormalReadableDate);
    document.getElementById("sindarinNormal").appendChild(sindarinNormalReadable);

    var englishNormalReadable = document.createTextNode(englishNormalReadableDate);
    document.getElementById("englishNormal").appendChild(englishNormalReadable);

},false);
})();
