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
          :items="usuarios.item"
          :search="search"
          :height="500"
          class="justify-center ma-3 elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="green"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-plus-box</v-icon>
                    <span class="hidden-xs-only ml-1">Nuevo Usuario</span>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-form v-model="isFormValid" ref="form">
                        <v-row no-gutters align="center" justify="center">
                          <v-col cols="12" sm="8" md="8">
                            <v-text-field
                              outlined
                              v-model="editedItem.nombreUsuario"
                              label="Nombre de usuairo"
                              :rules="ruleRequired"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="8" md="8">
                            <v-text-field
                              outlined
                              v-model="editedItem.contrasena"
                              label="Contraseña"
                              :rules="ruleRequired"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="close"> Cancelar </v-btn>
                    <v-btn
                      :disabled="!isFormValid"
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              class="mr-4"
              color="indigo accent-3"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              @click="deleteItem(item.idCategoria)"
              color="deep-orange accent-3"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </app-layout>
</template>

<script>
import { Rules } from "../helpers/rules.js";
import AppLayout from "../layout/AppLayout.vue";

//import { toastMessage, deleteMessage } from "../helpers/messages";
export default {
  name: "AddUser",
  components: {
    AppLayout,
  },
  data: () => ({
    isFormValid: false,
    search: "",
    dialog: false,
    headers: [
      {
        text: "Usuario",
        align: "start",
        sortable: true,
        value: "usuario",
      },
      {
        text: "Contaseña",
        sortable: true,
        value: "pass",
      },

      { text: "", value: "actions", sortable: false },
    ],
    usuarios: {
      item: [
        { usuario: "admin", pass: "aaaa" },
        { usuario: "admin2", pass: "12345678" },
        { usuario: "admin3", pass: "qwertyuiop" },
      ],
      hasItems: false,
    },
    editedIndex: -1,
    editedItem: {
      nombreUsuario: "",
      contrasena: "",
    },
    ruleRequired: Rules.required,
  }),
  mounted() {
    /*  this.$services.shareds
      .getCategories()
      .then((response) => {
        this.categories = response.data.collection;
      })
      .catch((error) => {
        console.log(error);
      });*/
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
/*
     editItem(item) {
      this.editedIndex = this.categories.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(id) {
      deleteMessage(() => {
        this.$services.manager
          .deleteCategory(id)
          .then((response) => {
            if (response.data.ok) {
              this.categories.items = this.categories.items.filter(
                (item) => item.idCategoria !== id
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    close() {
      this.dialog = false;
      this.editedItem = { nombreCategoria: "" };
      this.editedIndex = -1;
      // this.editedItem = Object.assign({}, this.defaultItem);
      // this.$nextTick(() => {
      // });
    },
    save() {
      if (this.editedIndex > -1) {
        this.$services.manager
          .updateCategory(this.editedItem.idCategoria, this.editedItem)
          .then((response) => {
            if (response.data.ok) {
              Object.assign(
                this.categories.items[this.editedIndex],
                response.data.category
              );

              toastMessage(
                "success",
                "Exito",
                "Se creo la categoria correctamente"
              );
            }
          })
          .catch((error) => {
            console.log(error);
            toastMessage("error", "Error :(", "No se pudo crear la categoria");
          })
          .finally(() => {
            this.close();
          });
      } else {
        this.$services.manager
          .createCategory(this.editedItem)
          .then((response) => {
            if (response.data.ok) {
              this.categories.items = [
                ...this.categories.items,
                response.data.category,
              ];
              toastMessage(
                "success",
                "Exito",
                "Se creo la categoria correctamente"
              );
            }
          })
          .catch((error) => {
            console.log(error);
            toastMessage("error", "Error :(", "No se pudo crear la categoria");
          })
          .finally(() => {
            this.close();
          });
      }
    },*/

  },
};
</script>

<style  scoped>
</style>
