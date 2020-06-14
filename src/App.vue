<template>
  <v-app>
    <nav>
      <NavBar :pageTitle="pageTitle" />
    </nav>
    <v-content>
      <SortingCanvas />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import SortingCanvas from "./components/sortingCanvas";

export default {
  name: "App",

  components: {
    NavBar,
    SortingCanvas
  },

  props: {},

  data: () => ({
    pageTitle: "Sorting Visualizer"
  }),

  methods: {}
};
</script>

<style scoped>
</style>