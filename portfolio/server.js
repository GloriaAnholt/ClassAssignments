// Let's build a server!
var express = require('express'),
  proxy = require('express-request-proxy'),
  port = process.env.PORT || 3000,
  app = express();


app.get('/github/*', function(request, response){
  console.log('External Github request made: ', request.url);
  // If a git hub request happens internally, glue it together here:
  (proxy({
    url: 'https://api.github.com/' + request.params[0],
    headers: {
      Authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  }))(request, response);
});

app.get('/twitter/*', function(request, response){
  console.log('External Twitter request made: ', request.url);
  // If a twitter request happens internally, glue it together here:
  (proxy({
    url: '	https://api.twitter.com/oauth/access_token' + request.params[0],
    headers: {
      Authorization: 'token ' + process.env.TWITTER_TOKEN
    }
  }))(request, response);
});

// The serve-all has to be below the specific requests or it overrides them
app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', {root: '.'});
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
