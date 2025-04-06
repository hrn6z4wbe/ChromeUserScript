// ==UserScript==
// @name         Block Twitch home page auto play
// @namespace    https://www.twitch.tv/
// @version      2025-04-06
// @description  Disable Twitch auto play on home page
// @author       You
// @match        https://www.twitch.tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=www.twitch.tv
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function blockTwitchHomePageAutoPlay() {
        console.log('开始屏蔽Twitch首页自动播放');
        const carouselDivs = document.querySelectorAll('div[data-a-target="front-page-carousel"]');
        carouselDivs.forEach(div => {
            console.log(div.className + '被屏蔽了');
            div.style.display = 'none';
        });
    }

    setTimeout(blockTwitchHomePageAutoPlay, 1000);

})();
