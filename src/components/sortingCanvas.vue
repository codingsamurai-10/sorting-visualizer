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
        <v-btn class="secondary darken-3 mt-3" @click="callSortingAlgorithmFunction">
          <span>Start sorting</span>
          <v-icon right>mdi-shuffle</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn class="secondary darken-3 pa-0" text @click="intializeRandomArray" fab>
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
    sortingAlgorithmOptions: ["Merge Sort", "Quick Sort", "Bubble Sort"],
    sortingAlgorithmChoice: "Sorting",
    arrayToSort: [],
    stopSorting: false
  }),

  methods: {
    mergeSort: function() {
      console.log("Received merge");
    },

    quickSort: function() {
      console.log("Received quick");
    },

    async bubbleSort() {
      let n = this.arrayToSort.length;
      for (let i = 1; i < n; ++i) {
        for (let j = 0; j < n - i; ++j) {
          this.$set(this.arrayToSort[j], "active", true);
          this.$set(this.arrayToSort[j + 1], "active", true);
          await new Promise(r => setTimeout(r, 100));
          if (this.arrayToSort[j].value > this.arrayToSort[j + 1].value) {
            let temp = this.arrayToSort[j];
            this.$set(this.arrayToSort, j, this.arrayToSort[j + 1]);
            this.$set(this.arrayToSort, j + 1, temp);
          }
          this.$set(this.arrayToSort[j], "active", false);
          this.$set(this.arrayToSort[j + 1], "active", false);
        }
      }
    },

    callSortingAlgorithmFunction: function() {
      let event = this.sortingAlgorithmChoice;
      if (event == "Merge Sort") {
        this.mergeSort();
      } else if (event == "Quick Sort") {
        this.quickSort();
      } else if (event == "Bubble Sort") {
        this.bubbleSort();
      }
    },

    intializeRandomArray: function() {
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
  background: #4DB6AC !important;
}
</style>