<template>
    <v-row>
        <v-col cols="20">
            <v-data-table
                dark
                hide-default-footer
                show-expand
                single-expand
                no-data-text="Пусто"
                loading-text="Загрузка"
                item-key="id"
                :headers="tbl_col"
                :items="cards"
                :loading="false"
                :items-per-page="10"
                :page.sync="page"
                :sort-by="['name']"
                :sort-desc="['true']"
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
                                :disabled="cards.length === 0"
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
                                :disabled="cards.length === 0"
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

                <template v-slot:item.time="{ item }">
                    {{ item.hour }}.ч
                    {{ item.min }}.м
                    {{ item.sec }}.с
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
import { table_columns } from "@/lib/form"

export default {
    props: ['cards'],
    data() {
        return {
            page: 1,
            page_count: 0,
            tbl_col: table_columns
        }
    }
}
</script>