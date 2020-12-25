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
import NavBar from "@/components/NavBar";
import SortingCanvas from "@/components/sortingCanvas";

export default {
  name: "App",

  components: {
    NavBar,
    SortingCanvas,
  },

  data: () => {
    return { pageTitle: "Sorting Visualizer" };
  },
};
</script>
