<%-- 
    Document   : profilePage
    Created on : Nov 25, 2016, 5:00:03 PM
    Author     : Tasos198
--%>
<%@page import="data.info"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    ServletContext context = getServletContext();
    info user;

    assert (context.getAttribute("data") instanceof info);
    user = (info) context.getAttribute("data");

    String firstPrint;
    firstPrint = response.getHeader("servlet");
    if (firstPrint != null) {
%>
<%= firstPrint%>
<%    }
%>
<div class="animated_container container">
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right"><b>Username: </b></td>
                <td class="text-left"><%= user.getUsername()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Password:  </b></td>
                <td class="text-left"> <%= user.getPassword()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Email:</b></td>
                <td class="text-left"> <%= user.getEmail()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>First Name:</b></td>
                <td class="text-left"> <%= user.getFname()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Last Name:</b></td>
                <td class="text-left"> <%= user.getLname()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Birthday Date:</b></td>
                <td class="text-left"> <%= user.getBday()%></td>
            </tr>
            <% if (user.getSex().compareTo("") != 0) {%>
            <tr>
                <td class="text-right"><b>Sex:</b></td>
                <td class="text-left">  <%= user.getSex()%></td>
            </tr>
            <% }%>
            <tr>
                <td class="text-right"><b>Country:</b></td>
                <td class="text-left">  <%= user.getCountry()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Town</b></td>
                <td class="text-left">  <%= user.getTown()%></td>
            </tr>
            <% if (user.getExtraInfo().compareTo("") != 0) {%>
            <tr>
                <td class="text-right"><b>Extra info:</b></td>
                <td class="text-left">  <%= user.getExtraInfo()%></td>
            </tr>
            <% }%>
        </tbody>
    </table>
</div>