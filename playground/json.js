const fs = require('fs');

// Write a Data in file
// const book = {
//     planet: 'Agstha Crishty',
//     name: 'Earth',
//     age:28
// }

// const bookJSON = JSON.stringify(book)

// fs.writeFileSync('data.json',bookJSON)

// Read Data in file

const bookData = fs.readFileSync('data.json').toString()
const bookObj = JSON.parse(bookData)
console.log(bookObj);