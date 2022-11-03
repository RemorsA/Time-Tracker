<template>
    <v-app>
        <v-container fluid class="container">

            <TableComponent
                :cards="cards"
                @dialog="dialog = true"
                @editCard="editCard"
                @searchCard="searchCard"
                @clearCards="dialogAlertAction('clear')"
                @deleteCard="dialogAlertAction"
            />

            <DialogComponent
                :dialog="dialog"
                :vs_save="vs_save"
                :update_form="update_form"
                @closeDialog="dialog = false"
                @saveCard="saveCard"
                @updateCard="updateCard"
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
import { getDefaultTitle, setLocalStorage, getLocalStorage } from '@/lib/scripts'

export default {
    components: {
        TableComponent,
        DialogComponent,
        DialogAlertComponent
    },

    data() {
        return {
            dialog: false,
            dialog_alert_form: {
                dialog_alert: false,
                message: '',
                mode: '',
                item: {}
            },
            vs_save: false,
            cards: [],
            update_form: {},
            response: {
                message: 'Запись редактированна',
                show: false,
                type: ''
            }
        }
    },

    methods: {
        showAlert(message, show, type) {
            this.response.show = show
            this.response.message = message
            this.response.type = type

            setTimeout(() => {
                this.response.show = false
            }, 3000)
        },
        saveCard(save) {
            this.cards.push(save)
            this.dialog = false

            this.showAlert(
                'Запись добавлена',
                true,
                'success'
            )
            setLocalStorage(this.cards)
        },
        async updateCard(update) {
            await this.spliceCard(update).then((resp) => {
                if (resp) 
                    this.cards.push(update),
                    this.showAlert(
                        'Запись отредактированна',
                        true,
                        'success'
                    ),
                    setLocalStorage(this.cards)

                else 
                    this.showAlert(
                        'Ошибка, редактировать запись не удалось',
                        true,
                        'warning'
                    )
            })

            this.dialog = false
            this.vs_save = false
        },
        editCard(card) {
            this.update_form = card
            this.vs_save = true
            this.dialog = true
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
        clearCards() {
            this.cards = []
            setLocalStorage(this.cards)
            this.dialog_alert_form.dialog_alert = false
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
        dialogAlertAction(data) {
            this.dialog_alert_form.dialog_alert = true

            if (data === 'clear')
                this.dialog_alert_form.message = 'Вы хотите очистить записи?'
                this.dialog_alert_form.mode = data
            if (typeof data === 'object')
                this.dialog_alert_form.message = 'Вы хотите удалить запись?'
                this.dialog_alert_form.item = data
                this.dialog_alert_form.mode = 'delete'
        }
    },

    created() {
        getDefaultTitle()
        if (getLocalStorage() !== null) {
            this.cards = getLocalStorage()
        }
    }
}
</script>