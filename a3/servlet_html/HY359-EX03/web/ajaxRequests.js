/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global validationAPI */

function ajaxChangesRequest() {
    //on succed change
    document.getElementById("new_usr_action").style.display = "inline";
    document.getElementById("old_usr_action").style.display = "none";
    document.getElementById("reg_form_desc").innerHTML = "Registration Form";
}

function ajaxLoginRequest() {
    var username, pw, xhr;
    username = document.getElementById("usr_id");
    pw = document.getElementById("usr_pw");
    
    xhr = new XMLHttpRequest();

    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") === null) {
                document.getElementById("usr_login_error").innerHTML = "";
                document.getElementById("login_as").innerHTML = xhr.responseText;
                document.getElementById("login_as").value = username.value;
                document.getElementById("login_msg").style.display = "inline";
                document.getElementById("usr_in_container").style.display = "none";
                document.getElementById("usr_out_container").style.display = "inline";
                document.getElementById("usr_settings_container").style.display = "inline";
                document.getElementById("usr_form_container").style.display = "none";
                document.getElementById("reply_container").innerHTML = "";
            } else {
                document.getElementById("usr_login_error").innerHTML = xhr.getResponseHeader("error");
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'login');
    xhr.send('username=' + username.value + '&password=' + pw.value);
}

function ajaxRegisterRequest() {
    "use strict";
    if (!validationAPI.form()) {
        window.alert("Form it's incomplete");
        return;
    }
    var usrID, usrPW, usrPW2, usrEmail, usrFNAME, usrLNAME, usrBDATE, usrSEX, usrCOUNTRY, usrTOWN, usrEXTRA, xhr;
    usrID = document.registration.usrID;
    usrPW = document.registration.usrPW;
    usrPW2 = document.registration.usrPW2;
    usrEmail = document.registration.usrEMAIL;
    usrFNAME = document.registration.usrFNAME;
    usrLNAME = document.registration.usrLNAME;
    usrBDATE = document.registration.usrBDATE;
    usrSEX = document.registration.usrSEX;
    usrCOUNTRY = document.registration.usrCOUNTRY;
    usrTOWN = document.registration.usrTOWN;
    usrEXTRA = document.registration.usrEXTRA;

    xhr = new XMLHttpRequest();
    //send data for register
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") !== null) {
                window.alert(xhr.getResponseHeader("error"));
                return;
            }
            document.getElementById("usr_form_container").style.display = "none";
            document.getElementById("reply_container").innerHTML = xhr.responseText;

            document.getElementById("usr_id").value = usrID.value;
            document.getElementById("usr_pw").value = usrPW.value;

        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Action', 'register');
    xhr.send('username=' + usrID.value + '&password=' + usrPW.value + '&email=' + usrEmail.value +
            '&fname=' + usrFNAME.value + '&lname=' + usrLNAME.value + '&birthday=' + usrBDATE.value +
            '&sex=' + usrSEX.value + '&country=' + usrCOUNTRY.value + '&town=' + usrTOWN.value + '&extra=' + usrEXTRA.value);

}

function ajaxAllMembersRequest() {
    var xhr;
    xhr = new XMLHttpRequest();

    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("reply_container").innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'members');
    xhr.send();
}

function ajaxUserProfileRequest() {
    var username, xhr;
    username = document.getElementById("login_as");

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.registration.usrID.value = xhr.getResponseHeader("username");
            document.registration.usrPW.value = xhr.getResponseHeader("password");
            document.registration.usrEMAIL.value = xhr.getResponseHeader("email");
            document.registration.usrFNAME.value = xhr.getResponseHeader("fname");
            document.registration.usrLNAME.value = xhr.getResponseHeader("lname");
            document.registration.usrBDATE.value = xhr.getResponseHeader("birthday");
            if (xhr.getResponseHeader("sex") !== "") {
                document.registration.usrSEX.value = xhr.getResponseHeader("sex");
            }
            document.registration.usrTOWN.value = xhr.getResponseHeader("town");
            document.registration.usrCOUNTRY.value = xhr.getResponseHeader("country");
            if (xhr.getResponseHeader("extra") !== "") {
                document.registration.usrEXTRA.value = xhr.getResponseHeader("extra");
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'userInfo');
    xhr.send('username=' + username.value);
}

function ajaxUserExistRequest() {
    
}

function ajaxEmailExistRequest() {
    
}