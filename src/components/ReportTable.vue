<template>
  <v-container>
    <h3 class="mb-6 text-h4">Conteo de Casos:</h3>

    <v-row align="center" justify="center">
      <v-col cols="10" sm="6">
        <v-card elevation="6">
          <v-row no-gutters>
            <v-col cols="7">
              <v-card-title
                class="text-h5 white--text green darken-1 fill-height"
                >Temps Normales</v-card-title
              >
            </v-col>
            <v-col cols="5" class="d-flex justify-center">
              <v-avatar size="100">
                <span class="text-h3">{{ normals }}</span>
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
                >Temps Altas</v-card-title
              >
            </v-col>
            <v-col cols="5" class="d-flex justify-center">
              <v-avatar size="100">
                <span class="text-h3">{{ highs }}</span>
              </v-avatar>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-10"></v-divider>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card class="pb-2 ma-3" elevation="10">
          <v-card-title class="justify-center pt-8">
            <v-col cols="12" sm="4" md="3">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="Filtrar por fecha"
                    hint="DD/MM/YYYY formato"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              outlined
              clearable
              color="primary"
              single-line
              hide-details
              class="mr-2"
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :search="search"
            :headers="headers"
            :items="records"
            class="elevation-6 mt-4"
          >
            <template v-slot:[`item.temperature`]="{ item }">
              <v-chip :color="getColor(item.temperature)" dark>
                {{ item.temperature }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ReportTable",
  mounted() {
    this.$services.socketio.getSendTemp((payload) => {
      if (payload) {
        this.records = [...this.records, payload];

        if (payload.temperature > 37) {
          this.highs = this.highs + 1;
        } else {
          this.normals = this.normals + 1;
        }
      }
    });

    const date = new Date().toLocaleDateString("fr-CA");

    this.filterDataTable(date);
  },
  data() {
    return {
      search: "",
      menu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      headers: [
        {
          text: "Numero Persona",
          align: "start",
          sortable: true,
          value: "number",
        },
        { text: "Fecha", value: "date" },
        { text: "Hora", value: "hour" },
        { text: "Temperatura (°C)", value: "temperature" },
        { text: "Resultado", value: "result" },
      ],
      records: [],
      highs: 0,
      normals: 0,
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },
  watch: {
    date(val) {
      this.filterDataTable(val);
    },
  },
  methods: {
    filterDataTable(date) {
      this.$services.api
        .getRecords(date)
        .then((response) => {
          this.records = response.data.records;
          this.highs = response.data.highs;
          this.normals = response.data.normals;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getColor(temperature) {
      if (temperature > 37) return "red";
      else return "green";
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>