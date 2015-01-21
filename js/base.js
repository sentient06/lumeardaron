//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

function Base() {
    "use strict";
    var _this = this;
    _this.isset = function(element) {
        if (typeof(element) !== 'undefined' && element !== null) {
            return true;
        }
        return false;
    };
    _this.issetElementId = function(elementId) {
        return _this.isset(document.getElementById(elementId));
    };
}