window.flexpilot = new function() {
    var _this = this;

    this._getNavWindows = function(){
     	var windows = []
      var enumerator = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                         .getService(Components.interfaces.nsIWindowMediator)
                         .getEnumerator('navigator:browser');
      while(enumerator.hasMoreElements()) {
        windows.push(enumerator.getNext());
      }
    	return windows;
    };

    this.record = function(){
    	var windows = _this._getNavWindows();

    	for (var w=0; w<windows.length; w++){
    		var win = windows[w].content.wrappedJSObject;
		
    		//define the call out js method
    		win.fp_recorderAction = function(obj){
    			var method = obj.method.charAt(0).toUpperCase() + obj.method.substring(1);
    			var flashMethod = 'flex'+method;
    			var value = "chain="+obj.chain;

    			//if we received a type method things are a bit different
    			if (obj.params){
    				var Ci = Components.interfaces;  
    				var Cc = Components.classes;
    				var nativeJSON = Cc["@mozilla.org/dom/json;1"].createInstance(Ci.nsIJSON);  

    				//obj.params.flash = 'chain='+obj.chain;
    				obj.params.chain = obj.chain;
    				value = nativeJSON.encode(obj.params); 
    			}
    			var locator = window.editor.flexTarget.id;
    			window.editor.addCommand(flashMethod, 'id='+locator, value, win);
    		}
		
    		//get all movies on page
    		var embeds = win.document.getElementsByTagName("embed");
    		var objects = win.document.getElementsByTagName("object");
	 	
    		//star the explorers on the page
    		for (var i=0;i<embeds.length;i++){
    			try {
    				embeds[i].fp_recorderStart();
    				embeds[i].removeEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    				embeds[i].addEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    			} catch(err){};
    		}
    		for (var i=0;i<objects.length;i++){
    			try {
    				objects[i].fp_recorderStart();
    				objects[i].removeEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    				objects[i].addEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    			} catch(err){}
    		}
    		
    		windows[w].focus();	
    	}		
    };

    this.explore = function(){
    	var windows = _this._getNavWindows();
	
    	for (var w=0; w<windows.length; w++){
    		var win = windows[w].content.wrappedJSObject;
		
    		//define the call out js method
    		win.fp_explorerSelect = function(obj){

    			//Command value
    			var valueInput = document.getElementById('commandValue');
    			valueInput.value = "chain="+obj;
    			triggerEvent(valueInput, 'input', true);

    			//Command target
    			var valueTarget = document.getElementById('commandTarget');
    			valueTarget.value = "id="+window.editor.flexTarget.id;
    			triggerEvent(valueTarget, 'input', true);
    		}

    		//get all movies on page
    		var embeds = win.document.getElementsByTagName("embed");
    		var objects = win.document.getElementsByTagName("object");
	 	
    		//star the explorers on the page
    		for (var i=0;i<embeds.length;i++){
    			try {
    				embeds[i].fp_explorerStart();
    				embeds[i].removeEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    				embeds[i].addEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    			} catch(err){};
    		}
    		for (var i=0;i<objects.length;i++){
    			try {
    				objects[i].fp_explorerStart();
    				objects[i].removeEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    				objects[i].addEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    			} catch(err){}
    		}
    		
    		windows[w].focus();    		
    	}		
    };

    this.off = function(){
    	var windows = _this._getNavWindows();
	
    	for (var w=0; w<windows.length; w++){
    		var win = windows[w].content.wrappedJSObject;
		
    		//Get all movies on page
    		var embeds = win.document.getElementsByTagName("embed");
    		var objects = win.document.getElementsByTagName("object");
    		//star the explorers on the page
    		for (var i=0;i<embeds.length;i++){
    			try {
    				embeds[i].fp_explorerStop();
    				embeds[i].fp_recorderStop();
    				embeds[i].removeEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    			} catch(err){};
    		}
    		for (var i=0;i<objects.length;i++){
    			try {
    				objects[i].fp_explorerStop();
    				objects[i].fp_recorderStop();
    				objects[i].removeEventListener('mouseover', function(e){ editor.flexTarget = e.target.wrappedJSObject;}, false);
    			} catch(err){}
    		}	
    	}
    };
};