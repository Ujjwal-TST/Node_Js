const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes')




// ADD Command
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: 'Add title of your Note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Add a new note',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        // console.log('Title:', argv.title, 'body:', argv.body);
        addNotes(argv.title, argv.body)
    }
})

// Remove Command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'title of your Note that you want to remove',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
        notes.removeNotes(argv.title)
    }
})

// Read Command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'title of your Note that you want to read',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
        notes.readNotes(argv.title)
    }
})

// List Command
yargs.command({
    command: 'list',
    describe: 'fetching  a list of  notes',
    handler: () => {
        console.log(chalk.blue.inverse.bold("Your Notes"));
        notes.listAllNotes()
    }
})

// console.log(yargs.argv);
yargs.parse()


