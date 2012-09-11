
// デフォルト言語
var LANG = localStorage.lang || chrome.i18n.getMessage('@@ui_locale');

// ページリスト
var PAGES = {
	"chrome_settings_clear"    : "chrome://chrome/settings/clearBrowserData",
	"chrome_settings_cookies"  : "chrome://chrome/settings/content/cookies",
	"chrome_settings_content"  : "chrome://chrome/settings/content",
	"chrome_settings_languages": "chrome://chrome/settings/languages",
	"chrome_settings"          : "chrome://chrome/settings/",
	"chrome_extensions"        : "chrome://extensions/",
	"_webstore_theme"          : "https://chrome.google.com/webstore/category/themes",
	"_webstore_home"           : "https://chrome.google.com/webstore",
	"_webstore_ext"            : "https://chrome.google.com/webstore/category/extensions",
	"chrome_downloads"         : "chrome://downloads",
	"chrome_history"           : "chrome://history/",
	"chrome_bookmarks"         : "chrome://bookmarks",
	"about_plugins"            : "about:plugins",
	"about_cache"              : "about:cache",
	"about_memory"             : "about:memory",
	"about_stats"              : "about:stats",
	"about_dns"                : "about:dns",
	"about_network"            : "about:network",
	"about_crash"              : "about:crash",
	"about_hang"               : "about:hang",
	"about_internets"          : "about:internets",
	"about_histograms"         : "about:histograms",
	"about_version"            : "about:version",
	"about_flags"              : "about:flags",
	"chrome_help"              : "chrome://chrome/help/"
};

// タブをチェック
function check2go(href) {
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
        url  = PAGES[key],
        div  = document.createElement('div'),
        a    = document.createElement('a'),
        span = document.createElement('span');

        span.innerText = chrome.i18n.getMessage(key);

        a.href = '#';
        a.setAttribute('data-url', url);
        a.onclick = function() {
            goBackyard(this.getAttribute('data-url'));
        };

        a.appendChild(span);
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

