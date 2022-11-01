import { getRandomInt, setPositionOnHTML } from './helpers.js'

class Apple {
    #object
    #x
    #y
    constructor(object, xLimit, yLimit) {
        this.#object = object
        this.#x = getRandomInt(1, xLimit)
        this.#y = getRandomInt(1, yLimit)
    }

    draw() {
        setPositionOnHTML(this)
    }

    respawnApple(snake, xLimit, yLimit) {
        this.#x = getRandomInt(1, xLimit)
        this.#y = getRandomInt(1, yLimit)
        // if apple spawn in the snake
        let isInSnake = false
        snake.forEach(tail => {
            if (this.#x === tail.x && this.#y === tail.y) {
                isInSnake = true
            }
            if (isInSnake) {
                this.#x = getRandomInt(1, xLimit)
                this.#y = getRandomInt(1, yLimit)
                isInSnake = false
            }
        })
        this.draw()
    }

    get object() {
        return this.#object
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }
}

export default Apple