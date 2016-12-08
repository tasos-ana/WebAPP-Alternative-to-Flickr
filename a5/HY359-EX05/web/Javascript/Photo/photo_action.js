/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global TIV3166 */

//user must be true or false
function getLatestImages(imageNo, elem, user) {
    TIV3166.loadImages(imageNo, elem, user);
}

function refreshPhoto(elem, user) {
    var num;
    num = document.getElementById("select_max_display_no");
    TIV3166.resetImage();
    getLatestImages(num.value, elem, user);
}