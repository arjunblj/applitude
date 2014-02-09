require 'rubygems'
require 'sinatra'
require 'redis'

set :server, %w[thin mongrel webrick]

configure do
  redisUri = ENV["REDISTOGO_URL"] || 'redis://localhost:6379'
  uri = URI.parse(redisUri) 
  REDIS = Redis.new(:host => uri.host, :port => uri.port, :password => uri.password)
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
  response.headers['Access-Control-Allow-Method'] = 'POST'
end

def hex_color(red, green, blue)
  "#%02x%02x%02x" % [red.to_i, green.to_i, blue.to_i]
end

def color_from_redis
  red = REDIS.get "red"
  green = REDIS.get "green"
  blue = REDIS.get "blue"
  @color = hex_color(red, green, blue)
end

get '/' do
  color_from_redis
end

get '/colorSound' do
  send_file File.join(settings.public_folder, '/index.html')
end

post '/red' do
  REDIS.set "red", params[:value]
  color_from_redis
end

post '/green' do
  REDIS.set "green", params[:value]
  color_from_redis
end

post '/blue' do
  REDIS.set "blue", params[:value]
  color_from_redis
end

get '/red' do
  REDIS.set "red", params[:value]
  color_from_redis
end

get '/green' do
  REDIS.set "green", params[:value]
  color_from_redis
end

get '/blue' do
  REDIS.set "blue", params[:value]
  color_from_redis
end