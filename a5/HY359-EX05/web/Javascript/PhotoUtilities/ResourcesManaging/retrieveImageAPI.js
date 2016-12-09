/* 
 *     Document      :retrieveImageAPI.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

/* global uploadImageAPI */

var TIV3166 = function () {
    "use strict";
    //On array we keep all the img that loaded
    //on Index keep the index of last img that drawed
    var loadedImages = {
        array: [],
        id: [],
        remaining: 0
    };
    /*============================================================================*/


    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*retrieveImageAPI functions*/
    function loadImagesFromDB_inner(num, elem, user) {
        if(!user){
            TIV3166.resetImage(elem,user);
        }
        requestImageID(num, elem, user);
    }

    function loadImagesFromFile_inner() {
        var files = document.getElementById("images").files, i, file, reader, display, upload_but;
        display = document.getElementById("loadImage");//Get the button that load image so we disable it later
        upload_but = document.getElementById("uploadImage_but");
        for (i = 0; i < files.length; i += 1) {
            file = files[i];
            reader = new FileReader();
            if (checkImg(file.name)) {//validate img
                reader.onload = (function (file, index) {
                    return function (e) {
                        addImg(e.target.result, index, file.name);//add images on array
                        display.disabled = false;//make enabled the button
                        display.style.cursor = "pointer";//set pointer cursor

                        upload_but.disabled = false;
                        upload_but.style.cursor = "pointer";//set pointer cursor
                    };
                })(file, i);
                var imgType = "image";
                var imgData = file;
                var imgName = file.name;
                var ext = file.name.split(".").pop();
                imgName = imgName.replace("." + ext, "");
                uploadImageAPI.addImage(imgData, imgType, imgName);

                display.disabled = false;//make enabled the button
                display.style.cursor = "pointer";//set pointer cursor

                upload_but.disabled = false;
                upload_but.style.cursor = "pointer";//set pointer cursor
            }
            reader.readAsDataURL(file);
        }
    }

    function showLoadedImages_inner(elem, user) {
        displayImage(elem, user);
    }

    function previewLoadedImagesFromFile(elem) {
        var index, display;
        if (!imageExist("There is not image to preview")) {
            document.getElementById("images").click();
        } else {
            for (index = 0; index < loadedImages.array.length; ++index) {//if the i was on loadedImage
                addPreviewCode(elem, index);
            }
            display = document.getElementById('loadImage');
            display.disabled = true;//disable the button
            display.style.cursor = "default";//set cursor from pointer to default
        }
    }

    function showImage_inner(index, elem) {
        var modal = document.getElementById(elem);
        // Get the image and insert it inside the modal - use its "alt" text as a caption
        var modalImg = document.getElementById("imgModal_img");
        var captionText = document.getElementById("imgCaption");
        modal.style.display = "block";
        modalImg.src = loadedImages.array[index].src;
        captionText.innerHTML = loadedImages.array[index].title;
        TIV3166.showImageDetailedExifInfo(index, "imgMETA"); //call the function to add the exif info 
    }

    function getLoadedImages_inner() {
        loadedImages.array;
    }

    function showImageDetailedExifInfo_inner(index, elem) {
        var img, elemObj, elemObj2;
        img = loadedImages.array[index]; //getting the img
        elemObj = document.getElementById(elem); //the element that we want to add the exif

        elemObj2 = document.getElementById("imgMap");
        EXIF.getData(img, function () {//getting the data by calling the getData function
            var data;
            data = EXIF.pretty(this);
            if (data !== "") {
                elemObj.style.display = "block";
                elemObj2.style.display = "block";
                elemObj.innerHTML = data; //insert the data
                TIV3166.showImageDetailedWithMap(index, "imgMap"); //call the function to add map
            } else {
                elemObj.style.display = "none";
                elemObj2.style.display = "none";
            }
        });
    }

    function showImageDetailedWithMap_inner(index, elem) {
        var img, lon, lonRef, latRef, calcLon, calcLat, lat, elemObj, uluru, map, marker;
        img = loadedImages.array[index]; //get the img
        lon = EXIF.getTag(img, 'GPSLongitude'); //take the longitude
        lonRef = EXIF.getTag(img, 'GPSLongitudeRef');
        lat = EXIF.getTag(img, 'GPSLatitude'); //take the latitude
        latRef = EXIF.getTag(img, 'GPSLatitudeRef');
        //calculate tha array to one decimal
        calcLon = (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef === "W" ? -1 : 1);
        calcLat = (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "N" ? 1 : -1);
        //following the google api code from google site
        elemObj = document.getElementById(elem);
        uluru = {lat: calcLat, lng: calcLon};
        map = new google.maps.Map((elemObj), {
            zoom: 4,
            center: uluru
        });
        marker = new google.maps.Marker({
            position: uluru,
            map: map
        });
    }

    function resetImage_inner(user,elem) {
        loadedImages.array = [];
        loadedImages.id = [];
        loadedImages.remaining = 0;
        if(user === true){
            document.getElementById(elem).innerHTML = "";
        }
    }
    /*============================================================================*/


    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*Utils Functions*/
    function requestImageID(num, elem, user) {
        "use strict";
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'GetImageCollection');
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.getResponseHeader("error") === null) {
                    loadedImages.id = JSON.parse(xhr.responseText);
                    loadedImages.remaining = loadedImages.id.length;
                    TIV3166.showLoadedImages(elem, user);
                } else {
                    document.getElementById("main_container").innerHTML = xhr.responseText;
                    pageReady();
                }
            } else if (xhr.status !== 200) {
                window.alert("Request failed. Returned status of " + xhr.status);
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        if (user === true) {
            var username;
            username = document.getElementById("page_message").getAttribute("data-username");
            if (username === null || username === "") {
                window.alert("tiv.js at requestImageFromDB null username");
            }
            xhr.send('user=' + username + '&number=' + num);
        } else {
            xhr.send('number=' + num);
        }
    }

    function displayImage(elem, user) {
        var index, id, xhr, arr;
        arr = loadedImages.id;
        pagePrepare();
        for (index = 0; index < arr.length; ++index) {
            id = arr[index];
            xhr = new XMLHttpRequest();
            xhr.open('POST', 'GetImage');
            xhr.responseType = "blob";
            xhr.onload = (function (index, xhr, user) {
                return function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        if (xhr.getResponseHeader("error") === null) {
                            var r = new FileReader();
                            var b = xhr.response;
                            r.onload = (function (index) {
                                return function (e) {
                                    var imgData = e.target.result;
                                    addImg(imgData, index, "untitled");
                                    getImageMeta(elem, index, user);
                                };
                            })(index);
                            r.readAsDataURL(b);
                        } else {
                            document.getElementById("main_container").innerHTML = xhr.responseText;
                        }
                    } else if (xhr.status !== 200) {
                        window.alert("Request failed. Returned status of " + xhr.status);
                    }
                };
            })(index, xhr, user);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('image=' + id + '&metadata=false');
        }
    }

    //Create an object IMG and give to him src,name and add a call function on click
    //Also push the object on array
    function addImg(src, index, name) {
        var func, img;
        func = ['TIV3166.showImage(\'', index, '\',\'imgModal\')'].join(''); //Create the function that needed to call on click
        img = document.createElement("IMG");
        img.src = src;
        img.className = "tile";
        img.title = name;
        img.setAttribute("onclick", func); //Set the function on object img
        loadedImages.array[index] = img; //add img on array
    }

    function getImageMeta(elem, index, user) {
        var xhr, id;
        id = loadedImages.id[index];
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'GetImage');
        xhr.onload = (function (index, elem, user) {
            return function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (xhr.getResponseHeader("error") === null) {
                        var author, imgName, imgRate, meta;
                        meta = JSON.parse(xhr.responseText);
                        author = meta.username;
                        imgName = meta.title;
                        imgRate = meta.numberOfRatings;
                        loadedImages.remaining--;
                        if (user === true) {
                            addTivCode(elem, index, author, imgName, imgRate);
                        } else {
                            addCarouselCode(index, author, imgName);
                        }
                        if (loadedImages.remaining === 0) {
                            pageReady();
                        }
                    } else {
                        document.getElementById("main_container").innerHTML = xhr.responseText;
                    }
                } else if (xhr.status !== 200) {
                    window.alert("Request failed. Returned status of " + xhr.status);
                }
            };
        })(index, elem, user);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('image=' + id + '&metadata=true');
    }

    //Getting one index from loadImage, an element and draw it on elem
    //Also increase the index
    function addTivCode(elem, index, author, imgName, imgRate) {
        var tileDiv, textDiv, imgNameDiv, imgRateDiv;
        tileDiv = document.createElement('div'); //Create a div and with class name tile
        textDiv = document.createElement('div'); //Create another div for img text
        imgNameDiv = document.createElement('div');
        imgRateDiv = document.createElement('div');
        tileDiv.className = "tile";
        textDiv.className = "text";
        imgNameDiv.className = "tivImgName";
        imgRateDiv.className = "tivImgRate";
        loadedImages.array[index].title = imgName;
        imgNameDiv.innerHTML = imgName + "<br>" + "by " + author;
        imgRateDiv.innerHTML = "\&\#9734;" + imgRate;
        tileDiv.appendChild(loadedImages.array[index]); //Add on div the img on 'index' from loadedImages
        textDiv.appendChild(imgNameDiv);
        textDiv.appendChild(imgRateDiv);
        tileDiv.insertBefore(textDiv, null); //Insert the text on first div-'tile'
        document.getElementById(elem).insertBefore(tileDiv, null); //insert the div on elem that we want
    }

    function addCarouselCode(index, author, imgName) {
        var carouselList, carouselContainer;
        carouselList = document.getElementById("carouselSlideTo");
        carouselContainer = document.getElementById("carousel_container");
        var listElem;
        listElem = document.createElement('li');
        listElem.setAttribute("data-target", "#myCarousel");
        listElem.setAttribute("data-slide-to", "#" + index);
        if (index === 0) {
            listElem.className = "active";
        }
        carouselList.appendChild(listElem);

        var containerElem, img, containerText, imgNameElem, authorElem, lastElem;
        containerElem = document.createElement('div');
        img = loadedImages.array[index];
        containerText = document.createElement('div');
        authorElem = document.createElement('p');
        imgNameElem = document.createElement('h3');
        if (index === 0) {
            containerElem.className = "item active";
        } else {
            containerElem.className = "item";
        }
        img.setAttribute("width", "460");
        img.setAttribute("height", "345");
        img.className = "carousel_img";
        containerElem.appendChild(img);
        containerText.className = "carousel-caption";
        imgNameElem.innerText = imgName;
        containerText.appendChild(imgNameElem);
        authorElem.innerText = "by " + author;
        containerText.style.color = "#ffb62f";
        containerText.appendChild(authorElem);
        containerElem.appendChild(containerText);

        lastElem = document.getElementById("carousel_left_but");
        carouselContainer.insertBefore(containerElem, lastElem);
    }

    function addPreviewCode(elem, index) {
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

    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !== null);
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
    /*============================================================================*/


    /*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~**~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
    /*The actual api*/
    return {
        //read all images from db
        loadImagesFromDB: function (num, elem, user) {
            loadImagesFromDB_inner(num, elem, user);
        },
        loadImagesFromFile: function () {
            loadImagesFromFile_inner();
        },
        //return all the elements from the array
        getLoadedImages: function () {
            return getLoadedImages_inner();
        },
        //using the tile from previous TIV html on ex01
        //drawing images inside on elem that user give
        showLoadedImages: function (elem, user) {//TODO rename se preview from db
            showLoadedImages_inner(elem, user);
        },
        previewLoadedImagesFromFile(elem) {
            previewLoadedImagesFromFile(elem);
        },
        //draw image with 'index' = index from loadedImages on the elem 
        showImage: function (index, elem) {
            showImage_inner(index, elem);
        },
        //write on elem that passed in function all the EXIF info of image on index
        showImageDetailedExifInfo: function (index, elem) {
            showImageDetailedExifInfo_inner(index, elem);
        },
        //same with exif info just here saw the map location
        showImageDetailedWithMap: function (index, elem) {
            showImageDetailedWithMap_inner(index, elem);
        },
        resetImage: function (user, elem) {
            resetImage_inner(user,elem);
        }
    };
    /*============================================================================*/
}();