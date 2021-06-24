const express = require('express');
const axios = require('axios');
const {connectDb} = require('./helpers/db');
const {port, host, db, apiUrl} = require('./configuration');
const app = express();

const startServer = () => {
	app.listen(port, () => {
		console.log(`Started AUTH service on port: ${port}`);
		console.log(`On host: ${host}`);
		console.log(`Our database ${db}`);
	});
};

app.get('/', (req, res) => {
	res.send('/ - Your current path');
});

app.get('/testwithapidata', (req, res) => {
	axios.get(apiUrl + "/testapidata").then(response => {
		res.json({
			testapidata: response.data.testwithapi
		});
	});
});

app.get("/api/currentUser", (req, res) => {
  res.json({
    id: "1234",
    email: "foo@gmail.com"
  });
});

app.get('/test', (req, res) => {
	res.send('Our Auth server is working correct!');
});

connectDb()
	.on('error', console.log)
	.on('disconnected', connectDb)
	.once('open', startServer);
