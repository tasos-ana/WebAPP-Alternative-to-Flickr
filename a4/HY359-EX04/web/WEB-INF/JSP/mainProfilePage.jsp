<%-- 
    Document   : mainProfile
    Created on : Nov 25, 2016, 5:12:19 PM
    Author     : Tasos198
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--Image container-->
<div class="animated_container">
    <div id="img_container" class="container">
        <h2 class="text-center">Welcome on Tiled Image Viewer</h2>
        <form id="image_form" class="text-center" name="image">
            <div class="form-group">
                <div class="col-sm-3"></div>
                <div class="col-sm-2">
                    <input class="btn_style" id="loadImage" type="button" value="Display Images" onclick="TIV3166.showLoadedImages('list');" />
                </div>
                <div class="col-sm-1"></div>
                <div class="col-sm-2">
                    <input class="btn_style" id="images" type="file" webkitdirectory mozdirectory directory name="myFiles" 
                           onchange="TIV3166.loadImages();" multiple/>
                </div>
                <div class="col-sm-3"></div>
            </div>
        </form><br><br>
        <h4 id="unloaded" class="text-center">No images loaded yet</h4>
    </div>
    <div id="tiles_container" class="text-center">
        <div  id="main">
            <span id="close" onclick="closeSpan()">X</span>
            <span id="list"></span>
        </div> 
    </div>
</div>
