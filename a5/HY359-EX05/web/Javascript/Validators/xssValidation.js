/* 
 *     Document      :xssValidation.js
 *     Project       :HY359-EX05
 *     Author        :Tasos198
 *     Created on    :Dec 9, 2016
 */

function XSSValidator(name) {
    "use strict";
    var scriptStart, scriptStartEncoded, scriptEnd, scriptEndEncoded;
    scriptStart = "<script>";
    scriptStartEncoded = "&lt;script&gt;";

    scriptEnd = "</script>";
    scriptEndEncoded = "&lt;/script&gt;";
    if (name.includes(scriptStart) && name.includes(scriptEnd)) {
        name = name.replace(scriptStart, scriptStartEncoded);
        name = name.replace(scriptEnd, scriptEndEncoded);
    }

    return name;
}
