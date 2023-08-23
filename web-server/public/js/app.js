const getWeather = (address) => {

}

const weatherForm = document.querySelector('form');
const address = document.querySelector('input')

const msg_1 = document.querySelector('#msg-1')
const msg_2 = document.querySelector('#msg-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = address.value
    // console.log(location);
    msg_1.textContent = 'Loading...';
    msg_2.textContent = '';

    fetch(`http://localhost:3003/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data?.error) {
                // console.log(data?.error);
                msg_1.textContent = data?.error;
                msg_2.textContent = '';
            }

            else {
                // console.log(data?.location);
                // console.log(data?.forecastData);
                msg_1.textContent = data?.location;
                msg_2.textContent = data?.forecastData
            }
        })
    })
})