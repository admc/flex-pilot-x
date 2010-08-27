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

window.flexpilot = new function() {
  var _this = this;
  
  //get around the firefox security policy to call methods on flash movies
  //in the content space
  this.callMovie = function(win, movie, func) {
    if (movie.wrappedJSObject) {
      movie = movie.wrappedJSObject;
    }
    
    try {
      var res = movie[func]();
    }
    //Firefox 3.10 and up
    catch (e) {
      var bridge = null;
      bridge = win.document.getElementById("ws-sel-bridge");
      if (!bridge) {
        bridge = win.document.createElement( 'input');
        bridge.setAttribute( 'id', 'ws-sel-bridge');
        bridge.setAttribute( 'value', 'test');
        bridge.setAttribute('style', 'display: none')
        win.document.body.appendChild(bridge);
      }
      bridge.setAttribute( 'value', 'test');

      var id = null;
      if (movie.id) {
        id = movie.id;
        bridge.setAttribute( 'onClick','try { window.document.getElementById("ws-sel-bridge").value = window.document.getElementById("' + 
          id + '")["' + func + '"](); } catch(err) { window.document.getElementById("ws-sel-bridge").value = false }');
      }
      else if (movie.name) {
        id = movie.name;
        bridge.setAttribute( 'onClick','try { window.document.getElementById("ws-sel-bridge").value = window.document.getElementsByName("' + 
          id + '")[0]["' + func + '"](); } catch(err) { window.document.getElementById("ws-sel-bridge").value = false }');
      }

      var e = win.document.createEvent( 'HTMLEvents');
      e.initEvent( 'click', false, false);
      bridge.dispatchEvent(e);
      
      //If the called method doesn't exist on the movie
      //this is a real exception and we throw it
      if (bridge.value == 'false') {
        throw ("Exception, method was not accessible");
      }
      
      //Otherwise check to see if it was a fail inside flex
      if (bridge.value.indexOf('object') != -1){
        var res = {};
        res.message = func + ' with params ' + params + ' failed.';
        return res;
      }
      
      //executing this method worked
      return true;
    }
  }
  
  this._getNavWindows = function() {
    var windows = []
    var enumerator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
             .getService(Components.interfaces.nsIWindowMediator)
             .getEnumerator('navigator:browser');
    while(enumerator.hasMoreElements()) {
    windows.push(enumerator.getNext());
    }
    return windows;
  };

  this.log = function(str) {
    var lvdoc = document.getElementById('logView').contentWindow.document;
    var li = lvdoc.createElement('li');
    //li.style.color = "red";
    //li.style.fontWeight = "bold";
    li.innerHTML = "[info] "+str;
    var log = lvdoc.getElementById('log')
    log.appendChild(li);
  }

  //Find a locator for the flash/flex object
  this.lookupTarget = function (node) {
    if (node.wrappedJSObject){
      node = node.wrappedJSObject;
    }
    if (node) { window.editor.flexTarget = node; }
    var str = "xpath=?";
    if (window.editor.flexTarget.id != "") {
      str = "id="+window.editor.flexTarget.id;
    }
    else if (window.editor.flexTarget.name != "") {
      str = "name="+window.editor.flexTarget.name;
    }
    return str;
  }

  this.record = function() {
    //allow the off key-combo from the ide
    window.addEventListener('keydown', function(e) {
      if (e.keyCode == 88) {
        if (e.ctrlKey == true) {
          //make sure the record button is in off mode
          if (editor.recordingEnabled) {
            document.getElementById('record-button').click();
          }
          _this.off();
        }
      }
    }, false);

    //iterate all windows
    var windows = _this._getNavWindows();
    for (var w=0; w<windows.length; w++) {
      var win = windows[w].content.wrappedJSObject;

      //when the user hits ctrl+x we turn off the explorer and recorder
      win.addEventListener('keydown', function(e) {
        if (e.keyCode == 88) {
          if (e.ctrlKey == true) {
            //make sure the record button is in off mode
            if (editor.recordingEnabled) {
              document.getElementById('record-button').click();
            }
            _this.off();
          }
        }
      }, false);

      //define the call out js method
      win.fp_recorderAction = function(obj) {
        var method = obj.method.charAt(0).toUpperCase() + obj.method.substring(1);
        var flashMethod = 'flex'+method;
        var value = "chain="+obj.chain;

        //if we received a type method things are a bit different
        if (obj.params) {
          var Ci = Components.interfaces;
          var Cc = Components.classes;
          var nativeJSON = Cc["@mozilla.org/dom/json;1"].createInstance(Ci.nsIJSON);

          //obj.params.flash = 'chain='+obj.chain;
          obj.params.chain = obj.chain;
          value = nativeJSON.encode(obj.params);
          
          //remove all of the json and make it selenium simple
          //but only if there is not more than one level of obj depth
          if ((value.split("{").length - 1) == 1){
            var regExp = /{/g;
            value = value.replace(regExp,'');
            var regExp = /}/g;
            value = value.replace(regExp,'');
            var regExp = /":/g;
            value = value.replace(regExp,'=');
            var regExp = /="/g;
            value = value.replace(regExp,'=');
            var regExp = /"/g;
            value = value.replace(regExp,'');
          }
        }

        var locator = window.flexpilot.lookupTarget(window.editor.flexTarget);
        window.editor.addCommand(flashMethod, locator, value, win);
      }

      //get all movies on page
      var embeds = win.document.getElementsByTagName("embed");
      var objects = win.document.getElementsByTagName("object");
      if ((embeds.length == 0) && (objects.length == 0)) {
        //this.log("We were unable to find any recordable Flex/Flash objects.");
        return false;
      }

      //Starting recorders for both embeds and objects
      for (var i=0;i<embeds.length;i++) {
        //After they have been activated, no need to do it again
        if (!embeds[i].activated) {
          try {
            this.log("Trying to activate flex movie: " + this.lookupTarget(embeds[i]));
            this.callMovie(win, embeds[i], 'fp_recorderStart');
            this.log("Succesfully activated flex movie: " + this.lookupTarget(embeds[i]));
            embeds[i].removeEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
            embeds[i].addEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
            embeds[i].activated = true;
          } catch(err) {
            this.log("Failure to activate flex movie: " + this.lookupTarget(embeds[i]));
          }
        }
      }
      
      for (var i=0;i<objects.length;i++) {
        //After they have been activated, no need to do it again
        if (!objects[i].activated) {
          try {
            this.log("Trying to activate flex movie: " + this.lookupTarget(objects[i]));
            this.callMovie(win, objects[i], 'fp_recorderStart');
            this.log("Succesfully activated flex movie: " + this.lookupTarget(objects[i]));
            objects[i].removeEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
            objects[i].addEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
            objects[i].activated = true;
          } catch(err) {
            this.log("Failure to activate flex movie: " + this.lookupTarget(objects[i]));
          }
        }
      }

      //windows[w].focus();
    }
    return true;
  };

  this.explore = function() {
    //allow the off key-combo from the ide
    window.addEventListener('keydown', function(e) {
      if (e.keyCode == 88) {
        if (e.ctrlKey == true) {
          //make sure the record button is in off mode
          if (editor.recordingEnabled) {
            document.getElementById('record-button').click();
          }
          _this.off();
        }
      }
    }, false);

    //iterate all windows
    var windows = _this._getNavWindows();
    for (var w=0; w<windows.length; w++) {
      var win = windows[w].content.wrappedJSObject;

      //when the user hits ctrl+x we turn off the explorer and recorder
      win.addEventListener('keydown', function(e) {
        if (e.keyCode == 88) {
          if (e.ctrlKey == true) {
            //make sure the record button is in off mode
            if (editor.recordingEnabled) {
              document.getElementById('record-button').click();
            }
            _this.off();
          }
        }
      }, false);

      win.fp_explorerStopped = function() {
        window.focus();
        return true;
      }

      //define the call out js method
      win.fp_explorerSelect = function(obj) {

        //Command value
        var valueInput = document.getElementById('commandValue');
        valueInput.value = "chain="+obj;
        triggerEvent(valueInput, 'input', true);
        //Command target
        var valueTarget = document.getElementById('commandTarget');
        valueTarget.value = window.flexpilot.lookupTarget(window.editor.flexTarget);
        triggerEvent(valueTarget, 'input', true);
        return true;
      }

      //get all movies on page
      var embeds = win.document.getElementsByTagName("embed");
      var objects = win.document.getElementsByTagName("object");
      if ((embeds.length == 0) && (objects.length == 0)) {
        this.log("We were unable to find any explorable Flex/Flash objects!");
      }

      //star the explorers on the page
      for (var i=0;i<embeds.length;i++) {
        try {
          this.callMovie(win, embeds[i], 'fp_explorerStart');
          embeds[i].removeEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
          embeds[i].addEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
        } catch(err) {
          this.log(err);
        };
      }
      for (var i=0;i<objects.length;i++) {
        try {
          this.callMovie(win, embeds[i], 'fp_explorerStart');
          objects[i].removeEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
          objects[i].addEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
        } catch(err) {
          this.log(err);
        }
      }

      windows[w].focus();
    }
  };

  this.off = function() {
    var windows = _this._getNavWindows();
    for (var w=0; w<windows.length; w++) {
      var win = windows[w].content.wrappedJSObject;

      //Get all movies on page
      var embeds = win.document.getElementsByTagName("embed");
      var objects = win.document.getElementsByTagName("object");
      //star the explorers on the page
      for (var i=0;i<embeds.length;i++) {
        try {
          this.callMovie(win, embeds[i], 'fp_explorerStop');
          this.callMovie(win, embeds[i], 'fp_recorderStop');
          embeds[i].removeEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
        } catch(err) {
          this.log(err);
        };
      }
      for (var i=0;i<objects.length;i++) {
        try {
          this.callMovie(win, objects[i], 'fp_explorerStop');
          this.callMovie(win, objects[i], 'fp_recorderStop');
          objects[i].removeEventListener('mouseover', function(e) { editor.flexTarget = e.target.wrappedJSObject;}, false);
        } catch(err) {
          this.log(err);
        }
      }
    }
  };
};

//Add some listeners
document.getElementById('play-button').addEventListener('click', function(e) { flexpilot.off();  }, false);
document.getElementById('play-suite-button').addEventListener('click', function(e) { flexpilot.off();  }, false);
window.addEventListener("load", function(e) {
  if (editor.recordingEnabled) { document.getElementById('record-button').click(); }
  var container = document.getElementById('commandDetail');
  var center = document.createElement('center');

  var btn = document.createElement('button');
  btn.label = "Flex Explorer";
  btn.value = "Flex Explorer";
  btn.textContent = "Flex Explorer";
  btn.addEventListener('click', function(e) { flexpilot.explore(); }, false);

  center.appendChild(btn)
  container.appendChild(center);
}, false);

document.getElementById('record-button').addEventListener('click', function(e) {
  if (editor.recordingEnabled) {
    flexpilot.off();
  } else {
    flexpilot.record();
  }
}, false);

//Stop trying to enable flex recording
function giveUp() {
  clearInterval(window.recId);
  window.recId = null;
}

//Setup all current windows to look for new flex and enable them
var enumerator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
           .getService(Components.interfaces.nsIWindowMediator)
           .getEnumerator("navigator:browser");

while(enumerator.hasMoreElements()) {
  var win = enumerator.getNext();
  win.addEventListener("DOMContentLoaded", function(event) {
  try {
    win.content.addEventListener("load", function(event) {
      //only deal with real html documents
      if (event.originalTarget instanceof HTMLDocument) {
        //and only if the recorder is enabled
        if (editor.recordingEnabled) {
          //try to enable flex recording every 2 seconds until give up
          window.recId = setInterval(function(){
            flexpilot.record();
          }, 2000);
          //try to enable flex on all swfs for 60 seconds
          //if we cant enable FP in 60 seconds, its probably not there
          setTimeout(giveUp, 60000);
        }
      }
    }, false);
    win.content.addEventListener("beforeunload", function(event) {
    	if (editor.recordingEnabled) {
       flexpilot.off();
     }
    }, false);
  } catch(err){}
  }, false);
};

//when a new dom window gets opened we add listeners
//so that if it navigates to a flex page the recorder is enabled
var observer = {
  observe: function(subject,topic,data) {
    subject.addEventListener("DOMContentLoaded", function(event) {
      Components.utils.reportError('DOMContentLoaded');
      
      try {
        subject.content.addEventListener("load", function(event) {
          if (event.originalTarget instanceof HTMLDocument) {
            if (editor.recordingEnabled) {
              window.recId = setInterval(function(){
                flexpilot.record();
              }, 2000);
              setTimeout(giveUp, 60000);
            }
          }
        }, false);
      
        subject.content.addEventListener("beforeunload", function(event) {
          if (editor.recordingEnabled) {
            flexpilot.off();
          }
        }, false);
      } catch(err) {  Components.utils.reportError(err); }
    
    }, false);
  }
};

var observerService =
  Components.classes["@mozilla.org/observer-service;1"]
  .getService(Components.interfaces.nsIObserverService);

observerService.addObserver(observer, "toplevel-window-ready", false);
