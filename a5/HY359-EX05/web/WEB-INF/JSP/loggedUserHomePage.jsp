<%-- 
    Document   : loggedUserHomePage
    Created on : Nov 25, 2016, 5:12:19 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!--Image container-->
<div class="animated_container">
    <h2 class="text-center">Welcome on Tiled Image Viewer</h2>
    <div class="container">
        <form>
            <div class="row">
                <div class="col-sm-4"></div>
                <h5 class="col-sm-4">
                    Select the maximum photos that you want to preview:</h5>
                <div class="col-sm-4"></div>
            </div>
            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <select class="select_max_number" id="select_max_display_no">
                        <option>1</option>
                        <option>5</option>
                        <option selected="">10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                    </select>
                    <button type="button" class="btn_style" onclick="refreshPhoto('list', true)">Refresh</button>    
                </div>
                <div class="col-sm-4"></div>
            </div>
        </form>
    </div><br>
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
