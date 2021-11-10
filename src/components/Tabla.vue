<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
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
            sortable: false,
            value: 'fecha',
          },
          { text: 'Hora', value: 'hora' },
          { text: 'Temperatura', value: 'temp' },
          { text: 'Resultado', value: 'resultado' },
        
        ],
        desserts: [
          {
            fecha: '12/23/2342',
            hora: '12:34',
            temp: 36,
            resultado: "Negativo",
          },
          {
            fecha: '12/23/2342',
            hora: '10:34',
            temp: 37,
            resultado: "Negativo",
          },
          {
            fecha: '12/23/2342',
            hora: '11:34',
            temp: 34,
            resultado: "Negativo",
          },
          {
            fecha: '12/23/2342',
            hora: '16:34',
            temp: 39,
            resultado: "Positivo",
          },
          {
            fecha: '12/23/2342',
            hora: '09:34',
            temp: 45,
            resultado: "Positivo",
          },
          {
            fecha: '12/23/2342',
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