<template>
  <v-container fluid>
    <v-row>
      <!-- Selection of algorithm -->
      <v-col cols="9">
        <v-select
          label="Choose Algorithm"
          append-icon="mdi-chart-bar"
          color="secondary darken-4"
          v-model="sortingAlgorithmChoice"
          :items="sortingAlgorithmOptions"
        ></v-select>
      </v-col>

      <!-- Start sorting button -->
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

      <!-- Re-initialize random array -->
      <v-col cols="1">
        <v-btn
          text
          fab
          small
          class="secondary darken-3 pa-0 mt-2"
          @click="initializeRandomArray"
        >
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-2" :elevation="6">
          <v-row>
            <v-col cols="12">
              <v-card-title>
                <!-- Heading of selected algorithm -->
                <v-col cols="9">
                  <span>{{ sortingAlgorithmChoice }} Visualization</span>
                </v-col>

                <!-- Speed control -->
                <v-col cols="3">
                  <v-slider
                    v-model="currentSortingSpeed"
                    :min="minSortingSpeed"
                    :max="maxSortingSpeed"
                  >
                  </v-slider>
                </v-col>
              </v-card-title>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <!-- Vertical bars -->
              <v-card
                flat
                class="d-inline-block mr-2"
                width="20px"
                v-for="item in arrayToSort"
                :key="item.id"
                :height="item.value * 10"
                :color="item.color"
              ></v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { insertionSort } from '../sorting_algorithms/insertionSort';
import { selectionSort } from '../sorting_algorithms/selectionSort';
import { bubbleSort } from '../sorting_algorithms/bubbleSort';

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
    algorithmRunning: false,
    minSortingSpeed: 5,
    maxSortingSpeed: 500,
    currentSortingSpeed: 450,
    colorOfDefaultBar: "#1976D2",
    colorOfBarOneBeingCompared: "#4db6ac",
    colorOfBarTwoBeingCompared: "pink",
  }),

  created() {
    this.initializeRandomArray();
  },

  methods: {
    initializeRandomArray() {
      this.algorithmRunning = false;
      this.arrayToSort = new Array(52);
      for (let i = 0; i < 52; ++i) {
        this.arrayToSort[i] = {
          value: Math.floor(Math.random() * 55) + 10,
          color: this.colorOfDefaultBar,
          id: i + 1,
        };
      }
    },

    async callSortingAlgorithmFunction() {
      this.algorithmRunning = true;
      switch (this.sortingAlgorithmChoice) {
        case "Insertion Sort":
          await insertionSort(this);
          break;
        case "Selection Sort":
          await selectionSort(this);
          break;
        case "Bubble Sort":
          await bubbleSort(this);
          break;
      }
      this.algorithmRunning = false;
    },

    resetBarColors() {
      for (let i = 0; i < this.arrayToSort.length; ++i) {
        this.$set(this.arrayToSort[i], "color", this.colorOfDefaultBar);
      }
    },

    async addExplicitWaitingTime() {
      await new Promise((r) => {
        let timeout = setTimeout(
          r,
          this.minSortingSpeed + this.maxSortingSpeed - this.currentSortingSpeed
        );
        if (!this.algorithmRunning) {
          clearTimeout(timeout);
          this.resetBarColors();
        }
      });
    },

    changeColourOfBar(index, colorCode = 0) {
      let color;
      if (colorCode == 0) color = this.colorOfDefaultBar;
      else if (colorCode == 1) color = this.colorOfBarOneBeingCompared;
      else color = this.colorOfBarTwoBeingCompared;
      this.$set(this.arrayToSort[index], "color", color);
    },
  },
};
</script>