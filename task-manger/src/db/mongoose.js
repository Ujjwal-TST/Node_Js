const mongoose = require('mongoose');

// Connection URL
const URL = 'mongodb://127.0.0.1:27017/task-manager'
// task-manager is our collection name

mongoose.connect(URL)








// const task1 = new Task({
//     description: 'Testing Phase',
//     completed: true,

// })

// task1.save().then(() => {
//     console.log(task1);
// }).catch((err) => {
//     console.log('Error', err);
// })