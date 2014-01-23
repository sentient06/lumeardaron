//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

function Tengwar() {

    "use strict";

    var _this = this;

    /**
     * Translate decimal number into a duodecimal tengwar value.
     * @param decNumber
     * @returns {string}
     */
    _this.duodecimal = function(decNumber) {
        if (decNumber === "10") {
            return ".";
        }
        var duodecimalNumber = decNumber.toString(12);
        // \u00F0\u00A8 // 0 - ð¨
        // \u00F1\u00A8 // 1 - ñ¨
        // \u00F2\u2122 // 2 - ò™
        // \u00F3\u02DC // 3 - ó˜
        // \u00F4\u00A8 // 4 - ô¨
        // \u00F5\u2122 // 5 - õ™
        // \u00F6\u00A8 // 6 - ö¨
        // \u00F7\u00A8 // 7 - ÷¨
        // \u00F8\u00A8 // 8 - ø¨
        // \u00F9\u2122 // 9 - ù™
        // \u00FA\u00A8 // A - ú¨
        // \u00FB\u00A8 // B - û¨
        // ." // 10 - .
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
     * Translate decimal number into a tengwar value.
     * @param decNumber
     * @returns {string}
     */
    _this.decimal = function(decNumber) {
        var decimalNumber = decNumber.toString();
        if (decimalNumber === "10") {
            return ".";
        }
        var chars = ["\u00F0","\u00F1","\u00F2","\u00F3","\u00F4",
                     "\u00F5","\u00F6","\u00F7","\u00F8","\u00F9"];
        var formattedNumber = "";
        for (var i = decimalNumber.length - 1; i >= 0; i--) {
            formattedNumber += chars[parseInt(decimalNumber[i], 10)];
        }
        return formattedNumber;
    };

}