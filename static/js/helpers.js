export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // n in [min, max)
}

export function setPositionOnHTML(elem) {
    elem.object.style.gridColumnStart = `${elem.x}`
    elem.object.style.gridRowStart = `${elem.y}`
}

export function compareScore(a, b) {
    if (a.score > b.score) {
        return -1   
    }
    if (a.score < b.score) {
        return 1   
    }

    return 0
}