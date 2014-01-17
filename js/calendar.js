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
        //                        0     1     2     3     4     5     6     7     8     9     A     B
        var tengwarDuodecimal = ["ð¨", "ñ¨", "ò™", "ó˜", "ô¨", "õ™", "ö¨", "÷¨", "ø¨", "ù™", "ú¨", "û¨", "."];
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
            formattedNumber += tengwarDuodecimal[parseInt(digit, 10)];
        }
        return formattedNumber;
    };

    /**
     * Calculates which day of this era is today based on the gregorian calendar.
     * @param d - Gregorian day
     * @param m - Gregorian month
     * @param y - Gregorian year
     * @returns {number|string}
     */
    _this.calculateAbsoluteDate = function(d,m,y) {
        var ly = (y>0) && !(y%4>0) && ( (y%100>0)||!(y%400>0) );     //leap year
        var dy = Math.floor((30.6*((m + 9) % 12) + 58.5 + d)) % 365; //day of year (no leap)
        var gsum = (Math.floor((y-1)/4)-Math.floor((y-1)/100)+Math.floor((y-1)/400)); //days of age
        if (ly) { if ((dy==59 && d==1) || dy>59) { dy += 1; } } // leap day of year
        dy += 1; //offset from 0 to 1
        return 365*(y-1)+gsum+dy; //sum
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
               'period':period,
            'yeniCycle':yeniCycle,
                  'yen':yen,
                'cycle':cycle,
              'leapLoa':leapLoa,
                  'loa':loa,
                  'day':day
        };

        return values;

    };

}