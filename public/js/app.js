const watherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')
const msgThr = document.querySelector('#msg-3')
const msgFou = document.querySelector('#msg-4')
const msgFiv = document.querySelector('#msg-5')

watherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''
    msgThr.textContent = ''
    msgFou.textContent = ''
    msgFiv.textContent = ''

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = 'Temperature: ' + data.temp + ' C';
                msgThr.textContent = 'Weather:     ' + data.weather;
                msgFou.textContent = 'Wind: ' + data.wind + ' m/s';
                msgFiv.textContent = 'Humidity: ' + data.humidity + '%';
            }
        })
    })
})

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })