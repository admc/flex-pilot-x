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
  var res = movie.wrappedJSObject['fp_click'](strToObj(flashLoc));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexDoubleClick = function(locator, flashLoc) {
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
  var res = movie.wrappedJSObject['fp_doubleClick'](strToObj(flashLoc));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashType("id=devMovie","chain=name:testTextArea/name:UITextField18", "SUP MANGO")
// For IDE had to change syntax to be two params:
// target = id=devMovie
// value = {flash:"chain=name:testTextArea/name:UITextField18", text:"ROCK"}
Selenium.prototype.doFlexType = function(locator, options) {
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
  var res = movie.wrappedJSObject['fp_type'](strToObj(options));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashSelect("id=devMovie", "chain=id:subPanel/name:comboTest", "label=Alex")
//{option:"label=Alex","flash":"chain=id:subPanel/name:comboTest"}
Selenium.prototype.doFlexSelect = function(locator, options) {
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
  
  //Lookup the flash movie
  var movie = this.browserbot.findElement(locator);
  var res = movie.wrappedJSObject['fp_select'](strToObj(options));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
//{chain:"name:dragSprite", optchain:"name:testTextArea"}
Selenium.prototype.doFlexDragDropElemToElem = function(locator, options) {
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
  var res = movie.wrappedJSObject['fp_dragDropElemToElem'](strToObj(options));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
Selenium.prototype.doFlexDragDropToCoords = function(locator, options) {
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
  var res = movie.wrappedJSObject['fp_dragDropToCoords'](strToObj(options));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertDisplayObject = function(locator, options) {
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
  var res = movie.wrappedJSObject['fp_assertDisplayObject'](strToObj(options));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.doFlexAssertTextIn = function(locator, options) {
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
  var res = movie.wrappedJSObject['fp_assertTextIn'](strToObj(options));
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
  var res = movie.wrappedJSObject['fp_assertText'](strToObj(options));
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
  var res = movie.wrappedJSObject['fp_assertProperty'](strToObj(options));
  if (typeof(res) == "object"){ throw new SeleniumError(res.message); }
};

Selenium.prototype.isFlexReady = function(locator) {
  var movie = this.browserbot.findElement(locator);
  if (typeof(movie.wrappedJSObject.fp_click) != "function"){ 
    throw new SeleniumError("Flex movie not ready"); 
  }
  else { return true; }
};

// If sauce RC is present we add all the remote commands
try {
  RemoteSelenium.prototype.doFlexClick = function(locator, flashLoc) {
     return this.doCommand("flexClick", [locator, flashLoc], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexDoubleClick = function(locator, flashLoc) {
    return this.doCommand("flexDoubleClick", [locator, flashLoc], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexType = function(locator, options) {
    return this.doCommand("flexType", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexSelect = function(locator, options) {
    return this.doCommand("flexSelect", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexDragDropElemToElem = function(locator, options) {
    return this.doCommand("flexDragDropElemToElem", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexDragDropToCoords = function(locator, options) {
    return this.doCommand("flexDragDropToCoords", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexAssertDisplayObject = function(locator, options) {
    return this.doCommand("flexAssertDisplayObject", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexAssertTextIn = function(locator, options) {
    return this.doCommand("flexAssertTextIn", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexAssertText = function(locator, options) {
    return this.doCommand("flexAssertText", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.doFlexAssertProperty = function(locator, options) {
    return this.doCommand("flexAssertProperty", [locator, options], this.handleResults);
  };

  RemoteSelenium.prototype.isFlexReady = function(locator) {
     return this.doCommand("flexReady", [locator], this.handleResults);
  };

} catch (e) { /*must be in selenium RC */ }
