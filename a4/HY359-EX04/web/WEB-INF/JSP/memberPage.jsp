<%-- 
    Document   : memberForm
    Created on : Nov 25, 2016, 2:57:59 PM
    Author     : Tasos198
--%>

<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    ServletContext context = getServletContext();
    List member;
    member = (List) context.getAttribute("data");
    int i;
%>
<div class="animated_container">
        <% for (i = 0; i < member.size(); i++) {
            if(i%10==0){ %>
                <br>
        <%    }
        %>
        <p class="text-center"> <b><%=i+1%>)</b>  <%= member.get(i)%> <p>
        <% }%>
        <div class="page-header"></div>
        <p class="text-center"><b>Total Members: <%=i%></b></p>
</div>