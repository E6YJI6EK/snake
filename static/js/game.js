import Apple from './Apple.js'
import Snake from './Snake.js'
import { setDifficulty, createMap, gameOver, changeDirection, printScore } from './gameSettings.js'

const container = document.querySelector('.container'),
    startGameButton = container.querySelector('.start-game'),
    gameAreaRef = document.querySelector('.screen'),
    panelRef = document.querySelector('.panel')

startGameButton.addEventListener('click', () => {
    const difficultyChoices = container.querySelectorAll('input')
    difficultyChoices.forEach(e => {
        e.disabled = true
    })

    startGameButton.remove()

    gameAreaRef.classList.remove('hidden')
    panelRef.classList.remove('hidden')

    // global variables for interface 
    const scoreRef = document.querySelector('.score'),
        snakeTailsRef = document.querySelectorAll('.snake-tail'),
        appleRef = document.querySelector('.apple'),
        xLimit = 20,
        yLimit = 10
    let scoreCount = 0
    // global variables for movement
    const [speed, mode] = [...setDifficulty(difficultyChoices)]
    let stepX = 1,
        stepY = 0,
        direction = 'right'


    // map settings
    let map = createMap(gameAreaRef, xLimit, yLimit)
    // snake settings
    let snake = new Snake(snakeTailsRef, 5, 10)
    snake.draw()
    //apple settings
    let apple = new Apple(appleRef, xLimit, yLimit)
    apple.draw()
    // output score
    printScore(scoreRef, scoreCount)


    let interval = setInterval(function loop() {
        // change direction
        window.addEventListener('keydown', e => {
            [stepX, stepY, direction] = [...changeDirection(e, direction)]
        })
        // movement
        snake.move(stepX, stepY)
        // wall collision or selfeating
        if (snake.isCrashedIntoWall(xLimit, yLimit) || snake.isAteSelf()) {
            clearInterval(interval)
            setTimeout(() => {
                gameOver(gameAreaRef, panelRef, mode, scoreCount)
            }, 1000)
        }
        //  eat apple 
        if (snake.isAteApple(gameAreaRef, apple, xLimit, yLimit)) {
            scoreCount++
            printScore(scoreRef, scoreCount)
        }
    }, speed)
})