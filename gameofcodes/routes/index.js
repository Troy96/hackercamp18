var express = require('express');
var axios = require('axios');
var router = express.Router();
var fs = require('fs');
const JSON  = require('circular-json');

/* GET home page. */


var fileRead = () => {
	var file = fs.readFileSync('./../prog.js');
	console.log(JSON.parse(file));
	return JSON.parse(file);
};


router.get('/', (req, res) => {
  res.render('index', { title: 'Hackercamp18 | Game of Codes' });
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
			
			res.redirect('/yourLangs');
		})
		.catch((e) => {
			console.log(e);
		})
	});

router.get('/yourLangs', (req,res) => {

	let dynamicLangs = fileRead();

	res.render('langs',{
		Langs: dynamicLangs
	});

});	


router.get('/getJobs/:progLang', (req,res) => {

	let progLang = req.params.progLang;

	axios.get(`https://jobs.github.com/positions.json?description=${progLang}`)
		.then((jobs) => {
			console.log(JSON.stringify(jobs.data, undefined,3));
			res.render('jobs',{
				jobs: jobs.data
			});
		})
		.catch((e) => 
			console.log(e)
			);

});	
	
module.exports = router;
