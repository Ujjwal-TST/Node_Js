const socket = io();

const $messageForm = document.querySelector('#form-submit');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// socket.on('countUpdated', (count) => {
//     console.log('Updated Count is ', count);
//     document.querySelector('#inc').addEventListener('click', () => {
//         // console.log('click');
//         socket.emit('increment')
//     })
// })

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const userTemplate = document.querySelector('#sidebar-template').innerHTML


const autoScroll = () => {
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage);
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible Height
    const visibleHeight = $messages.offsetHeight

    // Height of messges container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

// Parse the Url string for join the particular room using the Qs npm pkg
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (data) => {
    console.log(data);
    const html = Mustache.render(messageTemplate, {
        username: data.username,
        message: data.text,
        createdAt: moment(data.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    // Disable the button after send data
    $messageFormButton.setAttribute('disabled', 'disabled')

    // const msg = document.querySelector('#message').value
    const msg = e.target.elements.message.value

    // console.log(msg);
    // socket.emit('sendMessage', msg)
    // for sending acknowledgement we pass third argument in the .emit() method
    socket.emit('sendMessage', msg, (err) => {
        // Enable Button
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (err) {
            return console.log(err);
        }
        console.log('Message Delivered!');
    })



})

socket.on('locationMessage', (url) => {
    console.log(url);
    const html = Mustache.render(locationMessageTemplate, {
        username: url.username,
        url: url.url,
        createdAt: moment(url.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({ room, users }) => {
    console.log(room, users);
    const html = Mustache.render(userTemplate, {
        room, users
    })
    document.querySelector('#sidebar').innerHTML = html
})

$locationButton.addEventListener('click', () => {

    if (!navigator.geolocation) {
        alert('Geoloction is not supported by your Browser')
    }
    $locationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            long: position.coords.longitude
        }, (err) => {
            $locationButton.removeAttribute('disabled')
            if (err) {
                return console.log(err);
            }
            console.log('Location Shared!');
        })
    })
})

// Join method is use for joining particular socket connection
socket.emit('join', { username, room }, (err) => {
    if (err) {
        alert(err)
        location.href = '/'
    }
})

