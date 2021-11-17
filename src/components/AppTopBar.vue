<template>
  <div>
    <!--Barra de navegacion superior-->
    <v-app-bar
      color="#212121"
      src="../assets/top-bar-background.jpg"
      dark
      shrink-on-scroll
    >
      <!--Icono para menu desplegale-->

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <app-menu-bar-user />
    </v-app-bar>
    <!-- SlideBar de navegacion izquierdo -->
    <v-navigation-drawer
      v-model="drawer"
      dark
      absolute
      temporary
      color="#212121"
      src="../assets/background-menu.jpg"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar
            ><v-icon>mdi-water-pump</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Control de Dispensador</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item class="v-list-item mt-4" to="/report">
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Informe</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="IsAdmin" class="v-list-item mt-4" to="/users">
          <v-list-item-icon class="mr-2">
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuarios</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import AppMenuBarUser from "../components/AppMenuBarUser.vue";
import routersInfo from "../router/routers-info";

export default {
  name: "ManagerTopBar",
  components: {
    AppMenuBarUser,
  },
  data: () => ({
    valuesRouter: Object.values(routersInfo),

    drawer: null,
    model: null,
  }),

  computed: {
    currentRouteName() {
      return this.valuesRouter.find(router => router.name === this.$route.name).title;
    },
    IsAdmin() {
      if(!this.$store.getters.user) {
        return false;
      }

      return this.$store.getters.user.role.name === "Administrador";
    },
  },
};
</script>