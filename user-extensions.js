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

//give us an object from the string
Selenium.prototype.strToObj = function(str) {
  var obj = {};
  try { obj = eval("(" + str + ")") }
  catch(err) {
    try {
      var optArr = str.split(",")
      for (var i=0;i<optArr.length;i++) {
        optArr[i] = optArr[i].replace(/^\s+|\s+$/, '');
        var entryArr = optArr[i].split("=");
        obj[entryArr[0]] = entryArr[1];
      } 
    }
    catch (e) { //if we have an empty obj etc  
        return obj;
    }
  }
  return obj; 
}

//call flash/flex in a way that works for all browsers/versions
Selenium.prototype.callMovie = function(movie, func, params) {
  if (movie.wrappedJSObject) {
    movie = movie.wrappedJSObject;
  }
  try {
    //Not IE
    if (typeof JSON != "undefined") {
      var res = movie[func](JSON.stringify(this.strToObj(params)));
    }
    //IE
    else {
      var res = movie[func](this.strToObj(params));
    }
    return res;
  }
  //Firefox 3.10 and up
  catch (e) {
    params = JSON.stringify(this.strToObj(params));
    var bridge = null;
    bridge = selenium.browserbot.getCurrentWindow().document.getElementById("ws-sel-bridge");
    if (!bridge) {
      bridge = selenium.browserbot.getCurrentWindow().document.createElement( 'input');
      bridge.setAttribute( 'id', 'ws-sel-bridge');
      bridge.setAttribute( 'value', 'test');
      selenium.browserbot.getCurrentWindow().document.body.appendChild(bridge);
    }
    bridge.setAttribute( 'value', 'test');

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

    if (bridge.value.indexOf('object') != -1) {
      var res = {};
      res.message = func + ' with params ' + params + ' failed.';
      return res;
    }
    return true;
  }
}

//get the movie, run the action, throw if it failed
Selenium.prototype.flex = function(method, locator, options) {
  var movie = this.browserbot.findElement(locator);
  var res = this.callMovie(movie, method, options);
  if (typeof(res) == "object") { throw new SeleniumError(res.message); }
}

Selenium.prototype.doFlexClick = function(locator, flashLoc) {
  this.flex("fp_click", locator, flashLoc);
};

Selenium.prototype.doFlexDoubleClick = function(locator, flashLoc) {
  this.flex("fp_doubleClick", locator, flashLoc);
};

Selenium.prototype.doFlexType = function(locator, options) {
  this.flex("fp_type", locator, options);
};

//x.doFlashSelect("id=devMovie", "chain=id:subPanel/name:comboTest", "label=Alex")
//{option:"label=Alex","flash":"chain=id:subPanel/name:comboTest"}
Selenium.prototype.doFlexSelect = function(locator, options) {
  this.flex("fp_select", locator, options);
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
//{chain:"name:dragSprite", optchain:"name:testTextArea"}
Selenium.prototype.doFlexDragDropElemToElem = function(locator, options) {
  this.flex("fp_dragDropElemToElem", locator, options);
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
Selenium.prototype.doFlexDragDropToCoords = function(locator, options) {
  this.flex("fp_dragDropToCoords", locator, options);
};

Selenium.prototype.doFlexAssertDisplayObject = function(locator, options) {
  this.flex("fp_assertDisplayObject", locator, options);
};

Selenium.prototype.doFlexAssertTextIn = function(locator, options) {
  this.flex("fp_assertTextIn", locator, options);
};

Selenium.prototype.doFlexAssertText = function(locator, options) {
  this.flex("fp_assertText", locator, options);
};

Selenium.prototype.doFlexAssertProperty = function(locator, options) {
  this.flex("fp_assertProperty", locator, options);
};

Selenium.prototype.doFlexSliderChange = function(locator, options) {
  this.flex("fp_sliderChange", locator, options);
};

Selenium.prototype.doFlexDateChange = function(locator, options) {
  this.flex("fp_dateChange", locator, options);
};

Selenium.prototype.doFlexDgItemEdit = function(locator, options) {
  this.flex("fp_dgItemEdit", locator, options);
};

Selenium.prototype.doFlexDgColumnStretch = function(locator, options) {
  this.flex("fp_dgColumnStretch", locator, options);
};

Selenium.prototype.doFlexDgHeaderRelease = function(locator, options) {
  this.flex("fp_dgHeaderRelease", locator, options);
};

Selenium.prototype.doFlexDgSort = function(locator, options) {
  this.flex("fp_dgSort", locator, options);
};

Selenium.prototype.doFlexDgSortAscending = function(locator, options) {
  this.flex("fp_dgSortAscending", locator, options);
};

Selenium.prototype.doFlexDgSortDescending = function(locator, options) {
  this.flex("fp_dgSortDescending", locator, options);
};

Selenium.prototype.doFlexAdgItemOpen = function(locator, options) {
  this.flex("fp_adgItemOpen", locator, options);
};

Selenium.prototype.doFlexAdgItemClose = function(locator, options) {
  this.flex("fp_adgItemClose", locator, options);
};

Selenium.prototype.doFlexAdgColumnStretch = function(locator, options) {
  this.flex("fp_adgColumnStretch", locator, options);
};

Selenium.prototype.doFlexAdgHeaderRelease = function(locator, options) {
  this.flex("fp_adgHeaderRelease", locator, options);
};

Selenium.prototype.doFlexAdgSort = function(locator, options) {
  this.flex("fp_adgSort", locator, options);
};

Selenium.prototype.doFlexAdgSortAscending = function(locator, options) {
  this.flex("fp_adgSortAscending", locator, options);
};

Selenium.prototype.doFlexAdgSortDescending = function(locator, options) {
  this.flex("fp_adgSortDescending", locator, options);
};

Selenium.prototype.doFlexAdgHeaderShift = function(locator, options) {
  this.flex("fp_adgHeaderShift", locator, options);
};

Selenium.prototype.doFlexAdgItemEdit = function(locator, options) {
  this.flex("fp_adgItemEdit", locator, options);
};

Selenium.prototype.doFlexItemDragDrop = function(locator, options) {
  this.flex("fp_dragDrop", locator, options);
};

Selenium.prototype.isFlexReady = function(locator) {
  var movie = this.browserbot.findElement(locator);
  if (movie.wrappedJSObject) {
     movie = movie.wrappedJSObject;
  }
  if (typeof(movie.fp_click) == "undefined") { 
    throw new SeleniumError("Flex movie not ready"); 
  }
  else { return true; }
};

Selenium.prototype.isFlexObject = function(locator, options) {
  var movie = this.browserbot.findElement(locator);
  if (movie.wrappedJSObject) {
     movie = movie.wrappedJSObject;
  }
  var res = this.callMovie(movie, "fp_assertDisplayObject", options);  
  if (typeof(res) == "object") { throw new SeleniumError(res.message); }
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

  RemoteSelenium.prototype.doFlexSliderChange = function(locator, options) {
    return this.doCommand("flexSliderChange", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexDateChange = function(locator, options) {
    return this.doCommand("flexDateChange", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexDgItemEdit = function(locator, options) {
    return this.doCommand("flexDgItemEdit", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexDgSort = function(locator, options) {
    return this.doCommand("flexDgSort", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexDgSortAscending = function(locator, options) {
    return this.doCommand("flexDgSortAscending", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexDgSortDescending = function(locator, options) {
    return this.doCommand("flexDgSortDescending", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexDgItemEdit = function(locator, options) {
    return this.doCommand("flexDgItemEdit", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgSort = function(locator, options) {
    return this.doCommand("flexAdgSort", [locator, options], this.handleResults);
  }; 
  
  RemoteSelenium.prototype.doFlexAdgSortAscending = function(locator, options) {
    return this.doCommand("flexAdgSortAscending", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgSortDescending = function(locator, options) {
    return this.doCommand("flexAdgSortDescending", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgItemOpen = function(locator, options) {
    return this.doCommand("flexAdgItemOpen", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgItemClose = function(locator, options) {
    return this.doCommand("flexAdgItemClose", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgColumnStretch = function(locator, options) {
    return this.doCommand("flexAdgColumnStretch", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgHeaderRelease = function(locator, options) {
    return this.doCommand("flexAdgHeaderRelease", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgHeaderShift = function(locator, options) {
    return this.doCommand("flexAdgHeaderShift", [locator, options], this.handleResults);
  };
  
  RemoteSelenium.prototype.doFlexAdgItemEdit = function(locator, options) {
    return this.doCommand("flexAdgItemEdit", [locator, options], this.handleResults);
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

  RemoteSelenium.prototype.doWaitForFlexReady = function(locator,timeout) {
      return this.doCommand("waitForFlexReady", [script,timeout], this.handleResults);
  };
  RemoteSelenium.prototype.doWaitForFlexNode = function(locator,options) {
      return this.doCommand("waitForFlexReady", [locator,options], this.handleResults);
  };
} catch (e) { /*must be in selenium RC */ }