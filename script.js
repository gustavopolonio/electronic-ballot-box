let yourVoteFor = document.querySelector(".d-1-1 span")
let office = document.querySelector(".d-1-2 span")
let numberWrite = document.querySelector(".number-write")
let description = document.querySelector(".d-1-4")
let photos = document.querySelector(".d-1-right")
let footer = document.querySelector(".d-2")
let numbers = document.querySelector(".d-1-3-numbers")

let number = ""
let currentStage = 0;
let whiteVote = false

let boxVotes = []

function initialStage() {
    let stage = stages[currentStage]
    let numberHTML = ""
    number = ""
    whiteVote = false

    for (let i = 0; i < stage.numbers; i++) {
        if (i === 0) {
            numberHTML += '<div class="number blink"></div>'
        } else {
            numberHTML += '<div class="number"></div>'
        }

    }

    yourVoteFor.innerHTML = ""
    office.innerHTML = stage.title
    numberWrite.style.opacity = 0
    description.innerHTML = ""
    photos.innerHTML = ""
    footer.style.display = "none"
    numbers.innerHTML = numberHTML
}

initialStage()

function updateInterface() {
    stage = stages[currentStage]
    for (let i = 0; i < stage.candidates.length; i++) {
        if (number === stage.candidates[i].number) {
            yourVoteFor.innerHTML = "SEU VOTO PARA"
            numberWrite.style.opacity = 1
            if (stage.candidates[i].vice) {
                description.innerHTML = `Nome: ${stage.candidates[i].name} <br/>Partido: ${stage.candidates[i].politicalParty} <br/> Vice: ${stage.candidates[i].vice}`
            } else {
                description.innerHTML = `Nome: ${stage.candidates[i].name} <br/>Partido: ${stage.candidates[i].politicalParty}`
            }
            footer.style.display = "block"
            let photoHTML = ""
            for (let x in stage.candidates[i].photos) {
                if (stage.candidates[i].photos[x].small) {
                    photoHTML += `<div class="d-1-image small"><img src="${stage.candidates[i].photos[x].url}" alt="image candidate">${stage.candidates[i].photos[x].legend}</div>`
                } else {
                    photoHTML += `<div class="d-1-image"><img id="mayor-image" src="${stage.candidates[i].photos[x].url}" alt="image candidate">
                    ${stage.candidates[i].photos[x].legend}</div>`
                }
            }
            photos.innerHTML = photoHTML
            break
        } else {
            yourVoteFor.innerHTML = "SEU VOTO PARA"
            numberWrite.style.opacity = 1
            description.innerHTML = `NÚMERO ERRADO <br/> <br/><div class="null-vote blink">VOTO NULO</div>`
            footer.style.display = "block"
        }
    }
}

function clicked(num) {
    let elNumber = document.querySelector(".number.blink")
    if (elNumber !== null) {
        elNumber.innerHTML = num
        number = `${number}${num}` // concatenate the info

        elNumber.classList.remove("blink")
        elNumber = elNumber.nextElementSibling
        if (elNumber !== null) {
            elNumber.classList.add("blink")
        } else {
            updateInterface()
        }
    }
}

function white() {
    if (number === "") {
        whiteVote = true
        yourVoteFor.innerHTML = "SEU VOTO PARA"
        footer.style.display = "block"
        description.innerHTML = `<div class="null-vote blink">VOTO EM BRANCO</div>`
        numbers.innerHTML = ""
    } else {
        alert(`To BLANK your vote the vote field must be empty. Press CORRECT to delete the vote field.`)
    }
}

function correct() {
    initialStage()
}

function confirm() {
    stage = stages[currentStage]
    if (number.length === stage.numbers || whiteVote === true) {
        if (whiteVote) {
            boxVotes.push({
                title: stage.title,
                vote: "in blank"
            })
        } else {
            boxVotes.push({
                title: stage.title,
                vote: number
            })
        }
        currentStage++
        if (currentStage >= stages.length) {
            yourVoteFor.innerHTML = ""
            office.innerHTML = ""
            numberWrite.style.opacity = 0
            description.innerHTML = `<div class="end-vote blink">FIM</div>`
            photos.innerHTML = ""
            footer.style.display = "none"
            numbers.innerHTML = ""

            setInterval(() => {
                location = location
            }, 2500)

        } else {
            initialStage()

        }
    }
    console.log(boxVotes)
}


let btnCityCouncilor = document.querySelector("#city-councilor")
let btnMayor = document.querySelector("#mayor")
let availableCandidates = document.querySelector(".available-candidates")
let mayor = false
let councilor = false

availableCandidates.innerHTML = ""

btnCityCouncilor.addEventListener("click", () => {
    councilor = true
    if (availableCandidates.innerHTML === "" || mayor) {
        availableCandidates.innerHTML = ""
        for (let i = 0; i < stages[0].candidates.length; i++) {
            availableCandidates.innerHTML += `<div class="candidate"><h2>Name: ${stages[0].candidates[i].name}</h2><h2>Number: ${stages[0].candidates[i].number}</h2></div>`
        }
        mayor = false
    } else {
        availableCandidates.innerHTML = ""
    }
})

btnMayor.addEventListener("click", () => {
    mayor = true
    if (availableCandidates.innerHTML === "" || councilor) {
        availableCandidates.innerHTML = ""
        for (let i = 0; i < stages[1].candidates.length; i++) {
            availableCandidates.innerHTML += `<div class="candidate"><h2>Name: ${stages[1].candidates[i].name}</h2><h2>Number: ${stages[1].candidates[i].number}</h2></div>`
        }
        councilor = false
    } else {
        availableCandidates.innerHTML = ""
    }
})
