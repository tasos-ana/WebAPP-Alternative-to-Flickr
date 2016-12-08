<%-- 
    Document   : profilePage
    Created on : Nov 25, 2016, 5:00:03 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>
<%@page import="cs359db.model.User"%>
<%@page import="cs359db.db.UserDB"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    ServletContext context = getServletContext();

    if (context.getAttribute("data") instanceof User) {
        User user = (User) context.getAttribute("data");

        String firstPrint = (String) context.getAttribute("header");
        if (firstPrint != null) {
%>
<%=         firstPrint%>
<%      }%>
<div class="animated_container container">
    <table class="table">
        <tbody>
            <tr>
                <td class="text-right"><b>Username: </b></td>
                <td class="text-left"><%= user.getUserName()%></td>
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
                <td class="text-left"> <%= user.getFirstName()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Last Name:</b></td>
                <td class="text-left"> <%= user.getLastName()%></td>
            </tr>
            <tr>
                <td class="text-right"><b>Birthday Date:</b></td>
                <td class="text-left"> <%= user.getBirthDate()%></td>
            </tr>
            <% String gender = user.getGender().toString();
                if (gender.compareTo("") != 0) {%>
            <tr>
                <td class="text-right"><b>Sex:</b></td>
                <td class="text-left">  <%= gender%></td>
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
            <% String info = user.getInfo();
                if (info.compareTo("") != 0) {%>
            <tr>
                <td class="text-right"><b>Extra info:</b></td>
                <td class="text-left">  <%= info%></td>
            </tr>
            <% }%>
        </tbody>
    </table>
</div>
<%  } else {
        System.out.println("attribute \"data\" should contain a 'User' object");
    }
%>