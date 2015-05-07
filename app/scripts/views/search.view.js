var $ = require('jquery');
var _ = require('underscore');
var Search = require('../components/search.component');
var Backbone = require('backbone');
Backbone.$ = $;

var View = Backbone.View.extend({
	el: '#backbone',
	
	initialize: function(){
		var self = this;
		this.collection.fetch().done(function(){
			self.render();
		});
		
		console.log(this.collection);
		_.bindAll(this, "refresh");

	},
	render: function(){
		var self = this;
		var initial_collection = this.collection.models;
		React.render(
			React.createElement(Search, {
			data: initial_collection,
			refresh: self.refresh

		}), document.getElementById('backbone'));

		return this;
	},
	refresh: function(){
		this.collection.fetch();
		var collection = this.collection.models;
		return collection;
	}
});

module.exports = View;