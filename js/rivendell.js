//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var base = new Base();

    var quenyaTengwar   = base.issetElementId("rivendellQuenyaTengwar");
    var sindarinTengwar = base.issetElementId("rivendellSindarinTengwar");
    var quenyaNormal    = base.issetElementId("rivendellQuenyaNormal");
    var sindarinNormal  = base.issetElementId("rivendellSindarinNormal");
    var englishNormal   = base.issetElementId("rivendellEnglishNormal");

    var calendar             = calendar || new Calendar();
    var gregorianAbsoluteDay = gregorianAbsoluteDay || calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var elvishCalendar       = calendar.assembleElvishCalendar(gregorianAbsoluteDay);

    var seasons = [1, 54, 72, 54, 1, 1, 1];

    if (sindarinNormal) {
        var seasonSindarinNormal = [
            'Minien', // 'Orerui', //Damn, where did this come from?
            'Ethuil',
            'Laer',
            'Iavas',
            'Endien 1', //'Orenidh 1',
            'Endien 2', //'Orenidh 2',
            'Endien 3'  //'Orenidh 3'
        ];
    }

    if (quenyaNormal) {
        var seasonQuenyaNormal   = [
            'Yestarë',
            'Tuilë',
            'Lairë',
            'Yavië',
            'Enderi 1',
            'Enderi 2',
            'Enderi 3'
        ];
    }

    if (sindarinTengwar) {
        var seasonSindarinTengwar = [
            't5%`B5$',  //Maybe the "ie" should be simply "y" // '7H7FhG',   // Orerui
            '3FhGj',    // Etuil
            'jlD6',     // Laer
            'lr#iD ',   // Iavas
            '2$`B5$ ñ',// '7H5$4% ñ', // Orenidh 1
            '2$`B5$ ò',// '7H5$4% ò', // 2
            '2$`B5$ ó' // '7H5$4% ó'  // 3
        ];
    }

    if (quenyaTengwar) {
        var seasonQuenyaTengwar = [
            'hÎF81D7F', // Yestarë
            '1lJj$',    // Tuilë
            'jlE7F',    // Lairë
            'hÎ~CyG`V', // Yavië
            '`V2$7G ñ', // Enderi 1
            '`V2$7G ò', // 2
            '`V2$7G ó'
        ];
    }

    if (englishNormal) {
        var seasonEnglishNormal = [
            'First Day',
            'Spring',
            'Summer',
            'Fall',
            'Middle Day 1',
            'Middle Day 2',
            'Middle Day 3'
        ];
    }

    if (elvishCalendar.leapLoa) {
        seasons.push(1, 1, 1);
        if (sindarinNormal) {
            seasonSindarinNormal.push('Endien 4', 'Endien 5', 'Endien 6');// seasonSindarinNormal.push('Orenidh 4', 'Orenidh 5', 'Orenidh 6');
        }
        if (quenyaNormal) {
            seasonQuenyaNormal.push('Enderi 4', 'Enderi 5', 'Enderi 6');
        }
        if (sindarinTengwar) {
            seasonSindarinTengwar.push('2$`B5$ ô', '2$`B5$ õ', '2$`B5$ ö');// seasonSindarinTengwar.push('7H5$4% ô', '7H5$4% õ', '7H5$4% ö');
        }
        if (quenyaTengwar) {
            seasonQuenyaTengwar.push('`V2$7G ô', '`V2$7G õ', '`V2$7G ö');
        }
        if (englishNormal) {
            seasonEnglishNormal.push('Middle Day 4', 'Middle Day 5', 'Middle Day 6');
        }
    }

    seasons.push(54, 72, 54, 1);

    if (sindarinNormal) {
        seasonSindarinNormal.push(
            'Firith',
            'Rhîw',
            'Echuir',
            'Penninor' // 'Orvedui'
        );
    }
    if (sindarinTengwar) {
        seasonSindarinTengwar.push(
            'e7G3G',   // Firith
            'u~By',    // Rhîw
            'cRhG6',   // Echuir
            'q5:$5%6H' // Penninor // '6Hr2$hG' // Orvedui
        );
    }
    if (quenyaNormal) {
        seasonQuenyaNormal.push(
            'Quellë',
            'Hrivë',
            'Coirë',
            'Mettarë'
        );
    }
    if (quenyaTengwar) {
        seasonQuenyaTengwar.push(
            'zVj°R',  // Quellë
            '½7~ByF', // Hrivë
            'alH7V',  // Coirë
            't$1;E7V' // Mettarë
        );
    }
    if (englishNormal) {
        seasonEnglishNormal.push(
            'Fading',
            'Winter',
            'Stirring',
            'Last Day'
        );
    }

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

    if (quenyaTengwar || sindarinTengwar) {
        var tengwarHandler = new Tengwar();
    }

    /**
     * Writes date to DOM
     */
    var writeDate = function(param) {
        var dateText     = "";
        var dateTextNode = null;
        if (param.seasons[seasonCounter] !== 1) {
            dateText  = param.tengwar ? tengwarHandler.duodecimal(formattedDay) : formattedDay;
            dateText += param.separators[0];
        }
        dateText += param.seasons[seasonCounter] + param.separators[1];
        if (param.tengwar) {
            dateText += tengwarHandler.duodecimal(formattedLoa) + param.separators[2];
            dateText += tengwarHandler.duodecimal(formattedYen);
        } else {
            dateText += formattedLoa.toString(12).toUpperCase() + param.separators[2];
            dateText += formattedYen.toString(12).toUpperCase();
        }
        dateTextNode = document.createTextNode(dateText);
        document.getElementById(param.element).appendChild(dateTextNode);
    }

    // Write to DOM:
    if (quenyaTengwar) {
        writeDate({
            tengwar: true,
            seasons: seasonQuenyaTengwar,
            element: "rivendellQuenyaTengwar",
            separators: [' ', ' ', '- ']
        });
    }
    if (sindarinTengwar) {
        writeDate({
            tengwar: true,
            seasons: seasonSindarinTengwar,
            element: "rivendellSindarinTengwar",
            separators: [' hJ5 ', ' hJ5 ', ' hJ5 ']
        });
    }
    if (quenyaNormal) {
        writeDate({
            tengwar: false,
            seasons: seasonQuenyaNormal,
            element: "rivendellQuenyaNormal",
            separators: [' ', ' ', ', ']
        });
    }
    if (sindarinNormal) {
        writeDate({
            tengwar: false,
            seasons: seasonSindarinNormal,
            element: "rivendellSindarinNormal",
            separators: [' ', ' uin ', ' uin ']
        });
    }
    if (englishNormal) {
        writeDate({
            tengwar: false,
            seasons: seasonEnglishNormal,
            element: "rivendellEnglishNormal",
            separators: [' of ', ' of ', ' of ']
        });
    }

},false);
})();
