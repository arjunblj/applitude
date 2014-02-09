require "./app"

run Sinatra::Application

set :public_folder, File.dirname(__FILE__) + "/public"
set :protection, :except => [:json_csrf]