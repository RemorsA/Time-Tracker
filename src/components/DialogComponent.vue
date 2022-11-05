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
                    v-model="form.name"
                    :rules="[() => !!form.name || 'Поле обязательно']"
                    ref="name"
                />

                <v-textarea
                    outlined
                    hint="Описание задачи"
                    rows="20"
                    clearable
                    no-resize
                    v-model="form.description"
                    :rules="[() => !!form.description || 'Поле обязательно']"
                    ref="description"
                />
            </v-container>

            <v-container class="container">
                <v-card-actions>
                    <v-row align="center" justify="center">
                        <v-col cols="2">
                            <v-btn dark @click="validateForm">
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
                            <v-btn dark @click="$emit('playPause')">
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
                                {{form.hour}}.ч
                                {{form.min}}.м
                                {{form.sec}}.с
                            </p>
                        </v-col>
                        <v-col cols="2">
                            <v-btn color="red" @click="validateClear">
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
export default {
    props: [
        'dialog',
        'vs_save',
        'vs_play',
        'form'
    ],

    methods: {
        validateForm() {
            if(!this.form.name || !this.form.description) {
                Object.keys(this.$refs).forEach(f => {
                    this.$refs[f].validate(true)
                })

                return
            }

            this.$emit('saveUpdateCard')
        },
        validateClear() {
            this.$refs.name.reset()
            this.$refs.description.reset()

            this.$emit('closeDialog')
        }
    }
}
</script>