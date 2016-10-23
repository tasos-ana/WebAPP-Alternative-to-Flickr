//Hide or show the elements that needed when X press.
//Saw the list with all photos and hide the one big image,exif and map location
//I am define that function here that want it on API because if it was in side on API
//but didnt make the function as API function the i cant see and call the img.
//To make it as an API function didnt like me because the user of APi will se a function that isnt usefull for him
function closeSpan() {
    "use strict";
    var l, img, close, imgText, allMetaDataSpan, map;
        
    l = document.getElementById('list');//Getting the element list that it's a container with all photos
    img = document.getElementById('imgZoomed');//Getting the element (img) that have the zoomed img
    close = document.getElementById('close');//Getting one span named close that have as text 'X'
    imgText = document.getElementById('imgText');//Getting the imgTXT that containe the img url
    allMetaDataSpan = document.getElementById('exifInfo');//Getting the element pre with all meta exif info
    map = document.getElementById('map');//Getting the map
    
    l.style.display = "";//Set the display with nothing
    img.src = "";//Set the img url to nothing
    //Hide Elements
    img.style.display = "none";
    imgText.style.display = "none";
    close.style.display = "none";
    allMetaDataSpan.style.display = "none";
    map.style.display = "none";
}

var TIV3166 = function () {
    "use strict";
    
    //On array we keep all the img that loaded
    //on Index keep the index of last img that drawed
    var loadedImages = {
        array: [],
        index: 0
    };

    //Img name valitor
    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !==  null);
    }
    
    //Create an object IMG and give to him src,name and add a call function on click
    //Also push the object on array
    function addImg(src, name) {
        var index, func, img;
        index = loadedImages.array.length;
        func = ['TIV3166.showImage(\'', index, '\',\'main\')'].join('');//Create the function that needed to call on click
        img = document.createElement("IMG");
        img.src = src;
        img.className = "tile";
        img.setAttribute("onclick", func);//Set the function on object img
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
    
    return {
        //read all images from file
        loadImages: function () {
            var files = document.getElementById("images").files, i, file, reader, img, index, func, display;
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
        //on error add
        //<h1>CANT LOAD THE IMAGE FROM THE COLLECTION</h1>
        showLoadedImages: function (elem) {
            var i, img, div, div2, display;
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
        //draw image with 'index' = index from loadedImages on the elem 
        showImage: function (index, elem) {
            var l, img, close, elemObj, elemStyle, text, imgUrl;
            l = document.getElementById('list');//get the img container
            elemObj = document.getElementById(elem);//get the object that we want to add the img
            elemStyle = window.getComputedStyle(elemObj, null);//compute the Style se we can get the width,height
            l.style.display = "none";//hide images
            img = document.getElementById('imgZoomed');//get the img object that we will use to saw the bigger img
            text =  document.getElementById('imgText');//get the img text that will add the url
            if (img === null) {//if it's the first time that we press img create the following elements
                img = document.createElement('IMG');
                img.setAttribute("class", "container img-responsive img-thumbnail");
                img.setAttribute("id", "imgZoomed");
                
                text = document.createElement('div');
                text.setAttribute("id", "imgText");
                
                elemObj.insertBefore(img, null);
                elemObj.insertBefore(text, null);
            } else {//if the img already defined just we saw it
                img.style.display = "block";
            }
            close = document.getElementById('close');//get the close object
            close.style.display = "block";//display close
            text.style.display = "block";//display text
            img.src = loadedImages.array[index].src;//give on img.src new input
            img.title = loadedImages.array[index].title;//new text
            
            img.style.width = elemStyle.getPropertyValue("width");//give the width of element
            img.style.height = elemStyle.getPropertyValue("height");//give the height of the element
            
            imgUrl = img.getAttribute('src');//getting the url from img so we can added on text
            text.innerHTML = imgUrl;
            text.style.width = elemStyle.getPropertyValue("width");//set the width
            text.style.padding = "15px";
            text.style.textAlign = "center";
            //the next code 'cut' the string so its can be contained on width
            text.style.textOverflow = "ellipsis";
            text.style.overflow = "hidden";
            
            TIV3166.showImageDetailedExifInfo(index, elem);//call the function to add the exif info
            TIV3166.showImageDetailedWithMap(index, elem);//call the function to add map
        },
        //write on elem that passed in function all the EXIF info of image on index
        showImageDetailedExifInfo: function (index, elem) {
            var img, elemObj, allMetaData, allMetaDataSpan;
            
            img = loadedImages.array[index];//getting the img
            elemObj = document.getElementById(elem);//the element that we want to add the exif
            allMetaDataSpan = document.getElementById('exifInfo');//get the obj where we will add exif
            if (allMetaDataSpan === null) {//if it's the first time we create the element
                allMetaDataSpan = document.createElement('pre');
                allMetaDataSpan.setAttribute("id", "exifInfo");
                elemObj.insertBefore(allMetaDataSpan, null);//insert it
            }
            allMetaDataSpan.style.display = "";//give him no display style
            EXIF.getData(img, function () {//getting the data by calling the getData function
                allMetaDataSpan.innerHTML = EXIF.pretty(this);//insert the data
            });
        },
        //same with exif info just here saw the map location
        showImageDetailedWithMap: function (index, elem) {
            var img, long, lat, mapElem, elemObj, uluru, map, marker, toDecimal;
            
            img = loadedImages.array[index];//get the img
            long = EXIF.getTag(img, 'GPSLongitude');//take the longitude
            lat = EXIF.getTag(img, 'GPSLatitude');//take the latitude
            
            //calculate tha array to one decimal
            //i found that function in one tutorial for EXIF, i am not sure that it's work
            toDecimal = function (number) {
                return number[0].numerator + number[1].numerator /
                        (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
            };
            
            //following the google api code from google site
            mapElem = document.getElementById('map');
            elemObj = document.getElementById(elem);
            
            if (mapElem === null) {
                mapElem = document.createElement('div');
                mapElem.setAttribute("id", "map");
                elemObj.insertBefore(mapElem, null);
            }
            mapElem.style.display = "block";
            
            mapElem.style.width = "100%";
            mapElem.style.height = "400px";
            mapElem.style.backgroundColor = "grey";
            
            uluru = {lat: toDecimal(lat), lng: toDecimal(long)};
            map = new google.maps.Map((mapElem), {
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