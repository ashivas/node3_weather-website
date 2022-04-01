
/* fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector("input")

const errorContainer = document.querySelector("#error")
errorContainer.textContent=''
const weatherContainer = document.querySelector("#location")
weatherContainer.textContent=''
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    errorContainer.textContent='loading...'
    weatherContainer.textContent=''
    const location = search.value
    fetch(`http://localhost:3000/weather?address= + ${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                errorContainer.textContent=data.error
            } else {
                errorContainer.textContent=''
                weatherContainer.textContent=data.location
                weatherContainer.textContent=data.forecast
                console.log(data)
            }
        })
    })
})
