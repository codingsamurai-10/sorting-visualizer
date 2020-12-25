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
        <v-btn
          class="secondary darken-3 mt-3 ml-5"
          @click="callSortingAlgorithmFunction"
          :disabled="this.algorithmRunning"
        >
          <span>Start sorting</span>
          <v-icon right>mdi-shuffle</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="1">
        <v-btn
          class="secondary darken-3 pa-0 mt-2"
          text
          @click="intializeRandomArray"
          fab
          small
        >
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-card :elevation="6" class="pa-2">
      <v-card-title>
        <v-row>
          <v-col cols="9">
            <span>{{ sortingAlgorithmChoice }} Visualization</span>
          </v-col>

          <v-spacer></v-spacer>

          <v-col cols="3">
            <v-slider
              v-model="sortingSpeed"
              class="align-center"
              :min="minSortingSpeed"
              :max="maxSortingSpeed"
            >
              <template v-slot:append></template>
            </v-slider>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card
        flat
        class="d-inline-block mr-2"
        width="20px"
        v-for="item in arrayToSort"
        :key="item.id"
        :height="item.value * 10"
        :color="item.color"
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
      "Insertion Sort",
      "Selection Sort",
      "Bubble Sort",
    ],
    sortingAlgorithmChoice: "Sorting",
    arrayToSort: [],
    stopSorting: false,
    algorithmRunning: false,
    snackbar: false,
    minSortingSpeed: 5,
    maxSortingSpeed: 500,
    sortingSpeed: 450,
    colorOfDefaultBar: "#1976D2",
    colorOfCurrentActiveBar: "#4db6ac",
    colorOfCurrentInactiveBar: "red",
  }),

  methods: {
    async mergeSort() {
      console.log("Received merge");
    },

    async quickSort() {
      console.log("Received quick");
    },

    async insertionSort() {
      let n = this.arrayToSort.length;
      for (let i = 1; i < n; ++i) {
        for (let j = i - 1; j >= 0; --j) {
          this.$set(this.arrayToSort[j], "color", this.colorOfCurrentActiveBar);
          this.$set(
            this.arrayToSort[j + 1],
            "color",
            this.colorOfCurrentInactiveBar
          );
          await new Promise((r) => {
            let timeout = setTimeout(
              r,
              this.minSortingSpeed + this.maxSortingSpeed - this.sortingSpeed
            );
            if(!this.algorithmRunning) clearTimeout(timeout);
          });
          if (this.arrayToSort[j].value > this.arrayToSort[j + 1].value) {
            let temp = this.arrayToSort[j];
            this.$set(this.arrayToSort, j, this.arrayToSort[j + 1]);
            this.$set(this.arrayToSort, j + 1, temp);
          } else {
            this.$set(this.arrayToSort[j], "color", this.colorOfDefaultBar);
            this.$set(this.arrayToSort[j + 1], "color", this.colorOfDefaultBar);
            break;
          }
          this.$set(this.arrayToSort[j], "color", this.colorOfDefaultBar);
          this.$set(this.arrayToSort[j + 1], "color", this.colorOfDefaultBar);
        }
      }
    },

    async selectionSort() {
      let n = this.arrayToSort.length;
      for (let i = 0; i < n - 1; ++i) {
        let min = i;
        for (let j = i + 1; j < n; ++j) {
          this.$set(
            this.arrayToSort[j],
            "color",
            this.colorOfCurrentInactiveBar
          );
          this.$set(
            this.arrayToSort[min],
            "color",
            this.colorOfCurrentActiveBar
          );
          await new Promise((r) => {
            let timeout = setTimeout(
              r,
              this.minSortingSpeed + this.maxSortingSpeed - this.sortingSpeed
            );
            if(!this.algorithmRunning) clearTimeout(timeout);
          });
          if (this.arrayToSort[j].value < this.arrayToSort[min].value) {
            min = j;
          }
          this.$set(this.arrayToSort[j], "color", this.colorOfDefaultBar);
          this.$set(this.arrayToSort[min], "color", this.colorOfDefaultBar);
        }
        let temp = this.arrayToSort[min];
        this.$set(this.arrayToSort, min, this.arrayToSort[i]);
        this.$set(this.arrayToSort, i, temp);
      }
    },

    async bubbleSort() {
      let n = this.arrayToSort.length;
      for (let i = 1; i < n; ++i) {
        var flag = true;
        for (let j = 0; j < n - i; ++j) {
          this.$set(
            this.arrayToSort[j],
            "color",
            this.colorOfCurrentInactiveBar
          );
          this.$set(
            this.arrayToSort[j + 1],
            "color",
            this.colorOfCurrentActiveBar
          );
          await new Promise((r) => {
            let timeout = setTimeout(
              r,
              this.minSortingSpeed + this.maxSortingSpeed - this.sortingSpeed
            );
            if(!this.algorithmRunning) clearTimeout(timeout);
          });
          if (this.arrayToSort[j].value > this.arrayToSort[j + 1].value) {
            flag = false;
            let temp = this.arrayToSort[j];
            this.$set(this.arrayToSort, j, this.arrayToSort[j + 1]);
            this.$set(this.arrayToSort, j + 1, temp);
          }
          this.$set(this.arrayToSort[j], "color", this.colorOfDefaultBar);
          this.$set(this.arrayToSort[j + 1], "color", this.colorOfDefaultBar);
        }
        if (flag) break;
      }
    },

    async callSortingAlgorithmFunction() {
      let event = this.sortingAlgorithmChoice;
      this.algorithmRunning = true;
      if (event == "Merge Sort") {
        this.mergeSort();
      } else if (event == "Quick Sort") {
        this.quickSort();
      } else if (event == "Insertion Sort") {
        await this.insertionSort();
      } else if (event == "Selection Sort") {
        await this.selectionSort();
      } else if (event == "Bubble Sort") {
        await this.bubbleSort();
      }
      this.algorithmRunning = false;
    },

    intializeRandomArray: function () {
      this.algorithmRunning = false;
      this.arrayToSort = new Array(52);
      for (let i = 0; i < 52; ++i) {
        this.arrayToSort[i] = {
          value: Math.floor(Math.random() * 55) + 10,
          color: this.colorOfDefaultBar,
        };
      }
    },
  },

  created() {
    this.intializeRandomArray();
  },
};
</script>