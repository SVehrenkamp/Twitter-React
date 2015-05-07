var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var Collection = Backbone.Collection.extend({
	initialize: function(){
		console.log('Initialized Collection');

	},
	url: function(){
		url = "/twitter";
		return url;

	},
	// parse: function(resp, options){
 //      var data = [];
 //      for(var d in resp){
 //        data.push(resp[d]);
 //      }
	// 	return data;

	// }
});

module.exports = Collection;