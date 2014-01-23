//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

function Calendar() {

    "use strict";

    var _this = this;

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

    /**
     * Rivendell's reckoning
     */
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
        var daysCycleNoLeap   =   daysLoaNormal * leapSpace; // cycle no leap    = 4,380d
        var daysCycleNormal   = daysCycleNoLeap + leapDays;  // cycle normal     = 4,383d
        var daysYenNormal     = daysCycleNormal * cyclesWithinYen; // normal yen = 52,596d
        var daysYenNoLeap     = daysCycleNormal * (cyclesWithinYen - 1) + daysCycleNoLeap; // 3rd yen = 52,593d
        var daysPeriod        = daysYenNormal * 2 + daysYenNoLeap; // period = 3 yeni = 157,785d
        var firstDayOfLeapLoa = daysCycleNormal - daysLoaLeap;     // leap loa first day in cycle = 4015
        var offset            = 31 + 28 + 28; // offset from gregorian calendar = 87

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

    /**
     * King's and Shire's reckoning are the same
     */
    _this.assembleNumenoreanCalendar = function(gregorianAbsoluteDay) {
        var leapDays           = 1;   // leap days every year
        var leapSpace          = 4;   // leap period (4 years)
        var cyclesWithin100    = 25;  // years cycles in a century
        var daysYearNormal     = 365; // year normal
        var daysYearLeap       =  daysYearNormal + leapDays;  // year leap     = 366d
        var daysCycleNoLeap    =  daysYearNormal * leapSpace; // cycle no leap = 1460d
        var daysCycleNormal    = daysCycleNoLeap + leapDays;  // cycle normal  = 1461d
        var days100NoLeap      = daysCycleNormal * (cyclesWithin100 - 1) + daysCycleNoLeap; // 3rd century = 36524d
        var firstDayOfLeapYear = daysCycleNormal - daysYearLeap;     // leap year first day in cycle
        var offset             = -8; // offset from gregorian calendar

        var date       = gregorianAbsoluteDay - offset;   // date
        var century    = Math.ceil(date / days100NoLeap); // century
        var CentSUM    = ((century - 1) * days100NoLeap); // YSUM
        var cycle      = Math.ceil((date - CentSUM) / daysCycleNormal); // cycle
        var lastCycle  = cycle === 25; // 25th cycle
        var CycleSUM   = ((cycle - 1) * daysCycleNormal) + CentSUM; // CSUM
        var dayOfCycle = date - CycleSUM; // cycle's day
        var leapYear   = dayOfCycle > firstDayOfLeapYear; // leap year
        var year       = Math.ceil( (date - CycleSUM) / daysYearNormal ); // year

        if (year === 5) { year = 4; } // extra day of year: 366

        var fourthYear        = year === 4; // 4th year
        var lastYearOfCentury = (lastCycle && fourthYear); // 100th year

        if (lastYearOfCentury) { leapYear = false; }

        var YearSUM = Math.floor(dayOfCycle / daysYearNormal); // LSUM

        if (fourthYear) {
            if (YearSUM > 3) {
                YearSUM = 3;
            }
        }

        var firstDayOfYear = YearSUM * daysYearNormal;

        // Last year day:
        if (dayOfCycle - firstDayOfYear === 0) {
            firstDayOfYear = (YearSUM - 1) * daysYearNormal;
        }

        var day = dayOfCycle - firstDayOfYear;

// console.log('gregorianAbsoluteDay --- ' + gregorianAbsoluteDay);
// console.log('leapDays           = ' + leapDays);
// console.log('leapSpace          = ' + leapSpace);
// console.log('cyclesWithin100    = ' + cyclesWithin100);
// console.log('daysYearNormal     = ' + daysYearNormal);
// console.log('daysYearLeap       = ' + daysYearLeap);
// console.log('daysCycleNoLeap    = ' + daysCycleNoLeap);
// console.log('daysCycleNormal    = ' + daysCycleNormal);
// console.log('days100NoLeap      = ' + days100NoLeap);
// console.log('firstDayOfLeapYear = ' + firstDayOfLeapYear);
// console.log('offset             = ' + offset);

// console.log('date       = ' + date);
// console.log('century    = ' + century);
// console.log('CentSUM    = ' + CentSUM);
// console.log('cycle      = ' + cycle);
// console.log('lastCycle  = ' + lastCycle);
// console.log('CycleSUM   = ' + CycleSUM);
// console.log('dayOfCycle = ' + dayOfCycle);
// console.log('leapYear   = ' + leapYear);
// console.log('year       = ' + year);

        return {
              'century':century,
             'leapYear':leapYear,
                 'year': (century-1)*100 + (cycle-1)*4 + year,
                  'day':day
        };
    };

    /**
     * This is the Steward's reckoning.
     */
    _this.assembleGondorCalendar = function(gregorianAbsoluteDay) {

        var leapDays           = 1;   // leap days every year
        var leapSpace          = 4;   // leap period (4 years)
        var cyclesWithin100    = 25;  // years cycles in a century
        var daysYearNormal     = 365; // year normal
        var daysYearLeap       =  daysYearNormal + leapDays;  // year leap     = 366d
        var daysCycleNoLeap    =  daysYearNormal * leapSpace; // cycle no leap = 1460d
        var daysCycleNormal    = daysCycleNoLeap + leapDays;  // cycle normal  = 1461d
        var days100NoLeap      = daysCycleNormal * (cyclesWithin100 - 1) + daysCycleNoLeap; // 3rd century = 36524d
        var firstDayOfLeapYear = daysCycleNormal - daysYearLeap;     // leap year first day in cycle
        var offset             = -8; // offset from gregorian calendar

        var date       = gregorianAbsoluteDay - offset;   // date
        var century    = Math.ceil(date / days100NoLeap); // century
        var CentSUM    = ((century - 1) * days100NoLeap); // YSUM
        var cycle      = Math.ceil((date - CentSUM) / daysCycleNormal); // cycle
        var lastCycle  = cycle === 25; // 25th cycle
        var CycleSUM   = ((cycle - 1) * daysCycleNormal) + CentSUM; // CSUM
        var dayOfCycle = date - CycleSUM; // cycle's day
        var leapYear   = dayOfCycle > firstDayOfLeapYear; // leap year
        var year       = Math.ceil( (date - CycleSUM) / daysYearNormal ); // year

        if (year === 5) { year = 4; } // extra day of year: 366

        var fourthYear        = year === 4; // 4th year
        var lastYearOfCentury = (lastCycle && fourthYear); // 100th year

        if (lastYearOfCentury) { leapYear = false; }

        var YearSUM = Math.floor(dayOfCycle / daysYearNormal); // LSUM

        if (fourthYear) {
            if (YearSUM > 3) {
                YearSUM = 3;
            }
        }

        var firstDayOfYear = YearSUM * daysYearNormal;

        // Last year day:
        if (dayOfCycle - firstDayOfYear === 0) {
            firstDayOfYear = (YearSUM - 1) * daysYearNormal;
        }

        var day = dayOfCycle - firstDayOfYear;

        return {
              'century':century,
             'leapYear':leapYear,
                 'year': (century-1)*100 + (cycle-1)*4 + year,
                  'day':day
        };

    };

}