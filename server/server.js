var loopback = require('loopback');
var boot = require('loopback-boot');
var request = require('request');
var Twit = require('twit');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};
var config = {};
config.twitter = {};
config.twitter.consumerKey = '77DLzH2fkahdrR0K68FLEJdyn';
config.twitter.consumerSecret = 'eRuKVzv96eHUZJfw0uIEDHERZfhUv26OVHWFSGWPXehsCq90mh';
config.twitter.accessToken = '1317434858-rGGymTctTHsMhd9gutJ65PVeiLZTOVoMFCmw1OA';
config.twitter.accessTokenSecret = 'PvWvzMyCojDUxSX3Ak45Q3AE70dQYBy8uaX0EDsyhRHx3';


var T = new Twit({
  consumer_key: config.twitter.consumerKey,
  consumer_secret: config.twitter.consumerSecret,
  access_token: config.twitter.accessToken,
  access_token_secret: config.twitter.accessTokenSecret
});
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    //app.start();
	app.io = require('socket.io')(app.start());

  var stream = T.stream('statuses/filter', {track: 'mango'});

	app.io.on('connection', function(socket){
		console.log('connected');
    stream.on('tweet', function(tweet){
     console.log('NEW TWEET:..', tweet);
     socket.emit('tweet', {tweet: tweet});
    })
	});
});
//Custom Routes
var getTwitterFeed = function(req, res, user, postCount){

    var url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
    var token = "Bearer AAAAAAAAAAAAAAAAAAAAAAovfgAAAAAA0ja%2FDdaDH%2BSkT83AO9nWdYGb%2FKQ%3DDbAERPFBx97OE5FffntZ60m6WxG622taQ0NkX17EZvir0ikkdK";
    user = user || 'kingjames';
    postCount = 25;
    var options = {url: url, qs: {screen_name: user, count: postCount}, headers: {authorization: token}};

    //MAKE REQUEST 
    request(options, function(err, response, body){
      console.log('Called..');
      if(err){
        return "Error...";
        console.log('Called with Error!');
      } else{
        //var resp = JSON.parse(body);
        var resp = body;
        res.write(resp);
        res.end();
        console.log('Called with success!');
        return resp;
      }
    });
  console.log('This was called!');
  
}
// Mount middleware
app.use('/twitter', function(req, res){
 getTwitterFeed(req, res);
});