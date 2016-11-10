/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function register_action() {
    "use strict";
    document.getElementById("usr_form_container").style.display = "table-cell";
    document.getElementById("usr_login_error").innerHTML = "";
    document.registration.usrID.focus();
}

function login_action() {
    "use strict";
    var username, pw, xhr;
    username = document.getElementById("usr_id");
    pw = document.getElementById("usr_pw");

    xhr = new XMLHttpRequest();
    
    xhr.open('POST','UserServlet');
    xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200){
            if(xhr.getResponseHeader("error") === null){
                document.getElementById("usr_login_error").innerHTML = "";
                document.getElementById("login_as").innerHTML = xhr.responseText;
                document.getElementById("login_as").style.display = "inline";
                document.getElementById("usr_in_container").style.display = "none";
                document.getElementById("usr_out_container").style.display = "inline";
                document.getElementById("usr_settings_container").style.display = "inline";
                document.getElementById("usr_form_container").style.display = "none";
            }else{
                document.getElementById("usr_login_error").innerHTML = xhr.getResponseHeader("error");
            }
        }else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.setRequestHeader('action','login');
    xhr.send('username=' + username.value + '&password=' + pw.value);
}

function logout_action() {
    "use strict";
    document.getElementById("usr_in_container").style.display = "inline";
    document.getElementById("usr_out_container").style.display = "none";
    document.getElementById("usr_settings_container").style.display = "none";
    document.getElementById("login_as").style.display = "none";
}

function save_changes(){
    
}

function usrIDValidation(usrID) {
    "use strict";
    var len;
    len = usrID.value.length;
    
    if (len < 9) {
        window.alert("Username must be at least 8 characters or number or symbols");
        usrID.focus();
        return false;
    }
    return true;
}

function usrPWValidation(usrPW, usrPW2) {
    "use strict";
    var pw_len, pw2_len, letters, symbols, numbers;
    letters = /[A-Za-z]/;
    symbols = /[!"\[\]{}%^&*:@~#';/.<>\\|`]/g;
    numbers = /[0-9]/;
    pw_len = usrPW.value.length;
    pw2_len = usrPW2.value.length;
    if ((pw_len === pw2_len) && (pw_len >= 6 && pw_len <= 10)) {
        if (usrPW.value === usrPW2.value) {
            if (usrPW.value.match(letters) && usrPW.value.match(symbols) && usrPW.value.match(numbers)) {
                return true;
            } else {
                window.alert("Password must contain at least one letter, one digit and one symbol");
            }
        } else {
            window.alert("Two passwords isn't matched, please check them again");
        }
    } else {
        window.alert("Two passwords isn't matched or ist's smaller than 6 letter or bigger than 10 letters");
    }
    usrPW.focus();
    return false;
}

function usrNAMEVadidation(usrFNAME, usrLNAME) {
    "use strict";
    var fnameLen, lnameLen, letter;
    fnameLen = usrFNAME.value.length;
    lnameLen = usrLNAME.value.length;
    letter = /[A-Za-z]/;
    if (fnameLen >= 3 && fnameLen <= 20 && usrFNAME.value.match(letter)) {
        if (lnameLen >= 3 && lnameLen <= 20 && usrLNAME.value.match(letter)) {
            return true;
        } else {
            window.alert("Last name must contain at least 3 letters and less than 20");
            usrLNAME.focus();
            return false;
        }
    } else {
        window.alert("First name must contain at least 3 letters and less than 20");
        usrFNAME.focus();
        return false;
    }
}

function usrBDATEValidation(usrBDATE) {
    "use strict";
    var currYear, bdYear;
    
    currYear = (new Date()).getFullYear();
    bdYear = (new Date(usrBDATE.value)).getFullYear();
    if ((currYear - bdYear) > 15) {
        return true;
    }
    window.alert("Only child bigger that 15year old can register.");
    usrBDATE.focus();
    return false;
}

function usrTOWNValidation(usrTOWN) {
    "use strict";
    var townLen, letter;
    
    townLen = usrTOWN.value.length;
    letter = /[A-Za-z]/;
    
    if (townLen >= 2 && townLen <= 50 && usrTOWN.value.match(letter)) {
        return true;
    }
    window.alert("Town must contain at least two letter and less than 50");
    usrTOWN.focus();
    return false;
}


function formValidation() {
    "use strict";
    var usrID, usrPW, usrPW2, usrEmail, usrFNAME, usrLNAME, usrBDATE, usrSEX, usrCOUNTRY, usrTOWN, usrEXTRA;
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
    
    if (usrIDValidation(usrID) && usrPWValidation(usrPW, usrPW2) && 
        usrNAMEVadidation(usrFNAME, usrLNAME) && usrBDATEValidation(usrBDATE) && 
        usrTOWNValidation(usrTOWN)){
        
        xhr = new XMLHttpRequest();
       
        xhr.open('POST','UserServlet');
        xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200){
            if(xhr.getResponseHeader("error") !== null){
               window.alert(xhr.getResponseHeader("error"));
               return;
            }
            //send data for register
            xhr.open('POST','UserServlet');
            xhr.onload = function() {
                if (xhr.readyState === 4 && xhr.status === 200){
                    if(xhr.getResponseHeader("error") !== null){
                        window.alert(xhr.getResponseHeader("error"));
                        return;
                    }
                    document.getElementById("reply_container").innerHTML = xhr.responseText;
                    
                }else if (xhr.status !== 200) {
                    window.alert("Request failed. Returned status of " + xhr.status);
                }
            };
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.setRequestHeader('Action','register');
            xhr.send('username=' + usrID.value + 'password=' + usrPW.value + '&email=' + usrEmail.value +
                     '&fname=' + usrFNAME.value + '&lname=' + usrLNAME.value + '&birthday=' + usrBDATE.value + 
                     '&sex=' + usrSEX.value + '&country=' + usrCOUNTRY.value + '&town=' + usrTOWN.value + '&extra=' + usrEXTRA.value);
        }else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
        };
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.setRequestHeader('Action','check');
        xhr.send('username=' + usrID.value + '&email=' + usrEmail.value);
    }
}