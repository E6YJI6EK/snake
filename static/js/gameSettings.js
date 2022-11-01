import { compareScore } from "./helpers.js"
import { deletePlayer, getPlayers, postPlayer } from "./api.js"

const leadersTable =
    `
        <h1 class="leaders-title" ></h1>
        <p class="leaders-subtitle"></p>
        <table class="leaders">
            <tr>
                <td>#</td>
                <td>Nickname</td>
                <td>Record</td>
            </tr>
        </table>
        `

export function createMap(gameAreaRef, xLimit, yLimit) {
    let map = new Array(yLimit)
    for (let i = 0; i < yLimit; i++) {
        map[i] = new Array(xLimit)
    }
    gameAreaRef.style.gridTemplate = `repeat(${yLimit}, 1fr) / repeat(${xLimit}, 1fr)`

    return map
}

export function setDifficulty(difficultyChoices) {
    const velocities = [300, 200, 100]
    const modes = ["Easy", "Medium", "For Brutals"]
    for (let i = 0; i < difficultyChoices.length; i++) {
        if (difficultyChoices[i].checked) {
            return [velocities[i], modes[i]]
        }
    }
}

export function changeDirection(event, direction) {
    if (event.key == "ArrowRight" && direction !== 'left') {
        return [1, 0, 'right']
    }
    if (event.key == "ArrowLeft" && direction !== 'right') {
        return [-1, 0, 'left']
    }
    if (event.key == "ArrowDown" && direction !== 'up') {
        return [0, 1, 'down']
    }
    if (event.key == "ArrowUp" && direction !== 'down') {
        return [0, -1, 'up']
    }

}

export async function gameOver(gameAreaRef, panelRef, mode, score) {
    let leadersCount = 0
    let sameRecordID = ''

    await getPlayers(mode)
        .then(response => {
            return response.json()
        })
        .then((data) => {
            gameAreaRef.remove()

            panelRef.insertAdjacentHTML('afterbegin', leadersTable)

            let tableTitle = document.querySelector('.leaders-title')
            tableTitle.textContent = `Top ${data.length}`

            let tableSubtitle = document.querySelector('.leaders-subtitle')
            tableSubtitle.textContent = `Mode: ${mode}`

            let leaders = document.querySelector('.leaders')
            data.sort(compareScore).forEach(element => {
                leadersCount++
                leaders.insertAdjacentHTML('beforeend', `
            <tr>
                <td>${leadersCount}</td>
                <td>${element.name}</td>
                <td>${element.score}</td>
            </tr>
            `)
                if (score >= element.score && !sameRecordID) {
                    sameRecordID = element.id
                }
            })
        })
    let nicknameInput = document.createElement('input')
    nicknameInput.placeholder = 'Enter your name'
    nicknameInput.required = true
    nicknameInput.classList.add('nickname-input')

    let btn = document.createElement('button')
    btn.textContent = 'Restart'
    btn.classList.add('reset-game')

    panelRef.append(nicknameInput)
    panelRef.append(btn)

    let modal = document.querySelector('.modal-outer')
    btn.addEventListener('click', () => {
        if (nicknameInput.value) {
            let newRecord = {
                id: new Date().valueOf(),
                name: nicknameInput.value,
                score: score,
                mode: mode
            }

            if (leadersCount < 10) {
                postPlayer(newRecord)
                    .then(response => {
                        location.reload()
                    })
            } else {
                if (sameRecordID) {
                    deletePlayer(sameRecordID)
                        .then(response => { })
                    postPlayer(newRecord)
                        .then(response => {
                            location.reload()
                        })
                }
                location.reload()
            }


        } else {
            modal.classList.remove('hidden')

            let yesButton = document.querySelector('.yes')
            yesButton.addEventListener('click', () => {
                location.reload()
            })

            let noButton = document.querySelector('.no')
            noButton.addEventListener('click', () => {
                modal.classList.add('hidden')
            })
        }
    })
}

export function printScore(scoreRef, scoreCount) {
    scoreRef.textContent = `Score: ${scoreCount}`
}