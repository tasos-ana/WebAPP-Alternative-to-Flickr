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
    var username, pw, xhr;

    username = document.getElementById("usr_id");
    pw = document.getElementById("usr_pw");

    if (username.value === "") {
        document.getElementById("usr_login_error").innerHTML = "Username cant be empty";
        return;
    }

    if (pw.value === "") {
        document.getElementById("usr_login_error").innerHTML = "Password cant be empty";
        return;
    }

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

function usrIDValidation() {
    "use strict";
    var len, usrID, xhr;
    usrID = document.registration.usrID;
    len = usrID.value.length;

    if (len < 9) {
        document.getElementById("usrID_err").style.color = "red";
        document.getElementById("usrID_err").innerHTML = "Username must be at least 8 characters!";
        return false;
    }
    xhr = new XMLHttpRequest();

    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") !== null) {
                document.getElementById("usrID_err").style.color = "red";
                document.getElementById("usrID_err").innerHTML = xhr.getResponseHeader("error");
                return false;
            } else {
                document.getElementById("usrID_err").style.color = "green";
                document.getElementById("usrID_err").innerHTML = "&#10004";
                return true;
            }
        } else if (xhr.status !== 200) {
            window.alert("Username check request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Action', 'check');
    xhr.send('username=' + usrID.value);
}

function usrEMAILValidation() {
    var usrEMAIL, xhr, pattern;
    usrEMAIL = document.registration.usrEMAIL;
    pattern = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
    if (usrEMAIL.value.match(pattern)) {
        xhr = new XMLHttpRequest();
        xhr.open('POST', 'UserServlet');
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.getResponseHeader("error") !== null) {
                    document.getElementById("usrEMAIL_err").style.color = "red";
                    document.getElementById("usrEMAIL_err").innerHTML = xhr.getResponseHeader("error");
                    return false;
                } else {
                    document.getElementById("usrEMAIL_err").style.color = "green";
                    document.getElementById("usrEMAIL_err").innerHTML = "&#10004";
                    return true;
                }
            } else if (xhr.status !== 200) {
                window.alert("Email check request failed. Returned status of " + xhr.status);
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Action', 'check');
        xhr.send('email=' + usrEMAIL.value);
    } else {
        document.getElementById("usrEMAIL_err").style.color = "red";
        document.getElementById("usrEMAIL_err").innerHTML = "Invalid email";
        return false;
    }
}

function usrPWValidation() {
    "use strict";
    var usrPW, pw_len, letters, symbols, numbers;
    letters = /[A-Za-z]/;
    symbols = /[!"\[\]{}%^&*:@~#';/.<>\\|`]/g;
    numbers = /[0-9]/;

    usrPW = document.registration.usrPW;

    pw_len = usrPW.value.length;
    if (pw_len >= 6 && pw_len <= 10) {
        if (usrPW.value.match(letters) && usrPW.value.match(symbols) && usrPW.value.match(numbers)) {
            document.getElementById("usrPW_err").style.color = "green";
            document.getElementById("usrPW_err").innerHTML = "&#10004";
            return true;
        } else {
            document.getElementById("usrPW_err").style.color = "red";
            document.getElementById("usrPW_err").innerHTML = "Password must contain at least one letter,number and symbol";
            return false;
        }
    }
    document.getElementById("usrPW_err").style.color = "red";
    document.getElementById("usrPW_err").innerHTML = "Password require at least 6 character";
    return false;
}

function usrPW2Validation() {
    "use strict";
    var usrPW, usrPW2, pw_len, pw2_len, letters, symbols, numbers;

    usrPW = document.registration.usrPW;
    usrPW2 = document.registration.usrPW2;

    letters = /[A-Za-z]/;
    symbols = /[!"\[\]{}%^&*:@~#';/.<>\\|`]/g;
    numbers = /[0-9]/;

    if (usrPWValidation() &&usrPW.value === usrPW2.value) {
        document.getElementById("usrPW2_err").style.color = "green";
        document.getElementById("usrPW2_err").innerHTML = "&#10004";
        return true;
    } else {
        document.getElementById("usrPW2_err").style.color = "red";
        document.getElementById("usrPW2_err").innerHTML = "Invalid password";
        return false;
    }
}

function usrFNAMEValidation() {
    "use strict";
    var usrFNAME, fnameLen, letter;

    usrFNAME = document.registration.usrFNAME;
    fnameLen = usrFNAME.value.length;

    letter = /[A-Za-z]/;
    if (fnameLen >= 3 && fnameLen <= 20 && usrFNAME.value.match(letter)) {
        document.getElementById("usrFNAME_err").style.color = "green";
        document.getElementById("usrFNAME_err").innerHTML = "&#10004";
        return true;
    }
    document.getElementById("usrFNAME_err").style.color = "red";
    document.getElementById("usrFNAME_err").innerHTML = "First name must contain at least 3 letters and less than 20";
    return false;
}

function usrLNAMEValidation() {
    "use strict";
    var usrLNAME, lnameLen, letter;

    usrLNAME = document.registration.usrFNAME;
    lnameLen = usrLNAME.value.length;

    letter = /[A-Za-z]/;
    if (lnameLen >= 3 && lnameLen <= 20 && usrLNAME.value.match(letter)) {
        document.getElementById("usrLNAME_err").style.color = "green";
        document.getElementById("usrLNAME_err").innerHTML = "&#10004";
        return true;
    }
    document.getElementById("usrLNAME_err").style.color = "red";
    document.getElementById("usrLNAME_err").innerHTML = "Last name must contain at least 3 letters and less than 20";
    return false;
}

function usrBDATEValidation() {
    "use strict";
    
    var usrBDATE, currYear, bdYear;
    
    usrBDATE = document.registration.usrBDATE;
    
    currYear = (new Date()).getFullYear();
    bdYear = (new Date(usrBDATE.value)).getFullYear();
    if ((currYear - bdYear) > 15) {
        document.getElementById("usrBDATE_err").style.color = "green";
        document.getElementById("usrBDATE_err").innerHTML = "&#10004";
        return true;
    }
    document.getElementById("usrBDATE_err").style.color = "red";
    document.getElementById("usrBDATE_err").innerHTML = "Only child bigger that 15year old can register";
    return false;
}

function usrTOWNValidation() {
    "use strict";
    var usrTOWN, townLen, letter;

    usrTOWN = document.registration.usrTOWN;
    townLen = usrTOWN.value.length;
    letter = /[A-Za-z]/;

    if (townLen >= 2 && townLen <= 50 && usrTOWN.value.match(letter)) {
        document.getElementById("usrTOWN_err").style.color = "green";
        document.getElementById("usrTOWN_err").innerHTML = "&#10004";
        return true;
    }
    document.getElementById("usrTOWN_err").style.color = "red";
    document.getElementById("usrTOWN_err").innerHTML = "Town must contain at least two letter and less than 50";
    return false;
}

function formValidation() {
    "use strict";
    if (usrIDValidation() && usrPWValidation() && usrPW2Validation() &&
            usrNAMEValidation() && usrBDATEValidation() && usrTOWNValidation()) {
        return true;
    }
    return false;
}

/*
 * FUNCTION FOR LOGINED USER
 */
function settings_action() {
    document.getElementById("usr_form_container").reset();
    document.getElementById("usr_form_container").style.display = "table-cell";
    document.getElementById("reg_form_desc").innerHTML = "Profile Settings";
    document.getElementById("usr_login_error").innerHTML = "";
    document.getElementById("reply_container").innerHTML = "";

    document.getElementById("new_usr_action").style.display = "none";
    document.getElementById("old_usr_action").style.display = "inline";

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

function allMembers_action() {
    "use strict";
    document.getElementById("usr_form_container").style.display = "none";
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

function ajaxChangesRequest() {
    //on succed change
    document.getElementById("new_usr_action").style.display = "inline";
    document.getElementById("old_usr_action").style.display = "none";
    document.getElementById("reg_form_desc").innerHTML = "Registration Form";
}

function ajaxRegisterRequest() {
    "use strict";

    if (!formValidation()) {
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

    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.getResponseHeader("error") !== null) {
                window.alert(xhr.getResponseHeader("error"));
                return;
            }
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
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Action', 'check');
    xhr.send('username=' + usrID.value + '&email=' + usrEmail.value);
}
