const screen = document.querySelector('.screen'),
    time = document.querySelector('.time'),
    score = document.querySelector('.score'),
    maxScore = document.querySelector('.score-max'),
    startGameButton = document.querySelector('.start-game'),
    pauseGameButton = document.querySelector('.pause-game'),
    snakeTails = document.querySelectorAll('.snake-tail'),
    apple = document.querySelector('.apple')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // n in [min, max)
}

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        snake[i].obj.style.gridColumnStart = '' + snake[i].x
        snake[i].obj.style.gridRowStart = '' + snake[i].y
    }
}

function drawApples() {
    food.obj.style.gridColumnStart = '' + food.x
    food.obj.style.gridRowStart = '' + food.y
}



function loop() {
    // change direction
    window.addEventListener('keydown', e => {
        e.preventDefault()
        if (e.key == "ArrowRight") {
            stepX = 1
            stepY = 0
        }
    })
    window.addEventListener('keydown', e => {
        e.preventDefault()
        if (e.key == "ArrowLeft") {
            stepX = -1
            stepY = 0
        }
    })
    window.addEventListener('keydown', e => {
        e.preventDefault()
        if (e.key == "ArrowDown") {
            stepY = 1
            stepX = 0
        }
    })
    window.addEventListener('keydown', e => {
        e.preventDefault()
        if (e.key == "ArrowUp") {
            stepY = -1
            stepX = 0
        }
    })
    // movement
    prevX = snake[0].x
    prevY = snake[0].y
    snake[0].x += stepX
    snake[0].y += stepY
    let tempX, tempY
    for (let i = 1; i < snake.length; i++) {
        tempX = snake[i].x
        tempY = snake[i].y
        snake[i].x = prevX
        snake[i].y = prevY
        prevX = tempX
        prevY = tempY
    }
    drawSnake()
    // game over
    if (snake[0].x === 20 || snake[0].x === 0 || snake[0].y === 15 || snake[0].y === 0) {
        clearInterval(interval)
    }
    if (snake[0].x === snake[1].x && snake[0].y === snake[1].y) {
        snake[0].x = prevX
        snake[0].y = prevY

    }
    //  food && add new tail
    if (snake[0].x === food.x && snake[0].y === food.y) {
        let newTail = document.createElement('div')
        newTail.classList.add('snake-tail')
        let snakeTail = {
            obj: newTail,
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y,
        }
        snake.push(snakeTail)
        snake[snake.length - 1].obj.style.gridColumnStart = '' + snake[snake.length - 1].x
        snake[snake.length - 1].obj.style.gridRowStart = '' + snake[snake.length - 1].y
        screen.appendChild(newTail)
        food.x = getRandomInt(1, 20)
        food.y = getRandomInt(1, 15)
        let isOnSnake = false
        for (let i = 0; i < snake.length; i++) {
            if (food.x === snake[i].x && food.y === snake[i].y) {
                isOnSnake = true
            }
            if (isOnSnake) {
                food.x = getRandomInt(1, 20)
                food.y = getRandomInt(1, 15)
                isOnSnake = false
            }
        }
        drawApples()
        score.textContent = snake.length
    }
}

let map = new Array(15)
for (let i = 0; i < 10; i++) {
    map[i] = new Array(20)
}
screen.style.display = 'grid'
screen.style.gridTemplateColumns = 'repeat(20, 1fr)'
screen.style.gridTemplateRows = 'repeat(15, 1fr)'
// snake settings
let snake = []
let originSnake = []
snakeTails.forEach(e => {
    let snakeTail = {
        obj: e,
        x: 0,
        y: 0
    }
    snake.push(snakeTail)
    originSnake.push(snakeTail)
})
snake[0].x = 5
snake[0].y = 10
for (let i = 1; i < snake.length; i++) {
    snake[i].x = snake[i - 1].x - 1
    snake[i].y = snake[i - 1].y
}
let stepX = 1
let stepY = 0
let slow = 300
let prevX, prevY, lastY, lastX
drawSnake()
//apple settings
let food = {
    obj: apple,
    x: getRandomInt(1, 20),
    y: getRandomInt(1, 15)
}
drawApples()
score.textContent = snake.length

let interval = setInterval(loop, 100)