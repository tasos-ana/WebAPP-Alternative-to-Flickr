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
        var len, usrID, xhr, pattern;

        usrID = document.registration.usrID;
        len = usrID.value.length;
        
        pattern = /([A-Za-z0-9]{8,})/;
        if(usrID.value.indexOf(" ") !== -1){
            document.getElementById("usrID_err").style.color = "red";
            document.getElementById("usrID_err").innerHTML = "Space not allowed";
            formValid.usrID = false;
            return;
        }

        if (!usrID.value.match(pattern)) {
            document.getElementById("usrID_err").style.color = "red";
            document.getElementById("usrID_err").innerHTML = "Username must contain only character and numbers";
            formValid.usrID = false;
            return;
        }

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
        try {
            current = document.getElementById("email_label").getAttribute("data-current");
        } catch (e) {

        }

        if (!existCheck || (current !== null && current === usrEMAIL.value)) {
            document.getElementById("usrEMAIL_err").style.color = "green";
            document.getElementById("usrEMAIL_err").innerHTML = "&#10004";
            formValid.usrEMAIL = true;
            return;
        }
        
        if(usrEMAIL.value.indexOf(" ") !== -1){
            document.getElementById("usrEMAIL_err").style.color = "red";
            document.getElementById("usrEMAIL_err").innerHTML = "Space not allowed";
            formValid.usrID = false;
            return;
        }
        
        pattern = /(.+)@([A-Za-z]+)\.([A-Za-z]+)([\.A-Za-z]*)/;
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
        
        if(usrPW.value.indexOf(" ") !== -1){
            document.getElementById("usrPW_err").style.color = "red";
            document.getElementById("usrPW_err").innerHTML = "Space not allowed";
            formValid.usrID = false;
            return;
        }
        
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
        
        if(usrPW2.value.indexOf(" ") !== -1){
            document.getElementById("usrPW2_err").style.color = "red";
            document.getElementById("usrPW2_err").innerHTML = "Invalid password";
            formValid.usrID = false;
            return;
        }

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

        usrLNAME = document.registration.usrLNAME;
        lnameLen = usrLNAME.value.length;

        letter = /[A-Za-z]/;
        if (lnameLen >= 4 && lnameLen <= 20 && usrLNAME.value.match(letter)) {
            document.getElementById("usrLNAME_err").style.color = "green";
            document.getElementById("usrLNAME_err").innerHTML = "&#10004";
            formValid.usrLNAME = true;
            return;
        }
        document.getElementById("usrLNAME_err").style.color = "red";
        document.getElementById("usrLNAME_err").innerHTML = "Last name must contain at least 4 letters and less than 20";
        formValid.usrLNAME = false;
    }

    function usrBDATEValidation() {
        var today, date, dd, mm, yyyy, currYYYY, usrBDATE;

        today = new Date();
        currYYYY = today.getFullYear();

        usrBDATE = document.getElementById("usrBDATE");

        yyyy = document.getElementById("usrBDATE_Y").value;
        mm = document.getElementById("usrBDATE_M").value;
        dd = document.getElementById("usrBDATE_D").value;

        if (!usrBDATEDValidation() || !usrBDATEYValidation()) {
            document.getElementById("usrBDATE_err").style.color = "red";
            document.getElementById("usrBDATE_err").innerHTML = "Incomplete birthday date";
            formValid.usrBDATE = false;
            return;
        }

        if ((Number(currYYYY) - Number(yyyy)) < 15) {
            document.getElementById("usrBDATE_err").style.color = "red";
            document.getElementById("usrBDATE_err").innerHTML = "Oups! You are too young for this site";
            formValid.usrBDATE = false;
            return;
        }

        date = yyyy + '-' + mm + '-' + dd;
        usrBDATE.value = date;

        document.getElementById("usrBDATE_err").style.color = "green";
        document.getElementById("usrBDATE_err").innerHTML = "&#10004";
        formValid.usrBDATE = true;
    }

    //YEAR Validate
    function usrBDATEYValidation() {
        var today, currYYYY, maxYYYY, minYYYY, numbers;
        numbers = /[0-9]/;
        today = new Date();
        maxYYYY = today.getFullYear();
        minYYYY = 1900;

        currYYYY = document.getElementById("usrBDATE_Y").value;
        if (currYYYY === 'undefined') {
            return false;
        }

        if (!currYYYY.match(numbers)) {
            document.getElementById("usrBDATE_Y").value = "";
            return false;
        }

        if (Number(currYYYY) < minYYYY || Number(currYYYY) > maxYYYY) {
            document.getElementById("usrBDATE_Y").value = maxYYYY;
        }

        return true;
    }

    //DATE Validate
    function usrBDATEDValidation() {
        var today, dd, mm, yyyy, currDD, currMM, currYYYY, maxDD, numbers;

        numbers = /[0-9]/;

        today = new Date();
        dd = today.getDate();
        mm = today.getMonth();
        yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        currDD = document.getElementById("usrBDATE_D").value;
        if (currDD === 'undefined') {
            return false;
        }
        if (!currDD.match(numbers)) {
            document.getElementById("usrBDATE_D").value = "";
            return false;
        }

        currMM = document.getElementById("usrBDATE_M").value;

        currYYYY = document.getElementById("usrBDATE_Y").value;

        if (currMM === "01" || currMM === "03" || currMM === "05" || currMM === "07"
                || currMM === "08" || currMM === "10" || currMM === "12") {//MONTH With 31 days
            maxDD = 31;
        } else if (currMM === "04" || currMM === "06" || currMM === "09" || currMM === "11") {//MONTH With 30 days
            maxDD = 30;
        } else if (currMM === "02") {//MONTH = february
            maxDD = 28;
        } else {
            window.alert("Unexcepted Month Value");
        }

        //if the year is today set max day as today
        if (currYYYY !== 'undefined' && Number(currYYYY) === yyyy && Number(currMM) === mm) {
            maxDD = Number(dd);
        }

        if (Number(currDD) < 0 || Number(currDD) > maxDD) {
            document.getElementById("usrBDATE_D").value = Number(maxDD);
        }

        return true;
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
        usrBDATE_Y: function () {
            usrBDATEYValidation();
        },
        usrBDATE_D: function () {
            usrBDATEDValidation();
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