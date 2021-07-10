const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const JSON = require('circular-json');

/* GET home page. */

/**
 * Invoked on start
 */
router.get('/', async (req, res) => {
	res.render('index', { title: 'Hackercamp18 | Game of Codes' });
});

/**
 * Invoked on submit of github userID
 */
router.post('/', async (req, res) => {
	const githubId = req.body.github_id;

	if (!githubId) {
		return res.json({
			error: 'githubId not provided'
		})
	}

	try {
		const response = await axios.get(`https://api.github.com/users/${githubId}/repos`);
		const repoData = response.data;
		const languges = repoData
			.reduce((acc, curr) => {
				/**
				 * Contains duplicate languages so consider one instance
				 */
				if (!acc.includes(curr.language)) {
					acc.push(curr.language)
				}
				return acc
			}, [])
			/** 
			 * removes null from the list
			*/
			.filter(Boolean);
		fs.writeFileSync('./../prog.js', JSON.stringify(languges));
		res.redirect('/yourLangs');
	} catch (error) {
		console.trace(error)
		res.render('error');
	}
});

/**
 * Displays the languages for the user
 */
router.get('/yourLangs', (req, res) => {
	const langs = getPrograms();
	res.render('langs', {
		Langs: langs
	});
});


/**
 * Displays the page with the jobs on the selected language. The Github Job API has been decommissioned. 
 * TODO: Use some other provider to to replace this
 */
router.get('/getJobs/:progLang', (req, res) => {
	const progLang = req.params.progLang;
	axios.get(`https://jobs.github.com/positions.json?description=${progLang}`)
		.then((jobs) => {
			res.render('jobs', {
				jobs: jobs.data
			});
		})
		.catch((e) =>
			console.log(e)
		);
});

/**
 * Currently storing the list of languages in a JSON file. 
 * TODO: Replace this with some DB or Redis persistance
 */
const getPrograms = () => {
	const file = fs.readFileSync('./../prog.js');
	return JSON.parse(file);
};

module.exports = router;
