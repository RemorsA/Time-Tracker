export function setLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
}

export function getLocalStorage() {
    return JSON.parse(localStorage.getItem('cards'))
}

export function getDefaultTitle() {
    document.title = 'Отслеживаине время работы'
}

export function showAlert() {
    
}

export function parseDate(date) {
    return ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
}