require "test/unit"
require "rubygems"
gem "selenium-client"
require "selenium/client"
require "flexpilot"

class LoginTest < Test::Unit::TestCase
  def setup
    @verification_errors = []
    @selenium = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*firefox",
      :url => "http://saucelabs.com",
      :timeout_in_second => 15

    @selenium.start_new_browser_session
  end
  
  def teardown
    @selenium.close_current_browser_session
    assert_equal [], @verification_errors
  end
    
  def test_login_as_demo
    @selenium.flex_click("foo", "bar")

  end
end