
const { getNotes } = require('./notes');
const { createNotes } = require('./notes');
const yargs = require('yargs');
const chalk = require('chalk');
//custmize yarg version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,          //title is required (default value is false)
            type: 'string'                  //even if the arg --title provided without value , by default it gets value true, to avoid that add this property for string only string value 
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        console.log(chalk.red('Title :', argv.title));
        console.log(chalk.green('Body :', argv.body));
    }
})

//Create remove commad
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    handler: function () {
        console.log('Removing a note');
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    handler: function () {
        console.log('Reading a note');
    }
})

//Create list command 
yargs.command({
    command: 'list',
    describe: 'list the notes',
    handler: function () {
        console.log('Listing all the notes');
    }
})

yargs.parse();          //to parse the argument
//console.log(yargs.argv);