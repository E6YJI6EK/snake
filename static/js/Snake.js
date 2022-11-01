import { setPositionOnHTML } from './helpers.js'
import { playSound, actions } from "./sound.js"

class Snake {
    #snakeTails = []
    #cnt = 0
    constructor(snakeTailsRef, x, y) {
        snakeTailsRef.forEach(e => {
            let snakeTail = new SnakeTail(e, x - this.#cnt, y, this.#cnt)
            this.#cnt++
            this.#snakeTails.push(snakeTail)
        })
    }

    #addNewTail(gameAreaRef) {
        let newTailRef = document.createElement('div')
        newTailRef.classList.add('snake-tail')
        let snakeTail = new SnakeTail(newTailRef, this.#snakeTails[this.#snakeTails.length - 1].x, this.#snakeTails[this.#snakeTails.length - 1].y, this.#cnt)
        this.#cnt++
        this.#snakeTails.push(snakeTail)
        setPositionOnHTML(this.#snakeTails[this.#snakeTails.length - 1])
        gameAreaRef.appendChild(snakeTail.object)
    }

    draw() {
        for (let i = 0; i < this.#snakeTails.length; i++) {
            setPositionOnHTML(this.#snakeTails[i])
        }
    }

    move(stepX, stepY) {
        let prevX = this.#snakeTails[0].x
        let prevY = this.#snakeTails[0].y
        this.#snakeTails[0].x += stepX
        this.#snakeTails[0].y += stepY
        let tempX, tempY
        this.#snakeTails.forEach(tail => {
            if (tail.index != 0) {
                tempX = tail.x
                tempY = tail.y
                tail.x = prevX
                tail.y = prevY
                prevX = tempX
                prevY = tempY
            }
        })
        this.draw()
    }

    isAteApple(gameAreaRef, apple, xLimit, yLimit) {
        if (this.#snakeTails[0].x === apple.x && this.#snakeTails[0].y === apple.y) {
            playSound(actions.eating)
            this.#addNewTail(gameAreaRef)
            apple.respawnApple(this.#snakeTails, xLimit, yLimit)
            return true
        }
        return false
    }

    isCrashedIntoWall(xLimit, yLimit) {
        if (this.#snakeTails[0].x === xLimit + 1 || this.#snakeTails[0].x === 0 || this.#snakeTails[0].y === yLimit + 1 || this.#snakeTails[0].y === 0) {
            playSound(actions.death)
            return true
        }
        return false
    }

    isAteSelf() {
        let isDead = false
        this.#snakeTails.forEach(tail => {
            if (tail.index != 0 && tail.x === this.#snakeTails[0].x && tail.y === this.#snakeTails[0].y) {
                playSound(actions.death)
                isDead = true
            }
        })
        return isDead
    }
}

class SnakeTail {
    #object
    x
    y
    #index
    constructor(object, x, y, index) {
        this.#object = object
        this.x = x
        this.y = y
        this.#index = index
    }

    get index() {
        return this.#index
    }

    get object() {
        return this.#object
    }
}

export default Snake