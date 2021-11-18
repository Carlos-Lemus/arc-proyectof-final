<template>
  <div>
    <app-top-bar />

    <v-container fluid>
      <v-row
        no-gutters
        class="pb-xs-2 ma-sm-5 justify-center fill-height align-center"
      >
        <slot></slot>
      </v-row>
    </v-container>

    <v-footer color="primary" dark padless>
      <v-col class="text-center" cols="12">
        Developed with <strong>MEVN</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import AppTopBar from "../components/AppTopBar.vue";

export default {
  name: "AppLayout",
  components: {
    AppTopBar,
  },
};
</script>