<template>
  <app-layout>
    <v-container>
      <v-card class="pb-2 ma-3" elevation="10">
        <v-card-title class="justify-center pt-8">
          Usuarios
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Buscar"
            outlined
            clearable
            color="cyan darken-4"
            single-line
            hide-details
            class="mr-2"
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          :height="500"
          class="justify-center ma-3 elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-btn to="/users/create" color="green" dark class="mb-2">
                <v-icon>mdi-plus-box</v-icon>
                <span class="hidden-xs-only ml-1">Nuevo usuario</span>
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="mr-4"
              color="primary"
              @click="editItem(item.id)"
            >
              mdi-pencil
            </v-icon>
            <v-icon @click="deleteItem(item.id)" color="error">
              mdi-delete
            </v-icon>
          </template></v-data-table
        ></v-card
      ></v-container
    ></app-layout
  >
</template>

<script>
import AppLayout from "../../layout/AppLayout.vue";

import { toastMessage, deleteMessage } from "../../helpers/messages";

export default {
  name: "Users",
  components: {
    AppLayout,
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "firstName",
      },
      {
        text: "Apellido",
        sortable: true,
        value: "lastName",
      },
      {
        text: "Email",
        sortable: true,
        value: "email",
      },
      {
        text: "Rol",
        sortable: true,
        value: "role.name",
      },
      {
        text: "Telefono",
        sortable: true,
        value: "phone",
      },
      {
        text: "Edad",
        sortable: true,
        value: "age",
      },
      {
        text: "Direccion",
        sortable: true,
        value: "direction",
      },

      { text: "", value: "actions", sortable: false },
    ],
    users: [],
  }),
  mounted() {
    this.$services.api
      .getUsers()
      .then((response) => {
        this.users = response.data.users;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    editItem(id) {
      this.$router.push(`/users/${id}/edit`);
    },
    deleteItem(id) {
      deleteMessage(() => {
        this.$services.api
          .deleteUser(id)
          .then((response) => {
            if (response.data.success) {

              this.users = this.users.filter(user => user.id !== id);
              
              toastMessage(
                "success",
                "Exito",
                "Se elimino el usuario correctamente"
              );
            }
          })
          .catch((error) => {
            console.log(error);
            toastMessage("error", "Error :(", "No se pudo eliminar el usuario");
          });
      });
    },
  },
};
</script>

<style  scoped>
</style>
