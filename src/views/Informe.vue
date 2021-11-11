<template>
  <app-layout>
    <v-container>
      <v-row class="mt-3 align-center justify-center">
        <v-btn-toggle
          v-model="step"
          borderless
          mandatory
          color=" indigo accent-4"
          class="justify-center mr-0 pr-0 pl-0 ml-0"
        >
          <v-btn>
            <v-icon
              size="28"
              class="mx-5"
              :color="step === 0 ? ' indigo accent-4' : 'black'"
              >mdi-table-multiple</v-icon
            >
            <span class="hidden-xs-only mr-5 text-body-1 font-weight-bold">Reporte</span>
          </v-btn>

          <v-btn>
            <v-icon
              size="28"
              class="mx-5"
              :color="step === 1 ? ' indigo accent-4' : 'black'"
              >mdi-chart-line</v-icon
            >
            <span class="hidden-xs-only mr-5 text-body-1 font-weight-bold">Graficas</span>
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row class="align-center justify-center">
        <v-window v-model="step" class="col-12">
          <v-window-item :value="0">
           
            <tabla class="mt-10" />
          </v-window-item>

          <v-window-item :value="1">
           
            <graficas/>
          </v-window-item>
        </v-window>
      </v-row>
    </v-container>
  </app-layout>
</template>

<script>
import AppLayout from "../layout/AppLayout.vue";
import Tabla from "../components/Tabla.vue"
import Graficas from "../components/Graficas.vue"

export default {
  name: "Informe",
  components: {
    AppLayout,
    Tabla,
    Graficas,
  },
  data: () => ({
    step: 0,
  }),
  methods: {},
};
</script>
