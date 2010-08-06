//This is an example of an incredibly simpified Selenium user extension
Selenium.prototype.doTestWorkingExtension = function(text) {
  this.browserbot.getCurrentWindow().title = text;
};
