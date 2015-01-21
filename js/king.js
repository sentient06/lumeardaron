//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    var base = new Base();

    var quenyaTengwar   = base.issetElementId("kingQuenyaTengwar");
    var sindarinTengwar = base.issetElementId("kingSindarinTengwar");
    var quenyaNormal    = base.issetElementId("kingQuenyaNormal");
    var sindarinNormal  = base.issetElementId("kingSindarinNormal");
    var englishNormal   = base.issetElementId("kingEnglishNormal");

    var calendar             = calendar || new Calendar();
    var gregorianAbsoluteDay = gregorianAbsoluteDay || calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var gondorCalendar       = calendar.assembleNumenoreanCalendar(gregorianAbsoluteDay);

    var months = [1, 30, 30, 30, 30, 30, 31, 1];

    if (sindarinNormal) {
        var monthsSindarinNormal = [
            'Minien',  // 1
            'Narwain', // 30
            'Nínui',   // 30
            'Gwaeron', // 30
            // In the SR, there is Tuilor = 1
            'Gwirith', // 30
            'Lothron', // 30
            'Nórui'    // 31
        ];
    }

    if (quenyaNormal) {
        var monthsQuenyaNormal = [
            'Yestarë',
            'Narvinyë',
            'Nénimë',
            'Súlimë',
            // SR: Tuilérë = 1
            'Víressë',
            'Lótessë',
            'Nárië'
        ];
    }

    if (sindarinTengwar) {
        var monthsSindarinTengwar = [
            't5%`B5$', // Minien //Maybe the "ie" should be simply "y"
            '56EyhE5', // Narwain
            '5~B5hJ',  // Nínui
            'sèlE75Y', // Gwaeron
            // SR: Tuilor = 1
            'sè7T3G',  // Gwirith
            'j3H75Y',  // Lothron
            '5~N7hJ'   // Nórui
        ];
    }

    if (quenyaTengwar) {
        var monthsQuenyaTengwar = [
            "h\u00CEF81D7F", //Yestarë
            "5#6yT5\u00CC$", //Narvinyë
            '5~V5%t$',       //Nénimë
            'i~Mj%t$',       //Súlimë
            // SR: Tuilérë = 1
            'y~B7F,F',       //Víressë
            'j~N1F,F',       //Lótessë
            '5~C7T`V',       //Nárië
        ];
    }

    if (englishNormal) {
        var monthsEnglishNormal = [
            'First Day',
            'January',
            'February',
            'March',
            // SR: Spring Day
            'April',
            'May',
            'June'
        ];
    }
    if (gondorCalendar.leapYear) {
        months.push(1);
        if (sindarinNormal) {
            monthsSindarinNormal.push('Endien 1', 'Endien 2');
        }
        if (quenyaNormal) {
            monthsQuenyaNormal.push('Loëndë 1', 'Löendë 2');
        }
        if (sindarinTengwar) {
            monthsSindarinTengwar.push("2$`B5$ \u00F1", "2$`B5$ \u00F2");
        }
        if (quenyaTengwar) {
            monthsQuenyaTengwar.push("jY`V2$ \u00F1", "jY`V2$ \u00F2");
        }
        if (englishNormal) {
            monthsEnglishNormal.push('Midyear\'s Day 1', 'Midyear\'s Day 2');
        }
    } else {
        if (sindarinNormal) {
            monthsSindarinNormal.push('Endien');
        }
        if (quenyaNormal) {
            monthsQuenyaNormal.push('Loëndë');
        }
        if (sindarinTengwar) {
            monthsSindarinTengwar.push("2$`B5$");
        }
        if (quenyaTengwar) {
            monthsQuenyaTengwar.push("jY`V2$");
        }
        if (englishNormal) {
            monthsEnglishNormal.push('Midyear\'s Day');
        }
    }
    months.push(31, 30, 30, 30, 30, 30, 1);

    if (sindarinNormal) {
        monthsSindarinNormal.push(
            'Cerveth',   // 31
            'Urui',      // 30
            'Ivanneth',  // 30
            // SR: Iavor = 1
            'Narbeleth', // 30
            'Hithui',    // 30
            'Girithron', // 30
            'Penninor'   // 1
        );
    }
    if (sindarinTengwar) {
        monthsSindarinTengwar.push(
            'z6Fr3F',   // Cerveth
            '7JhJ',     // Urui
            'r%5:#3F',  // Ivanneth
            // SR: Iavor = 1
            '56EwjR3F', // Narbeleth
            '93GhJ',    // Hithui
            'x7T3G75Y', // Girithron
            'q5:$5%6H'  // Penninor
        );
    }
    if (quenyaNormal) {
        monthsQuenyaNormal.push(
            'Cermië',
            'Urimë',
            'Yavannië',
            // SR: Yáviérë = 1
            'Narquelië',
            'Hísimë',
            'Ringarë',
            'Mettarë'
        );
    }
    if (quenyaTengwar) {
        monthsQuenyaTengwar.push(
            'aF6t%`V',        //Cermië
            '`M7Gt$',         //Urimë
            "h\u00CEyE5:%`V", //Yavannië
            // SR: Yáviérë = 1
            '5#6zFj%`V',      //Narquelië
            "\u00BD~BiGt$",   //Hísimë
            '7Ts#7F',         //Ringare
            't$1;E7V'         //Mettarë
        );
    }
    if (englishNormal) {
        monthsEnglishNormal.push(
            'July',
            'August',
            'September',
            // SR: Harvest Day
            'October',
            'November',
            'December',
            'Last Day'
        );
    }

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

    if (quenyaTengwar || sindarinTengwar) {
        var tengwarHandler = new Tengwar();
    }

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
    if (quenyaTengwar) {
        writeDate({
            tengwar: true,
            months: monthsQuenyaTengwar,
            element: "kingQuenyaTengwar",
            separators: [' ', '- ']
        });
    }
    if (sindarinTengwar) {
        writeDate({
            tengwar: true,
            months: monthsSindarinTengwar,
            element: "kingSindarinTengwar",
            separators: [' hJ5 ', ' hJ5 ']
        });
    }
    if (quenyaNormal) {
        writeDate({
            tengwar: false,
            months: monthsQuenyaNormal,
            element: "kingQuenyaNormal",
            separators: [' ', ' ']
        });
    }
    if (sindarinNormal) {
        writeDate({
            tengwar: false,
            months: monthsSindarinNormal,
            element: "kingSindarinNormal",
            separators: [' ', ' uin ']
        });
    }
    if (englishNormal) {
        writeDate({
            tengwar: false,
            months: monthsEnglishNormal,
            element: "kingEnglishNormal",
            separators: [' of ', ' of ']
        });
    }

},false);
})();
