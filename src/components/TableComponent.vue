<template>
    <v-row>
        <v-col cols="20">
            <v-data-table
                dark
                :headers="table_columns"
                :items="cards"
                :loading="false"
                no-data-text="Пусто"
                hide-default-footer
                loading-text="Загрузка"
                disable-sort
                show-expand
                single-expand
                :items-per-page="10"
                item-key="id"
                :page.sync="page"
                @page-count="page_count = $event"
            >
                <template v-slot:top>
                    <v-row
                        justify="center"
                        no-gutters
                        dense
                        class="pt-5"
                    >
                        <v-col cols="7">
                            <v-text-field
                                clearable
                                outlined
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

                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-textarea
                            solo
                            class="mt-5 mb-5"
                            v-model="item.description"
                            disabled
                        />
                    </td>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-5"
                        @click="$emit('editCard', item)"
                    >mdi-pencil</v-icon>

                    <v-icon
                        color="red"
                        small
                        @click="$emit('deleteCard', item)"
                    >mdi-delete</v-icon>
                </template>

            </v-data-table>

            <v-col>
                <v-pagination
                    v-show="cards.length !== 0"
                    :length="page_count"
                    v-model="page"
                />
            </v-col>

        </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['cards'],
    data() {
        return {
            table_columns: [
                {
                    key: 1,
                    text: 'Название',
                    value: 'name'
                },
                {
                    key: 2,
                    text: 'Дата',
                    value: 'date'
                },
                {
                    key: 3,
                    text: 'Время',
                    value: 'time'
                },
                {
                    key: 4,
                    text: '',
                    value: 'actions'
                }
            ],
            page: 1,
            page_count: 0
        }
    }
}
</script>