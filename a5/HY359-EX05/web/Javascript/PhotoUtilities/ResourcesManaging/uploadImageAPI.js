var uploadImageAPI = function () {
    "use strict";

    //On array we keep all the img that loaded
    //on Index keep the index of last img that drawed
    var loadedImages = {
        array: [],
        index: 0
    };

    var images2Upload = {
        imgFile: [],
        imgType: [],
        imgName: [],
        total: 0
    };

    //Img name valitor
    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    }

    //Create an object IMG and give to him src,name and add a call function on click
    //Also push the object on array
    function addImg(src, name) {
        var img;
        img = document.createElement("IMG");
        img.src = src;
        img.className = "tile";
        img.title = name;
        loadedImages.array.push(img);//add img on array
    }

    function addUploadImage(imgData, imgType, imgName) {
        images2Upload.imgFile.push(imgData);
        images2Upload.imgType.push(imgType);
        images2Upload.imgName.push(imgName);
        images2Upload.total++;
    }

    //Getting one index from loadImage, an element and draw it on elem
    //Also increase the index
    function addHtmlCode(elem, index) {
        var tileDiv, textDive;
        tileDiv = document.createElement('div');//Create a div and with class name tile
        tileDiv.className = "tile";
        tileDiv.appendChild(loadedImages.array[index]);//Add on div the img on 'index' from loadedImages
        textDive = document.createElement('div');//Create another div for img text
        textDive.className = "text";
        textDive.innerHTML = loadedImages.array[index].title.toString();//Get the img name from img on index
        tileDiv.insertBefore(textDive, null);//Insert the text on first div-'tile'
        document.getElementById(elem).insertBefore(tileDiv, null);//insert the div on elem that we want
        loadedImages.index = loadedImages.index + 1;// increase counter
    }

    function startUploading(index) {
        var img, imgTitle, imgExt, formData, xhr, userName;
        if (index === images2Upload.total) {
            return;
        }
        userName = getUsername();

        if (userName === null || userName === "") {
            pageReady();
            window.alert("Image upload failed. Undefined username");
        }

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
                if (index === loadedImages.array.length - 1) {
                    pageReady();
                }
            };
        })(index);
        xhr.send(formData);
    }

    function uploadImage() {
        "use strict";
        var upload_but;
        upload_but = document.getElementById("uploadImage_but");
        startUploading(0);
        upload_but.disabled = true;
        upload_but.style.cursor = "default";//set pointer cursor
    }

    function imageExist(text) {
        var elem = document.getElementById("unloaded");
        if (loadedImages.array.length === 0) {
            elem.style.display = 'block';//if the array is empty will saw msg
            elem.innerText = text;
            return 0;
        } else {
            document.getElementById("unloaded").style.display = 'none';//hide msg if that array isnt empty
            return 1;
        }
    }

    return {
        //read all images from file
        loadImages: function () { //TODO Rename loadImage -> previewImage  && id -> previewImageButton
            var files = document.getElementById("images").files, i, file, reader, display, upload_but;
            display = document.getElementById("loadImage");//Get the button that load image so we disable it later
            upload_but = document.getElementById("uploadImage_but");
            for (i = 0; i < files.length; i += 1) {
                file = files[i];
                reader = new FileReader();
                if (checkImg(file.name)) {//validate img
                    reader.onload = (function (file) {
                        return function (e) {
                            addImg(e.target.result, file.name);//add images on array
                            display.disabled = false;//make enabled the button
                            display.style.cursor = "pointer";//set pointer cursor

                            upload_but.disabled = false;
                            upload_but.style.cursor = "pointer";//set pointer cursor
                        };
                    })(file);
                    var imgType = "image";
                    var imgData = file;
                    var imgName = file.name;
                    var ext = file.name.split(".").pop();
                    imgName = imgName.replace("." + ext, "");
                    addUploadImage(imgData, imgType, imgName);

                    display.disabled = false;//make enabled the button
                    display.style.cursor = "pointer";//set pointer cursor

                    upload_but.disabled = false;
                    upload_but.style.cursor = "pointer";//set pointer cursor
                }
                reader.readAsDataURL(file);
            }
        },
        //return all the elements from the array
        getLoadedImages: function () {
            return loadedImages.array;
        },
        //using the tile from previous TIV html on ex01
        //drawing images inside on elem that user give
        previewImage: function (elem) {
            var i, display;
            if (!imageExist("There is not image to preview"))
                document.getElementById("images").click();
                return;
            for (i = loadedImages.index; i < loadedImages.array.length; i += 1) {//if the i was on loadedImage
                addHtmlCode(elem, i);//add an html code for img
            }
            display = document.getElementById('loadImage');
            display.disabled = true;//disable the button
            display.style.cursor = "default";//set cursor from pointer to default
        },
        uploadImage: function () {
            if (!imageExist("Choose image file before upload"))
                document.getElementById("images").click();
                return;
            pagePrepare();
            uploadImage();
        },
        getTotal: function (){
            return images2Upload.total;
        }
    };
}();