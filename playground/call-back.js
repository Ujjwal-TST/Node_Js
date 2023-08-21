// Async Function with Call-back function

// const geocode = (adderss, callback) => {
//     setTimeout(() => {
//         const data = {
//             lat: 0,
//             long: 0
//         }
//         callback(data)
//     }, 2000)
// }

// geocode('Surat', (data) => {
//     console.log(data);
// })

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b)
    }, 2000);
}

add(1, 4, (sum) => {
    console.log(`sum is ${sum}`);
})