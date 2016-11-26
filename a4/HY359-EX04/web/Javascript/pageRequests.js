/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function requestLoginPage() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'requestPageServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("main_container").innerHTML = xhr.responseText;
            login_action(); 
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("page=login");
}

function requestMainProfilePage(){
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'requestPageServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("login_container").innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("page=mainProfile");
}

function requestMemberPage() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("main_container").innerHTML = xhr.responseText;
            allMembers_action();
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action','memberPage');
    xhr.send();
}

function requestProfilePage() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'UserServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("main_container").innerHTML = xhr.responseText;
            profile_action();
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('action','profilePage');
    xhr.send();
}

function requestRegisterPage() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'requestPageServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("main_container").innerHTML = xhr.responseText;
            register_action();
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("page=register");
}

function requestSettingsPage() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'requestPageServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("login_container").innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("page=settings");
}

function requestWelcomePage() {
    xhr = new XMLHttpRequest();
    xhr.open('POST', 'requestPageServlet');
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("login_container").innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            window.alert("Request failed. Returned status of " + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send("page=welcome");
}
