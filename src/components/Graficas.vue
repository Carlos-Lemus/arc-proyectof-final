<template>
  <v-container>
    <h2 class="mb-6">Conteo de Casos:</h2>
    <v-row align="center" justify="center">
      <v-col cols="10" sm="6">
        <v-card elevation="6">
          <v-row no-gutters>
            <v-col cols="7">
              <v-card-title
                class="text-h5 white--text green darken-1 fill-height"
                >Negativos</v-card-title
              >
            </v-col>
            <v-col cols="5" class="d-flex justify-center">
              <v-avatar size="100">
                <span class="text-h3">123</span>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="10" sm="6">
        <v-card elevation="6">
          <v-row no-gutters>
            <v-col cols="7">
              <v-card-title class="text-h5 white--text red darken-1 fill-height"
                >Positivos</v-card-title
              >
            </v-col>
            <v-col cols="5" class="d-flex justify-center">
              <v-avatar size="100">
                <span class="text-h3">23</span>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-divider class="my-10"></v-divider>
    <!--
    <v-card class="mx-auto text-center" max-width="900">
      <v-card-text>
        <v-sheet color="white">
          <v-sparkline
            :value="temperaturas"
            :gradient="gradient"
            height="150"
            padding="24"
            stroke-linecap="round"
            smooth
          >
            <template v-slot:label="item"> {{ item.value }} ºC </template>
          </v-sparkline>
        </v-sheet>
      </v-card-text>

      <v-card-text>
        <div class="text-h4 font-weight-thin">Sales Last 24h</div>
      </v-card-text>
    </v-card>-->
    <h3>Grafica</h3>
    <v-row justify="center" align="center">

</v-row>
  </v-container>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];

export default {
  name: "Graficas",
  data: () => ({
    value: [423, 446, 675, 510, 590, 610, 760],

    width: 2,
    radius: 10,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    //value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,

    valores: [
      {
        fecha: "12/02/2021",
        hora: "12:34",
        temp: 36,
        resultado: "Negativo",
      },
      {
        fecha: "19/10/2021",
        hora: "10:34",
        temp: 37,
        resultado: "Negativo",
      },
      {
        fecha: "05/09/2021",
        hora: "11:34",
        temp: 34,
        resultado: "Negativo",
      },
      {
        fecha: "29/09/2021",
        hora: "16:34",
        temp: 39,
        resultado: "Positivo",
      },
      {
        fecha: "01/11/2021",
        hora: "09:34",
        temp: 45,
        resultado: "Positivo",
      },
      {
        fecha: "12/07/2021",
        hora: "15:34",
        temp: 39,
        resultado: "Positivo",
      },
    ],

    temperaturas: [36,37,34,39,45,39],

  }),

  methods: {
   
  },
};
</script>