const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');

const bufferToString = dataBuffer.toString();

const stringToObject = JSON.parse(bufferToString);

console.log(stringToObject);

stringToObject.name='Yogita';
stringToObject.age='22';

console.log(stringToObject);

const objectToString = JSON.stringify(stringToObject);

fs.writeFileSync('1-json.json',objectToString);