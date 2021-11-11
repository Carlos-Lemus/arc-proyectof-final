<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-6"
  >
    <template v-slot:[getitemcontrols()]="{ item }">
      <v-chip
        :color="getColor(item.temp)"
        dark
      >
        {{ item.temp }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name:"Tabla",   
    data () {
      return {
        headers: [
          {
            text: 'Fecha',
            align: 'start',
            sortable: true,
            value: 'fecha',
          },
          { text: 'Hora', value: 'hora' },
          { text: 'Temperatura', value: 'temp' },
          { text: 'Resultado', value: 'resultado' },
        
        ],
        desserts: [
          {
            fecha: '12/02/2021',
            hora: '12:34',
            temp: 36,
            resultado: "Negativo",
          },
          {
            fecha: '19/10/2021',
            hora: '10:34',
            temp: 37,
            resultado: "Negativo",
          },
          {
            fecha: '05/09/2021',
            hora: '11:34',
            temp: 34,
            resultado: "Negativo",
          },
          {
            fecha: '29/09/2021',
            hora: '16:34',
            temp: 39,
            resultado: "Positivo",
          },
          {
            fecha: '01/11/2021',
            hora: '09:34',
            temp: 45,
            resultado: "Positivo",
          },
          {
            fecha: '12/07/2021',
            hora: '15:34',
            temp: 39,
            resultado: "Positivo",
          },
          
        ],
      }
    },
    methods: {
      getColor (temp) {
        if (temp > 38) return 'red'
        else if (temp > 35) return 'orange'
        else return 'green'
      },
    
       getitemcontrols() {
      return `item.temp`;
    },
    },
  }
</script>