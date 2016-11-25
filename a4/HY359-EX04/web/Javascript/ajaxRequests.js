/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global validationAPI */

function XSSValidator(name) {
    var scriptStart, scriptStartEncoded, scriptEnd, scriptEndEncoded;
    scriptStart = "<script>";
    scriptStartEncoded = "&lt;script&gt;";

    scriptEnd = "</script>";
    scriptEndEncoded = "&lt;/script&gt;";
    if(name.includes(scriptStart) && name.includes(scriptEnd)){
       name = name.replace(scriptStart,scriptStartEncoded);
        name = name.replace(scriptEnd,scriptEndEncoded);
    }

    return name;
}

function ajaxChangesRequest() {
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
    //send data for change infos
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.reload(true);
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Action', 'change');
    xhr.send('username=' + usrID.value + '&password=' + usrPW.value + '&email=' + usrEmail.value +
            '&fname=' + usrFNAME.value + '&lname=' + usrLNAME.value + '&birthday=' + usrBDATE.value +
            '&sex=' + usrSEX.value + '&country=' + usrCOUNTRY.value + '&town=' + usrTOWN.value + '&extra=' + usrEXTRA.value);
}

function ajaxLoginRequest(cookie) {
    "use strict";
    var username, pw, xhr;

    xhr = new XMLHttpRequest();

    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") === null) {
                document.getElementById("page_message").setAttribute("data-login",xhr.responseText);
                document.getElementById("page_message").innerHTML ="Welcome, " + XSSValidator(xhr.responseText);
                succeed_login_action();
            } else {
                if (xhr.getResponseHeader("error") === "cookie") {
                    renderPage();
                    return;
                }
                document.getElementById("usr_login_error").innerHTML = XSSValidator(xhr.getResponseHeader("error"));
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'login');
    if (cookie === null) {
        username = document.getElementById("usr_id");
        pw = document.getElementById("usr_pw");
        xhr.send('username=' + username.value + '&password=' + pw.value);
    } else {
        xhr.send('username=cook&password=cook');
    }
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
            document.getElementById("register_container").setAttribute("data-visible","none");
            renderPage();
            document.getElementById("main_text_container").innerHTML = XSSValidator(xhr.responseText);
            setTimeout(function(){window.location.reload(true);},5000); 
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
            document.getElementById("main_text_container").innerHTML = XSSValidator(xhr.responseText);
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
    username = document.getElementById("page_message").getAttribute("data-login");
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.registration.usrID.value = XSSValidator(xhr.getResponseHeader("username"));
            document.registration.usrEMAIL.value = XSSValidator(xhr.getResponseHeader("email"));
            document.registration.usrFNAME.value = XSSValidator(xhr.getResponseHeader("fname"));
            document.registration.usrLNAME.value = XSSValidator(xhr.getResponseHeader("lname"));
            document.registration.usrBDATE.value = XSSValidator(xhr.getResponseHeader("birthday"));
            if (xhr.getResponseHeader("sex") !== "") {
                document.registration.usrSEX.value = XSSValidator(xhr.getResponseHeader("sex"));
            }
            document.registration.usrTOWN.value = XSSValidator(xhr.getResponseHeader("town"));
            document.registration.usrCOUNTRY.value = XSSValidator(xhr.getResponseHeader("country"));
            if (xhr.getResponseHeader("extra") !== "") {
                document.registration.usrEXTRA.value = XSSValidator(xhr.getResponseHeader("extra"));
            }
            validationAPI.validateAll(false);
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'userInfo');
    xhr.send();
}