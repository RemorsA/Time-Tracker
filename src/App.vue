<template>
    <v-app>
        <v-container fluid style="width: 700px">

            <NavComponent
                @dialog="dialog = true"
                @clearCards="clearCards"
                @searchCard="searchCard"
            />
            <TimeLineComponent
                v-if="cards.length !== 0"
                :cards="cards"
            />

            <v-alert
                v-else
                type="info"
                border="bottom"
                dark
                colored-border
                color="yellow"
            >Записей нет !</v-alert>

            <v-dialog
                v-model="dialog"
                width="500"
            >

                <v-card dark>
                    <v-card-title>
                        <v-text-field
                            hint="Название"
                            outlined
                            clearable
                        />
                    </v-card-title>

                    <v-col>
                        <v-textarea
                            outlined
                            hint="Описание задачи"
                            rows="20"
                            clearable
                            no-resize
                        />
                    </v-col>

                    <v-card-actions>
                        <v-col cols="2">
                            <v-btn dark>
                                <v-icon color="blue">mdi-content-save</v-icon>
                                <!-- <v-icon size="30px">mdi-content-save-edit</v-icon> -->
                            </v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn dark>
                                <v-icon color="yellow">mdi-reload</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="2">
                            <v-btn dark>
                                <v-icon color="green">mdi-play</v-icon>
                                <!-- <v-icon size="30px">mdi-pause</v-icon> -->
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <p style="font-size: 20px; color: white;">1.ч 10.м 40.с</p>
                        </v-col>
                        <v-col cols="1">
                            <v-btn color="red" @click="dialog = false">
                                <v-icon size="30px">mdi-close</v-icon>
                            </v-btn>
                        </v-col>
                    </v-card-actions>
                </v-card>
            </v-dialog>

        </v-container>
    </v-app>
</template>

<script>
import TimeLineComponent from '@/components/TimeLineComponent.vue'
import NavComponent from '@/components/NavComponent.vue'

export default {
    components: {
        TimeLineComponent,
        NavComponent,
    },

    data() {
        return {
            dialog: false,
            cards: []
        }
    },

    watch: {
        dialog() {
            if (!this.dialog) {
                console.log('CLOSE DIALOG')
            }
        }
    },

    methods: {
        addCard() {
            
        },
        clearCards() {
            this.cards = []
        },
        searchCard(value) {
            console.log(value)
        }
    },

    created() {
        
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
#app {
    background: #121212;
    font-family: 'Montserrat', sans-serif;
}
</style>