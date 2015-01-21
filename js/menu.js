//  Created by Giancarlo Mariot in November 2014.
//  Copyright (c) 2014 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

function MenuController() {

    "use strict";

    var _this = this;

    _this.init = function() {
        // console.log('menu controller init');
        // document.getElementById("")
        var base = new Base();
        var dropdownButtons = document.getElementsByClassName("dropdown-button");

        for (var i = 0, $dropdownButton; $dropdownButton = dropdownButtons[i++];) {
            // console.log($dropdownButton);
            
            // Hide menu:
            var toggleObjectId = $dropdownButton.attributes['data-toggle'].value;
            var $toggleObject = document.getElementById(toggleObjectId);
            $toggleObject.style.display = 'none';

            // Action:
            $dropdownButton.onclick = function(event) {
                event.preventDefault();
                // var toggleObjectId = this.attributes['data-toggle'].value;
                // var $toggleObject = document.getElementById(toggleObjectId);
                // console.log($toggleObject);
                var displayValue = $toggleObject.style.display;
                if (displayValue === 'none')
                    $toggleObject.style.display = 'block';
                else
                    $toggleObject.style.display = 'none';
            };
        }

        var mobileButtons = document.getElementsByClassName("mobile-button");
        for (var i = 0, $mobileButton; $mobileButton = mobileButtons[i++];) {
            // Action:
            $mobileButton.onclick = function(event) {
                event.preventDefault();
                var $uls = this.parentNode.getElementsByTagName("ul");
                var attr = this.getAttribute('data-status');
                var show = base.isset(attr) ? parseInt(attr) === 0 : true;
                console.log(show);
                if (show) {
                    this.setAttribute('data-status', "1");
                    // this.style.backgroundColor = "red";
                    this.className += " active";
                    for (var i = 0, $ul; $ul = $uls[i++];) {
                        $ul.className += " visible";
                        // $ul.style.display = "block";
                    }
                } else {
                    this.setAttribute('data-status', "0");
                    // this.style.backgroundColor = "blue";
                    this.className = this.className.split(" ")[0];
                    for (var i = 0, $ul; $ul = $uls[i++];) {
                        $ul.className = $ul.className.split(" ")[0];
                        // $ul.style.display = "none";
                    }
                }


            //     // var toggleObjectId = this.attributes['data-toggle'].value;
            //     // var $menu = document.getElementById(toggleObjectId);
            //     // console.log($menu);
            //     var displayValue = $menu.style.display;
            //     if (displayValue === 'none')
            //         $menu.style.display = 'block';
            //     else
            //         $menu.style.display = 'none';
            };
        }

    };

}


(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {
    var menuController = new MenuController();
    menuController.init();
},false);
})();