function closeSpan() {
    "use strict";
    var l, img, close, imgText, allMetaDataSpan;
        
    l = document.getElementById('list');
    img = document.getElementById('imgZoomed');
    close = document.getElementById('close');
    imgText = document.getElementById('imgText');
    allMetaDataSpan = document.getElementById('exifInfo');
    
    l.style.display = "";
    img.src = "";
    img.style.display = "none";
    imgText.style.display = "none";
    close.style.display = "none";
    allMetaDataSpan.style.display = "none";
}

var TIV3166 = function () {
    "use strict";
    
    var loadedImages = {
        array: [],
        index: 0
    };

    
    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !==  null);
    }
    
    function addImg(src, name) {
        var index, func, img;
        index = loadedImages.array.length;
        func = ['TIV3166.showImage(\'', index, '\',\'main\')'].join('');
        img = document.createElement("IMG");
        img.src = src;
        img.className = "tile";
        img.setAttribute("onclick", func);
        img.title = name;
        loadedImages.array.push(img);
    }
    
    function addHtmlCode(elem, index) {
        var tileDiv, textDive;
        tileDiv = document.createElement('div');
        tileDiv.className = "tile";
        tileDiv.appendChild(loadedImages.array[index]);
        textDive = document.createElement('div');
        textDive.className = "text";
        textDive.innerHTML = loadedImages.array[index].title.toString();
        tileDiv.insertBefore(textDive, null);
        document.getElementById(elem).insertBefore(tileDiv, null);
        loadedImages.index = loadedImages.index + 1;
    }
    
    return {
        //read all images from file
        loadImages: function () {
            var files = document.getElementById("images").files, i, file, reader, img, index, func, display;
            display = document.getElementById('loadImage');
            for (i = 0; i < files.length; i += 1) {
                file = files[i];
                reader = new FileReader();
                if (checkImg(file.name)) {
                    reader.onload = (function (file) {
                        return function (e) {
                            addImg(e.target.result, file.name);
                            display.disabled = false;
                            display.style.cursor = "pointer";
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
                document.getElementById("unloaded").style.display = 'block';
            } else {
                document.getElementById("unloaded").style.display = 'none';
            }
            for (i = loadedImages.index; i < loadedImages.array.length; i += 1) {
                addHtmlCode(elem, i);
            }
            display = document.getElementById('loadImage');
            display.disabled = true;
            display.style.cursor = "default";
        },
        //draw image with 'index' = index from loadedImages on the elem 
        showImage: function (index, elem) {
            var l, img, close, elemObj, elemStyle, text, imgUrl;
            l = document.getElementById('list');
            elemObj = document.getElementById(elem);
            elemStyle = window.getComputedStyle(elemObj, null);
            l.style.display = "none";
            img = document.getElementById('imgZoomed');
            text =  document.getElementById('imgText');
            if (img === null) {
                img = document.createElement('IMG');
                img.setAttribute("class", "container img-responsive img-thumbnail");
                img.setAttribute("id", "imgZoomed");
                text = document.createElement('div');
                text.setAttribute("id", "imgText");
                elemObj.insertBefore(img, null);
                elemObj.insertBefore(text, null);
            } else {
                img.style.display = "block";
            }
            close = document.getElementById('close');
            close.style.display = "inline-block";
            text.style.display = "inline-block";
            img.src = loadedImages.array[index].src;
            img.title = loadedImages.array[index].title;
            
            img.style.width = elemStyle.getPropertyValue("width");
            img.style.height = elemStyle.getPropertyValue("height");
            
            imgUrl = img.getAttribute('src');
            text.innerHTML = imgUrl;
            text.style.width = elemStyle.getPropertyValue("width");
            text.style.padding = "15px";
            text.style.textAlign = "center";
            text.style.textOverflow = "ellipsis";
            text.style.overflow = "hidden";
            
            TIV3166.showImageDetailedExifInfo(index, elem);
        },
        //write on elem that passed in function all the EXIF info of image on index
        showImageDetailedExifInfo: function (index, elem) {
            var img, elemObj, allMetaData, allMetaDataSpan;
            
            img = loadedImages.array[index];
            elemObj = document.getElementById(elem);
            allMetaDataSpan = document.getElementById('exifInfo');
            if (allMetaDataSpan === null) {
                allMetaDataSpan = document.createElement('pre');
                allMetaDataSpan.setAttribute("id", "exifInfo");
                elemObj.insertBefore(allMetaDataSpan, null);
            }
            allMetaDataSpan.style.display = "";
            EXIF.getData(img, function () {
                allMetaDataSpan.innerHTML = EXIF.pretty(this);
            });
        },
        //same with exif info just here saw the map location
        showImageDetailedWithMap: function (index, elem) {
        
        }
    };
}();