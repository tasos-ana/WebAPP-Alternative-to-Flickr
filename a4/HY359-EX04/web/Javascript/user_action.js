/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global validationAPI */

var navBut = ["home_but", "member_but", "register_but", "login_but", "settings_but", "logout_but"];
var elemVisibility = ["member_but", "register_but", "login_but", "settings_but", "logout_but",
    "login_container", "register_container", "new_usr_action", "old_usr_action","img_container","tiles_container"];

function renderPage() {
    var i, elem, attr;
    for (i = 0; i < elemVisibility.length; i++) {
        elem = document.getElementById(elemVisibility[i]);
        attr = elem.getAttribute("data-visible");
        elem.style.display = attr;
    }
}

function activeNavButton(target) {
    var i;
    for (i = 0; i < navBut.length; i++) {
        if (target === navBut[i]) {
            document.getElementById(navBut[i]).setAttribute("class", "active");
        } else {
            document.getElementById(navBut[i]).removeAttribute("class");
        }
    }
}

function register_error_reset() {
    document.getElementById("usrID_err").innerHTML = "*";
    document.getElementById("usrID_err").style.color = "red";

    document.getElementById("usrPW_err").innerHTML = "*";
    document.getElementById("usrPW_err").style.color = "red";

    document.getElementById("usrPW2_err").innerHTML = "*";
    document.getElementById("usrPW2_err").style.color = "red";

    document.getElementById("usrEMAIL_err").innerHTML = "*";
    document.getElementById("usrEMAIL_err").style.color = "red";

    document.getElementById("usrFNAME_err").innerHTML = "*";
    document.getElementById("usrFNAME_err").style.color = "red";

    document.getElementById("usrLNAME_err").innerHTML = "*";
    document.getElementById("usrLNAME_err").style.color = "red";

    document.getElementById("usrBDATE_err").innerHTML = "*";
    document.getElementById("usrBDATE_err").style.color = "red";

    document.getElementById("usrTOWN_err").innerHTML = "*";
    document.getElementById("usrTOWN_err").style.color = "red";
}

function register_action() {//do all the action that need for registration
    "use strict";
    document.getElementById("main_text_container").innerHTML = "";

    document.getElementById("register_form").reset();
    register_error_reset();
    document.getElementById("register_form_title").innerHTML = "Registration form";

    document.getElementById("main_text_container").innerHTML = "";
    document.getElementById("member_but").setAttribute("data-visible", "none");
    document.getElementById("register_but").setAttribute("data-visible", "block");
    document.getElementById("login_but").setAttribute("data-visible", "block");
    document.getElementById("settings_but").setAttribute("data-visible", "none");
    document.getElementById("logout_but").setAttribute("data-visible", "none");
    document.getElementById("login_container").setAttribute("data-visible", "none");
    document.getElementById("register_container").setAttribute("data-visible", "block");
    document.getElementById("new_usr_action").setAttribute("data-visible", "block");
    document.getElementById("old_usr_action").setAttribute("data-visible", "none");
    document.getElementById("img_container").setAttribute("data-visible", "none");
    document.getElementById("tiles_container").setAttribute("data-visible", "none");
    
    document.registration.usrID.removeAttribute("disabled");
    document.registration.usrEMAIL.removeAttribute("disabled");

    activeNavButton("register_but");
    renderPage();
}

function login_action() {
    "use strict";
    document.getElementById("main_text_container").innerHTML = "";

    document.getElementById("usr_login_error").innerHTML = "";
    document.getElementById("login_form").reset();

    document.getElementById("member_but").setAttribute("data-visible", "none");
    document.getElementById("register_but").setAttribute("data-visible", "block");
    document.getElementById("login_but").setAttribute("data-visible", "block");
    document.getElementById("settings_but").setAttribute("data-visible", "none");
    document.getElementById("logout_but").setAttribute("data-visible", "none");
    document.getElementById("login_container").setAttribute("data-visible", "block");
    document.getElementById("register_container").setAttribute("data-visible", "none");
    document.getElementById("new_usr_action").setAttribute("data-visible", "none");
    document.getElementById("old_usr_action").setAttribute("data-visible", "none");
    document.getElementById("img_container").setAttribute("data-visible", "none");
    document.getElementById("tiles_container").setAttribute("data-visible", "none");
    activeNavButton("login_but");
    renderPage();
}

function succeed_login_action() {
    "use strict";
    document.getElementById("main_text_container").innerHTML = "";

    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("login_container").setAttribute("data-visible", "none");
    document.getElementById("register_container").setAttribute("data-visible", "none");
    document.getElementById("new_usr_action").setAttribute("data-visible", "none");
    document.getElementById("old_usr_action").setAttribute("data-visible", "none");
    document.getElementById("img_container").setAttribute("data-visible", "block");
    document.getElementById("tiles_container").setAttribute("data-visible", "block");

    activeNavButton("home_but");
    renderPage();
}

function logout_action() {
    "use strict";
    document.getElementById("main_text_container").innerHTML = "";

    document.getElementById("page_message").innerHTML = "Tiled Image Viewer";
    document.getElementById("page_message").removeAttribute("data-login");

    document.getElementById("member_but").setAttribute("data-visible", "none");
    document.getElementById("register_but").setAttribute("data-visible", "block");
    document.getElementById("login_but").setAttribute("data-visible", "block");
    document.getElementById("settings_but").setAttribute("data-visible", "none");
    document.getElementById("logout_but").setAttribute("data-visible", "none");
    document.getElementById("login_container").setAttribute("data-visible", "none");
    document.getElementById("register_container").setAttribute("data-visible", "none");
    document.getElementById("new_usr_action").setAttribute("data-visible", "none");
    document.getElementById("old_usr_action").setAttribute("data-visible", "none");
    document.getElementById("img_container").setAttribute("data-visible", "none");
    document.getElementById("tiles_container").setAttribute("data-visible", "none");

    activeNavButton("home_but");
    renderPage();
}

function settings_action() {
    "use strict";
    document.getElementById("main_text_container").innerHTML = "";

    document.getElementById("register_form").reset();
    register_error_reset();
    document.getElementById("register_form_title").innerHTML = "Profile Settings";

    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("login_container").setAttribute("data-visible", "none");
    document.getElementById("register_container").setAttribute("data-visible", "block");
    document.getElementById("new_usr_action").setAttribute("data-visible", "none");
    document.getElementById("old_usr_action").setAttribute("data-visible", "block");
    document.getElementById("img_container").setAttribute("data-visible", "none");
    document.getElementById("tiles_container").setAttribute("data-visible", "none");

    document.registration.usrID.setAttribute("disabled", "on");
    document.registration.usrEMAIL.setAttribute("disabled", "on");
    ajaxUserProfileRequest();

    activeNavButton("settings_but");
    renderPage();
}

function allMembers_action() {
    "use strict";
    document.getElementById("main_text_container").innerHTML = "";
    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("login_container").setAttribute("data-visible", "none");
    document.getElementById("register_container").setAttribute("data-visible", "none");
    document.getElementById("new_usr_action").setAttribute("data-visible", "none");
    document.getElementById("old_usr_action").setAttribute("data-visible", "none");
    document.getElementById("img_container").setAttribute("data-visible", "none");
    document.getElementById("tiles_container").setAttribute("data-visible", "none");

    ajaxAllMembersRequest();
    activeNavButton("member_but");
    renderPage();
}
