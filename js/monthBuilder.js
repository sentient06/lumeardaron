//  Created by Giancarlo Mariot in December 2014.
//  Copyright (c) 2014 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

function MonthBuilder() {
    "use strict";
    var _this = this;

    _this.createElementInTarget = function($target, type) {
        var newElement = document.createElement(type);
        $target.appendChild(newElement);
        return newElement;
    };

    _this.drawMonth = function(targetId, months, weekDays, tengwar, duodecimal) {

        var base = new Base();

console.log(months);
        if (months[0].totalDays === 1) {
            return;
        }
        if (tengwar) {
            var tengwarHandler = new Tengwar();
        }
        for (var i = 0, month; month = months[i++];) {
            // var $header = _this.createElementInTarget(document.getElementById(targetId), "h4");
            var $wrapp = _this.createElementInTarget(document.getElementById(targetId), "div");
            var $table = _this.createElementInTarget($wrapp, "table");
            var $thead = _this.createElementInTarget($table, "thead");
            var $tbody = _this.createElementInTarget($table, "tbody");
            var monthName = document.createTextNode(month.name);
            var $ttltr = _this.createElementInTarget($thead, "tr");
            var $title = _this.createElementInTarget($ttltr, "th");

            // Number of columns:
            var rowItems =rowItems = month.totalDays / weekDays; // 72 / 6 = 12

            // Table:
            $wrapp.setAttribute("class", 'width-'+rowItems);

            // Header:
            if (tengwar) {
                $title.setAttribute("class", 'tengwar-regular');
            }
            $title.setAttribute("colspan", rowItems);
            $title.appendChild(monthName);
            $ttltr.appendChild($title);
            $thead.appendChild($ttltr);

            

            // Iterate rows (days of the week):
            for (var w = 0; w < weekDays; w++) {

                var $row = _this.createElementInTarget($tbody, "tr");

                // Iterate columns (days of the month):
                for (var m = 0; m < rowItems; m++) {

                    var $td = _this.createElementInTarget($row, "td");
                    var numValue = (w+1) + (weekDays*m);
                    var txtValue = "";
                    var dateText = "";
                    // var $span = document.createElement("span");

                    if (duodecimal) {
                        if (tengwar) {
                            txtValue = tengwarHandler.duodecimal(numValue);
                        } else {
                            txtValue = numValue.toString(12).toUpperCase();
                        }
                    } else {
                        txtValue = numValue;
                    }
                    
                    // else {
                    //     txtValue = numValue < 10 ? '0' + numValue : numValue;
                    // }

                    dateText = document.createTextNode(' ' + txtValue);

                    if (tengwar && numValue === month.currentDate) {
                        $td.setAttribute("class", 'tengwar-regular active');
                    } else if (tengwar) {
                        $td.setAttribute("class", 'tengwar-regular');
                    } else if (numValue === month.currentDate) {
                        $td.setAttribute("class", 'active');
                    }

                    $td.appendChild(dateText);
                    $row.appendChild($td);

                    // if (m === rowItems-1) {
                        // var breakLine = document.createElement("br");
                        // $table.appendChild(breakLine);
                    // }

                }
                $tbody.appendChild($row);
            }
        };
    };
}