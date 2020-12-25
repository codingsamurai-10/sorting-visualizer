<template>
  <v-app>
    <nav>
      <NavBar :pageTitle="pageTitle" />
    </nav>
    <v-main>
      <SortingCanvas />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import SortingCanvas from "@/components/SortingCanvas";

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
