from selenium import selenium
import unittest, time, re, json

class flex_pilot(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*firefoxproxy", "http://www.getwindmill.com/")
        self.selenium.start()
    
    def test_flex_pilot(self):
        sel = self.selenium
        sel.open("http://www.getwindmill.com/flexpilot/")
        for i in range(60):
            try:
                if sel.is_element_present("id=testApp"): break
            except: pass
            time.sleep(1)
        else: self.fail("time out")
        
        time.sleep(10)
        
        sel.flex_click("id=testApp", "chain=id:howdyButton")
        
        to_type = {"text": "WOOHOO", "chain": "name:testTextArea"}
        sel.flex_type("id=testApp", json.dumps(to_type))
        #sel.flex_type("id=testApp", "{\"text\":\"WOOHOO\",\"chain\":\"name:testTextArea\"}")
        
        to_select = {"label":"Alex","chain":"id:subPanel/name:comboTest"}
        sel.flex_select("id=testApp", json.dumps(to_select))
        #sel.flex_select("id=testApp", "{\"label\":\"Alex\",\"chain\":\"id:subPanel/name:comboTest\"}")
        
        to_drag = {"chain":"name:dragSprite", "optchain":"name:testTextArea"}
        sel.flex_drag_drop_elem_to_elem("id=testApp", json.dumps(to_drag))
        #sel.flex_drag_drop_elem_to_elem("id=testApp", "{\"chain\":\"name:dragSprite\", \"optchain\":\"name:testTextArea\"}")
        
        to_assert = {"chain":"name:testTextArea", "validator":"WOOHOO"}
        sel.flex_assert_text("id=testApp", json.dumps(to_assert))
        # sel.flex_assert_text("id=testApp", "{chain:\"name:testTextInput\", validator:\"woohoo\"}")
        
        time.sleep(20)
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
