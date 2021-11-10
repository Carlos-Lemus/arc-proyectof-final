<template>
  <v-container fluid >
    <v-row align="center" justify="center">
 
      <v-col cols="11" sm="8" md="6" class="" >
        <v-card class="elevation-6 mt-10" max-width="800px">
          <v-form v-model="isFormValid">
            <v-row justify="center" >    
              <v-col cols="12" sm="10">
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
                        to="/informe"
                      >
                        Ingresar
                      </v-btn>
                    </v-col>
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

export default {
  name: "Login",
  data: () => ({
    isFormValid: false,
    user: { username: "", password: "" },
    userRules: [(v) => !!v || "Ingresa tu nombre de usuario"],
    passwordRules: [(v) => !!v || "Ingrese tu clave"],
  }),
  methods: {
  }
};
</script>

<style lang="scss" scoped>


</style>
