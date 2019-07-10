console.log('Client side JS file is loaded ')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'Enter a location!'
messageTwo.textContent = ""

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    fetch(`/weather?address=${location}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ' '
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        }) 
})