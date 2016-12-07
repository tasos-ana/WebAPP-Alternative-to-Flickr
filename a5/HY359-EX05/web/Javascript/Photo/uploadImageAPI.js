var uploadImageAPI = function () {
    "use strict";

    //On array we keep all the img that loaded
    //on Index keep the index of last img that drawed
    var loadedImages = {
        array: [],
        index: 0
    };

    //Img name valitor
    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !== null);
    }

    //Create an object IMG and give to him src,name and add a call function on click
    //Also push the object on array
    function addImg(src, name) {
        var index, img;
        index = loadedImages.array.length;
        img = document.createElement("IMG");
        img.src = src;
        img.className = "tile";
        img.title = name;
        loadedImages.array.push(img);//add img on array
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
    
    function uploadImage() {
        "use strict";
        var img2Upload, xhr, i;
        var img, imgSrc, imgTitle, imgType, formData;
        formData = new FormData();

        img2Upload = uploadImageAPI.getLoadedImages();

        for (i = 0; i < img2Upload.length; ++i) {
            img = img2Upload[i];

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
                        window.alert("uploaded img with id " + xhr.getResponseHeader("id"));
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

    return {
        //read all images from file
        loadImages: function () {
            var files = document.getElementById("images").files, i, file, reader, display;
            display = document.getElementById('loadImage');//Get the button that load image so we disable it later
            for (i = 0; i < files.length; i += 1) {
                file = files[i];
                reader = new FileReader();
                if (checkImg(file.name)) {//validate img
                    reader.onload = (function (file) {
                        return function (e) {
                            addImg(e.target.result, file.name);//add images on array
                            display.disabled = false;//make enabled the button
                            display.style.cursor = "pointer";//set pointer cursor
                        };
                    })(file);
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
            if (loadedImages.array.length === 0) {
                document.getElementById("unloaded").style.display = 'block';//if the array is empty will saw msg
            } else {
                document.getElementById("unloaded").style.display = 'none';//hide msg if that array isnt empty
            }
            for (i = loadedImages.index; i < loadedImages.array.length; i += 1) {//if the i was on loadedImage
                addHtmlCode(elem, i);//add an html code for img
            }
            display = document.getElementById('loadImage');
            display.disabled = true;//disable the button
            display.style.cursor = "default";//set cursor from pointer to default
        },
        uploadImage: function () {
            uploadImage();
        }
    };
}();