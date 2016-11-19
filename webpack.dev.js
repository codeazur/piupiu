#!/usr/bin/env node
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var compiler = webpack(config);
var app = express();

app.use(require('cors')());

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler, {
	log: console.log
}));

var port = ((process.env.PORT | 0) || 4000) + 1;

app.listen(port, 'localhost', err => {
	if (err) {
		return console.error(err);
	}
	console.log('Running HMR Dev Server using http://localhost:' + port);
});

// Exit on end of STDIN
process.stdin.resume()
process.stdin.on('end', () => {
	process.exit(0);
});
