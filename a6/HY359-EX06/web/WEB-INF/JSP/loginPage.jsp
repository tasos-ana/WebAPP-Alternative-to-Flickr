<%-- 
    Document   : loginPage
    Created on : Nov 25, 2016, 2:57:39 PM
    Author     : Tasos Anastasas, Giakoumis Giwrgos
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<div class="animated_container">
    <h2 class="text-center">Login</h2>
    <form id="login_form" class="text-center" name="login">
        <div class="form-group">
            <!--USERNAME-->
            <label for="usr_id">Username:</label>
            <input type="text" id="usr_id" name="username" placeholder="Enter Username" 
                   autofocus required size="38" onkeydown="enterPress('login', event)"><br>
            <!--PASSWORD-->
            <label for="usr_pw">Password:</label>
            <input type="password" id="usr_pw" name="password" placeholder="Enter Password" 
                   required size="38" onkeydown="enterPress('login', event)"><br>
            <div id="usr_login_error"></div>
        </div>
        <button id="login" type="button" onclick="ajaxLoginRequest()" class="btn btn-default btn_style">Login</button>
    </form>
</div>