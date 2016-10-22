var TIV3166 = function () {
    "use strict";
    
    var loadedImages = {
        array: []
    }, images2display = {
        array: []
    };
    
    function checkImg(name) {
        return (name.match(/\.(jpeg|jpg|gif|png)$/) !==  null);
    }
    
    return {
        loadImages: function () {
            var files = document.getElementById("images").files, i, file, reader, div, div2;
            for (i = 0; i < files.length; i += 1) {
                file = files[i];
                loadedImages.array.push(file.name);
                reader = new FileReader();
                if (checkImg(file.name)) {
                    reader.onload = (function (file) {
                        return function (e) {
                            div = document.createElement('div');
                            div.className = "tile";
                            div.innerHTML = ['<img  src="', e.target.result, '" title="', escape(file.name), '">'].join('');
                            div2 = document.createElement('div');
                            div2.className = "text";
                            div2.innerHTML = file.name;
                            div.insertBefore(div2,null);
                            images2display.array.push(div);
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
            var i;
            if (images2display.array.length === 0) {
                document.getElementById("unloaded").style.display = 'block';
            } else {
                document.getElementById("unloaded").style.display = 'none';
            }
            for (i = 0; i < images2display.array.length; i += 1) {
                document.getElementById(elem).insertBefore(images2display.array[i], null);
            }
        }
    };
}();