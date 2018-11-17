const fs =require('fs');

const _ = require('lodash');

 //console.log(fs.readFileSync(JSON.parse(data.filter((data) => data.location ==='Noida'))));

 var data = JSON.parse(fs.readFileSync('./../jobs.json'));
//console.log(data.filter(data) => data.location === 'Noida');
console.log(data);