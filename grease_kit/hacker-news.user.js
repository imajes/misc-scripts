// ==UserScript==
// @name           pretty hacker news
// @description    because fonts are there to be cared for
// @include        http://news.ycombinator.com/*
// @include        http://*.craigslist.*/*
// @include        http://pinboard.in/*
// @include        http://railsapi.com/*
// @include        http://www.pivotaltracker.com/*
// @include        https://www.pivotaltracker.com/*
// @include        http://www.bbc.co.uk/news*
// @include        http://www.quora.com/*
// @include        http://quora.com/*
// @include        https://simple-note.appspot.com/*
// @include        http://en.wikipedia.org/*
// @include        http://flickr.com/*
// @include        http://www.flickr.com/*
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

