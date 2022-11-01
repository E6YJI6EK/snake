const audio = new Audio()

export const actions = {
    "death": '../assets/sfx/death.mp3',
    "eating": '../assets/sfx/eating.mp3'
}

export function playSound(src) {
    audio.src = src
    audio.play()
}