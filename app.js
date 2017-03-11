const 	express = require('express'),
		hbs = require( 'express-handlebars' ),
		app = express();

app.engine( 'hbs', hbs({ 
  extname: 'hbs', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))
app.use(express.static('bower_components'))
app.set( 'view engine', 'hbs' );

app.get('/', function (req, res) {
  res.render('home', {
  	title: 'Real Time Loading',
  	message: 'Hello World!!!'
  });
})

app.listen(3001, function () {
  console.log("Example app listening on port 3001!");
})

