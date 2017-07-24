class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    @site_title = ENV['SITE_TITLE']
end
