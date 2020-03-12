const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title);  // use find() instead of filter() to break loop once you get the result

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log("New note added");
    } else {
        console.log("Note tile taken");
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.red.inverse("Note removed"), title);
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgGreen("Note does not exist"), title);
    }
}

const listNotes = () => {
    const notes = loadNotes();
    if (notes.length != 0) {
        console.log(chalk.inverse("Your notes..."));
        notes.forEach((note) => console.log(note.title));
    } else {
        console.log(chalk.bgGreen("Notes does not exist"));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const note=notes.find((note) => note.title == title);      // find() returns whatever is in notes satisfying  note.title == title condition
    if (note) {
        console.log(chalk.inverse("Your note...."));
        console.log(chalk.bgGreen(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red("Note does not exist"));
    }
}


const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {                                                    //try catch to handle error if the file does not exist 
        const bufferData = fs.readFileSync('notes.json');
        const dataJSON = bufferData.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
}