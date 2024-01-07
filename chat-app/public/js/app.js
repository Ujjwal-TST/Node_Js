const socket = io();


socket.on('countUpdated', (count) => {
    console.log('Updated Count is ', count);
    document.querySelector('#inc').addEventListener('click', () => {
        console.log('click');
        socket.emit('increment')
    })
})
