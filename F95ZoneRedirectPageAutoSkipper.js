// ==UserScript==
// @name         Skip F95Zone Redirect
// @namespace    https://f95zone.to/masked/
// @version      2025-07-10
// @description  Skip F95Zone Redirect
// @author       None
// @match        https://f95zone.to/masked/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=f95zone.to
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const button = document.querySelector(".host_link");
    button.click();
})();

