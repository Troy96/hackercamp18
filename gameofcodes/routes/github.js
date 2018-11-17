var express = require('express');
var router = express.Router();
const axios = require('axios');




var getAllRepos = (id) => {
		return axios.get(`https://api.github.com/users/${id}/repos`)
		.then((resp) => {
			
			console.log(resp.data);
			
			res.send(resp.data);
		})
		.catch((e) => {
			console.log(e);
		})
};


router.get('/getRepoLanguage/:username/:reponame', function(req, res) {

	let username = req.params.username;
	let reponame = req.params.reponame;
  	
	var repolang = [];

	return axios.get(`https://api.github.com/repos/${username}/${reponame}/languages`)
		.then((resp) => {
			console.log(resp.data);
			Object.keys(resp.data).forEach((key) => {
				repolang.push(key);	
			})
			res.send(repolang);
		})
		.catch((e) => {
			console.log(e);
		})


});

router.get('/getAllRepos/:username', function(req, res) {

	let username = req.params.username;;
  	
	var reposlang = [];

	return axios.get(`https://api.github.com/users/${username}/repos`)
		.then((resp) => {
			
		

			resp.data.forEach((data) => reposlang.push(data.language))
			let uniquelangs = [...new Set(reposlang)];
			uniquelangs = uniquelangs.filter((data) => data !== null);
			res.send(uniquelangs);
		})
		.catch((e) => {
			console.log(e);
		})


});

module.exports = router;
