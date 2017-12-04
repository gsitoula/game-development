const express = require('express'),
app = express(),
logger = require('morgan'),
bodyParser = require('body-parser'),
path = require('path'),
favicon = require('serve-favicon'),
game = require('./lib/routes/game/index.js'),
config = require('config');

app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/assets', express.static('assets'));
app.use('/js', express.static('js'));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', game);

app.listen(config.port, () => {
	console.log('Server up on port:', config.port);
});

