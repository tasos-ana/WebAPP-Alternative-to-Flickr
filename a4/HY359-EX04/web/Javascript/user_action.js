/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global validationAPI */

var navBut = ["home_but", "member_but", "register_but", "login_but", "settings_but", "logout_but", "profile_but"];
var elemVisibility = ["member_but", "register_but", "login_but",
    "settings_but", "logout_but", "profile_but"];

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

function register_action() {//do all the action that need for registration
    "use strict";

    document.getElementById("member_but").setAttribute("data-visible", "none");
    document.getElementById("register_but").setAttribute("data-visible", "block");
    document.getElementById("login_but").setAttribute("data-visible", "block");
    document.getElementById("settings_but").setAttribute("data-visible", "none");
    document.getElementById("logout_but").setAttribute("data-visible", "none");
    document.getElementById("profile_but").setAttribute("data-visible", "none");

    document.getElementById("usrCOUNTRY").value = "Greece";
    activeNavButton("register_but");
    renderPage();
}

function login_action() {
    "use strict";

    document.getElementById("member_but").setAttribute("data-visible", "none");
    document.getElementById("register_but").setAttribute("data-visible", "block");
    document.getElementById("login_but").setAttribute("data-visible", "block");
    document.getElementById("settings_but").setAttribute("data-visible", "none");
    document.getElementById("logout_but").setAttribute("data-visible", "none");
    document.getElementById("profile_but").setAttribute("data-visible", "none");

    activeNavButton("login_but");
    renderPage();
}

function succeed_login_action() {
    "use strict";

    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("profile_but").setAttribute("data-visible", "block");

    activeNavButton("home_but");
    renderPage();
}

function logout_action() {
    "use strict";

    document.getElementById("page_message").innerHTML = "Tiled Image Viewer";
    document.getElementById("page_message").removeAttribute("data-login");

    document.getElementById("member_but").setAttribute("data-visible", "none");
    document.getElementById("register_but").setAttribute("data-visible", "block");
    document.getElementById("login_but").setAttribute("data-visible", "block");
    document.getElementById("settings_but").setAttribute("data-visible", "none");
    document.getElementById("logout_but").setAttribute("data-visible", "none");
    document.getElementById("profile_but").setAttribute("data-visible", "none");

    activeNavButton("home_but");
    renderPage();
}

function settings_action() {
    "use strict";
    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("profile_but").setAttribute("data-visible", "block");

    activeNavButton("settings_but");
    renderPage();
}

function allMembers_action() {
    "use strict";
    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("profile_but").setAttribute("data-visible", "block");


    activeNavButton("member_but");
    renderPage();
}

function profile_action() {
    "use strict";
    document.getElementById("member_but").setAttribute("data-visible", "block");
    document.getElementById("register_but").setAttribute("data-visible", "none");
    document.getElementById("login_but").setAttribute("data-visible", "none");
    document.getElementById("settings_but").setAttribute("data-visible", "block");
    document.getElementById("logout_but").setAttribute("data-visible", "block");
    document.getElementById("profile_but").setAttribute("data-visible", "block");

    activeNavButton("profile_but");
    renderPage();
}