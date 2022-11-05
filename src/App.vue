<template>
    <v-app>
        <v-container fluid class="container">

            <TableComponent
                :cards="cards"
                @dialog="openDialog"
                @editCard="editCard"
                @searchCard="searchCard"
                @clearCards="showAlertClear"
                @deleteCard="showAlertDelete"
            />

            <DialogComponent
                :dialog="dialog"
                :vs_save="vs_save"
                :vs_play="vs_play"
                :form="form"
                
                @closeDialog="closeDialog"
                @saveUpdateCard="saveUpdateCard"
                @playPause="playPause"
            />

            <DialogAlertComponent
                :dialog_alert_form="dialog_alert_form"
                @dialogAlertClose="dialog_alert_form.dialog_alert = false"
                @clearCards="clearCards"
                @deleteCard="deleteCard"
            />

            <v-alert
                :type="response.type"
                v-model="response.show"
            >{{ response.message }}</v-alert>

        </v-container>
    </v-app>
</template>

<style lang="sass">@import '@/assets/style.sass'</style>

<script>
import TableComponent from '@/components/TableComponent.vue'
import DialogComponent from '@/components/DialogComponent.vue'
import DialogAlertComponent from '@/components/DialogAlertComponent.vue'
import { getDefaultTitle, setLocalStorage, getLocalStorage, parseDate } from '@/lib/scripts'
import { form } from "@/lib/form"

export default {
    components: {
        TableComponent,
        DialogComponent,
        DialogAlertComponent
    },

    data() {
        return {
            dialog: false,
            vs_save: false,
            vs_play: false,
            cards: [],
            interval: 0,
            form: new form(),

            dialog_alert_form: {
                dialog_alert: false,
                message: '',
                mode: '',
                item: {}
            },
            response: {
                message: 'Запись редактированна',
                show: false,
                type: ''
            }
        }
    },

    methods: {
// SAVE UPDATE //
        saveUpdateCard() {
            if (!this.vs_save) {
                this.form.date = parseDate(this.form.date)
                this.cards.push(this.form)

                this.showAlert(
                    'Запись добавлена',
                    true,
                    'success'
                )
            } else {
                this.spliceCard(this.form)
                this.cards.push(this.form)

                this.showAlert(
                    'Запись редактированна',
                    true,
                    'success'
                )
            }

            setLocalStorage(this.cards)
            this.dialog = false
            this.clear()
        },
        editCard(card) {
            this.form.setFormData(card)

            this.vs_save = true
            this.dialog = true
        },

// DELETE CLEAR SPLICE //
        showAlertDelete(item) {
            this.dialog_alert_form.dialog_alert = true
            this.dialog_alert_form.message = 'Вы хотите удалить запись?'
            this.dialog_alert_form.mode = 'delete'
            this.dialog_alert_form.item = item
        },
        showAlertClear() {
            this.dialog_alert_form.dialog_alert = true
            this.dialog_alert_form.message = 'Вы хотите очистить записи?'
            this.dialog_alert_form.mode = 'clear'
        },
        clearCards() {
            this.cards = []
            setLocalStorage(this.cards)
            this.dialog_alert_form.dialog_alert = false

            this.showAlert(
                'Все записи удалены',
                true,
                'success'
            )
        },
        async deleteCard(item) {
            await this.spliceCard(item).then((resp) => {
                if (resp)
                    this.showAlert(
                        'Запись удалена',
                        true,
                        'success'
                    )
                else
                    this.showAlert(
                        'Ошибка, удалить запись не удалось',
                        true,
                        'warning'
                    )
            })
            this.dialog_alert_form.dialog_alert = false
        },
        async spliceCard(item) {
            try {
                this.cards.forEach((el, index) => {
                    if (el.id === item.id) {
                        this.cards.splice(index, 1)
                    }
                })
                setLocalStorage(this.cards)

                return true
            } catch (e) {
                console.error(e)
                return false
            }
        },
        clear() {
            getDefaultTitle()
            clearInterval(this.interval)
            this.form = new form()

            this.vs_save = false
            this.vs_play = false
        },

// OPEN CLOSE //
        closeDialog() {
            this.dialog = false
            this.clear()
        },
        openDialog() {
            this.form = new form()
            this.dialog = true
        },

// ACTIONS // 
        searchCard(value) {
            if (value) {
                this.cards = getLocalStorage()
                this.cards = this.cards.filter(el => {
                    return el.name.toLowerCase().indexOf(value) !== -1
                })
            } else {
                this.cards = getLocalStorage()
            }
        },

// ALERT //
        showAlert(message, show, type) {
            this.response.show = show
            this.response.message = message
            this.response.type = type

            setTimeout(() => {
                this.response.show = false
            }, 3000)
        },

// TIME //
        playPause() {
            if (this.vs_play) {
                this.vs_play = false
                clearInterval(this.interval)
                getDefaultTitle()
            } else {
                this.vs_play = true
                this.interval = setInterval(this.start, 1000)
            }
        },
        start() {
            this.form.sec++;
            if (this.form.sec >= 60) {
                this.form.min++;
                this.form.sec = this.form.sec - 60;
            }
            if (this.form.min >= 60) {
                this.form.hour++;
                this.form.min = this.form.min - 60;
            }

            document.title = this.form.hour + ':' + this.form.min + ':' + this.form.sec
        },
    },

    created() {
        getDefaultTitle()
        if (getLocalStorage() !== null) {
            this.cards = getLocalStorage()
        }
    }
}
</script>