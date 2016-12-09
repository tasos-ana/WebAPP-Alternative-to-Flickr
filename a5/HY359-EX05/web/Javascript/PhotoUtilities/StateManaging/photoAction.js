/* 
 *     Document      :photoAction.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

/* global TIV3166 */

//user must be true or false
function getLatestImages(imageNo, elem, user) {
    TIV3166.loadImagesFromDB(imageNo, elem, user);
}

function refreshPhoto(elem, user) {
    var num;
    num = document.getElementById("select_max_display_no");
    TIV3166.resetImage(user,elem);
    getLatestImages(num.value, elem, user);
}