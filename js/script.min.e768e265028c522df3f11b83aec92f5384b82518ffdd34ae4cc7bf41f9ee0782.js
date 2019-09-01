/*! lozad.js - v1.10.0 - 2019-06-06
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2019 Apoorv Saxena; Licensed MIT */(function(global,factory){typeof exports==='object'&&typeof module!=='undefined'?module.exports=factory():typeof define==='function'&&define.amd?define(factory):(global.lozad=factory());}(this,(function(){'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var isIE=typeof document!=='undefined'&&document.documentMode;var defaultConfig={rootMargin:'0px',threshold:0,load:function load(element){if(element.nodeName.toLowerCase()==='picture'){var img=document.createElement('img');if(isIE&&element.getAttribute('data-iesrc')){img.src=element.getAttribute('data-iesrc');}
if(element.getAttribute('data-alt')){img.alt=element.getAttribute('data-alt');}}
if(element.nodeName.toLowerCase()==='video'&&!element.getAttribute('data-src')){if(element.children){var childs=element.children;var childSrc=void 0;for(var i=0;i<=childs.length-1;i++){childSrc=childs[i].getAttribute('data-src');if(childSrc){childs[i].src=childSrc;}}
element.load();}}
if(element.getAttribute('data-src')){element.src=element.getAttribute('data-src');}
if(element.getAttribute('data-srcset')){element.setAttribute('srcset',element.getAttribute('data-srcset'));}
if(element.getAttribute('data-background-image')){element.style.backgroundImage='url(\''+element.getAttribute('data-background-image')+'\')';}
if(element.getAttribute('data-toggle-class')){element.classList.toggle(element.getAttribute('data-toggle-class'));}},loaded:function loaded(){}};function markAsLoaded(element){element.setAttribute('data-loaded',true);}
var isLoaded=function isLoaded(element){return element.getAttribute('data-loaded')==='true';};var onIntersection=function onIntersection(load,loaded){return function(entries,observer){entries.forEach(function(entry){if(entry.intersectionRatio>0||entry.isIntersecting){observer.unobserve(entry.target);if(!isLoaded(entry.target)){load(entry.target);markAsLoaded(entry.target);loaded(entry.target);}}});};};var getElements=function getElements(selector){var root=arguments.length>1&&arguments[1]!==undefined?arguments[1]:document;if(selector instanceof Element){return[selector];}
if(selector instanceof NodeList){return selector;}
return root.querySelectorAll(selector);};function lozad(){var selector=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'.lozad';var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var _defaultConfig$option=_extends({},defaultConfig,options),root=_defaultConfig$option.root,rootMargin=_defaultConfig$option.rootMargin,threshold=_defaultConfig$option.threshold,load=_defaultConfig$option.load,loaded=_defaultConfig$option.loaded;var observer=void 0;if(typeof window!=='undefined'&&window.IntersectionObserver){observer=new IntersectionObserver(onIntersection(load,loaded),{root:root,rootMargin:rootMargin,threshold:threshold});}
console.log('observer:',observer)
return{observe:function observe(){var elements=getElements(selector,root);for(var i=0;i<elements.length;i++){if(isLoaded(elements[i])){continue;}
if(observer){observer.observe(elements[i]);continue;}
load(elements[i]);markAsLoaded(elements[i]);loaded(elements[i]);}},triggerLoad:function triggerLoad(element){if(isLoaded(element)){return;}
load(element);markAsLoaded(element);loaded(element);},observer:observer};}
return lozad;})));;document.addEventListener('DOMContentLoaded',()=>{var lastKnownScrollY=0;var currentScrollY=0;var ticking=false;var idOfHeader='navbar';var eleHeader=null;const classes={pinned:'header-pin',unpinned:'header-unpin',};function onScroll(){currentScrollY=window.pageYOffset;requestTick();}
function requestTick(){if(!ticking){requestAnimationFrame(update);}
ticking=true;}
function update(){if(currentScrollY<lastKnownScrollY){pin();}else if(currentScrollY>lastKnownScrollY){unpin();}
lastKnownScrollY=currentScrollY;ticking=false;}
function pin(){if(eleHeader.classList.contains(classes.unpinned)){eleHeader.classList.remove(classes.unpinned);eleHeader.classList.add(classes.pinned);}}
function unpin(){if(eleHeader.classList.contains(classes.pinned)||!eleHeader.classList.contains(classes.unpinned)){eleHeader.classList.remove(classes.pinned);eleHeader.classList.add(classes.unpinned);}}
window.onload=function(){eleHeader=document.getElementById(idOfHeader);document.addEventListener('scroll',onScroll,false);}
const $navbarBurgers=Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'),0);if($navbarBurgers.length>0){$navbarBurgers.forEach(el=>{el.addEventListener('click',()=>{const target=el.dataset.target;const $target=document.getElementById(target);el.classList.toggle('is-active');$target.classList.toggle('is-active');eleHeader.classList.toggle('is-active');});});}
lozad('.lozad',{loaded:function(el){el.classList.add('fade')}}).observe()});/*!loadCSS. [c]2017 Filament Group, Inc. MIT License*/(function(w){"use strict";if(!w.loadCSS){w.loadCSS=function(){};}
var rp=loadCSS.relpreload={};rp.support=(function(){var ret;try{ret=w.document.createElement("link").relList.supports("preload");}catch(e){ret=false;}
return function(){return ret;};})();rp.bindMediaToggle=function(link){var finalMedia=link.media||"all";function enableStylesheet(){if(link.addEventListener){link.removeEventListener("load",enableStylesheet);}else if(link.attachEvent){link.detachEvent("onload",enableStylesheet);}
link.setAttribute("onload",null);link.media=finalMedia;}
if(link.addEventListener){link.addEventListener("load",enableStylesheet);}else if(link.attachEvent){link.attachEvent("onload",enableStylesheet);}
setTimeout(function(){link.rel="stylesheet";link.media="only x";});setTimeout(enableStylesheet,3000);};rp.poly=function(){if(rp.support()){return;}
var links=w.document.getElementsByTagName("link");for(var i=0;i<links.length;i++){var link=links[i];if(link.rel==="preload"&&link.getAttribute("as")==="style"&&!link.getAttribute("data-loadcss")){link.setAttribute("data-loadcss",true);rp.bindMediaToggle(link);}}};if(!rp.support()){rp.poly();var run=w.setInterval(rp.poly,500);if(w.addEventListener){w.addEventListener("load",function(){rp.poly();w.clearInterval(run);});}else if(w.attachEvent){w.attachEvent("onload",function(){rp.poly();w.clearInterval(run);});}}
if(typeof exports!=="undefined"){exports.loadCSS=loadCSS;}
else{w.loadCSS=loadCSS;}}(typeof global!=="undefined"?global:this));