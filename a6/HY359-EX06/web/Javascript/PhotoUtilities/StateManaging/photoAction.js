/* 
 *     Document      :photoAction.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

/* global TIV3166, uploadImageAPI */

//user must be true or false
function getLatestImages(imageNo, elem, user, fromMain) {
    TIV3166.loadImagesFromDB(imageNo, elem, user, fromMain);
}

function refreshPhoto(elem, user) {
    var num;
    num = document.getElementById("select_max_display_no");
    TIV3166.resetImage(user, elem);
    getLatestImages(num.value, elem, user, false);
}

function displayDeleteSelector(display) {
    var selectors, i;
    selectors = document.getElementsByClassName("tivDeleteSelect");
    if(display === true){
        document.getElementById("deleteImage_but").style.display = "block";
        document.getElementById("selectImage2Delete_but").style.display = "none";
    }else{
        document.getElementById("deleteImage_but").style.display = "none";
        document.getElementById("selectImage2Delete_but").style.display = "block";
        uploadImageAPI.resetImage2Delete();
    }
    for (i = 0; i < selectors.length; ++i) {
        selectors[i].checked = false;
        if (display === true) {
            selectors[i].style.display = "block";
        } else {
            selectors[i].style.display = "none";
        }
    }
}

function deleteImageSelector_action(elem){
    var id;
    id = elem.getAttribute("data-img-id");
    if(elem.checked === true){
        uploadImageAPI.pushImage2Delete(id);
    }else{
        uploadImageAPI.popImage2Delete()(id);
    }
}