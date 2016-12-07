<%-- 
    Document   : mainProfilePage
    Created on : Nov 25, 2016, 5:12:19 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--Image container-->
<div class="animated_container">
    <h2 class="text-center">Welcome on Tiled Image Viewer</h2>
    <div id="tiles_container" class="text-center">
        <div  id="main">
            <span id="list"></span>
        </div>
        <!-- The image Modal -->
        <div id="imgModal" class="imgModal container">
            <span class="imgClose" onclick="closeImgModal()">×</span>
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
