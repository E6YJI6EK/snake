const container = document.querySelector('.container'),
startGameButton = container.querySelector('.start-game')


startGameButton.addEventListener('click', () => {
    const difficultChoices = container.querySelectorAll('input'),
        velocities = [300, 200, 100]
    difficultChoices.forEach(e => {
        e.disabled = true
    })

    startGameButton.remove()

    container.insertAdjacentHTML('beforebegin', 
    `
    <div class="screen">
          <div class="snake-tail"></div>
          <div class="snake-tail"></div>
          <div class="snake-tail"></div>
          <div class="apple"></div>
      </div>
      <div class="panel">
        <h1 class="score">Score: </h1>
      </div>
    `)

    function setDifficult() {
        for (let i = 0; i < difficultChoices.length; i++) {
            if (difficultChoices[i].checked) {
                return velocities[i]
            }
        }
    }

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

    function changeDirection(event) {
        event.preventDefault()
        if (event.key == "ArrowRight" && direction !== 'left') {
            stepX = 1
            stepY = 0
            direction = 'right'
        }
        if (event.key == "ArrowLeft" && direction !== 'right') {
            stepX = -1
            stepY = 0
            direction = 'left'
        }
        if (event.key == "ArrowDown" && direction !== 'up') {
            stepY = 1
            stepX = 0
            direction = 'down'
        }
        if (event.key == "ArrowUp" && direction !== 'down') {
            stepY = -1
            stepX = 0
            direction = 'up'
        }
    }

    function gameOver() {
        gameArea.remove()
        panel.insertAdjacentHTML('beforeend', `<button class="reset-game">Restart</button>`)
        btn = panel.querySelector('button')
        btn.addEventListener('click', () => {
            location.reload()
        })
    }

    function loop() {
        // change direction
        window.addEventListener('keydown', e => {
            changeDirection(e)
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
        // wall collision
        if (snake[0].x === xLimit+1 || snake[0].x === 0 || snake[0].y === yLimit+1 || snake[0].y === 0) {
            clearInterval(interval)
            gameOver()
        }
        // selfeating
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                clearInterval(interval)
                gameOver()
            }
        }
        //  eat food 
        if (snake[0].x === food.x && snake[0].y === food.y) {
            // inc score
            scoreCount++
            // create new tail
            let newTail = document.createElement('div')
            newTail.classList.add('snake-tail')
            let snakeTail = {
                obj: newTail,
                x: snake[snake.length - 1].x,
                y: snake[snake.length - 1].y,
            }
            // add new tail 
            snake.push(snakeTail)
            snake[snake.length - 1].obj.style.gridColumnStart = '' + snake[snake.length - 1].x
            snake[snake.length - 1].obj.style.gridRowStart = '' + snake[snake.length - 1].y
            gameArea.appendChild(newTail)
            food.x = getRandomInt(1, xLimit)
            food.y = getRandomInt(1, yLimit)
            // if food spwn in the snake
            let isInSnake = false
            for (let i = 0; i < snake.length; i++) {
                if (food.x === snake[i].x && food.y === snake[i].y) {
                    isInSnake = true
                }
                if (isInSnake) {
                    food.x = getRandomInt(1, xLimit)
                    food.y = getRandomInt(1, yLimit)
                    isInSnake = false
                }
            }
            drawApples()
            // output score
            score.textContent = `Score: ${scoreCount}`
        }
    }

    // global variables for interface
    const gameArea = document.querySelector('.screen'),
        panel = document.querySelector('.panel'),
        score = document.querySelector('.score'),
        snakeTails = document.querySelectorAll('.snake-tail'),
        apple = document.querySelector('.apple'),
        xLimit = 20,
        yLimit = 10,
        speed = setDifficult()
    // global variables for movement
    let stepX = 1,
        stepY = 0,
        prevX, prevY, 
        direction = 'right',
        scoreCount = 0


    // map settings
    let map = new Array(yLimit)
    for (let i = 0; i < yLimit; i++) {
        map[i] = new Array(xLimit)
    }
    gameArea.style.gridTemplate = `repeat(${yLimit}, 1fr) / repeat(${xLimit}, 1fr)`
    // snake settings
    let snake = []
    snakeTails.forEach(e => {
        let snakeTail = {
            obj: e,
            x: 0,
            y: 0
        }
        snake.push(snakeTail)
    })
    snake[0].x = 5
    snake[0].y = 10
    for (let i = 1; i < snake.length; i++) {
        snake[i].x = snake[i - 1].x - 1
        snake[i].y = snake[i - 1].y
    }
    drawSnake()
    //apple settings
    let food = {
        obj: apple,
        x: getRandomInt(1, xLimit),
        y: getRandomInt(1, yLimit)
    }
    drawApples()
    // output score
    score.textContent = `Score: ${scoreCount}`

    let interval = setInterval(loop, speed)
})