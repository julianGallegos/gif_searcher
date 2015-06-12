//= require_tree .

var GifApp = {
	Models: {},
	Collections: {},
	Views: {},
	Routers: {},
	initialize: function(data){	
		alert("starting backbone");
		// GifApp.Collections();

		// new GifApp.Routers({gifs: gifs});
		// Backbone.history.start();
	}
}

GifApp.initialize();



// models 


	var Gif = Backbone.Model.extend({

		defaults: {
			img_src: ''
		}
	})

	var GifCollection = Backbone.Collection.extend({
		url: '/search',
		model: Gif
	})






// views 



	var GifView = Backbone.View.extend({
		tagName: 'ul',


		initialize: function(){
			_.bindAll(this, 'render')
			this.render()
		},

			// i'm trying to have this method call upon the Backbone.Collection of Gif Models and then call this.model.get('img_src') all the models returned from the collection 
			// after returning all of the img_src, I want to iterate each of the img_src to the render method below
		render: function(){
// 
			$(this.tagName).append("<li> <img src=" +this.model.get('img_src')+ "></img> </li>")		
		}
	});



	// var GifView = Backbone.View.extend({
	// 	tagName: 'li',

	

	// 	initialize: function(){
	// 		this.render();
	// 	},

	// 	render: function(){
	// 		this.$el.html(this.template(this.model.to.JSON()));
	// 	}


	// })



	var allTheGifsView =  Backbone.View.extend({
	
		tagName: 'li',
		

		render: function(){
			console.log(this)
			debugger
			this.collection.each(function(gif){
				var singleGifView = new GifView({model: gif});
				this.$el.append(singleGifView.el)
			}, this);
				return this;
		}
	});


// test variables 

var collectionOfGifs = new GifCollection([
	{
		img_src: 'http://media.giphy.com/media/fDzM81OYrNjJC/giphy.gif'
	},
	{
		img_src: 'http://media3.giphy.com/media/eXpf4dekk6S6A/200w.gif'
	},
	{
		img_src: 'http://media2.giphy.com/media/R1t98QcWrhgfS/200w.gif'
	}

])