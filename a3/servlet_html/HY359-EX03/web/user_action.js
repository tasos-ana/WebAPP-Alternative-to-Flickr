/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global validationAPI */

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookies(){
    var username,pw;
    username = getCookie("username");
    pw = getCookie("password");
    if (username !== "" && pw !== ""){
        window.alert(username);
        window.alert(pw);
        document.getElementById("usr_id").value = username;
        document.getElementById("usr_pw").value = pw;
        ajaxLoginRequest();
    }
}

function register_action() {
    "use strict";
    document.getElementById("usr_form_container").reset();
    document.getElementById("usr_form_container").style.display = "table-cell";
    document.getElementById("reg_form_desc").innerHTML = "Registration Form";
    document.getElementById("usr_login_error").innerHTML = "";
    document.registration.usrID.focus();
    document.getElementById("reply_container").innerHTML = "";
    document.getElementById("usrID_err").innerHTML = "";
    document.getElementById("usrPW_err").innerHTML = "";
    document.getElementById("usrPW2_err").innerHTML = "";
    document.getElementById("usrEMAIL_err").innerHTML = "";
    document.getElementById("usrFNAME_err").innerHTML = "";
    document.getElementById("usrLNAME_err").innerHTML = "";
    document.getElementById("usrBDATE_err").innerHTML = "";
    document.getElementById("usrTOWN_err").innerHTML = "";
    
    document.getElementById("new_usr_action").style.display = "inline";
    document.getElementById("old_usr_action").style.display = "none";
    
    document.registration.usrID.removeAttribute("disabled");
    document.registration.usrEMAIL.removeAttribute("disabled");
}

function login_action() {
    "use strict";
    var username, pw;
    username = document.getElementById("usr_id");
    pw = document.getElementById("usr_pw");

    if (username.value === "") {
        document.getElementById("usr_login_error").innerHTML = "Username can't be empty";
        username.focus();
        return;
    }

    if (pw.value === "") {
        document.getElementById("usr_login_error").innerHTML = "Password can't be empty";
        pw.focus();
        return;
    }
    ajaxLoginRequest();
}

function logout_action() {
    "use strict";
    document.getElementById("usr_in_container").style.display = "inline";
    document.getElementById("usr_out_container").style.display = "none";
    document.getElementById("usr_settings_container").style.display = "none";
    document.getElementById("login_msg").style.display = "none";

    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    
    document.getElementById("usr_id").value = "";
    document.getElementById("usr_pw").value = "";

    document.getElementById("usr_form_container").style.display = "none";
    document.getElementById("reply_container").innerHTML = "";
}

function settings_action() {
    document.getElementById("usr_form_container").reset();
    document.getElementById("usr_form_container").style.display = "table-cell";
    document.getElementById("reg_form_desc").innerHTML = "Profile Settings";
    document.getElementById("usr_login_error").innerHTML = "";
    document.getElementById("reply_container").innerHTML = "";

    document.getElementById("new_usr_action").style.display = "none";
    document.getElementById("old_usr_action").style.display = "inline";
    
    document.registration.usrID.setAttribute("disabled","on");
    document.registration.usrEMAIL.setAttribute("disabled","on");
    ajaxUserProfileRequest();
}

function allMembers_action() {
    "use strict";
    document.getElementById("usr_form_container").style.display = "none";
    ajaxAllMembersRequest();
}


