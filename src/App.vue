<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { decodeToken } from "./helpers/decode-token";

export default {
  name: "App",
  mounted() {
    const tokenLocal = localStorage.getItem("token");

    this.$services.api
      .verify(tokenLocal)
      .then((response) => {
        if (response.data.success) {
          const token = response.data.token;

          const tokenData = decodeToken(token);

          this.$store.dispatch("setUserAction", tokenData.data);

          localStorage.setItem("token", token);

        }
      })
      .catch((error) => {
        this.$store.dispatch('setUserAction', null);
        localStorage.removeItem('token');
        this.$router.push("/login");
      });
  },
};
</script>
