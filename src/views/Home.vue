<template>
  <v-row class="bg" justify="center" align="center">
    <v-col
      cols="12"
      class="mx-auto zoomInDown my-auto"
      align="center"
      justify="center"
    >
      <v-btn
        min-height="100px"
        max-height="100px"
        min-width="150px"
        width="80%"
        max-width="450px"
        class="mx-auto rounded-xl no-gutters"
        color="white"
        to="/login"
        outlined
      >
        <v-icon left color="white" size="35"> mdi-login</v-icon>
        <span class="white--text ml-2 txt_btn">Entrar</span>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.bg {
  background: url("../assets/background.jpg") repeat-y center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 102vh;
}

.v-btn--outlined {
  border-width: thick;
}
.txt_btn {
  font-size: 13pt;
  white-space: normal;
  width: 50%;
  min-width: 50px;
}
</style>
