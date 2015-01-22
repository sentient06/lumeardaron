//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var base = new Base();

    var quenyaTengwar   = base.issetElementId("rivendellQuenyaTengwar");
    var sindarinTengwar = base.issetElementId("rivendellSindarinTengwar");
    var englishTengwar  = base.issetElementId("rivendellEnglishTengwar");
    var quenyaNormal    = base.issetElementId("rivendellQuenyaNormal");
    var sindarinNormal  = base.issetElementId("rivendellSindarinNormal");
    var englishNormal   = base.issetElementId("rivendellEnglishNormal");
    var calendarCanvas  = base.issetElementId("calendarCanvas");

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
            'Autumn',
            'Middle Day 1',
            'Middle Day 2',
            'Middle Day 3'
        ];
    }

    if (englishTengwar) {
        var seasonEnglishTengwar = [
            'e6Ti1 2lE',
            '8q7b%',
            '8t:&6R',
            'yH1t&5',
            't2:%jR 2hE ' + "\u00F1\u00A8",
            't2:%jR 2hE ' + "\u00F2\u2122",
            't2:%jR 2hE ' + "\u00F3\u02DC"
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
        if (englishTengwar) {
            seasonEnglishTengwar.push(
                't2:%jR 2hE ' + "\u00F4\u00A8",
                't2:%jR 2hE ' + "\u00F5\u2122",
                't2:%jR 2hE ' + "\u00F6\u00A8"
            );
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
    if (englishTengwar) {
        seasonEnglishTengwar.push(
            'ehR2b%',
            'y1pG6R',
            '817Gb%',
            'jiE1 2hE'
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

    if (quenyaTengwar || sindarinTengwar || englishTengwar) {
        var tengwarHandler = new Tengwar();
    }

    /**
     * Writes date to DOM
     */
    var writeDate = function(param) {
        // console.log(param);
        var dateText     = "";
        var dateTextNode = null;
        if (seasons[seasonCounter] !== 1) {
            if (param.decimal) {
                dateText = param.tengwar ? tengwarHandler.decimal(formattedDay) : formattedDay;
            } else {
                dateText = param.tengwar ? tengwarHandler.duodecimal(formattedDay) : formattedDay;
            }
            dateText += param.separators[0];
        }
        dateText += param.seasons[seasonCounter] + param.separators[1];
        if (param.tengwar) {
            if (param.decimal) {
                dateText += tengwarHandler.decimal(formattedLoa) + param.separators[2];
                dateText += tengwarHandler.decimal(formattedYen);
            } else {
                dateText += tengwarHandler.duodecimal(formattedLoa) + param.separators[2];
                dateText += tengwarHandler.duodecimal(formattedYen);
            }
        } else {
            if (param.decimal) {
                dateText += formattedLoa.toString().toUpperCase() + param.separators[2];
                dateText += formattedYen.toString().toUpperCase();
            } else {
                dateText += formattedLoa.toString(12).toUpperCase() + param.separators[2];
                dateText += formattedYen.toString(12).toUpperCase();
            }
        }
        dateTextNode = document.createTextNode(dateText);
        document.getElementById(param.element).appendChild(dateTextNode);

        // Testing --
        if (calendarCanvas) {
            var builder = new MonthBuilder();
            var months = [
                {
                           'name': param.seasons[seasonCounter]
                  ,   'totalDays': seasons[seasonCounter]
                  , 'currentDate': formattedDay
                }
            ];
            builder.drawMonth("calendarCanvas", months, 6, param.tengwar, !param.decimal);
        }
        // -- testing
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
            decimal: true,
            seasons: seasonEnglishNormal,
            element: "rivendellEnglishNormal",
            separators: [' of ', ' of ', ' of ']
        });
    }
    if (englishTengwar) {
        writeDate({
            tengwar: true,
            decimal: true,
            seasons: seasonEnglishTengwar,
            element: "rivendellEnglishTengwar",
            separators: [' W ', ' W ', ' W ']
        });
    }

},false);
})();
