from selenium import selenium
import unittest, time, re

class test(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://getwindmill.com/")
        self.selenium.start()
    
    def test_test(self):
        sel = self.selenium
        sel.open("/flexpilot/")
        time.sleep(10)
        sel.flex_click("id=testApp", "chain=name:testTextArea")
        sel.flex_type("id=testApp", "text=asdasd,chain=name:testTextArea")
        sel.flex_click("id=testApp", "chain=id:howdyButton")
        sel.flex_type("id=testApp", "text=asdasd,chain=name:testTextInput")
        sel.flex_click("id=testApp", "chain=id:subPanel/name:comboTest")
        sel.flex_select("id=testApp", "label=Geddy,chain=id:subPanel/name:comboTest")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
