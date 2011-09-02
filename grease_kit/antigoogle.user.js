// ==UserScript==
// @name           anti-google
// @description    google no longer uses arial in my world....
// @include        http://*.google.com/*
// @include        http://google.com/*
// @include        https://*.google.com/*
// @include        https://google.com/*
// ==/UserScript==
var style;

function enableStyle() {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode("* { font-family: 'gotham narrow',calibri,sans-serif !important; }"));
    heads[0].appendChild(node);
  }
}

document.addEventListener('keypress', function (event) {
  if (event.keyCode == 18) {
    if (style == null) {
      enableStyle();
    } else {
      document.getElementsByTagName('head')[0].removeChild(style);
      style = null;
    }
    event.stopPropagation();
    event.preventDefault();
  }
}, true);

enableStyle();

