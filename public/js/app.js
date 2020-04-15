const watherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

watherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msgOne.textContent = data.error;
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data)
//     })
// })