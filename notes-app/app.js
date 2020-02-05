
const { getNotes } = require('./notes');
const { createNotes } = require('./notes');
const yargs = require('yargs');

//custmize yarg version
yargs.version('1.1.0');

//Create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    handler: function () {
        console.log('Adding new note');
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

console.log(yargs.argv);