
/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector("input")

const errorContainer = document.querySelector("#error")
const weather_image = document.querySelector("#weather-image")
errorContainer.textContent=''
const weatherContainer = document.querySelector("#location")
weatherContainer.textContent=''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorContainer.textContent='loading...'
    weatherContainer.textContent=''
    weather_image.src = ''
    const location = search.value
    fetch(`http://localhost:3000/weather?address= + ${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                errorContainer.textContent=data.error
            } else {
                errorContainer.textContent=''
                weatherContainer.innerHTML= data.location + '<br>' + data.forecast
                weather_image.src = textContent=data.url
                console.log(data)
            }
        })
    })
})
