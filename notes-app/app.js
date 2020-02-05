
const { getNotes } = require('./notes');
const { createNotes } = require('./notes');
const chalk = require('chalk');

getNotes();
createNotes();

console.log("---command line argument 1",process.argv[0]);   //node path
console.log("---command line argument 2",process.argv[1]);   //current running file path
console.log("---command line argument 3",process.argv[2]);   //command line arguments

console.log(chalk.red.bold('Erro!'));