<%-- 
    Document   : welcomePage
    Created on : Nov 25, 2016, 2:59:06 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    ServletContext context = getServletContext();
    List member;
    assert (context.getAttribute("data") instanceof List);
    member = (List) context.getAttribute("data");

    int totalMember, totalPhoto;
    totalMember = member.size();
    totalPhoto = 0;
%>
<div class="animated_container">
    <h1 
        style="font-family: Arial Black, Gadget, sans-serif;
        text-shadow: -1px 0 #333333, 0 1px #333333, 1px 0 #333333, 0 -1px #333333;
        color: #d6d6d6;
        "
        >Find your inspiration. </h1><br>
    <h4> Join the Tiv community, home to <%= totalPhoto%> photos, 
        <br><%= totalMember%> people, and 0 groups. </h4><br>

    <button type="button" class="btn btn-default btn_style"  
            onclick="requestRegisterPage();">
        Register Now
    </button><br/>
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