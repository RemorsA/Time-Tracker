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