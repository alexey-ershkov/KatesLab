const timeField = document.getElementById('timeField')
const startTime = new Date(timeField.getAttribute('startTime'))

const updTime = () => {
    let diff = Math.abs(Date.now() - startTime)
    let hours = Math.floor(diff / 3600000)
    let mins = Math.floor((diff - hours * 3600000)/60000)
    let secs = Math.floor((diff - hours * 3600000 - mins*60000)/1000)


    timeField.textContent = `${hours}:${(mins>9 ? '' : '0')}${mins}:${(secs>9 ? '' : '0')}${secs}`
}
updTime()
setInterval(updTime, 1000)
