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
  	


  	render "index"

  	# render json: response
  	
  	# this is how you access the fixed height url source for the gif's that will show up on the index page



  end
end
