<%-- 
    Document   : memberPage
    Created on : Nov 25, 2016, 2:57:59 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page import="util.Cookies"%>
<%@page import="cs359db.model.User"%>
<%@page import="java.util.List"%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    ServletContext context = getServletContext();

    if (context.getAttribute("data") instanceof List) {
        List<User> member = (List<User>) context.getAttribute("data");
        context.removeAttribute("data"); // clear after use

        int i;
        User user = null;
%>
<div class="animated_container table-responsive">
    <table class="table table-hover text-left">
        <thead>
            <tr>
                <th>#</th>
                <th>UserName</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Gender</th>
                <th>Country</th>
                <th>Town</th>
                <th>Last Login</th>
            </tr>
        </thead>
        <tbody>
            <% for (i = 0; i < member.size(); i++) {
                    user = (User) member.get(i);
            %>
            <tr class="cursor_pointer" onclick="previewOtherMember('<%= user.getUserName()%>')">
                <td> <%= i + 1%></td>
                <td> <%= user.getUserName()%> </td>
                <td> <%= user.getFirstName()%> </td>
                <td> <%= user.getLastName()%> </td>
                <td> <%= user.getGender().toString()%> </td>
                <td> <%= user.getCountry()%> </td>
                <td> <%= user.getTown()%> </td>
                <td> <%= Cookies.getLastLogin(user.getUserName())%> </td>
            </tr>
            <% }%>
        </tbody>
    </table>
    <div class="page-header"></div>
    <p class="text-center"><b>Total Members: <%=i%></b></p>
</div>
<%  } else {
        System.out.println("memberPage.jsp: attribute \"data\" should contain a 'List' object");
    }
%>