class SearchController < ApplicationController


	def index


	end

  def search

  	user_input = "doge"

  	# user_input = params[:user_input]

  	public_key = "dc6zaTOxFJmzC"

  	url = "http://api.giphy.com/v1/gifs/search?q=#{user_input}&api_key=#{public_key}"

  	response = HTTParty.get(url)

 		@image_source = response['data'][1]['images']['fixed_height']['url']
  	
    debug

  	render "index"

  	# render json: response
  	
  	



  end
end
