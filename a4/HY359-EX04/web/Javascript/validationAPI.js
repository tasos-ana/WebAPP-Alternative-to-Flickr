/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var validationAPI = function () {
    "use strict";
    var formValid = {
        usrID: false,
        usrEMAIL: false,
        usrPW: false,
        usrPW2: false,
        usrFNAME: false,
        usrLNAME: false,
        usrBDATE: false,
        usrTOWN: false
    };

    function usrIDValidation(existCheck) {
        if (!existCheck) {
            document.getElementById("usrID_err").style.color = "green";
            document.getElementById("usrID_err").innerHTML = "&#10004";
            formValid.usrID = true;
            return;
        }
        var len, usrID, xhr;
        usrID = document.registration.usrID;
        len = usrID.value.length;

        if (len < 8) {
            document.getElementById("usrID_err").style.color = "red";
            document.getElementById("usrID_err").innerHTML = "Username must be at least 8 characters!";
            formValid.usrID = false;
            return;
        }
        xhr = new XMLHttpRequest();

        xhr.open('POST', 'UserServlet');
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.getResponseHeader("error") !== null) {
                    document.getElementById("usrID_err").style.color = "red";
                    document.getElementById("usrID_err").innerHTML = xhr.getResponseHeader("error");
                    formValid.usrID = false;
                } else {
                    document.getElementById("usrID_err").style.color = "green";
                    document.getElementById("usrID_err").innerHTML = "&#10004";
                    formValid.usrID = true;
                }
            } else if (xhr.status !== 200) {
                window.alert("Username check request failed. Returned status of " + xhr.status);
                formValid.usrID = false;
            }
        };
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Action', 'check');
        xhr.send('username=' + usrID.value);
    }

    function usrEMAILValidation(existCheck) {
        var usrEMAIL, current, xhr, pattern;
        usrEMAIL = document.registration.usrEMAIL;
        current = document.getElementById("email_label").getAttribute("data-current");
        if (!existCheck || (current!==null && current === usrEMAIL.value)) {
            document.getElementById("usrEMAIL_err").style.color = "green";
            document.getElementById("usrEMAIL_err").innerHTML = "&#10004";
            formValid.usrEMAIL = true;
            return;
        }

        pattern = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/;
        if (usrEMAIL.value.match(pattern)) {

            xhr = new XMLHttpRequest();
            xhr.open('POST', 'UserServlet');
            xhr.onload = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (xhr.getResponseHeader("error") !== null) {
                        document.getElementById("usrEMAIL_err").style.color = "red";
                        document.getElementById("usrEMAIL_err").innerHTML = xhr.getResponseHeader("error");
                        formValid.usrEMAIL = false;
                    } else {
                        document.getElementById("usrEMAIL_err").style.color = "green";
                        document.getElementById("usrEMAIL_err").innerHTML = "&#10004";
                        formValid.usrEMAIL = true;
                    }
                } else if (xhr.status !== 200) {
                    window.alert("Email check request failed. Returned status of " + xhr.status);
                    formValid.usrEMAIL = false;
                }
            };
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Action', 'check');
            xhr.send('email=' + usrEMAIL.value);
        } else {
            document.getElementById("usrEMAIL_err").style.color = "red";
            document.getElementById("usrEMAIL_err").innerHTML = "Invalid email";
            formValid.usrEMAIL = false;
        }
    }

    function usrPWValidation(existCheck) {
        if (!existCheck) {
            return;
        }

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
                formValid.usrPW = true;
            } else {
                document.getElementById("usrPW_err").style.color = "red";
                document.getElementById("usrPW_err").innerHTML = "Password must contain at least one letter,number and symbol";
                formValid.usrPW = false;
            }
            return;
        }
        document.getElementById("usrPW_err").style.color = "red";
        document.getElementById("usrPW_err").innerHTML = "Password require at least 6 character";
        formValid.usrPW = false;
    }

    function usrPW2Validation(existCheck) {
        if (!existCheck) {
            return;
        }
        var usrPW, usrPW2, letters, symbols, numbers;

        usrPW = document.registration.usrPW;
        usrPW2 = document.registration.usrPW2;

        letters = /[A-Za-z]/;
        symbols = /[!"\[\]{}%^&*:@~#';/.<>\\|`]/g;
        numbers = /[0-9]/;

        if (formValid.usrPW && usrPW.value === usrPW2.value) {
            document.getElementById("usrPW2_err").style.color = "green";
            document.getElementById("usrPW2_err").innerHTML = "&#10004";
            formValid.usrPW2 = true;
        } else {
            document.getElementById("usrPW2_err").style.color = "red";
            document.getElementById("usrPW2_err").innerHTML = "Invalid password";
            formValid.usrPW2 = false;
        }
    }

    function usrFNAMEValidation() {
        var usrFNAME, fnameLen, letter;

        usrFNAME = document.registration.usrFNAME;
        fnameLen = usrFNAME.value.length;

        letter = /[A-Za-z]/;
        if (fnameLen >= 3 && fnameLen <= 20 && usrFNAME.value.match(letter)) {
            document.getElementById("usrFNAME_err").style.color = "green";
            document.getElementById("usrFNAME_err").innerHTML = "&#10004";
            formValid.usrFNAME = true;
            return;
        }
        document.getElementById("usrFNAME_err").style.color = "red";
        document.getElementById("usrFNAME_err").innerHTML = "First name must contain at least 3 letters and less than 20";
        formValid.usrFNAME = false;
    }

    function usrLNAMEValidation() {
        var usrLNAME, lnameLen, letter;

        usrLNAME = document.registration.usrFNAME;
        lnameLen = usrLNAME.value.length;

        letter = /[A-Za-z]/;
        if (lnameLen >= 3 && lnameLen <= 20 && usrLNAME.value.match(letter)) {
            document.getElementById("usrLNAME_err").style.color = "green";
            document.getElementById("usrLNAME_err").innerHTML = "&#10004";
            formValid.usrLNAME = true;
            return;
        }
        document.getElementById("usrLNAME_err").style.color = "red";
        document.getElementById("usrLNAME_err").innerHTML = "Last name must contain at least 3 letters and less than 20";
        formValid.usrLNAME = false;
    }

    function usrBDATEValidation() {

        var usrBDATE, currYear, bdYear;

        usrBDATE = document.registration.usrBDATE;

        currYear = (new Date()).getFullYear();
        bdYear = (new Date(usrBDATE.value)).getFullYear();
        if ((currYear - bdYear) > 15) {
            document.getElementById("usrBDATE_err").style.color = "green";
            document.getElementById("usrBDATE_err").innerHTML = "&#10004";
            formValid.usrBDATE = true;
            return;
        }
        document.getElementById("usrBDATE_err").style.color = "red";
        document.getElementById("usrBDATE_err").innerHTML = "Only child bigger that 15year old can register";
        formValid.usrBDATE = false;
    }

    function usrTOWNValidation() {
        var usrTOWN, townLen, letter;

        usrTOWN = document.registration.usrTOWN;
        townLen = usrTOWN.value.length;
        letter = /[A-Za-z]/;

        if (townLen >= 2 && townLen <= 50 && usrTOWN.value.match(letter)) {
            document.getElementById("usrTOWN_err").style.color = "green";
            document.getElementById("usrTOWN_err").innerHTML = "&#10004";
            formValid.usrTOWN = true;
            return;
        }
        document.getElementById("usrTOWN_err").style.color = "red";
        document.getElementById("usrTOWN_err").innerHTML = "Town must contain at least two letter and less than 50";
        formValid.usrTOWN = false;
    }

    function validAll(existCheck) {
        usrIDValidation(existCheck);
        usrEMAILValidation(existCheck);
        usrPWValidation(existCheck);
        usrPW2Validation(existCheck);
        usrFNAMEValidation();
        usrLNAMEValidation();
        usrBDATEValidation();
        usrTOWNValidation();
    }

    return {
        form: function () {
//            window.alert(formValid.usrID + "usrID" + formValid.usrEMAIL + "email" + formValid.usrPW + "pw1" +
//                    formValid.usrPW2 + "pw2" + formValid.usrFNAME + "fname" + formValid.usrLNAME + "lname" +
//                    formValid.usrBDATE + "bdy" + formValid.usrTOWN + "town");
            return (formValid.usrID && formValid.usrEMAIL && formValid.usrPW && formValid.usrPW2 &&
                    formValid.usrFNAME && formValid.usrLNAME && formValid.usrBDATE && formValid.usrTOWN);
        },
        validateAll: function (existCheck) {
            validAll(existCheck);
        },
        usrID: function (existCheck) {
            usrIDValidation(existCheck);
        },
        usrEMAIL: function (existCheck) {
            usrEMAILValidation(existCheck);
        },
        usrPW: function (existCheck) {
            usrPWValidation(existCheck);
        },
        usrPW2: function (existCheck) {
            usrPW2Validation(existCheck);
        },
        usrFNAME: function () {
            usrFNAMEValidation();
        },
        usrLNAME: function () {
            usrLNAMEValidation();
        },
        usrBDATE: function () {
            usrBDATEValidation();
        },
        usrTOWN: function () {
            usrTOWNValidation();
        },
        emailValid: function (val) {
            formValid.usrEMAIL = val;
        },
        idValid: function (val) {
            formValid.usrID = val;
        }
    };
}();