<%-- 
    Document   : memberForm
    Created on : Nov 25, 2016, 2:57:59 PM
    Author     : Tasos198
--%>

<%@page import="cs359db.model.User"%>
<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    ServletContext context = getServletContext();
    List member;
    assert(context.getAttribute("data") instanceof List);
    member = (List) context.getAttribute("data");
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
            </tr>
        </thead>
        <tbody>
            <% for (i = 0; i < member.size(); i++) {
                assert(member.get(i) instanceof User);
                user = (User)member.get(i);
                assert(user!=null);
            %>
            <tr>
                <td><%= i+1 %></td>
                <td> <%= user.getUserName() %> </td>
                <td> <%= user.getFirstName() %> </td>
                <td> <%= user.getLastName() %> </td>
                <td> <%= user.getGender().toString() %> </td>
                <td> <%= user.getCountry() %> </td>
                <td> <%= user.getTown() %> </td>
            </tr>
            <% } %>
        </tbody>
    </table>
    <div class="page-header"></div>
    <p class="text-center"><b>Total Members: <%=i%></b></p>
</div>