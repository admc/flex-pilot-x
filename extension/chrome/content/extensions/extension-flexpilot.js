
//x.doFlashType("id=devMovie","id:howdyButton")
Selenium.prototype.doFlexClick = function(locator, flashLoc) {
    var movie = this.browserbot.findElement(locator);
    var flashObj = parse_locator(flashLoc);
    var flashParam = {};
    flashParam[flashObj.type] = flashObj['string'];
    var res = movie.wrappedJSObject['fp_click'](flashParam);
    try {
        var msg = res.message;
        throw res;
    } catch(err){}
};

Selenium.prototype.doFlexDoubleClick = function(locator, flashLoc) {
    var movie = this.browserbot.findElement(locator);
    var flashObj = parse_locator(flashLoc);
    var flashParam = {};
    flashParam[flashObj.type] = flashObj['string'];
    var res = movie.wrappedJSObject['fp_doubleClick'](flashParam);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

//x.doFlashType("id=devMovie","chain=name:testTextArea/name:UITextField18", "SUP MANGO")
// For IDE had to change syntax to be two params:
// target = id=devMovie
// value = {flash:"chain=name:testTextArea/name:UITextField18", text:"ROCK"}
Selenium.prototype.doFlexType = function(locator, options) {
	var optionObj = eval("("+options+")");

    var movie = this.browserbot.findElement(locator);
    //var flashObj = parse_locator(optionObj.flash);
	//var flashParam = {};
    //flashParam[flashObj.type] = flashObj['string'];
    //flashParam['text'] = optionObj.text;

    var res = movie.wrappedJSObject['fp_type'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

//x.doFlashSelect("id=devMovie", "chain=id:subPanel/name:comboTest", "label=Alex")
//{option:"label=Alex","flash":"chain=id:subPanel/name:comboTest"}
Selenium.prototype.doFlexSelect = function(locator, options) {
    //Turn options JSON into an object
    var optionObj = eval("("+options+")");

    //Lookup the flash movie
    var movie = this.browserbot.findElement(locator);
    //var flashObj = parse_locator(optionObj.flash);
    //var optObj = parse_locator(optionObj.option);

    //Create a params object to hand to the flash external interface
	//var flashParam = {};
    //flashParam[flashObj.type] = flashObj['string'];
    //flashParam[optObj.type] = optObj['string'];

    //Execute the action, store result
    var res = movie.wrappedJSObject['fp_select'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
//{chain:"name:dragSprite", optchain:"name:testTextArea"}
Selenium.prototype.doFlexDragDropElemToElem = function(locator, options) {
    //Turn options JSON into an object
    var optionObj = eval("("+options+")");

    var movie = this.browserbot.findElement(locator);
    /*var flashObj = parse_locator(flashLoc);
    var optObj = parse_locator(option);
    var flashParam = {};
    flashParam[flashObj.type] = flashObj['string'];
    flashParam[optObj.type] = optObj['string'];
		*/
    var res = movie.wrappedJSObject['fp_dragDropElemToElem'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

//x.doFlashDragDropElemToElem("id=devMovie", "chain=name:dragSprite", "optchain=id:subPanel")
Selenium.prototype.doFlexDragDropToCoords = function(locator, options) {
    //Turn options JSON into an object
    var optionObj = eval("("+options+")");
    var movie = this.browserbot.findElement(locator);
    /*var flashObj = parse_locator(flashLoc);
    var coordObj = parse_locator(coords);
    var flashParam = {};
    flashParam[flashObj.type] = flashObj['string'];
    flashParam[coordObj.type] = coordObj['string'];*/
    var res = movie.wrappedJSObject['fp_dragDropToCoords'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

Selenium.prototype.doFlexAssertDisplayObject = function(locator, flashLoc) {
    var flashObj = parse_locator(flashLoc);
    var flashParam = {};
	flashParam[flashObj.type] = flashObj['string'];

    var movie = this.browserbot.findElement(locator);
    var res = movie.wrappedJSObject['fp_dragDropToCoords'](flashParam);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};


Selenium.prototype.doFlexAssertTextIn = function(locator, options) {
    //Turn options JSON into an object
    var optionObj = eval("("+options+")");
    var movie = this.browserbot.findElement(locator);
    var res = movie.wrappedJSObject['fp_assertTextIn'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

Selenium.prototype.doFlexAssertText = function(locator, options) {
    //Turn options JSON into an object
    var optionObj = eval("("+options+")");

    var movie = this.browserbot.findElement(locator);
    var res = movie.wrappedJSObject['fp_assertText'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};

Selenium.prototype.doFlexAssertProperty = function(locator, options) {
    //Turn options JSON into an object
    var optionObj = eval("("+options+")");

    var movie = this.browserbot.findElement(locator);
    var res = movie.wrappedJSObject['fp_assertProperty'](optionObj);
    try {
        var msg = res.message;
        throw msg;
    } catch(err){}
};
