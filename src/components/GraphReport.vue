<template>
  <v-container style="max-width: 1200px">
    <h3 class="mb-6 text-h4">Grafica</h3>
    <v-card class="mx-auto text-center" max-width="900">
      <v-card-text>
        <line-chart :data="Datacollection" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import LineChart from "./LineChart.vue";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  name: "GraphReport",
  components: {
    LineChart,
  },
  mounted() {
    const year = new Date().getFullYear();

    this.$services.api
      .getRecordsData(year)
      .then((response) => {
        this.datacollection = response.data.monthsValues;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      datacollection: [],
    };
  },
  computed: {
    Datacollection() {
      return this.datacollection;
    },
  },
};
</script>