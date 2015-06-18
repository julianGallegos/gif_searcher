





// (function(){

// 	window.App = {
// 		Models: {},
// 		Collections: {},
// 		Views: {},
// 		Router: {}
// 	};

// 	App.Router = Backbone.Router.extend({
// 		routes: {
// 			'': 'search#index',
// 			'search': 'search#search'
// 		},
// 		index: function(){

// 			$("#test").append("calling the index route..");
// 		},

// 		search: function(){
// 			$("#test").append('calling search route..')
// 		}
// 	});

// 	new App.Router;
// 	Backbone.history.start();


// })();


var app = {};

// models 


app.Gif = Backbone.Model.extend({

	defaults: {
		img_src: ''
	}
});

app.GifCollection = Backbone.Collection.extend({
	url: '/search',
	model: app.Gif
});


app.gifs = new app.GifCollection();


// views 


//  single view of a gif 

app.GifView = Backbone.View.extend({
	tagName: 'ul',
	initialize: function(){
		_.bindAll(this, 'render')
		this.render()
	},

		// i'm trying to have this method call upon the Backbone.Collection of Gif Models and then call this.model.get('img_src') all the models returned from the collection 
		// after returning all of the img_src, I want to iterate each of the img_src to the render method below
	render: function(){
		$(this.tagName).append("<li> <img src=" +this.model.get('img_src')+ "></img> </li>")		
	}
});

//  view collection of gifs for the app

app.allTheGifsView = Backbone.View.extend({
		// tagName: 'li',
	tagName: "submit_button",

	initialize: function(){
		// debugger
		_.bindAll(this, "search")
		console.log("hai!");
		$('.submit_button').on('click', this.search);
	},


	events: {
		"click .submit_button": "search"
	},

	search: function(){
		console.log('sumbitting')
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


// test variables 

// var collectionOfGifs = new GifCollection([
// 	{
// 		img_src: 'http://media.giphy.com/media/fDzM81OYrNjJC/giphy.gif'
// 	},
// 	{
// 		img_src: 'http://media3.giphy.com/media/eXpf4dekk6S6A/200w.gif'
// 	},
// 	{
// 		img_src: 'http://media2.giphy.com/media/R1t98QcWrhgfS/200w.gif'
// 	}

// ])

// enter this into console to show the gifs above on the page 

// var gifView = new allTheGifsView({collection: collectionOfGifs})

// gifView.render()




