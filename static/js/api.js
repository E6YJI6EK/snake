const dbURL = 'https://snakeataase.herokuapp.com'

export function getPlayers(mode) {
    return fetch(`${dbURL}/players?q=${mode}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    })
}

export function postPlayer(newRecord) {
    return fetch(`${dbURL}/players`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecord)
    })
}

export function deletePlayer(id) {
    return fetch(`${dbURL}/players/${id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
    })
}