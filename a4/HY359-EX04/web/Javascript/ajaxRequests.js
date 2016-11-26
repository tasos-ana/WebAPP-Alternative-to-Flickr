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
    if (name.includes(scriptStart) && name.includes(scriptEnd)) {
        name = name.replace(scriptStart, scriptStartEncoded);
        name = name.replace(scriptEnd, scriptEndEncoded);
    }

    return name;
}

function ajaxLoginRequest() {
    "use strict";
    var username, pw, xhr;

    xhr = new XMLHttpRequest();

    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") === null) {
                var username = xhr.getResponseHeader("id");
                if (username !== null) {
                    document.getElementById("page_message").innerHTML = "Welcome, " + username;
                }else{
                    document.getElementById("page_message").innerHTML = "Tiled Image Viewer";
                }
                document.getElementById("main_container").innerHTML = xhr.responseText;
                succeed_login_action();
            } else {
                renderPage();
                try {
                    document.getElementById("usr_login_error").innerHTML = XSSValidator(xhr.getResponseHeader("error"));
                    document.getElementById("usr_login_error").style.color = "red";
                } catch (err) {
                    document.getElementById("main_container").innerHTML = xhr.responseText;
                }
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'login');
    username = document.getElementById("usr_id");
    pw = document.getElementById("usr_pw");
    if (username === null && pw === null) {
        xhr.send();
    } else {
        xhr.send('username=' + username.value + '&password=' + pw.value);
    }
}

function ajaxRegisterRequest() {
    "use strict";
    if (!validationAPI.form()) {
        document.getElementById("form_alert").removeAttribute("hidden");
        document.getElementById("form_alert").addEventListener("mouseover",setTimeout(function () {
                document.getElementById("form_alert").setAttribute("hidden","true");
            }, 5000));
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
            document.getElementById("main_container").innerHTML = xhr.responseText;
            setTimeout(function () {
                window.location.reload(true);
            }, 5000);
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'register');
    xhr.send('username=' + usrID.value + '&password=' + usrPW.value + '&email=' + usrEmail.value +
            '&fname=' + usrFNAME.value + '&lname=' + usrLNAME.value + '&birthday=' + usrBDATE.value +
            '&sex=' + usrSEX.value + '&country=' + usrCOUNTRY.value + '&town=' + usrTOWN.value + '&extra=' + usrEXTRA.value);

}

function ajaxUserProfileRequest() {
    var username, xhr;
    username = document.getElementById("page_message").getAttribute("data-login");
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("main_container").innerHTML = xhr.responseText;
            var val = xhr.getResponseHeader("usrCOUNTRY_val");
            if(val!==null){
                document.getElementById("usrCOUNTRY").value = val;
            }
            settings_action();
            validationAPI.validateAll(false);
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'profileSettings');
    xhr.send();
}

function ajaxChangesRequest() {
    if (!validationAPI.form()) {
        document.getElementById("form_alert").removeAttribute("hidden");
        document.getElementById("form_alert").addEventListener("mouseover",setTimeout(function () {
                document.getElementById("form_alert").setAttribute("hidden","true");
            }, 5000));
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

function ajaxLogoutRequest(){
     var username, xhr;
    username = document.getElementById("page_message").getAttribute("data-login");
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("main_container").innerHTML = xhr.responseText;
            logout_action();
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'logout');
    xhr.send();
}