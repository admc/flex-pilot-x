module Selenium
  module Client
    class Driver
      def flex_click(locator, flashLoc)
          remote_control_command("flexClick", [locator, flashLoc])
      end

      def flex_double_click(locator, flashLoc)
          remote_control_command("flexDoubleClick", [locator, flashLoc])        
      end

      def flex_select(locator, options)
          remote_control_command("flexSelect", [locator, options])
      end

      def flex_type(locator, options)
          remote_control_command("flexType", [locator, options])
      end

      def flex_drag_drop_elem_to_elem(locator, options)
          remote_control_command("flexDragDropElemToElem", [locator, options])
      end

      def flex_drag_drop_to_coords(locator, options)
          remote_control_command("flexDragDropToCoords", [locator, options])
      end

      def flex_assert_display_object(locator, options)
          remote_control_command("flexAssertDisplayObject", [locator, options])
      end

      def flex_assert_text(locator, options)
          remote_control_command("flexAssertText", [locator, options])
      end

      def flex_assert_text_in(locator, options)
          remote_control_command("flexAssertText", [locator, options])
      end

      def flex_assert_property(locator, options)
          remote_control_command("flexAssertProperty", [locator, options])    
      end
      
      def wait_for_flex_ready(locator, timeout)
          remote_control_command("waitForFlexReady", [locator,timeout])
      end
    end
  end
end
