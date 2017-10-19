
// デフォルト言語
var LANG = localStorage.lang || chrome.i18n.getMessage('@@ui_locale');

// ページリスト
var PAGES = {
    "chrome_settings_clear"     : "chrome://settings/clearBrowserData",
    "chrome_settings_site_data" : "chrome://settings/siteData",
    "chrome_settings_cookies"   : "chrome://settings/content/cookies",
    //"chrome_restart"            : "chrome://restart/",
    "chrome_urls"               : "chrome://chrome-urls/",
    "chrome_settings_content"   : "chrome://settings/content",
    "chrome_settings_languages" : "chrome://settings/languages",
    "chrome_settings"           : "chrome://settings/",
    "chrome_extensions"         : "chrome://extensions/",
    "_webstore_ext"             : "https://chrome.google.com/webstore/category/extensions",
    "_webstore_theme"           : "https://chrome.google.com/webstore/category/themes",
    "_webstore_home"            : "https://chrome.google.com/webstore/category/apps",
    "chrome_downloads"          : "chrome://downloads",
    "chrome_history"            : "chrome://history/",
    "chrome_bookmarks"          : "chrome://bookmarks",
    "chrome_components"         : "chrome://components",
    "about_cache"               : "chrome://cache",
    "about_dns"                 : "chrome://dns",
    "about_network"             : "chrome://network",
    "about_histograms"          : "chrome://histograms",
    "about_version"             : "chrome://version",
    "about_flags"               : "chrome://flags",
    "chrome_help"               : "chrome://settings/help/"
};

// タブをチェック
function check2go(href, useWindow) {
    chrome.tabs.getAllInWindow(null,function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].url === href) {
                chrome.tabs.update(tabs[i].id, {selected:true});
                return;
            }
        }
        chrome.tabs.create({url:href, selected:true});
    });
}

// 言語を選択
function selectLanguage(lang) {
    LANG = localStorage['lang'] = lang;
    location.reload();
}

function DOMId(id) {
    return document.getElementById(id);
}

function goBackyard(url) {
    check2go(url);
}

// メニュー構築
function buildMenu() {
    document.body.style.fontFamily = chrome.i18n.getMessage('font_family');
    DOMId('pages').innerHTML = '';

    for (key in PAGES) {
        var
        url   = PAGES[key],
        div   = document.createElement('div'),
        a     = document.createElement('a'),
        span  = document.createElement('span');
        small = document.createElement('small');

        span.innerText = chrome.i18n.getMessage(key);
        small.innerText = url;

        a.href = '#';
        a.setAttribute('data-url', url);
        a.onclick = function() {
            goBackyard(this.getAttribute('data-url'));
        };

        a.appendChild(span);
        a.appendChild(small);
        div.appendChild(a);

        DOMId('pages').appendChild(div);
    }
}

// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-17392775-6']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

buildMenu();

