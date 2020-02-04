
const { getNotes } = require('./notes');
const { createNotes } = require('./notes');
const chalk = require('chalk');

getNotes();
createNotes();

console.log(chalk.red.bold('Erro!'));