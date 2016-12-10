/* 
 *     Document      :ajaxRatingRequest.js
 *     Project       :HY359-EX06
 *     Author        :Tasos198
 *     Created on    :Dec 10, 2016
 */

function ajaxAddRatingRequest(imgId, rate) {
    "use strict";
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'ImageRating');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'newRating');
    xhr.send("image=" + imgId + "&rate=" + rate);
}

function ajaxGetRatingRequest(imgId) {
    "use strict";
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'ImageRating');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("rate" + xhr.getResponseHeader("userRating")).checked = true;
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'getRating');
    xhr.send("image=" + imgId);
}

function ajaxGetMORatingRequest(imgId) {
    "use strict";
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'ImageRating');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("rate" + xhr.getResponseHeader("userRating")).checked = true;
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'getRating');
    xhr.send("image=" + imgId);
}