(function(){

    "use strict";

    var calendar             = new Calendar();
    var gregorianAbsoluteDay = calendar.calculateAbsoluteDate(todayDay, todayMonth, todayYear);
    var elvishCalendar       = calendar.assembleElvishCalendar(gregorianAbsoluteDay);
    var seasons              = [1, 54, 72, 54, 1, 1, 1];
    var seasonSindarinNormal = ['Orerui',
        'Etuil',
        'Laer',
        'Iavas',
        'Orenidh 1',
        'Orenidh 2',
        'Orenidh 3'
    ];
    var seasonSindarinTengwar = ['7H7FhG', // Orerui
        '1FhGj',  // Etuil
        'jlD6',   // Laer
        'lr#iD ', // Iavas
        '7H5$4% ñÊ', // Orenidh 1
        '7H5$4% òO', // 2
        '7H5$4% ó('
    ];
    if (elvishCalendar.leapLoa) {
        seasons.push(1, 1, 1);
        seasonSindarinNormal.push('Orenidh 4', 'Orenidh 5', 'Orenidh 6');
        seasonSindarinTengwar.push('7H5$4% ô L', '7H5$4% õ(', '7H5$4% öO');
    }
    seasons.push(54, 72, 54, 1);
    seasonSindarinNormal.push(
        'Firith',
        'Rhiw',
        'Echuir',
        'Orvedui'
    );
    seasonSindarinTengwar.push(
        'e7G3G',
        'uyG',
        'cRhG6',
        '6Hr2$hG'
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

    var sindarinTengwarReadableDate = "";
    var sindarinNormalReadableDate  = "";

    if (seasons[seasonCounter] !== 1) {
        sindarinTengwarReadableDate = calendar.translateNumber(formattedDay) + ' hJ5 ';
        sindarinNormalReadableDate  = formattedDay.toString(12).toUpperCase() + ' uin ';
    }

    sindarinTengwarReadableDate += formattedSST +
                     ' hJ5 ' + calendar.translateNumber(formattedLoa) +
                     ' hJ5 ' + calendar.translateNumber(formattedYen);

    var formattedSSN = seasonSindarinNormal[seasonCounter];

    sindarinNormalReadableDate  += formattedSSN +
                     ' uin ' + formattedLoa.toString(12).toUpperCase() +
                     ' uin ' + formattedYen.toString(12).toUpperCase();

    var sindarinTengwarReadable = document.createTextNode(sindarinTengwarReadableDate);
    document.getElementById("sindarinTengwar").appendChild(sindarinTengwarReadable);

    var sindarinNormalReadable = document.createTextNode(sindarinNormalReadableDate);
    document.getElementById("sindarinNormal").appendChild(sindarinNormalReadable);

})();
