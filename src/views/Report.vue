<template>
  <app-layout>
    <v-container style="max-width: 1100px">
      <v-row class="mt-3 align-center justify-center">
        <v-btn-toggle
          v-model="step"
          borderless
          mandatory
          color="primary"
          class="justify-center mr-0 pr-0 pl-0 ml-0"
        >
          <v-btn>
            <v-icon
              size="28"
              class="mx-5"
              :color="step === 0 ? 'primary' : 'black'"
              >mdi-table-multiple</v-icon
            >
            <span class="hidden-xs-only mr-5 text-body-1 font-weight-bold"
              >Reporte</span
            >
          </v-btn>

          <v-btn>
            <v-icon
              size="28"
              class="mx-5"
              :color="step === 1 ? 'primary' : 'black'"
              >mdi-chart-line</v-icon
            >
            <span class="hidden-xs-only mr-5 text-body-1 font-weight-bold"
              >Datos</span
            >
          </v-btn>
        </v-btn-toggle>
      </v-row>

      <v-row class="align-center justify-center">
        <v-window v-model="step" class="col-12">
          <v-window-item :value="0">
            <report-table class="mt-10" />
          </v-window-item>

          <v-window-item :value="1">
            <graph-report />
          </v-window-item>
        </v-window>
      </v-row>
    </v-container>
  </app-layout>
</template>

<script>
import AppLayout from "../layout/AppLayout.vue";
import ReportTable from "../components/ReportTable.vue";
import GraphReport from "../components/GraphReport.vue";

export default {
  name: "Report",
  components: {
    AppLayout,
    ReportTable,
    GraphReport,
  },
  data: () => ({
    step: 0,
  }),
};
</script>
