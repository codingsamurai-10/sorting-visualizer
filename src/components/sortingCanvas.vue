<template>
  <v-container fluid>
    <v-row>
      <v-col cols="9">
        <v-select
          label="Choose Algorithm"
          append-icon="mdi-chart-bar"
          :items="sortingAlgorithmOptions"
          v-model="sortingAlgorithmChoice"
          color="secondary darken-4"
        ></v-select>
      </v-col>

      <v-col cols="2">
        <v-btn class="secondary darken-3 mt-3 ml-5" @click="callSortingAlgorithmFunction">
          <span>Start sorting</span>
          <v-icon right>mdi-shuffle</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn class="secondary darken-3 pa-0 mt-2" text @click="intializeRandomArray" fab small>
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card :elevation="6" class="pa-2">
      <v-card-title>{{ sortingAlgorithmChoice }} Visualization</v-card-title>
      <v-card
        flat
        color="#1976D2"
        class="d-inline-block mr-2"
        :class="{ active: item.active }"
        width="20px"
        v-for="item in arrayToSort"
        :key="item.id"
        :height="item.value * 10"
        ref="arrayToSort"
      ></v-card>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "SortingCanvas",

  data: () => ({
    sortingAlgorithmOptions: [
      "Merge Sort",
      "Quick Sort",
      "Insertion Sort",
      "Selection Sort",
      "Bubble Sort"
    ],
    sortingAlgorithmChoice: "Sorting",
    arrayToSort: [],
    stopSorting: false,
    algorithmRunning: false
  }),

  methods: {
    async mergeSort() {
      this.algorithmRunning = true;
      console.log("Received merge");
      this.algorithmRunning = false;
    },

    async quickSort() {
      this.algorithmRunning = true;
      console.log("Received quick");
      this.algorithmRunning = false;
    },

    async insertionSort() {
      this.algorithmRunning = true;
      console.log("Received insertion");
      this.algorithmRunning = false;
    },

    async selectionSort() {
      this.algorithmRunning = true;
      let n = this.arrayToSort.length;
      for (let i = 0; i < n - 1; ++i) {
        let min = i;
        for (let j = i + 1; j < n; ++j) {
          this.$set(this.arrayToSort[j], "active", true);
          this.$set(this.arrayToSort[min], "active", true);
          await new Promise(r => setTimeout(r, 10));
          if (this.arrayToSort[j].value < this.arrayToSort[min].value) {
            min = j;
          }
          this.$set(this.arrayToSort[j], "active", false);
          this.$set(this.arrayToSort[min], "active", false);
        }
        let temp = this.arrayToSort[min];
        this.$set(this.arrayToSort, min, this.arrayToSort[i]);
        this.$set(this.arrayToSort, i, temp);
      }
      this.algorithmRunning = false;
    },

    async bubbleSort() {
      this.algorithmRunning = true;
      let n = this.arrayToSort.length;
      for (let i = 1; i < n; ++i) {
        var flag = true;
        for (let j = 0; j < n - i; ++j) {
          this.$set(this.arrayToSort[j], "active", true);
          this.$set(this.arrayToSort[j + 1], "active", true);
          await new Promise(r => setTimeout(r, 100));
          if (this.arrayToSort[j].value > this.arrayToSort[j + 1].value) {
            flag = false;
            let temp = this.arrayToSort[j];
            this.$set(this.arrayToSort, j, this.arrayToSort[j + 1]);
            this.$set(this.arrayToSort, j + 1, temp);
          }
          this.$set(this.arrayToSort[j], "active", false);
          this.$set(this.arrayToSort[j + 1], "active", false);
        }
        if(flag) break;
      }
      this.algorithmRunning = false;
    },

    callSortingAlgorithmFunction: function() {
      if(this.algorithmRunning) {
        // notify using snackbar that an algorithm is already running
        // provide button to terminate the running algorithm
      }
      let event = this.sortingAlgorithmChoice;
      if (event == "Merge Sort") {
        this.mergeSort();
      } else if (event == "Quick Sort") {
        this.quickSort();
      } else if (event == "Insertion Sort") {
        this.insertionSort();
      } else if (event == "Selection Sort") {
        this.selectionSort();
      } else if (event == "Bubble Sort") {
        this.bubbleSort();
      }
    },

    intializeRandomArray: function() {
      if(this.algorithmRunning) {
        // notify using snackbar that an algorithm is already running
        // provide button to terminate the running algorithm
      }
      this.arrayToSort = new Array(52);
      for (let i = 0; i < 52; ++i) {
        this.arrayToSort[i] = {
          value: Math.floor(Math.random() * 55) + 10,
          active: false
        };
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
  background: #4db6ac !important;
}
</style>