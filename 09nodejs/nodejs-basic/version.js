const pac = require('./package.json');
const beautify = require('json-beautify');
const file = require('fs');
const pac2 = {...pac};
pac2.version = '0.0.2';
file.writeFileSync('./package.json', beautify(pac2, null, 2, 100));
const package2 = file.readFileSync('./package.json');
