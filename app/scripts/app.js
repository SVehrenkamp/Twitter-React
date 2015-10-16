//React Component
var React = window.React = require('react'),
    PostsCollection = require('./collections/posts.collection'),
    SearchView = require('./views/search.view');
    
var postsCollection = new PostsCollection();
var searchView = new SearchView({collection: postsCollection});

