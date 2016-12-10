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
                document.getElementById("main_container").innerHTML = XSSValidator(xhr.responseText);
                getCollectionNumber('list', true, false);//image 10 for user that almost login
                succeed_login_action();
            } else {
                if (!cookieExist(xhr.getResponseHeader("fail"))) {
                    document.getElementById("login_but").click();
                } else {
                    renderPage();
                    try {
                        document.getElementById("usr_login_error").innerHTML = XSSValidator(xhr.getResponseHeader("error"));
                        document.getElementById("usr_login_error").style.color = "red";
                        pageReady();
                    } catch (err) {
                        document.getElementById("main_container").innerHTML = XSSValidator(xhr.responseText);
                        getLatestImages(10, 'list', false, true);//Carousel image
                    }
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
                document.getElementById("main_container").innerHTML = XSSValidator(xhr.responseText);
                setTimeout(function () {
                    ajaxLoginRequest();
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
                document.getElementById("main_container").innerHTML = XSSValidator(xhr.responseText);
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
                document.getElementById("main_container").innerHTML = XSSValidator(xhr.responseText);
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
                document.getElementById("main_container").innerHTML = XSSValidator(xhr.responseText);
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

function ajaxDeleteRequest() {
    "use strict";
    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!cookieExist(xhr.getResponseHeader("fail"))) {
                window.alert("Please login first to delete your account");
            }
            pageReady();
            document.getElementById("home_link").click();
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'delete');
    xhr.send();
}

function ajaxSetCollectionRequest(num) {
    "use strict";
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!cookieExist(xhr.getResponseHeader("fail"))) {
                document.getElementById("login_but").click();
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'setNumOfShownImages');
    pagePrepare();
    xhr.send('number=' + num);
}

function ajaxGetCollectionRequest(elem, user, fromMain) {
    "use strict";
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (!cookieExist(xhr.getResponseHeader("fail"))) {
                document.getElementById("login_but").click();
            } else {
                var num = xhr.getResponseHeader("number");
                document.getElementById("select_max_display_no").value = num;
                getLatestImages(num, elem, user, fromMain);
            }
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action', 'getNumOfShownImages');
    pagePrepare();
    xhr.send();
}

function setWelcomeMessage(username) {
    if (username !== null) {
        document.getElementById("page_message").innerHTML = XSSValidator(username);
        document.getElementById("page_message").setAttribute("data-username", username.split(" ")[1]);
    } else {
        document.getElementById("page_message").innerHTML = XSSValidator("Tiled Image Viewer");
    }
}

function registerErrorCheck(err) {
    var msg, tag;
    err = err.split(":");
    msg = err[1];
    tag = err[0];
    if (tag === "username") {
        document.getElementById("usrID_err").innerHTML = XSSValidator(msg);
        document.getElementById("usrID_err").style.color = "red";
        formValid.idValid(false);
        document.getElementById("usrID").focus();
    } else if (tag === "email") {
        document.getElementById("usrEMAIL_err").innerHTML = XSSValidator(msg);
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