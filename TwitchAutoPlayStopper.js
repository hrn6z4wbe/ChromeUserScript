// ==UserScript==
// @name         Block Twitch HomePage AutoPlay
// @namespace    http://tampermonkey.net/
// @version      2025-04-06
// @description  Block Twitch HomePage AutoPlay
// @author       hrn6z4wbe
// @match        http://*.twitch.tv/*
// @match        https://*.twitch.tv/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 检查是否在首页
    function isHomePage() {
        return window.location.pathname === '/';
    }


    // 处理 video 元素：取消 autoplay 和暂停播放
    function disableAutoplay(video) {
        if (!isHomePage()) {
            console.log('Not on the homepage, script will not run.');
            return;
        }
        console.log('停止播放');
        if (video._autoplayHandled) return; // 防止重复处理
        video._autoplayHandled = true;

        video.autoplay = false;
        video.muted = false;
        video.pause();

        // 如果已在播放，强制暂停
        if (!video.paused) {
            video.pause();
        }

        // 监听后续 play 事件，防止 JS 再次自动播放
        video.addEventListener("play", () => {
            if (!video._userInteracted) {
                video.pause();
            }
        }, true);

        // 标记用户主动操作
        video.addEventListener("click", () => {
            video._userInteracted = true;
        });
    }

    // 初始查找
    function processAllVideos() {
        const videos = document.querySelectorAll("video");
        videos.forEach(disableAutoplay);
    }

    // 观察 DOM 中新增的 video 元素
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            mutation.addedNodes.forEach((node) => {
                if (!isHomePage()) {
                    console.log('Not on the homepage, script will not run.');
                    return;
                }
                if (node.tagName === "VIDEO") {
                    disableAutoplay(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll("video").forEach(disableAutoplay);
                }
            });
        }
    });

    // 启动观察
    observer.observe(document.body, { childList: true, subtree: true });

    // 页面加载后初始处理一次
    window.addEventListener('load', processAllVideos, false);
})();
