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
		


		var self = this;


		_.each(dataReturned, function(gif) {
			console.log(gif['images']['fixed_height']['url'])
			var gifModel = new app.Gif({img_src: gif['images']['fixed_height']['url']});
			collection.add(gifModel)
		});
			console.log(collection)

	}
});

// this is the collection of urls returned from giphy api
// to iterate through each gif url   (app.gifs.models[i].attributes.img_src)
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
		debugger 
		$(this.tagName).append(this)		
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
			console.log($('#new-gif').val());
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

		// debugger
		
		for (var i = 0; i < app.gifs.length; i++){

			console.log(app.gifs.models[i].attributes.img_src)
			$('#test').append('<li><img class="gifCards" src=' +app.gifs.models[i].attributes.img_src  +'></li>')
		}

		// _.each(app.gifs.models, function(current_gif){
		// 	debugger
		// 	console.log(app.gifs.models[current_gif])
		// })		
		// app.gifs.each(function(gif){
		// 	console.log(gif.attributes)
		// 	debugger
		// }, this);
		// 	return this;
	}
});




$(document).ready(function(){
	console.log("body ready!!");
	app.appViewOfGifs = new app.allTheGifsView();

});








