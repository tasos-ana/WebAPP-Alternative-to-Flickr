<%-- 
    Document   : uploadPage
    Created on : Dec 7, 2016, 2:43:43 PM
    Author     : Giakoumis Giwrgos
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--Image container-->
<div class="animated_container">
    <div id="img_container" class="container">
        <form id="image_form" class="text-center" name="image">
            <div class="form-group">
                <div class="col-sm-4">
                    <input class="btn_style" id="images" type="file" webkitdirectory mozdirectory directory name="myFiles" 
                           onchange="uploadImageAPI.loadImages();" multiple/>
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-2">
                    <button type="button" id="loadImage" class="btn btn-default btn_style"
                            onclick="uploadImageAPI.previewImage('list');">
                        Preview Images
                    </button>
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-2">
                    <button type="button" id="uploadImage_but" class="btn btn-default btn_style"
                            onclick="uploadImageAPI.uploadImage();">
                        Upload Images
                    </button>
                </div>
            </div>
        </form><br><br>
        <h4 id="unloaded" class="text-center">No images loaded yet</h4>
    </div>
    <div id="upload_alert" class="alert alert-success" hidden>
        <strong>Success!</strong> You upload <span id="totalUploadedImages"></span> images.
    </div>
    <div id="tiles_container" class="text-center">
        <div  id="main">
            <span id="list"></span>
        </div>
        <!-- The image Modal -->
        <div id="imgModal" class="imgModal container">
            <span class="imgClose" onclick="closeImgModal();">×</span>
            <img class="imgModal-content" id="imgModal_img">
            <div id="imgCaption"></div>
            <div class="row">
                <div class="col-sm-6" id="imgMap-container">
                    <div id="imgMap"></div>
                </div>
                <div class="col-sm-1"></div>
                <pre class="col-sm-5" id="imgMETA"></pre>
            </div>
        </div>    
    </div>
</div>
