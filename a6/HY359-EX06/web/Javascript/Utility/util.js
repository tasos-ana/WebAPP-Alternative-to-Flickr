/* 
 *     Document      :util.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

function getUsername() {
    return document.getElementById("page_message").getAttribute("data-username");
}

function cookieExist(failError){
    if(failError !== null && failError === "Missing Cookie"){
        return 0;
    }else{
        return 1;
    }
}

