<template>
  <br />
  <h2 class="underlined">Results</h2>
  <div class="container">
    <div :class="['frame', { mobile: isMobile }]" ref="frame">
      <div v-for="(item, index) in formattedAnalysis" :key="index">
        <span v-html="item"></span>
      </div>
    </div>
    <br />
  </div>
  <v-container fluid class="pa-0">
    <v-container class="centered-container">
      <div class="key-statistics-header">
        <h2 class="underlined">Key statistics</h2>
      </div>
    </v-container>
    <br />
    <div v-for="(chunk, rowIndex) in chunkedProgressIndices" :key="rowIndex">
      <v-row dense class="ma-0 pa-4">
        <v-col
          v-if="
            rowIndex === chunkedProgressIndices.length - 1 && chunk.length < 3
          "
          :cols="getEmptyCols(chunk.length)"
          class="pa-0"
        ></v-col>
        <v-col
          v-for="index in chunk"
          :key="index"
          cols="12"
          md="4"
          class="ph-4"
        >
          <div class="stat-frame">
            <h3 class="stat-title">{{ perc_names[index] }}</h3>
            <v-progress-linear
              :model-value="resultData.perc_centroid[index]"
              :color="
                resultData.perc_centroid[index] > resultData.perc_dataset[index]
                  ? 'red'
                  : 'green'
              "
              :background-color="
                resultData.perc_centroid[index] > resultData.perc_dataset[index]
                  ? '#f8d7da'
                  : '#d4edda'
              "
              height="10"
              rounded
            ></v-progress-linear>
            <p class="lin-bar">
              Your cluster ({{ resultData.perc_centroid[index] }}%)
            </p>
            <v-progress-linear
              :model-value="resultData.perc_dataset[index]"
              color="primary"
              background-color="primary lighten-4"
              height="10"
              rounded
            ></v-progress-linear>
            <p class="lin-bar">
              Dataset ({{ resultData.perc_dataset[index] }}%)
            </p>
          </div>
        </v-col>
        <v-col
          v-if="
            rowIndex === chunkedProgressIndices.length - 1 && chunk.length === 1
          "
          cols="8"
          class="pa-0"
        ></v-col>
        <v-col
          v-if="
            rowIndex === chunkedProgressIndices.length - 1 && chunk.length === 2
          "
          cols="4"
          class="pa-0"
        ></v-col>
      </v-row>
    </div>
    <br />
    <h2 class="underlined">Other statistics</h2>
    <br />
    <div v-if="real_index_list_means.length > 0">
      <div
        v-for="(chunk, rowIndex) in chunkedHistogramIndices"
        :key="`histogram-${rowIndex}`"
      >
        <v-row dense class="ma-0 pa-4">
          <v-col
            v-if="
              rowIndex === chunkedHistogramIndices.length - 1 &&
              chunk.length < 3
            "
            :cols="getEmptyCols(chunk.length)"
            class="pa-0"
          ></v-col>
          <v-col
            v-for="index in chunk"
            :key="`histogram-${index}`"
            cols="12"
            md="4"
            class="ph-4"
          >
            <div class="stat-frame">
              <v-chart
                :option="getChartOptions(index)"
                style="width: 100%; height: 400px"
              />
            </div>
          </v-col>
          <v-col
            v-if="
              rowIndex === chunkedHistogramIndices.length - 1 &&
              chunk.length === 1
            "
            cols="8"
            class="pa-0"
          ></v-col>
          <v-col
            v-if="
              rowIndex === chunkedHistogramIndices.length - 1 &&
              chunk.length === 2
            "
            cols="4"
            class="pa-0"
          ></v-col>
        </v-row>
      </div>
    </div>
  </v-container>
</template>

<script>
import {
  isMobile,
  addResizeListener,
  removeResizeListener,
} from "../tools/device";
import { defineComponent } from "vue";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import VueECharts from "vue-echarts";

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
]);

export default defineComponent({
  components: {
    VChart: VueECharts,
  },
  data() {
    return {
      resultData: null,
      real_index_list_means: [0, 1, 2, 3, 4, 5],
      hist_names: [
        "Average BMI",
        "Average number of days",
        "Average number of days",
        "Average age",
        "Average grade out of 4",
        "Average of hours slept",
      ],
      perc_names: [
        "Currently have a heart disease",
        "Smoker",
        "Heavy alcohol drinker",
        "Have had a stroke",
        "Have difficulty walking",
        "Male",
        "Diabetic",
        "Don't do physical activity",
        "Have asthma",
        "Have had a kidney disease",
        "Have had a skin cancer",
      ],
      means_names: [
        "BMI",
        "For how many days during the past 30 days was your physical health not good ?",
        "For how many days during the past 30 days was your mental health not good ?",
        "Age",
        "General Health",
        "Sleep Time",
      ],
      isMobile: isMobile(),
    };
  },
  created() {
    const data = this.$route.query.data;
    if (data) {
      try {
        this.resultData = JSON.parse(data);
        this.cleanURL();
      } catch (error) {
        console.error("Failed to parse JSON data:", error);
      }
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    formattedAnalysis() {
      return this.resultData.analysis.map((item) => this.formatText(item));
    },
    chunkedProgressIndices() {
      const chunkSize = 3;
      const result = [];
      for (
        let i = 0;
        i < this.resultData.index_list_perc.length;
        i += chunkSize
      ) {
        result.push(this.resultData.index_list_perc.slice(i, i + chunkSize));
      }
      return result;
    },
    chunkedHistogramIndices() {
      const chunkSize = 3;
      const result = [];
      for (let i = 0; i < this.real_index_list_means.length; i += chunkSize) {
        result.push(this.real_index_list_means.slice(i, i + chunkSize));
      }
      return result;
    },
  },
  methods: {
    cleanURL() {
      // Replace the URL without query parameters
      const { query, ...cleanedRoute } = this.$route;
      this.$router.replace({ path: this.$route.path });
    },
    formatText(text) {
      const phrasesToBold = [
        "high risk of heart disease.",
        "low risk of heart disease.",
        "moderate risk of heart disease.",
      ];
      let formattedText = text;
      phrasesToBold.forEach((phrase) => {
        const regex = new RegExp(`(${phrase})`, "gi");
        formattedText = formattedText.replace(regex, "<strong>$1</strong>");
      });
      return formattedText;
    },
    onResize() {
      this.isMobile = isMobile();
    },
    getChartOptions(index) {
      const chartStyles = [
        { min: 0, max: undefined },
        { min: 0, max: 30, formatter: (value) => `${value} days` },
        { min: 0, max: 30, formatter: (value) => `${value} days` },
        { min: 0, max: undefined, formatter: (value) => `${value} yo` },
        {
          min: 0,
          max: 4,
          formatter: (value) =>
            ["Poor", "Fair", "Good", "Very Good", "Excellent"][value] || value,
        },
        { min: 0, max: undefined, formatter: (value) => `${value}h` },
      ];
      const style = chartStyles[index % chartStyles.length];
      const wrapText = (text, maxLineLength) => {
        const words = text.split(" ");
        let line = "";
        const lines = [];

        for (const word of words) {
          if (line.length + word.length > maxLineLength) {
            lines.push(line);
            line = word;
          } else {
            line += (line.length ? " " : "") + word;
          }
        }
        lines.push(line); // Add last line

        return lines.join("\n"); // Join lines with line breaks
      };

      const maxLineLength = 45; // Define max length for each line
      const wrappedTitle = wrapText(this.means_names[index], maxLineLength);
      return {
        title: {
          text: wrappedTitle,
          textStyle: {
            lineHeight: 20,
            textAlign: "center",
          },
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["Your cluster", "Dataset"],
        },
        yAxis: {
          type: "value",
          min: style.min,
          max: style.max,
          axisLabel: {
            formatter: style.formatter,
          },
        },
        series: [
          {
            name: this.hist_names[index],
            type: "bar",
            data: [
              this.resultData.means_centroid[index].toFixed(2),
              this.resultData.means_dataset[index].toFixed(2),
            ],
            itemStyle: {
              color: function (params) {
                const primaryColor = "#1976D2";
                return primaryColor;
              },
            },
          },
        ],
      };
    },
    getEmptyCols(length) {
      const totalCols = 12;
      const occupiedCols = length * 4;
      const emptyCols = totalCols - occupiedCols;
      return emptyCols / 2;
    },
  },
  mounted() {
    addResizeListener(this.onResize);
  },
  beforeDestroy() {
    removeResizeListener(this.onResize);
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.frame {
  width: 70%;
  border: 1px solid #000;
  padding: 10px;
  padding-left: 300px;
  text-align: left;
  background-color: white;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 100px;
  margin-left: 100px;
  border-radius: 10px;
}

.frame.mobile {
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
  text-align: left;
  background-color: white;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-right: 30px;
  margin-left: 30px;
  border-radius: 10px;
}

.underlined {
  text-decoration: underline;
}

.stat-title {
  margin-bottom: 20px;
}

.lin-bar {
  margin-bottom: 10px;
}

.stat-frame {
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
}
.centered-container {
  display: flex;
  justify-content: center;
}

.key-statistics-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ph-4 {
  padding-left: 16px !important;
  padding-right: 16px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
</style>
