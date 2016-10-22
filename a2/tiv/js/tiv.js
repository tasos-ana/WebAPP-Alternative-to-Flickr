var TIV3166 = function () {
    "use strict";
    
    var loadedImages = {
        array: []
    };
    
    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !==  null);
    }
    
    return {
        loadImages: function () {
            var files = document.getElementById("images").files, i, file, reader, img, index, func;
            for (i = 0; i < files.length; i += 1) {
                file = files[i];
                reader = new FileReader();
                if (checkImg(file.name)) {
                    reader.onload = (function (file) {
                        return function (e) {
                            index = loadedImages.array.length;
                            func = ['TIV3166.showImage(\'', index, '\',\'main\')'].join('');
                            img = document.createElement("IMG");
                            img.src = e.target.result;
                            img.setAttribute("onclick", func);
                            img.title = file.name;
                            loadedImages.array.push(img);
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
            var i, img, div, div2;
            if (loadedImages.array.length === 0) {
                document.getElementById("unloaded").style.display = 'block';
            } else {
                document.getElementById("unloaded").style.display = 'none';
            }
            for (i = 0; i < loadedImages.array.length; i += 1) {
                div = document.createElement('div');
                div.className = "tile";
                div.appendChild(loadedImages.array[i]);
                div2 = document.createElement('div');
                div2.className = "text";
                div2.innerHTML = loadedImages.array[i].title.toString();
                div.insertBefore(div2, null);
                document.getElementById(elem).insertBefore(div, null);
            }
        },
        //draw image with 'index' = index from loadedImages on the elem 
        showImage: function (index, elem) {
            
        },
        //write on elem that passed in function all the EXIF info of image on index
        showImageDetailedExifInfo: function (index, elem) {
            
        },
        //same with exif info just here saw the map location
        showImageDetailedWithMap: function (index, elem) {
            
        }
    };
}();