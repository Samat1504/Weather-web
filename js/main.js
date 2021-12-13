let tempBlock = document.querySelector('#temp')
let cityBlock = document.querySelector('#city')
let imgBlock = document.querySelector('.weather-img')
let update_date = document.querySelector('#update-date')
let local_date = document.querySelector('#local-date')
let searchInp = document.querySelector('.search')

setInterval(() => {
    let date = new Date;
    local_date.textContent = `Local time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}, 1000)

let city = 'Bishkek'

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        let value = searchInp.value;
        if(!value) return false;
        city = value;
        init()
        searchInp.value = ''
    }
})

function init() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d982b206b7125a363d94918d08ebf560`)
    .then((resp) => {return resp.json()})
    .then((data) => {

        tempBlock.textContent = `${temperature()}°`

        cityBlock.textContent = `City: ${data.name}`

        // console.log()

        function temperature() {
            let getTemp = data.main.temp
            let tempC = Math.floor(getTemp) - 273
            return tempC
        }

        let date = new Date;

        update_date.textContent = `Update time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

        // console.log('перезапуск')
    })
    .catch(() => {
        alert('Wrong city name!')
        city = 'Bishkek';
        init()
        searchInp.value = ''
    })
}

init()

setInterval(() => {
    init()
}, 10000)


