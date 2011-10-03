// ==UserScript==
// @name           github code
// @description    niceify github's pre blocks
// @include        https://gist.github.com/*
// @include        https://github.com/*
// ==/UserScript==
var style;

function enableStyle() {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.appendChild(document.createTextNode("pre { font-family: 'inconsolata-dz' !important; }"));
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

