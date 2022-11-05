export class form{
    constructor() {
        this.id = Math.random().toString().slice(2),
        this.name = '',
        this.description = '',
        this.date = new Date(),
        this.hour = 0
        this.min = 0
        this.sec = 0
    }

    setFormData(card) {
        this.id = card.id
        this.name = card.name
        this.description = card.description
        this.date = card.date
        this.hour = card.hour
        this.min = card.min
        this.sec = card.sec
    }
}