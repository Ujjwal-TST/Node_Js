const fs = require('fs');
const chalk = require('chalk');

// Load Notes function
const loadNotes = () => {
    try {
        const notesData = fs.readFileSync('data.json').toString()
        return JSON.parse(notesData)

    }
    catch (e) {
        return [];
    }
}
const addNotesinDB = (notes) => {
    const data = JSON.stringify(notes)
    fs.writeFileSync('data.json', data)
}

// Add Notes Function
const addNotes = (title, body) => {
    const noteArr = loadNotes()
    const duplicateNotes = noteArr?.find(ele => ele?.title === title)
    // console.log(duplicateNotes);
    if (!duplicateNotes) {
        noteArr.push({
            title, body
        })
        addNotesinDB(noteArr)
        console.log(chalk.green.inverse.bold('note is added!!!!'));
    }
    else {
        console.log(chalk.red.inverse.bold('title already exist in notes !!!!'));
    }

}

// Remove Notes
const removeNotes = (title) => {
    const noteArr = loadNotes()
    const noteData = noteArr?.filter(ele => ele.title !== title)
    console.log(noteData);
    if (noteData.length !== noteArr.length) {
        addNotesinDB(noteData)
        console.log(chalk.inverse.green.bold('Note removed!!!!'));
    }
    else {
        console.log(chalk.inverse.red.bold('No note found!!!'));
    }
}

// List all Notes
const listAllNotes = () => {
    const noteArr = loadNotes();
    // console.log(noteArr);
    noteArr.forEach(ele => {
        console.log('Title', chalk.yellow.inverse.bold(ele?.title));
    })
}

// Read Notes
const readNotes = (title) => {
    const notesArr = loadNotes();
    const readNotes = notesArr.find(ele => ele?.title === title)
    if (readNotes) {
        console.log('Title:', chalk.inverse.bold(readNotes?.title));
        console.log('Body:', readNotes?.body);
    }
    else {
        console.log(chalk.red.inverse.bold('No note found!!!!'));
    }
}


module.exports = {
    addNotes, removeNotes, listAllNotes, readNotes
}