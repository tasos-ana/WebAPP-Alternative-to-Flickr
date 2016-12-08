<%-- 
    Document   : welcomePage
    Created on : Nov 25, 2016, 2:59:06 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    // TODO get totalPhoto doing getPhotoIDs with LIMIT=18446744073709551615(max mySQL BIGINT)
    // and counting returned ids
    ServletContext context = getServletContext();
    List member;
    assert (context.getAttribute("data") instanceof List);
    member = (List) context.getAttribute("data");

    int totalMember, totalPhoto;
    totalMember = member.size();
    totalPhoto = 0;
%>
<div id="animated_container" class="animated_container">
    <h1 
        style="font-family: Arial Black, Gadget, sans-serif;
        text-shadow: -1px 0 #333333, 0 1px #333333, 1px 0 #333333, 0 -1px #333333;
        color: #d6d6d6;
        "
        >Find your inspiration. </h1>
    <h4> Join the Tiv community, home to <%= totalPhoto%> photos, 
        <br><%= totalMember%> people. </h4>
    <div class="container"><br>
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <!-- Indicators -->
            <ol id="carouselSlideTo" class="carousel-indicators">            
            </ol>
            <!-- Wrapper for slides -->
            <div id="carousel_container" class="carousel-inner" role="listbox">
                <!-- Left and right controls -->
                <a id="carousel_left_but" class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
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
    </div><br>
    <button type="button" class="btn btn-default btn_style"  
            onclick="requestRegisterPage();">
        Register Now
    </button>    
</div>