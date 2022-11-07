
const distanceTab = {
    resultFourHundredMeters: 0.4,
    resultOneKilolemeter: 1,
    resultThreeKilolemeters: 3,
    resultFiveKilolemeters: 5,
    resultTenKilolemeters: 10,
    resultFifteenKilolemeters: 15,
    resultTwentyKilolemeters: 20,
    resultHalfMarathon: 21.1,
    resultMarathon: 42.195,
}

const minutesUnity = 'min'
const secondsUnity = 'sec'

document.getElementById("speed").addEventListener("input", (e) => {
    const userTyping = verificationDatas(e.target.value)
    
    if(userTyping === null) {
        document.getElementById("error").classList.add("active")
    } else {
        document.getElementById("error").classList.remove("active")
    }

    if(e.target.value !== "") {
        document.getElementById("speedForm").classList.add("active-input")
        document.getElementById("speed").classList.add("active-input")
    } else if(e.target.value === "") {
        document.getElementById("speedForm").classList.remove("active-input")
        document.getElementById("speedTable").classList.remove("active")
        document.getElementById("error").classList.remove("active")
    }
    
})

document.getElementById("button").addEventListener("click", (e) => {
    e.preventDefault
    const speedUser = document.getElementById("speed").value
    const speedUserValidate = verificationDatas(speedUser)
    
    if(speedUserValidate === null) {
        alert('Entrez seulement des chiffres !!!')
        return
    } 
    
    timeCalculator(speedUser)
    document.getElementById("speedTable").classList.add("active")
    
})

const verificationDatas = (userDatas) => {
    const regex = /^\d+$|[\.\,]/g
    const found =  userDatas.match(regex)

    return found
}

const timeCalculator = (speedUser) => {
    let speed = speedUser.replace("\,", ".")

    for(const [idDomElement, distance] of Object.entries(distanceTab)) {
        let timeOnCourse = (distance/speed)*60
        const [hours, minutes, seconds] = convertTime(timeOnCourse)
        
        document.getElementById(`${idDomElement}`).innerText = `${hours}h ${minutes}min ${seconds}sec`
        
        if(hours === 0) {
            document.getElementById(`${idDomElement}`).innerText = `${minutes}min ${seconds}sec`
        }
        if(seconds === 0) {
            document.getElementById(`${idDomElement}`).innerText = `${hours}h ${minutes}min`
        } 
        if (seconds === 0 && hours === 0) {
            document.getElementById(`${idDomElement}`).innerText = `${minutes}min`
        }
        if (minutes === 0 && seconds === 0) {
            document.getElementById(`${idDomElement}`).innerText = `${hours}h`
        }
    }
}

const convertTime = (timeRaw) => {
    const hoursRaw = timeRaw/60
    const hours = Math.floor(hoursRaw)
    const minutesRaw = (hoursRaw - hours)*60
    const minutes = Math.floor(minutesRaw)
    const secondsraw = (minutesRaw - minutes)*60
    const seconds = Math.floor(secondsraw)
    
    return [Number(hours), Number(minutes), Number(seconds)]
}