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

//x.doFlashType("id=devMovie","id:howdyButton")
Selenium.prototype.doFlexClick = function(locator, flashLoc) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") { 
    var res = movie['fp_click'](JSON.stringify(strToObj(flashLoc)));
  }
  else { var res = movie['fp_click'](strToObj(flashLoc)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexDoubleClick = function(locator, flashLoc) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_doubleClick'](JSON.stringify(strToObj(flashLoc)));
  }
  else { var res = movie['fp_doubleClick'](strToObj(flashLoc)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashType("id=devMovie","chain=name:testTextArea/name:UITextField18", "SUP MANGO")
// For IDE had to change syntax to be two params:
// target = id=devMovie
// value = {flash:"chain=name:testTextArea/name:UITextField18", text:"ROCK"}
Selenium.prototype.doFlexType = function(locator, options) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_type'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_type'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashSelect("id=devMovie", "chain=id:subPanel/name:comboTest", "label=Alex")
//{option:"label=Alex","flash":"chain=id:subPanel/name:comboTest"}
Selenium.prototype.doFlexSelect = function(locator, options) {
  var strToObj = function(str) {
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
  //Lookup the flash movie
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_select'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_select'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
//{chain:"name:dragSprite", optchain:"name:testTextArea"}
Selenium.prototype.doFlexDragDropElemToElem = function(locator, options) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") { 
    var res = movie['fp_dragDropElemToElem'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_dragDropElemToElem'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
Selenium.prototype.doFlexDragDropToCoords = function(locator, options) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_dragDropToCoords'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_dragDropToCoords'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertDisplayObject = function(locator, options) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_assertDisplayObject'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_assertDisplayObject'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};


Selenium.prototype.doFlexAssertTextIn = function(locator, options) {
  var strToObj = function(str) {
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
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_assertTextIn'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_assertTextIn'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertText = function(locator, options) {
  var strToObj = function(str){
    var obj = {};
    try { obj = eval("(" + str + ")") }
    catch(err) {
      var optArr = str.split(",")
      for (var i=0;i<optArr.length;i++){
        optArr[i] = optArr[i].replace(/^\s+|\s+$/, '');
        var entryArr = optArr[i].split("=");
        obj[entryArr[0]] = entryArr[1];
      }
    }
    return obj; 
  }
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_assertText'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_assertText'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertProperty = function(locator, options) {
  var strToObj = function(str){
    var obj = {};
    try { obj = eval("(" + str + ")") }
    catch(err) {
      var optArr = str.split(",")
      for (var i=0;i<optArr.length;i++){
        optArr[i] = optArr[i].replace(/^\s+|\s+$/, '');
        var entryArr = optArr[i].split("=");
        obj[entryArr[0]] = entryArr[1];
      }
    }
    return obj; 
  }
  var movie = this.browserbot.findElement(locator);
  if (typeof JSON != "undefined") {
    var res = movie['fp_assertProperty'](JSON.stringify(strToObj(options)));
  }
  else { var res = movie['fp_assertProperty'](strToObj(options)); }
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.isFlexReady = function(locator) {
  var movie = this.browserbot.findElement(locator);
  if (typeof(movie.fp_click) == "undefined"){ 
    throw new SeleniumError("Flex movie not ready"); 
  }
  else { return true; }
};
