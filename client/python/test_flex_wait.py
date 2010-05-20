from selenium import selenium
import unittest, time, re

class test_wait(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*firefoxproxy", "http://jeeoh.com/")
        self.selenium.start()
    
    def test_test_wait(self):
        sel = self.selenium
        sel.open("/flexpilot/")
        sel.wait_for_flex_ready("id=testApp", "5000")
        sel.flex_click("id=testApp", "chain=name:testTextArea")
        sel.flex_click("id=testApp", "chain=id:howdyButton")
        sel.flex_type("id=testApp", "text=asdasd,chain=name:testTextInput")
        sel.flex_click("id=testApp", "chain=id:subPanel/name:comboTest")
        sel.flex_select("id=testApp", "label=Geddy,chain=id:subPanel/name:comboTest")
        sel.flex_click("id=testApp", "chain=name:testTextArea")
        sel.flex_type("id=testApp", "text=asdasd,chain=name:testTextArea")
        sel.flex_click("id=testApp", "chain=id:howdyButton")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
