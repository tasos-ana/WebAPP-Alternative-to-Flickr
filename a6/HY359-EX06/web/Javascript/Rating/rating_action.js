/* 
 *     Document      :rating_action.js
 *     Project       :HY359-EX06
 *     Author        :Tasos198
 *     Created on    :Dec 10, 2016
 */


function addRating() {
    var val, imgId;
    var modalImg = document.getElementById("imgModal_img");
    val = document.getElementById("ratingVal").value;
    imgId = modalImg.getAttribute("data-imgId");
    ajaxAddRatingRequest(imgId, val);
}

function getRating() {
    var imgId;
    var modalImg = document.getElementById("imgModal_img");
    imgId = modalImg.getAttribute("data-imgId");
    ajaxGetRatingRequest(imgId);
}