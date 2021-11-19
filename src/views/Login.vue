<template>
  <v-container fill-heigth fluid>
    <v-row align="center" class="bg" justify="center">
      <v-col cols="12" sm="11" md="10" lg="8" xl="6">
        <v-card class="elevation-6 mx-auto mt-10">
          <v-form v-model="isFormValid">
            <v-row justify="center">
              <v-col cols="12" sm="6" class="back rounded-bl-xl ">
                  <!-- transition="fade-transition" -->
                  <!-- transition="slide-x-transition" -->
                <v-img 
                  transition="fade-transition"
                  min-height="100px"
                  max-height="100%"
                  max-width="450px"
                  src="../assets/background-login.png"
                  class="mx-auto"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card-text class="mt-5">
                  <h2 class="text-center text-h3">Bienvenido</h2>
                  <h4 class="text-center grey--text text-h6">
                    Ingresa tus credenciales
                  </h4>

                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="11">
                      <v-text-field
                        v-model="user.username"
                        :rules="userRules"
                        label="Nombre de Usuario"
                        outlined
                        color="blue"
                        aria-autocomplete="false"
                        class="mt-12"
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="user.password"
                        :rules="passwordRules"
                        label="Clave"
                        outlined
                        color="blue"
                        aria-autocomplete="false"
                        type="password"
                        required
                      ></v-text-field>
                      <v-btn
                        :disabled="!isFormValid"
                        class="white--text mb-5"
                        color="blue"
                        block
                        x-large
                        @click="login"
                      >
                        Ingresar
                      </v-btn>
                    </v-col>

                    <v-alert
                      v-if="messageError"
                      text
                      shaped
                      type="error"
                      icon="mdi-cloud-alert"
                    >
                      {{ messageError }}
                    </v-alert>
                  </v-row>
                </v-card-text>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { decodeToken } from "../helpers/decode-token";

export default {
  name: "Login",
  data: () => ({
    isFormValid: false,
    messageError: null,
    user: { username: "", password: "" },
    userRules: [(v) => !!v || "Ingresa tu nombre de usuario"],
    passwordRules: [(v) => !!v || "Ingrese tu clave"],
  }),
  methods: {
    login() {
      this.$services.api
        .login(this.user)
        .then((response) => {
          if (response.data.success) {
            this.$services.socketio.initialize();

            const token = response.data.token;

            const tokenData = decodeToken(token);

            this.$store.dispatch("setUserAction", tokenData.data);

            localStorage.setItem("token", token);

            this.$router.push("/report");
          }
        })
        .catch((error) => {
          console.log(error);
          this.messageError = "El usuario o contraseña son incorrectos";
        });
    },
  },
};
</script>

<style lang="scss" scoped>

.bg {
  background: url("../assets/background.jpg") repeat-y center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
}

.v-card {
  max-width: 1000px;
}

</style>
