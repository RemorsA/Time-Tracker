<template>
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
                    <v-row align="center" justify="center">
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
                        <v-col cols="3">
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
                                {{hour}}.ч
                                {{min}}.м
                                {{sec}}.с
                            </p>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="red" @click="closeDialog">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-container>

        </v-card>
    </v-dialog>
</template>

<script>
import { getDefaultTitle } from '@/lib/scripts'

export default {
    props: [
        'dialog',
        'vs_save',
        'update_form'
    ],

    data() {
        return {
            name: '',
            description: '',
            hour: 0,
            min: 0,
            sec: 0,
            interval: 0,
            vs_play: false,
        }
    },

    watch: {
        update_form(card) {
            this.name = card.name
            this.description = card.description
            this.hour = card.time.split('.')[0]
            this.min = card.time.split('.')[1]
            this.sec = card.time.split('.')[2]
        }
    },

    methods: {
        closeDialog() {
            this.$emit('closeDialog')
            this.clear()
        },
        saveUpdateCard() {
            if (!this.vs_save) {
                if(!this.name || !this.description) {
                    Object.keys(this.$refs).forEach(f => {
                        this.$refs[f].validate(true)
                    })

                    return
                }

                let date = new Date()
                    date = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()

                let save = {
                    id: Math.random().toString().slice(2),
                    name: this.name,
                    description: this.description,
                    date: date,
                    time: this.hour + '.' + this.min + '.' + this.sec
                }

                this.$emit('saveCard', save)
            } else {
                let update = {
                    id: this.update_form.id,
                    name: this.name,
                    description: this.description,
                    date: this.update_form.date,
                    time: this.hour + '.' + this.min + '.' + this.sec
                }

                this.$emit('updateCard', update)
            }

            this.clear()
        },
        clear() {
            getDefaultTitle()
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
            this.sec++;
            if (this.sec >= 60) {
                this.min++;
                this.sec = this.sec - 60;
            }
            if (this.min >= 60) {
                this.hour++;
                this.min = this.min - 60;
            }

            document.title = this.hour + ':' + this.min + ':' + this.sec
        },
    }
}
</script>