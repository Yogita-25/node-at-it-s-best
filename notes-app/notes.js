const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {

}

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
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
    getNotes,
    addNote,
    removeNote,
    listNotes
}