<template>
  <div>
    <!-- mdi-chart-bar -->
    <v-app-bar color="primary" dark :elevation="12">
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",

  props: ["pageTitle"],

  data: () => ({
  })
};
</script>
