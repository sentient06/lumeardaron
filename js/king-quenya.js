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
    var monthsQuenyaNormal   = [
        'Yestarë',
        'Narvinyë',
        'Nénimë',
        'Súlimë',
        'Víressë',
        'Lótessë',
        'Nárië'
    ];
    var monthsQuenyaTengwar = [
        "h\u00CEF81D7F", //Yestarë
        "5#6yT5\u00CC$", //Narvinyë
        '5~V5%t$',       //Nénimë
        'i~Mj%t$',       //Súlimë
        'y~B7F,F',       //Víressë
        'j~N1F,F',       //Lótessë
        '5~C7T`V',       //Nárië
    ];
    if (gondorCalendar.leapLoa) {
        months.push(1);
        monthsQuenyaNormal.push('Loëndë');
        monthsQuenyaTengwar.push('jY`V2$');
    }
    months.push(31, 30, 30, 30, 30, 30, 1);
    monthsQuenyaNormal.push(
        'Cermië',
        'Urimë',
        'Yavannië',
        'Narquelië',
        'Hísimë',
        'Ringarë',
        'Mettarë'
    );
    monthsQuenyaTengwar.push(
        'aF6t%`V',        //Cermië
        '`M7Gt$',         //Urimë
        "h\u00CEyE5:%`V", //Yavannië
        '5#6zFj%`V',      //Narquelië
        "\u00BD~BiGt$",   //Hísimë
        '7Ts#7F',         //Ringare
        't$1;E7V'         //Mettarë
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
    var formattedMQT  = monthsQuenyaTengwar[monthCounter];
    var formattedMQN  = monthsQuenyaNormal[monthCounter];

    var quenyaTengwarReadableDate = "";
    var quenyaNormalReadableDate  = "";
    var englishNormalReadableDate = "";

    if (months[monthCounter] !== 1) {
        quenyaTengwarReadableDate = tengwarHandler.decimal(formattedDay) + ' ';
        quenyaNormalReadableDate  = formattedDay.toString(12).toUpperCase() + ' ';
        englishNormalReadableDate = formattedDay + ' of ';
    }

    quenyaTengwarReadableDate += formattedMQT + '- ' + tengwarHandler.decimal(formattedYear);
    quenyaNormalReadableDate  += formattedMQN + ', ' + formattedYear;
    englishNormalReadableDate += formattedMQN + ' of '  + formattedYear;

    var quenyaTengwarReadable = document.createTextNode(quenyaTengwarReadableDate);
    document.getElementById("quenyaTengwar").appendChild(quenyaTengwarReadable);

    var quenyaNormalReadable  = document.createTextNode(quenyaNormalReadableDate);
    document.getElementById("quenyaNormal").appendChild(quenyaNormalReadable);

    var englishNormalReadable = document.createTextNode(englishNormalReadableDate);
    document.getElementById("englishNormal").appendChild(englishNormalReadable);

},false);
})();
