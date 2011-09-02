require 'rubygems'
require 'mechanize'

class HopToad

  def initialize(*args)
    @config=args.first
    @browser=WWW::Mechanize.new { |agent|
        agent.user_agent_alias = 'Mac Safari'
      }
  end

  def login
    @browser.get("http://#{@config[:project]}.hoptoadapp.com/login") do |login|
      page=login.form_with(:action => "http://#{@config[:project]}.hoptoadapp.com/session") do |login_form|
        login_form['session[email]']=@config[:email]
        login_form['session[password]']=@config[:password]
      end
      @session=page.submit
      return @session
    end
  end

  def exception(error_no)
    return 'Login first' unless @session
    error_page=@browser.get("http://#{@config[:project]}.hoptoadapp.com/errors/#{error_no}")
    return 'Exception not found' unless error_page
    return parse_exception(error_page)
  end

  def resolve(error_no)
    return 'Login first' unless @session
    error_page=@browser.get("http://#{@config[:project]}.hoptoadapp.com/errors/#{error_no}")
    return 'Exception not found' unless error_page
    error_page.form_with(:action => "/errors/#{error_no}") do |error_form|
      error_form['group[resolved]']=1
    end.submit
    self.exception(error_no)
  end

  private

  def parse_exception(page)
    error = {}
    error[:title] = page.search('div#summary table.summary td.error_message').text
    error[:backtrace] = page.search('div#backtrace pre').to_html
    error[:resolved] = page.search('span#resolved_status').text.eql?('Resolved') ? true : false
    return error
  end
end
