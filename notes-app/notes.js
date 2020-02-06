const fs = require('fs');

const getNotes = function () {
    console.log("---get notes function");
}

const addNote = function (title, body) {
    const notes = loadNotes();

    // for(let i=0;i<notes.length;i++){
    //     if(notes[i].title == title){
    //         console.log("Note already exist");         //good try but use array filter function instead of this
    //         return;  
    //     }
    // }

    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log("New note added");
    }else{
        console.log("Note tile taken");    
    }   
}

const removeNote = function(title){
    const notes = loadNotes();

    const existingNote = notes.filter(function (note){
        return note.title === title ? title : null;
    })

    if(existingNote.length !== 0){
        console.log("note removed",existingNote);
    }else{
        console.log("note does not exist",existingNote);
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = function () {
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
    removeNote
}