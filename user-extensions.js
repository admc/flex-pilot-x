/*
Copyright 2009-2010, Sauce Labs

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Contributor(s):
  Adam Christian <adam.christian@gmail.com>

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

Selenium.prototype.strToObj = function(str) {
  var obj = {};
  try { obj = eval("(" + str + ")") }
  catch(err) {
    var optArr = str.split(",")
    for (var i=0;i<optArr.length;i++) {
      optArr[i] = optArr[i].replace(/^\s+|\s+$/, '');
      var entryArr = optArr[i].split("=");
      obj[entryArr[0]] = entryArr[1];
    }
  }
  return obj;
}

//hack around firefox 3.10+ to execute code against a flash movie
Selenium.prototype.callMovie = function(movie, func, params) {
  try {
    if (typeof JSON != "undefined") {
      var res = movie[func](JSON.stringify(this.strToObj(params)));
    }
    else {
      var res = movie[func](this.strToObj(params));
    }
    return res;
  }
  catch (e) {
    params = JSON.stringify(this.strToObj(params));
    var bridge = selenium.browserbot.getCurrentWindow().document.createElement( 'input');
    bridge.setAttribute( 'id', 'ws-sel-bridge');
    bridge.setAttribute( 'value', 'test');
    selenium.browserbot.getCurrentWindow().document.body.appendChild( bridge);

    var id = null;
    if (movie.id != "") {
      id = movie.id;
      bridge.setAttribute( 'onClick','window.document.getElementById("ws-sel-bridge").value = window.document.getElementById("' + id + '")["' + func + '"](\''+params+'\');');
    }
    if (movie.name != undefined) {
      id = movie.name;
      bridge.setAttribute( 'onClick','window.document.getElementById("ws-sel-bridge").value = window.document.getElementsByName("' + id + '")[0]["' + func + '"](\''+params+'\');');
    }

    var e = selenium.browserbot.getCurrentWindow().document.createEvent( 'HTMLEvents');
    e.initEvent( 'click', false, false);
    bridge.dispatchEvent(e);
    if (bridge.value.indexOf('object') != -1){
      var res = {};
      res.message = func + ' with params ' + params + ' failed.';
      return res;
    }
    return true;
  }
}

Selenium.prototype.doFlexClick = function(locator, flashLoc) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_click", flashLoc);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexDoubleClick = function(locator, flashLoc) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_doubleClick", flashLoc);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashType("id=devMovie","chain=name:testTextArea/name:UITextField18", "SUP MANGO")
// For IDE had to change syntax to be two params:
// target = id=devMovie
// value = {flash:"chain=name:testTextArea/name:UITextField18", text:"ROCK"}
Selenium.prototype.doFlexType = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_type", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashSelect("id=devMovie", "chain=id:subPanel/name:comboTest", "label=Alex")
//{option:"label=Alex","flash":"chain=id:subPanel/name:comboTest"}
Selenium.prototype.doFlexSelect = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_select", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
//{chain:"name:dragSprite", optchain:"name:testTextArea"}
Selenium.prototype.doFlexDragDropElemToElem = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_dragDropElemToElem", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
Selenium.prototype.doFlexDragDropToCoords = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_dragDropToCoords", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertDisplayObject = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_assertDisplayObject", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertTextIn = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_assertTextIn", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertText = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_assertText", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertProperty = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_assertProperty", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.isFlexReady = function(locator) {
  var movie = this.browserbot.findElement(locator);
  if (typeof(movie.fp_click) == "undefined"){
    throw new SeleniumError("Flex movie not ready");
  }
  else { return true; }
};

Selenium.prototype.isFlexObject = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, "fp_assertDisplayObject", options);
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
  else { return true; }
};
