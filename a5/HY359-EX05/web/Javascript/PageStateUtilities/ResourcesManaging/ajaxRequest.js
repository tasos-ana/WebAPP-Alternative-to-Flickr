/* 
 *     Document      :ajaxRequest.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

/* global validationAPI, formValid, TIV3166 */

function ajaxLoginRequest() {
    "use strict";
    var username, pw, xhr;

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") === null) {
                var username = xhr.getResponseHeader("id");
                setWelcomeMessage(username);
                document.getElementById("main_container").innerHTML = xhr.responseText;
                getLatestImages(10, 'list', true, false);
                succeed_login_action();
            } else {
                renderPage();
                try {
                    document.getElementById("usr_login_error").innerHTML = XSSValidator(xhr.getResponseHeader("error"));
                    document.getElementById("usr_login_error").style.color = "red";
                    pageReady();
                } catch (err) {
                    document.getElementById("main_container").innerHTML = xhr.responseText;
                    getLatestImages(10, 'list', false, true);
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
    pagePrepare();
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
        document.getElementById("form_alert").addEventListener("mouseover", setTimeout(function () {
            document.getElementById("form_alert").setAttribute("hidden", "true");
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
    usrBDATE = document.getElementById("usrBDATE");
    usrSEX = document.registration.usrSEX;
    usrCOUNTRY = document.registration.usrCOUNTRY;
    usrTOWN = document.registration.usrTOWN;
    usrEXTRA = document.registration.usrEXTRA;

    xhr = new XMLHttpRequest();
    //send data for register
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        pageReady();
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") !== null) {
                var err = xhr.getAllResponseHeader("error");
                registerErrorCheck(err);
            } else {
                document.getElementById("main_container").innerHTML = xhr.responseText;
                setTimeout(function () {
                    document.getElementById("login_but").click();
                }, 5000);
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'register');
    document.getElementById("loadingModal").style.display = "block";
    xhr.send('username=' + usrID.value + '&password=' + usrPW.value +
            '&email=' + usrEmail.value + '&fname=' + usrFNAME.value +
            '&lname=' + usrLNAME.value + '&birthday=' + usrBDATE.value +
            '&sex=' + usrSEX.value + '&country=' + usrCOUNTRY.value +
            '&town=' + usrTOWN.value + '&extra=' + usrEXTRA.value);
}

function ajaxUserProfileRequest() {
    "use strict";
    var username, xhr;
    username = document.getElementById("page_message").getAttribute("data-login");
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!cookieExist(xhr.getResponseHeader("fail"))) {
                document.getElementById("login_but").click();
            } else {
                document.getElementById("main_container").innerHTML = xhr.responseText;
                var val = xhr.getResponseHeader("usrCOUNTRY_val");
                setValueOfSelect("usrCOUNTRY", val);

                val = xhr.getResponseHeader("usrBDATE_val");
                setValueOfSelect("usrBDATE_M", val);

                settings_action();
                validationAPI.validateAll(false);
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'profileSettings');
    xhr.send();
}

function ajaxChangesRequest() {
    "use strict";
    if (!validationAPI.form()) {
        document.getElementById("form_alert").removeAttribute("hidden");
        document.getElementById("form_alert").addEventListener("mouseover", setTimeout(function () {
            document.getElementById("form_alert").setAttribute("hidden", "true");
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
    usrBDATE = document.getElementById("usrBDATE");
    usrSEX = document.registration.usrSEX;
    usrCOUNTRY = document.registration.usrCOUNTRY;
    usrTOWN = document.registration.usrTOWN;
    usrEXTRA = document.registration.usrEXTRA;

    xhr = new XMLHttpRequest();
    //send data for change infos
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        pageReady();
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!cookieExist(xhr.getResponseHeader("fail"))) {
                document.getElementById("login_but").click();
            } else {
                document.getElementById("main_container").innerHTML = xhr.responseText;
                profile_action();
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'change');
    pagePrepare();
    xhr.send('username=' + usrID.value + '&password=' + usrPW.value + '&email=' + usrEmail.value +
            '&fname=' + usrFNAME.value + '&lname=' + usrLNAME.value + '&birthday=' + usrBDATE.value +
            '&sex=' + usrSEX.value + '&country=' + usrCOUNTRY.value + '&town=' + usrTOWN.value + '&extra=' + usrEXTRA.value);
}

function ajaxLogoutRequest() {
    "use strict";
    var username, xhr;
    username = document.getElementById("page_message").getAttribute("data-login");
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!cookieExist(xhr.getResponseHeader("fail"))) {
                document.getElementById("home_but").click();
            } else {
                document.getElementById("main_container").innerHTML = xhr.responseText;
                getLatestImages(10, 'list', false, false);
                logout_action();
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'logout');
    xhr.send();
}

function setWelcomeMessage(username) {
    if (username !== null) {
        document.getElementById("page_message").innerHTML = username;
        document.getElementById("page_message").setAttribute("data-username", username.split(" ")[1]);
    } else {
        document.getElementById("page_message").innerHTML = "Tiled Image Viewer";
    }
}

function registerErrorCheck(err) {
    var msg, tag;
    err = err.split(":");
    msg = err[1];
    tag = err[0];
    if (tag === "username") {
        document.getElementById("usrID_err").innerHTML = msg;
        document.getElementById("usrID_err").style.color = "red";
        formValid.idValid(false);
        document.getElementById("usrID").focus();
    } else if (tag === "email") {
        document.getElementById("usrEMAIL_err").innerHTML = msg;
        document.getElementById("usrEMAIL_err").style.color = "red";
        formValid.emailValid(false);
        document.getElementById("usrEMAIL").focus();
    } else {
        window.alert("kako");
    }
}

function setValueOfSelect(selector, val) {
    if (val !== null) {
        document.getElementById(selector).value = val;
    }
}