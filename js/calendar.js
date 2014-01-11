//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

function Calendar() {

    "use strict";

    var _this = this;

    /**
     * Translate decimal number into a duodecimal tengwar value.
     * @param decNumber
     * @returns {string}
     */
    _this.translateNumber = function(decNumber) {
        var duodecimalNumber = decNumber.toString(12);
        // var tengwarDuodecimal = ["ðÊ", "ñÊ", "òO", "ó(", "ô L","õ(", "öO", "÷O", "øÊ", "ùÈ", "úÊ", "ûÊ", ".Ê"];
        // var tengwarDuodecimal = ["ð", "ñ", "ò", "ó", "ô","õ", "ö", "÷", "ø", "ù", "ú", "û", "."]; //ñ©ñ˜ñ™ñ¨
        var tengwarDuodecimal = ["ð¨", "ñ¨", "ò™", "ó˜", "ô¨", "õ™", "ö¨", "÷¨", "ø¨", "ù™", "ú¨", "û¨", "."];
                              //  0     1     2     3     4     5     6     7     8     9     A     B
        var formattedNumber = "";
        var digit = null;
        for (var i = duodecimalNumber.length - 1; i >= 0; i--) {
            if (duodecimalNumber[i] === 'a') {
                digit = '10';
            } else if (duodecimalNumber[i] === 'b') {
                digit = '11';
            } else {
                digit = duodecimalNumber[i];
            }
            formattedNumber += tengwarDuodecimal[parseInt(digit)];
        }
        return formattedNumber;
    };

    /**
     * Calculates which day of this era is today based on the gregorian calendar.
     * @param gregorianDay
     * @param gregorianMonth
     * @param gregorianYear
     * @returns {number|string}
     */
    _this.calculateAbsoluteDate = function(gregorianDay, gregorianMonth, gregorianYear) {
        var gregorianMonthsLength = [31,28,31,30,31,30,31,31,30,31,30,31];
        var gregorianLeapYear     = ((gregorianYear % 4 === 0) && (gregorianYear % 100 !== 0)) || (gregorianYear % 400 === 0);
        
        if (gregorianLeapYear) { gregorianMonthsLength[1] = 29; }

        var gregorianPastYear        = gregorianYear - 1;
        var gregorianCenturyLeapDays = Math.floor(gregorianPastYear / 100);
        var gregorianTotalLeapDays   = Math.floor(gregorianPastYear / 4) - gregorianCenturyLeapDays + Math.floor(gregorianCenturyLeapDays / 4);

        var counter = 0;
        var gregorianYearDay = gregorianDay;

        while (counter < gregorianMonth-1) {
            gregorianYearDay += gregorianMonthsLength[counter];
            counter++;
        }

        return 365 * gregorianPastYear + gregorianTotalLeapDays + gregorianYearDay;
    };


    _this.assembleElvishCalendar = function(gregorianAbsoluteDay) {

        /*
         * Loa        = 365 days
         * Leap loa   = 368 days
         * Leap Space = 1 leap loa every 12 loas
         *
         * Loar cycle = 12 loar (11 normal, 1 leap)
         * Yen        = 12 cycles, or 144 loar (12 leap loar)
         * Yeni cyle  =  3 yeni, the last loa in the 3rd yen is not leap!
         *
         * Period     = Yeni cycle, just for readability
         */

        var leapDays          = 3,   // leap days every loa
            leapSpace         = 12,  // leap period (12 loar)
            cyclesWithinYen   = 12,  // loar cycles in an yen
            yeniCycle         = 3,   // yeni no-leap cycle
            daysLoaNormal     = 365, // loa normal
            daysLoaLeap       =   daysLoaNormal + leapDays,  // loa leap         = 368d
            daysCycleNoLeap   =   daysLoaNormal * leapSpace, // cycle no leap    = 4380d
            daysCycleNormal   = daysCycleNoLeap + leapDays,  // cycle normal     = 4383d
            daysYenNormal     = daysCycleNormal * cyclesWithinYen, // normal yen = 13149d
            daysYenNoLeap     = daysCycleNormal * (cyclesWithinYen - 1) + daysCycleNoLeap, // 3rd yen = 13146d
            daysPeriod        = daysYenNormal * 2 + daysYenNoLeap, // period = 3 yeni = 39444d
            firstDayOfLeapLoa = daysCycleNormal - daysLoaLeap,     // leap loa first day in cycle
            offset            = 31 + 28 + 28; // offset from gregorian calendar

        var date          = gregorianAbsoluteDay - offset; // date
        var period        = Math.ceil(date/daysPeriod);    // period
        var PeriodSUM     = (period - 1) * daysPeriod;     // PSUM
        var yen           = Math.ceil((date - PeriodSUM) / daysYenNormal); // yen
        var thirdYen      = yen % 3 === 0; // 3rd yen
        var YenSUM        = ((yen - 1) * daysYenNormal) + PeriodSUM;       // YSUM
        var cycle         = Math.ceil((date - YenSUM) / daysCycleNormal);  // cycle
        var twelfthCycle  = cycle === 12;  // 12th cycle
        var CycleSUM      = ((cycle - 1) * daysCycleNormal) + YenSUM; // CSUM
        var dayOfCycle    = date - CycleSUM; // cycle's day
        var leapLoa       = dayOfCycle > firstDayOfLeapLoa; // leap loa
        var loa           = Math.ceil( (date - CycleSUM) / daysLoaNormal ); //loaDuration to daysLoaNormal  // loa

        if (loa === 13) { loa = 12; } // extra days of loa: 366 367 368

        var twelfthLoa    = loa === 12; // 12th loa
        var lastLoaOfYen  = (twelfthCycle && twelfthLoa); // 144th loa

        if (thirdYen && lastLoaOfYen) { leapLoa = false; }

        var loaDuration   = leapLoa ? daysLoaLeap : daysLoaNormal; // loa duration
            loaDuration   = lastLoaOfYen ? daysLoaNormal : loaDuration;
        var LoaSUM        = Math.floor(dayOfCycle / daysLoaNormal); // LSUM

        if (twelfthLoa) {
            if (LoaSUM > 11) {
                LoaSUM = 11;
            }
        }

        var firstDayOfLoa = LoaSUM * daysLoaNormal; // first day of loa //this is not recognising first days of leap loa

        // Last loa day:
        if (dayOfCycle - firstDayOfLoa === 0) {
            firstDayOfLoa = (LoaSUM - 1) * daysLoaNormal;
            LoaSUM -= 1;
        }

        var day = dayOfCycle - firstDayOfLoa;

        var values = {
               'period':period
          , 'yeniCycle':yeniCycle
          ,       'yen':yen
          ,     'cycle':cycle
          ,   'leapLoa':leapLoa
          ,       'loa':loa
          ,       'day':day
        };

        return values;

    }

}