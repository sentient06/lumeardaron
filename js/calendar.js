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
        if (decNumber === "10") {
            return ".";
        }
        var duodecimalNumber = decNumber.toString(12);
        // var tengwarDuodecimal = [
        //     "\u00F0\u00A8" // 0 - ð¨
        //   , "\u00F1\u00A8" // 1 - ñ¨
        //   , "\u00F2\u2122" // 2 - ò™
        //   , "\u00F3\u02DC" // 3 - ó˜
        //   , "\u00F4\u00A8" // 4 - ô¨
        //   , "\u00F5\u2122" // 5 - õ™
        //   , "\u00F6\u00A8" // 6 - ö¨
        //   , "\u00F7\u00A8" // 7 - ÷¨
        //   , "\u00F8\u00A8" // 8 - ø¨
        //   , "\u00F9\u2122" // 9 - ù™
        //   , "\u00FA\u00A8" // A - ú¨
        //   , "\u00FB\u00A8" // B - û¨
        //   , "." // 10 - .
        // ];
        var chars = ["\u00F0\u00A8","\u00F1\u00A8","\u00F2\u2122","\u00F3\u02DC","\u00F4\u00A8","\u00F5\u2122",
                     "\u00F6\u00A8","\u00F7\u00A8","\u00F8\u00A8","\u00F9\u2122","\u00FA\u00A8","\u00FB\u00A8"];
        var formattedNumber = "";
        for (var i = duodecimalNumber.length - 1; i >= 0; i--) {
            if (duodecimalNumber[i] === 'a') {
                formattedNumber += chars[10];
            } else if (duodecimalNumber[i] === 'b') {
                formattedNumber += chars[11];
            } else {
                formattedNumber += chars[parseInt(duodecimalNumber[i], 10)];
            }
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
        var leapDays          = 3;   // leap days every loa
        var leapSpace         = 12;  // leap period (12 loar)
        var cyclesWithinYen   = 12;  // loar cycles in an yen
        var yeniCycle         = 3;   // yeni no-leap cycle
        var daysLoaNormal     = 365; // loa normal
        var daysLoaLeap       =   daysLoaNormal + leapDays;  // loa leap         = 368d
        var daysCycleNoLeap   =   daysLoaNormal * leapSpace; // cycle no leap    = 4380d
        var daysCycleNormal   = daysCycleNoLeap + leapDays;  // cycle normal     = 4383d
        var daysYenNormal     = daysCycleNormal * cyclesWithinYen; // normal yen = 13149d
        var daysYenNoLeap     = daysCycleNormal * (cyclesWithinYen - 1) + daysCycleNoLeap; // 3rd yen = 13146d
        var daysPeriod        = daysYenNormal * 2 + daysYenNoLeap; // period = 3 yeni = 39444d
        var firstDayOfLeapLoa = daysCycleNormal - daysLoaLeap;     // leap loa first day in cycle
        var offset            = 31 + 28 + 28; // offset from gregorian calendar

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
            // LoaSUM -= 1;
        }

        var day = dayOfCycle - firstDayOfLoa;

        return {
               'period':period,
            'yeniCycle':yeniCycle,
                  'yen':yen,
                'cycle':cycle,
              'leapLoa':leapLoa,
                  'loa':loa,
                  'day':day
        };

    };

    _this.assembleNumenoreanCalendar = function(gregorianAbsoluteDay) {

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
        var leapDays          = 3;   // leap days every loa
        var leapSpace         = 12;  // leap period (12 loar)
        var cyclesWithinYen   = 12;  // loar cycles in an yen
        var yeniCycle         = 3;   // yeni no-leap cycle
        var daysLoaNormal     = 365; // loa normal
        var daysLoaLeap       =   daysLoaNormal + leapDays;  // loa leap         = 368d
        var daysCycleNoLeap   =   daysLoaNormal * leapSpace; // cycle no leap    = 4380d
        var daysCycleNormal   = daysCycleNoLeap + leapDays;  // cycle normal     = 4383d
        var daysYenNormal     = daysCycleNormal * cyclesWithinYen; // normal yen = 13149d
        var daysYenNoLeap     = daysCycleNormal * (cyclesWithinYen - 1) + daysCycleNoLeap; // 3rd yen = 13146d
        var daysPeriod        = daysYenNormal * 2 + daysYenNoLeap; // period = 3 yeni = 39444d
        var firstDayOfLeapLoa = daysCycleNormal - daysLoaLeap;     // leap loa first day in cycle
        var offset            = 31 + 28 + 28; // offset from gregorian calendar

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
            // LoaSUM -= 1;
        }

        var day = dayOfCycle - firstDayOfLoa;

        return {
               'period':period,
            'yeniCycle':yeniCycle,
                  'yen':yen,
                'cycle':cycle,
              'leapLoa':leapLoa,
                  'loa':loa,
                  'day':day
        };

    };

}