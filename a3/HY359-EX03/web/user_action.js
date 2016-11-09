/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function register_action() {
    "use strict";
    document.getElementById("usr_form_container").style.display = "table-cell";
    usrID = document.registration.usrID;
    usrID.focus();
}

function login_action() {
    "use strict";
    document.getElementById("usr_in_container").style.display = "none";
    document.getElementById("usr_out_container").style.display = "inline";
    document.getElementById("usr_settings_container").style.display = "inline";
    document.getElementById("usr_form_container").style.display = "none";
}

function logout_action() {
    "use strict";
    document.getElementById("usr_in_container").style.display = "inline";
    document.getElementById("usr_out_container").style.display = "none";
    document.getElementById("usr_settings_container").style.display = "none";
}

function formValidation() {
    "use strict";
}