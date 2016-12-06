<%-- 
    Document   : welcomePage
    Created on : Nov 25, 2016, 2:59:06 PM
    Author     : Tasos198
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

    <button type="button" onclick="requestRegisterPage()" 
            class="btn btn-default btn_style">Register Now</button>
</div>