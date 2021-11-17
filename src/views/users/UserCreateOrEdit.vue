<template>
  <app-layout>
    <v-card>
      <v-card-title class="justify-center">
        <span class="text-h5 pa-5">Ingresa los datos</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-form
            v-model="isFormValid"
            class="mx-auto"
            style="max-width: 600px"
          >
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  outlined
                  v-model="editedItem.firstName"
                  label="Nombres"
                  :rules="ruleOnlyAlpha"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  outlined
                  v-model="editedItem.lastName"
                  label="Apellidos"
                  :rules="ruleOnlyAlpha"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  outlined
                  v-model="editedItem.email"
                  label="Email"
                  :rules="ruleEmail"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  outlined
                  v-model="editedItem.username"
                  label="Nombre de usuario"
                  :rules="ruleRequired"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="!$route.params.id"
                  type="password"
                  outlined
                  v-model="editedItem.password"
                  label="Contraseña"
                  :rules="rulePass"
                  @change="setRule()"
                ></v-text-field>
                <v-text-field
                  v-else
                  type="password"
                  outlined
                  v-model="editedItem.password"
                  label="Contraseña"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-if="!$route.params.id"
                  type="password"
                  outlined
                  v-model="editedItem.passwordVerify"
                  label="Verificar Contraseña"
                  :rules="ruleVePass"
                ></v-text-field>
                <v-text-field
                  v-else
                  type="password"
                  outlined
                  v-model="editedItem.passwordVerify"
                  label="Verificar Contraseña"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5" md="5">
                <v-select
                  :items="selectRole"
                  label="Rol"
                  outlined
                  item-text="name"
                  item-value="id"
                  v-model="editedItem.role"
                  :rules="ruleRequired"
                  single-line
                ></v-select>
              </v-col>

              <v-col cols="12" sm="5" md="5">
                <v-text-field
                  outlined
                  v-model="editedItem.phone"
                  label="Numero de Telefono"
                  v-mask="'####-####'"
                  :rules="rulePhoneS"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  outlined
                  v-model.number="editedItem.age"
                  label="Edad"
                  :rules="ruleAge"
                  v-mask="'##'"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  rows="2"
                  outlined
                  v-model="editedItem.direction"
                  label="Dirección"
                  :rules="ruleRequired"
                ></v-textarea>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-btn
                  x-large
                  block
                  depressed
                  :disabled="
                    !isFormValid ||
                    editedItem.password !== editedItem.passwordVerify
                  "
                  color="primary"
                  @click="save"
                >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </app-layout>
</template>

<script>
import { Rules } from "../../helpers/rules";
import AppLayout from "../../layout/AppLayout.vue";
import { toastMessage } from "../../helpers/messages";

export default {
  components: { AppLayout },
  name: "UserAddOrEdit",
  mounted() {
    const { id } = this.$route.params;
    if (id) {
      this.$services.api
        .getUser(id)
        .then((response) => {
          if (response.data.success) {
            const { role, ...props } = response.data.user;

            this.editedItem = { ...props };
            this.editedItem.role = role.id;
            this.editedItem.password = "";
            this.editedItem.passwordVerify = "";
          }
        })
        .catch((error) => {
          console.log(error);
          toastMessage("error", "Error :(", "No se pudo cargar los datos del usuario");
        });
    }
    this.$services.api
      .getRoles()
      .then((response) => {
        this.selectRole = response.data.roles;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data: () => ({
    isFormValid: false,
    editedItem: {
      firstName: "",
      lastName: "",
      role: "",
      username: "",
      password: "",
      passwordVerify: "",
      age: "",
      phone: "",
      direction: "",
      email: "",
    },
    selectRole: [],

    ruleRequired: Rules.required,
    ruleAge: Rules.integer,
    ruleOnlyAlpha: Rules.alpha,
    rulePass: Rules.password,
    ruleEmail: Rules.email,
    rulePhoneS: Rules.phonesize,
    ruleVePass: [],
  }),
  methods: {
    //regla para verificar la contraseña
    setRule() {
      this.ruleVePass = Rules.verificarpass(this.editedItem.password);
    },

    save() {
      if (!this.$route.params.id) {
        const { passwordVerify, ...props } = this.editedItem;
        const user = { ...props };

          this.createUser(user);
      } else {

        const { passwordVerify, ...props } = this.editedItem;
        const user = { ...props };

        if (user.password.trim() === "") {
          delete user.password;
        }

        this.updateUser(user);
      }
    },

    createUser(user) {
      this.$services.api
        .createUser(user)
        .then((response) => {
          if (response.data.success) {
            toastMessage(
              "success",
              "Exito",
              "Se creo el usuario correctamente"
            );
            this.$router.push("/users");
          }
        })
        .catch((error) => {
          console.log(error);
          toastMessage("error", "Error :(", "No se pudo crear el usuario");
        });
    },

    updateUser(user) {
      this.$services.api
        .updateUser(user.id, user)
        .then((response) => {
          if (response.data.success) {
            toastMessage(
              "success",
              "Exito",
              "Se actualizo el usuario correctamente"
            );
            this.$router.push("/users");
          }
        })
        .catch((error) => {
          console.log(error);
          toastMessage("error", "Error :(", "No se pudo actualizar el usuario");
        });
    },
  },
};
</script>