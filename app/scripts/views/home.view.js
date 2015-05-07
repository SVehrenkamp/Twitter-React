var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
Backbone.$ = $;

var View = Backbone.View.extend({
	initialize:function(options){
		console.log('Home View Initialized');
	},

	render:function(options){
		console.log('Home View Rendered');
	}
});

module.exports = View;

