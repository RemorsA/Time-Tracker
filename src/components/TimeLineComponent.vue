<template>
    <v-row>
        <v-col cols="20">

            <v-timeline dark dense>

                <v-slide-x-reverse-transition group hide-on-leave>

                    <v-timeline-item
                        color="pink"
                        v-for="(i, index) in cards"
                        :key="index"
                    >

                        <v-col style="
                            display: flex;
                            align-items: center;
                        ">
                            <v-col cols="3">
                                <p style="color: white">{{i.date}}</p>
                                <p style="color: white">{{i.time}}</p>
                            </v-col>

                            <v-card dark>
                                <v-card-title>
                                    {{i.title}}
                                </v-card-title>
                                <v-col>
                                    <p>{{i.desription}}</p>
                                </v-col>
                            </v-card>
                        </v-col>
                    </v-timeline-item>

                </v-slide-x-reverse-transition>

            </v-timeline>

        </v-col>
    </v-row>
</template>

<script>

export default {
    props: ['cards'],
    data() {
        return {

        }
    }
}
</script>
