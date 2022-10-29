<template>
    <v-row dense no-gutters>

        <v-col cols="20">
            <v-text-field
                clearable
                solo
                dark
                hint="Поиск"
                @input="(val) => {
                    $emit('searchCard', val)
                }"
                prepend-inner-icon="mdi-magnify"
            />
        </v-col>

        <v-col cols="1" />

        <v-col cols="1">
            <v-btn
                dark
                min-width="100%"
                color="#1652DA"
                @click="$emit('dialog')"
            ><v-icon>mdi-plus-circle</v-icon></v-btn>
        </v-col>

        <v-col cols="1" />

        <v-col cols="1">
            <v-btn
                min-width="100%"
                color="#1F761F"
                dark
                @click="$emit('clearCards')"
            ><v-icon>mdi-notification-clear-all</v-icon></v-btn>
        </v-col>

    </v-row>
</template>