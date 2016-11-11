/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function register_action() {
    "use strict";
    document.getElementById("usr_form_container").reset();
    document.getElementById("usr_form_container").style.display = "table-cell";
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
}

function login_action() {
    "use strict";
    var username, pw;
    username = document.getElementById("usr_id");
    pw = document.getElementById("usr_pw");

    if (username.value === "") {
        document.getElementById("usr_login_error").innerHTML = "Username can't be empty";
        return;
    }

    if (pw.value === "") {
        document.getElementById("usr_login_error").innerHTML = "Password can't be empty";
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
    ajaxUserProfileRequest();
}

function allMembers_action() {
    "use strict";
    document.getElementById("usr_form_container").style.display = "none";
    ajaxAllMembersRequest();
}


