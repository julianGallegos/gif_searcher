// giphy api url http://api.giphy.com/v1/gifs/search?q=[search-params]&api_key=dc6zaTOxFJmzC   

// public_key = dc6zaTOxFJmzC

var app = {};

// models 


app.Gif = Backbone.Model.extend({

	defaults: {
		img_src: 'http://media.giphy.com/media/fDzM81OYrNjJC/giphy.gif'
	},

	urlRoot: 'http://api.giphy.com/v1/gifs/search'
	
});

app.GifCollection = Backbone.Collection.extend({
	model: app.Gif,
	url: 'http://api.giphy.com/v1/gifs/search?q=doge&api_key=dc6zaTOxFJmzC',

	fetchData: function() {
		
		this.fetch({
			success: this.fetchSuccess
		});
	},

	fetchSuccess: function(collection, response) {

		var dataReturned = response.data
		debugger


		var self = this;


		_.each(dataReturned, function(gif) {
			console.log(gif['images']['fixed_height']['url'])
			var gifModel = new app.Gif({img_src: gif['images']['fixed_height']['url']});
			collection.add(gifModel)
		});
			debugger
	}
});

app.gifs = new app.GifCollection();


app.gifs.fetchData();



// views 


//  single view of a gif 

app.GifView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function(){
		_.bindAll(this, 'render')
		this.render()
	},

	render: function(){
		$(this.tagName).append("<li> <img src=" +this.model.get('img_src')+ "></img> </li>")		
	}
});






//  view collection of gifs for the app

app.allTheGifsView = Backbone.View.extend({
		
	initialize: function(){

		this.bindEvents()
	},


	//doesn't seem like the 'backbone' way to set up events
	bindEvents: function() {
		$('.submit_button').on('click', this.search);
		$('.clear_button').on('click', this.clearInput)
		$(document).on('keypress', this.submitOnEnter)

	},

	submitOnEnter: function(e){
		if (e.keyCode == 13){
			console.log('you just pressed enter')
		}
	},

	search: function(){
		console.log('sumbitting');
		
		console.log($('#new-gif').val());
	},

	clearInput: function(){
		console.log('clearing all the things!')
		$("#new-gif").val('')
	},
	
	render: function(){
		console.log(this);
		
		this.collection.each(function(gif){
			var singleGifView = new GifView({model: gif});
			this.$el.append(singleGifView.el)
		}, this);
			return this;
	}
});




$(document).ready(function(){
	console.log("body ready!!");
	app.appViewOfGifs = new app.allTheGifsView();
});








