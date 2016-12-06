/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global TIV3166 */

function uploadImage() {
    "use strict";
    var allImages, xhr, i;
    var img, imgSrc, imgTitle, imgType, formData;
    formData = new FormData();

    allImages = TIV3166.getLoadedImages();

    for (i = 0; i < allImages.length; ++i) {
        img = allImages[i];

        imgSrc = img.src;
        formData.append("photo", imgSrc);

        imgTitle = img.title;

        imgType = imgSrc.split(";")[0];
        imgType = imgType.split(":")[1];

        xhr = new XMLHttpRequest();

        if (imgTitle !== null) {
            xhr.open('POST', 'UploadImage?userName=baremenos19&contentType=' + imgType + '&title=' + imgTitle);
        } else {
            xhr.open('POST', 'UploadImage?userName=baremenos19&contentType=' + imgType);
        }

        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.getResponseHeader("error") !== null) {
                    var imgID = xhr.getResponseHeader("id");
                } else {
                    window.alert("error");
                }
            } else if (xhr.status !== 200) {
                window.alert("Request failed. Returned status of " + xhr.status);
            }
        };
        xhr.send(formData);
    }
}

function getLatestUserImages(){
    
}

function getLatestImages() {
    
}

function getImageMeta(){
    
}

function getUserImage(){
    
}