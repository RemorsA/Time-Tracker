<template>
    <v-app>
        <v-container fluid class="container">

            <TableComponent
                :cards="cards"
                @dialog="dialog = true"
                @clearCards="clearCards"
                @searchCard="searchCard"
                @editCard="editCard"
                @deleteCard="deleteCard"
            />

            <v-dialog
                v-model="dialog"
                hide-overlay
                transition="dialog-top-transition"
                fullscreen
            >
                <v-card dark>

                    <v-container class="container">
                        <v-text-field
                            hint="Название"
                            outlined
                            clearable
                            v-model="name"
                            :rules="[() => !!name || 'Поле обязательно']"
                            ref="name"
                        />

                        <v-textarea
                            outlined
                            hint="Описание задачи"
                            rows="20"
                            clearable
                            no-resize
                            v-model="description"
                            :rules="[() => !!description || 'Поле обязательно']"
                            ref="description"
                        />
                    </v-container>

                    <v-container class="container">
                        <v-card-actions>
                            <v-col cols="2">
                                <v-btn dark @click="saveUpdateCard">
                                    <v-icon
                                        color="blue"
                                        v-if="!vs_save"
                                    >mdi-content-save</v-icon>
                                    <v-icon
                                        color="blue"
                                        v-else
                                    >mdi-content-save-edit</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="2">
                                <v-btn dark @click="clear">
                                    <v-icon color="yellow">mdi-reload</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="2">
                                <v-btn dark @click="playPause">
                                    <v-icon
                                        v-if="!vs_play"
                                        color="green"
                                    >mdi-play</v-icon>
                                    <v-icon
                                        v-else
                                        color="green"
                                    >mdi-pause</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="4">
                                <p style="font-size: 20px; color: white;">
                                    {{this.hour}}.ч
                                    {{this.min}}.м
                                    {{this.sec}}.с
                                </p>
                            </v-col>
                            <v-col cols="1">
                                <v-btn color="red" @click="closeModal">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </v-col>
                        </v-card-actions>
                    </v-container>

                </v-card>
            </v-dialog>

        </v-container>
    </v-app>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue'

export default {
    components: { TableComponent },

    data() {
        return {
            dialog: false,
            cards: [],
            vs_save: false,
            vs_play: false,
            name: '',
            description: '',
            hour: 0,
            min: 0,
            sec: 0,
            interval: 0,
            update_form: {
                name: '',
                description: '',
                date: '',
                time: '',
                id: ''
            }
        }
    },

    methods: {
        deleteCard(card) {
            this.cards.forEach((el, index) => {
                if (el.id === card.id) {
                    this.cards.splice(index, 1)
                }
            })
        },
        editCard(card) {
            this.name = card.name
            this.description = card.description
            this.hour = card.time.split('.')[0]
            this.min = card.time.split('.')[1]
            this.sec = card.time.split('.')[2]

            this.update_form.name = card.name
            this.update_form.description = card.description
            this.update_form.date = card.date
            this.update_form.time = card.time
            this.update_form.id = card.id

            this.vs_save = true
            this.dialog = true
        },
        saveUpdateCard() {
            if (!this.vs_save) {

                if(!this.name || !this.description) {
                    Object.keys(this.$refs).forEach(f => {
                        this.$refs[f].validate(true)
                    })

                    console.log(this.$refs)
                    return
                }

                let date = new Date()
                date = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()

                let data = {
                    id: Math.random().toString().slice(2),
                    name: this.name,
                    description: this.description,
                    date: date,
                    time: this.hour + '.' + this.min + '.' + this.sec
                }

                this.cards.push(data)

            } else {
                this.deleteCard(this.update_form)

                let data_update = {
                    id: this.update_form.id,
                    name: this.name,
                    description: this.description,
                    date: this.update_form.date,
                    time: this.hour + '.' + this.min + '.' + this.sec
                }

                this.cards.push(data_update)
            }

            this.cards.reverse()
            this.dialog = false
            this.clear()
            this.setLocalStorage()
        },
        playPause() {
            if (this.vs_play) {

                this.vs_play = false
                clearInterval(this.interval)
                this.getDefaultTitle()

            } else {

                this.vs_play = true
                this.interval = setInterval(this.start, 60)

            }
        },
        clear() {
            this.getDefaultTitle()
            clearInterval(this.interval)
            this.name = ''
            this.description = ''
            this.hour = 0
            this.min = 0
            this.sec = 0
            this.vs_save = false
            this.vs_play = false
            this.$refs.name.reset()
            this.$refs.description.reset()
        },
        start() {
            this.sec++
            document.title = this.hour + ':' + this.min + ':' + this.sec
            if (this.sec > 59) {
                this.min++
                this.sec = 0
            }
            if (this.min > 59) {
                this.hour++
                this.min = 0
            }
            if (this.hour > 24) {
                clearInterval(this.interval)
            }
        },
        closeModal() {
            this.dialog = false
            this.clear()
        },
        clearCards() {
            this.cards = []
            this.setLocalStorage()
        },
        searchCard(value) {
            if (value) {
                this.getLocalStorage()
                this.cards = this.cards.filter(el => {
                    return el.name.toLowerCase().indexOf(value) !== -1
                })
            } else {
                this.getLocalStorage()
            }
        },
        setLocalStorage() {
            localStorage.setItem('cards', JSON.stringify(this.cards))
        },
        getLocalStorage() {
            if (JSON.parse(localStorage.getItem('cards')) !== null) {
                this.cards = JSON.parse(localStorage.getItem('cards'))
            }
        },
        getDefaultTitle() {
            document.title = 'Отслеживаине время работы'
        }
    },

    created() {
        this.getDefaultTitle()
        this.getLocalStorage()
    }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap')

#app
    background: #121212
    font-family: 'Montserrat', sans-serif

    // ::-webkit-scrollbar
    //     width: 5px

    // ::-webkit-scrollbar-track
    //     background-color: none

    // ::-webkit-scrollbar-thumb
    //     background: white
    //     border-radius: 5px

    .container
        max-width: 700px
</style>