const express = require('express');
const mongoose = require('mongoose');
const axios = require("axios");
const { port, host, db, authApiUrl } = require("./configuration");
const {connectDb} = require('./helpers/db');
const app = express();
const postSchema = new mongoose.Schema({
	name : String
});
const Post = mongoose.model('Post', postSchema);

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started API service on port: ${port}`);
		console.log(`On host: ${host}`);
		console.log(`Our database ${db}`);

		Post.find((err, posts) => {
			if (err) return console.error(err);
			console.log('posts', posts);
		});

// 		const silence = new Post({name : "Silence"});
// 		silence.save((err, savedSilence) => {
// 			if (err) console.error(err);
// 			console.log('savedSilence', savedSilence);
// 		});

	});
};

app.get('/', (req, res) => {
	res.send('/ - Your current path');
});

app.get('/test', (req, res) => {
	res.send('Our API server is working correct!');
});

app.get('/api/testapidata', (req, res) => {
	res.json({
		testwithapi: true
	});
});

app.get("/testwithcurrentuser", (req, res) => {
  axios.get(authApiUrl + "/currentUser").then(response => {
    res.json({
      testwithcurrentuser: true,
      currentUserFromAuth: response.data
    });
  });
});

connectDb()
	.on('error', console.log)
	.on('disconnected', connectDb)
	.once('open', startServer);
