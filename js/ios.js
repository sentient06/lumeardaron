//  Created by Giancarlo Mariot in January 2014.
//  Copyright (c) 2012 Giancarlo Mariot. All rights reserved.
//  Licensed under BSD 2-Clause.

// if (("standalone" in window.navigator) && window.navigator.standalone) {
// var noddy, remotes = false;
// document.addEventListener('click', function(event) {
// noddy = event.target;
// while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") { noddy = noddy.parentNode; }
// if('href' in noddy && noddy.href.indexOf('http') !== -1 && (noddy.href.indexOf(document.location.host) !== -1 || remotes)){
// event.preventDefault();
// document.location.href = noddy.href;
// }
// },false);
// }

(function(){ "use strict"; var doc = document;
doc.addEventListener('DOMContentLoaded', function() {

    // var message = "";

    if (navigator.userAgent.match(/like Mac OS X/i)) {
        if (navigator.userAgent.match(/Safari/i)) {
            // message = "This is safari";
            console.log('ios safari');
            return true;
        } else {
            console.log('ios app');
            var noddy, remotes = false;
            document.addEventListener('click', function(event) {
                noddy = event.target;
                
                while(noddy.nodeName !== "A" && noddy.nodeName !== "HTML") {
                    noddy = noddy.parentNode;
                }

                if ( 'href' in noddy &&
                     // noddy.href.indexOf('http') !== -1 &&
                    (noddy.href.indexOf(document.location.host) !== -1 || remotes)
                ){
                    if (noddy.href !== "#") {
                        event.preventDefault();
                        document.location.href = noddy.href;
                        // console.log('alternative');
                    } else {
                        // console.log('normal');
                        return true;
                    }
                }

            }, false);
        }
    } else {
        // message = "Normal browser";
        // console.log('other');
        return true;
    }

    // var msg = document.createTextNode(message);
    // document.getElementById("result").appendChild(msg);

},false);
})();