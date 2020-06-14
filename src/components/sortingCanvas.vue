<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <v-select
          label="Choose Algorithm"
          append-icon="mdi-chart-bar"
          :items="sortingAlgorithmOptions"
          v-model="sortingAlgorithmChoice"
          @change="callSortingAlgorithmFunction"
          color="secondary darken-4"
        ></v-select>
      </v-col>

      <v-col cols="2">
        <v-btn class="secondary darken-3 mt-3" @click="callSortingAlgorithmFunction">
          <span>Start sorting</span>
          <v-icon right>mdi-shuffle</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn class="secondary darken-3 mt-3 pa-0" text @click="intializeRandomArray">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card :elevation="6" class="pa-2">
      <v-card-title>{{ sortingAlgorithmChoice }} Visualization</v-card-title>
      <v-card
        flat
        class="red d-inline-block mr-2"
        width="20px"
        v-for="item in arrayToSort"
        :key="item.id"
        :height="item * 10"
        ref="arrayToSort"
      ></v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SortingCanvas",

  data: () => ({
    sortingAlgorithmOptions: ["Merge Sort", "Quick Sort", "Bubble Sort"],
    sortingAlgorithmChoice: "Sorting",
    arrayToSort: []
  }),

  methods: {
    mergeSort: function() {
      console.log("Received merge");
    },

    quickSort: function() {
      console.log("Received quick");
    },

    bubbleSort: function() {
      let n = this.arrayToSort.length;
      for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n - i; ++j) {
          if (this.arrayToSort[j] < this.arrayToSort[j - 1]) {
            // this.$refs.arrayToSort[j].$el.classList.add("active");
            // this.$refs.arrayToSort[j + 1].$el.classList.add("active");
            let temp = this.arrayToSort[j - 1];
            this.arrayToSort[j - 1] = this.arrayToSort[j];
            this.arrayToSort[j] = temp;
          }
        }
      }
    },

    callSortingAlgorithmFunction: function(event) {
      if (event == "Merge Sort") {
        this.mergeSort();
      } else if (event == "Quick Sort") {
        this.quickSort();
      } else if (event == "Bubble Sort") {
        this.bubbleSort();
      }
    },

    intializeRandomArray: function() {
      this.arrayToSort = [];
      for (let i = 0; i < 52; ++i) {
        this.arrayToSort.push(Math.floor(Math.random() * 55) + 10);
      }
    }
  },

  created() {
    this.intializeRandomArray();
  }
};
</script>

<style scoped>
.active {
  background: green !important;
}
</style>