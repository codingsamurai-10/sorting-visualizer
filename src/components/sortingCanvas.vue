<template>
  <v-container fluid>
    <v-snackbar v-model="snackbar">
      A sorting algorithm is already running. Do you want to terminate it?
      <template
        v-slot:action="{ attrs }"
      >
        <v-btn color="pink" @click="algorithmRunning = false">Yes</v-btn>
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">No</v-btn>
      </template>
    </v-snackbar>

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
      "Merge Sort",
      "Quick Sort",
      "Insertion Sort",
      "Selection Sort",
      "Bubble Sort"
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
    colorOfCurrentInactiveBar: "red"
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
      let n = this.arrayToSort.length;
      for (let i = 1; i < n; ++i) {
        for (let j = i - 1; j >= 0; --j) {
          this.$set(this.arrayToSort[j], "color", this.colorOfCurrentActiveBar);
          this.$set(
            this.arrayToSort[j + 1],
            "color",
            this.colorOfCurrentInactiveBar
          );
          await new Promise(r =>
            setTimeout(
              r,
              this.minSortingSpeed + this.maxSortingSpeed - this.sortingSpeed
            )
          );
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
      this.algorithmRunning = false;
    },

    async selectionSort() {
      this.algorithmRunning = true;
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
          await new Promise(r =>
            setTimeout(
              r,
              this.minSortingSpeed + this.maxSortingSpeed - this.sortingSpeed
            )
          );
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
      this.algorithmRunning = false;
    },

    async bubbleSort() {
      // TODO: handle multiple algorithms running at same time
      // Possible code <notworking> to achieve the above
      // if(this.algorithmRunning) {
      //   this.snackbar = true;
      //   await new Promise(snackbarDelay => setTimeout(snackbarDelay, 5000)).then(() => {
      //     if(this.algorithmRunning) console.log("yeah, still sucks");
      //   });
      // }
      this.algorithmRunning = true;
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
          await new Promise(r =>
            setTimeout(
              r,
              this.minSortingSpeed + this.maxSortingSpeed - this.sortingSpeed
            )
          );
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
      this.algorithmRunning = false;
    },

    callSortingAlgorithmFunction: function() {
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
      this.arrayToSort = new Array(52);
      for (let i = 0; i < 52; ++i) {
        this.arrayToSort[i] = {
          value: Math.floor(Math.random() * 55) + 10,
          color: this.colorOfDefaultBar
        };
      }
    }
  },

  created() {
    this.intializeRandomArray();
  }
};
</script>