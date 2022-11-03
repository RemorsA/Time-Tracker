<template>
    <v-dialog
        v-model="dialog_alert_form.dialog_alert"
        width="400px"
    >
        <v-card dark>
            <v-card-title class="text-h5 red lighten-2">Внимание</v-card-title>
            <v-card-text class="mt-10 mb-5">{{ dialog_alert_form.message }}</v-card-text>
            <v-card-actions>
                <v-btn
                    color="red"
                    @click="$emit('dialogAlertClose')"
                >Назад</v-btn>
                <v-btn
                    color="green"
                    @click="$emit('clearCards')"
                    v-show="dialog_alert_form.mode === 'clear'"
                >Ок</v-btn>
                <v-btn
                    color="green"
                    @click="$emit('deleteCard', dialog_alert_form.item)"
                    v-show="dialog_alert_form.mode === 'delete'"
                >Ок</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default { props: [ 'dialog_alert_form' ] }
</script>