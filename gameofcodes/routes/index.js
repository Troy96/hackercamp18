var express = require('express');
var axios = require('axios');
var router = express.Router();
var fs = require('fs');
/* GET home page. */


var fileRead = () => {
	var file = fs.readFileSync('./../prog.js');
	console.log(file)
};


router.get('/', (req, res) => {
  res.render('index', { title: 'Hackercamp18' });
});

router.post('/', (req,res) => {
	let githubId = req.body.github_id;
	console.log(githubId);

	var reposlang = [];

	 axios.get(`https://api.github.com/users/${githubId}/repos`)
		.then((resp) => {
			
		

			resp.data.forEach((data) => reposlang.push(data.language))
			let uniquelangs = [...new Set(reposlang)];
			uniquelangs = uniquelangs.filter((data) => data !== null);
			fs.writeFileSync('./../prog.js', JSON.stringify(uniquelangs));
			fileRead();
			res.send(uniquelangs);
		})
		.catch((e) => {
			console.log(e);
		})
	
	
});

module.exports = router;
