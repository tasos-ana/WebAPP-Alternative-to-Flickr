/* 
 *     Document      :uploadImageAPI.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

var uploadImageAPI = function () {
    "use strict";

    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*API Data structure*/
    var images2Upload = {
        imgFile: [],
        imgType: [],
        imgName: [],
        total: 0
    };
    /*============================================================================*/


    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*image2UploadAPI functions*/
    function addImage_inner(imgData, imgType, imgName) {
        images2Upload.imgFile.push(imgData);
        images2Upload.imgType.push(imgType);
        images2Upload.imgName.push(imgName);
        images2Upload.total++;
    }

    function uploadImage_inner() {
        if (!imageExist("Choose image file before upload")) {
            document.getElementById("images").click();
        } else {
            pagePrepare();
            uploadImage();
        }
    }

    function getTotal_inner() {
        return images2Upload.total;
    }

    function resetImage_inner() {
        images2Upload.imgFile = [];
        images2Upload.imgType = [];
        images2Upload.imgName = [];
        images2Upload.total = 0;
    }
    /*============================================================================*/


    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*Util functions*/
    function imageExist(text) {
        var elem = document.getElementById("unloaded");
        if (images2Upload.total === 0) {
            elem.style.display = 'block';//if the array is empty will saw msg
            elem.innerText = text;
            return 0;
        } else {
            document.getElementById("unloaded").style.display = 'none';//hide msg if that array isnt empty
            return 1;
        }
    }

    function uploadImage() {
        "use strict";
        var upload_but;
        upload_but = document.getElementById("uploadImage_but");
        startUploading(0);
        upload_but.disabled = true;
        upload_but.style.cursor = "default";//set pointer cursor
    }

    function startUploading(index) {
        var img, imgTitle, imgExt, formData, xhr, userName,cnt,uploadStatus;
        cnt = index+1;
        uploadStatus = document.getElementById("upload_status");
        uploadStatus.innerHTML = "" + cnt + "/" + images2Upload.total;
        if (index === images2Upload.total) {
            document.getElementById("upload_status").innerHTML = "";
        } else {
            userName = getUsername();

            if (userName === null || userName === "") {
                pageReady();
                window.alert("Image upload failed. Undefined username");
            } else {
                formData = new FormData();
                img = images2Upload.imgFile[index];
                imgTitle = images2Upload.imgName[index];
                imgExt = images2Upload.imgType[index];

                formData.append("photo", img);

                xhr = new XMLHttpRequest();
                if (imgTitle !== null) {
                    xhr.open('POST', 'UploadImage?userName=' + userName + '&contentType=' + imgExt + '&title=' + imgTitle);
                } else {
                    xhr.open('POST', 'UploadImage?userName=' + userName + '&contentType=' + imgExt);
                }

                xhr.onload = (function (index) {
                    return function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            if (xhr.getResponseHeader("error") !== null) {
                                window.alert("error");
                            } else {
                                index++;
                                startUploading(index);
                            }
                        } else if (xhr.status !== 200) {
                            window.alert("Request failed. Returned status of " + xhr.status);
                        }
                        if (index === uploadImageAPI.getTotal()) {
                            pageReady();
                            uploadSucceed();
                        }
                    };
                })(index);
                xhr.send(formData);
            }
        }
    }

    function uploadSucceed() {
        document.getElementById("upload_alert").removeAttribute("hidden");
        document.getElementById("upload_alert").addEventListener("mouseover", (function () {
            return setTimeout(function () {
                document.getElementById("upload_alert").setAttribute("hidden", "true");
            }, 5000);
        })());
        var display = document.getElementById('loadImage');
        display.disabled = false;//disable the button
        display.style.cursor = "pointer";//set cursor from pointer to default
        document.getElementById('list').innerHTML = "";
        document.getElementById("totalUploadedImages").innerText = uploadImageAPI.getTotal();
    }
    /*============================================================================*/


    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*The actual API*/
    return {
        addImage: function (imgData, imgType, imgName) {
            addImage_inner(imgData, imgType, imgName);
        },
        uploadImage: function () {
            uploadImage_inner();
        },
        getTotal: function () {
            return getTotal_inner();
        },
        resetImage: function () {
            resetImage_inner();
        }
    };
    /*============================================================================*/
}();