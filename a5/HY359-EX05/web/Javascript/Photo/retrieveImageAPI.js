var TIV3166 = function () {
    "use strict";

    //On array we keep all the img that loaded
    //on Index keep the index of last img that drawed
    var loadedImages = {
        array: [],
        id: []
    };

    //Create an object IMG and give to him src,name and add a call function on click
    //Also push the object on array
    function addImg(src, name, index) {
        var func, img;
        func = ['TIV3166.showImage(\'', index, '\',\'imgModal\')'].join('');//Create the function that needed to call on click
        img = document.createElement("IMG");
        img.src = src;
        img.className = "tile";
        img.setAttribute("onclick", func);//Set the function on object img
        img.title = name;
        loadedImages.array[index] = img;//add img on array
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
    }

    function requestImageID(num, elem) {
        "use strict";
        var xhr, username;

        username = document.getElementById("page_message").getAttribute("data-username");
        if (username === null || username === "") {
            window.alert("tiv.js at requestImageFromDB null username");
        }
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'GetImageCollection');
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.getResponseHeader("error") === null) {
                    loadedImages.id = JSON.parse(xhr.responseText);
                    TIV3166.showLoadedImages(elem);
                } else {
                    document.getElementById("main_container").innerHTML = xhr.responseText;
                }
            } else if (xhr.status !== 200) {
                window.alert("Request failed. Returned status of " + xhr.status);
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send('userName=' + username + '&number=' + num);
    }

    function displayImage(elem) {
        var index, id, xhr, arr;
        arr = loadedImages.id;
        for (index = 0; index < arr.length; ++index) {
            id = arr[index];
            xhr = new XMLHttpRequest();
            xhr.open('POST', 'GetImage');
            xhr.responseType = "blob";
            xhr.onload = (function (index) {
                return function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        if (xhr.getResponseHeader("error") === null) {
                            var r = new FileReader();
                            var b = xhr.response;
                            r.onload = (function (index) {
                                return function () {
                                    var imgData = r.result;
                                    addImg(imgData, "title", index);
                                    addHtmlCode(elem, index);
                                };
                            })(index);
                            r.readAsDataURL(b);
                        } else {
                            document.getElementById("main_container").innerHTML = xhr.responseText;
                        }
                    } else if (xhr.status !== 200) {
                        window.alert("Request failed. Returned status of " + xhr.status);
                        document.getElementById("main_container").innerHTML = xhr.responseText;
                    }
                };
            })(index);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send('image=' + id + '&metadata=false');
        }
    }

    return {
        //read all images from db
        loadImages: function (num, elem) {
            requestImageID(num, elem);
        },
        //return all the elements from the array
        getLoadedImages: function () {
            return loadedImages.array;
        },
        //using the tile from previous TIV html on ex01
        //drawing images inside on elem that user give
        showLoadedImages: function (elem) {
            displayImage(elem);
        },
        //draw image with 'index' = index from loadedImages on the elem 
        showImage: function (index, elem) {
            var modal = document.getElementById(elem);

            // Get the image and insert it inside the modal - use its "alt" text as a caption
            var modalImg = document.getElementById("imgModal_img");
            var captionText = document.getElementById("imgCaption");

            modal.style.display = "block";
            modalImg.src = loadedImages.array[index].src;
            captionText.innerHTML = loadedImages.array[index].title;
            TIV3166.showImageDetailedExifInfo(index, "imgMETA");//call the function to add the exif info 
        },
        //write on elem that passed in function all the EXIF info of image on index
        showImageDetailedExifInfo: function (index, elem) {
            var img, elemObj, elemObj2;

            img = loadedImages.array[index];//getting the img
            elemObj = document.getElementById(elem);//the element that we want to add the exif

            elemObj2 = document.getElementById("imgMap");
            EXIF.getData(img, function () {//getting the data by calling the getData function
                var data;
                data = EXIF.pretty(this);
                if (data !== "") {
                    elemObj.style.display = "block";
                    elemObj2.style.display = "block";
                    elemObj.innerHTML = data; //insert the data
                    TIV3166.showImageDetailedWithMap(index, "imgMap");//call the function to add map
                } else {
                    elemObj.style.display = "none";
                    elemObj2.style.display = "none";
                }
            });
        },
        //same with exif info just here saw the map location
        showImageDetailedWithMap: function (index, elem) {
            var img, lon, lonRef, latRef, calcLon, calcLat, lat, elemObj, uluru, map, marker;

            img = loadedImages.array[index];//get the img
            lon = EXIF.getTag(img, 'GPSLongitude');//take the longitude
            lonRef = EXIF.getTag(img, 'GPSLongitudeRef');
            lat = EXIF.getTag(img, 'GPSLatitude');//take the latitude
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
    };
}();