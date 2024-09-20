<template>
  <div class="container">
    <div :class="['frame-text', { mobile: isMobile }]" ref="frame-text">
      <h2 class="underlined">American dataset</h2>
      <br />
      <p>
        The american dataset was published by the Centers for Disease Control
        and Prevention (CDC), and is a major part of the Behavioral Risk Factor
        Surveillance System (BRFSS), which conducts annual telephone surveys to
        collect data on the health status of United States residents. The
        dataset contains the data of more than 300.000 patients. It includes
        information such as their age, gender, a mental health score, whether
        they smoke/drink or not etc...
      </p>
      <img :src="imageUSA" class="centered-image" />
      <figcaption>Figure 1: Extract from the american dataset</figcaption>
    </div>
  </div>
  <div class="separator"></div>
  <div class="container">
    <div :class="['frame-text', { mobile: isMobile }]" ref="frame-text">
      <h2 class="underlined">European dataset</h2>
      <br />
      <p>
        The European dataset was published by the Longitudinal Internet Studies
        for the Social Sciences (LISS Panel), a data collection project based in
        the Netherlands. Managed by Centerdata at Tilburg University, it gathers
        a diverse array of longitudinal data through an online survey system.
        This panel includes a representative sample of the Dutch population,
        ensuring the findings are robust and applicable to general societal
        trends. The dataset used in this project was the compilation of all the
        surveys done by LISS Panel between about health, between 2008 and 2023.
        However, the whole study contains about 200 fields for the patient to
        fill, and we decided to only keep 30: the ones that are in the american
        dataset, and a few more revelant to the devlopment of heart disease.
      </p>
      <img :src="imageLISS" class="centered-image" />
      <figcaption>Figure 2: Extract from the european dataset</figcaption>
    </div>
  </div>
  <div class="separator"></div>
  <div class="container">
    <div :class="['frame-text', { mobile: isMobile }]" ref="frame-text">
      <h2 class="underlined">Comparison</h2>
      <br />
      <p>
        Initially, we planned to only use the American dataset to the clustering
        and analysis, but realized during the testing phase that all the people
        who tried he service ended up in a healthy cluster. This is due to
        Americans generally having poorer health compared to Europeans (as you
        can see in the statistics below). By including the same service with a
        European dataset, we aim to achieve a more balanced analysis to detect
        risks of heart disease.
      </p>
    </div>
  </div>
  <v-container fluid class="pa-0">
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
              :model-value="perc_USA[index]"
              color="info"
              background-color="info lighten-4"
              height="10"
              rounded
            ></v-progress-linear>
            <p class="lin-bar">American dataset ({{ perc_USA[index] }}%)</p>
            <v-progress-linear
              :model-value="perc_LISS[index]"
              color="success"
              background-color="success lighten-4"
              height="10"
              rounded
            ></v-progress-linear>
            <p class="lin-bar">European dataset ({{ perc_LISS[index] }}%)</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row dense class="ma-0 pa-4">
      <v-col cols="12" md="4" class="ph-4">
        <div class="stat-frame">
          <v-chart
            :option="getChartOptions(0)"
            style="width: 100%; height: 400px"
          />
        </div>
      </v-col>
      <v-col cols="12" md="4" class="ph-4">
        <div class="stat-frame">
          <h3 class="stat-title">{{ perc_names[6] }}</h3>
          <v-progress-linear
            :model-value="perc_USA[6]"
            color="info"
            background-color="info lighten-4"
            height="10"
            rounded
          ></v-progress-linear>
          <p class="lin-bar">American dataset ({{ perc_USA[6] }}%)</p>
          <v-progress-linear
            :model-value="perc_LISS[6]"
            color="success"
            background-color="success lighten-4"
            height="10"
            rounded
          ></v-progress-linear>
          <p class="lin-bar">European dataset ({{ perc_LISS[6] }}%)</p>
        </div>
      </v-col>
      <v-col cols="12" md="4" class="ph-4">
        <div class="stat-frame">
          <v-chart
            :option="getChartOptions(1)"
            style="width: 100%; height: 400px"
          />
        </div>
      </v-col>
    </v-row>
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
      imageUSA: require("@/assets/USA_dataset_extract.png"),
      imageLISS: require("@/assets/LISS_dataset_extract.png"),
      index_perc: [0, 1, 2, 3, 4, 5],
      index_means: [0, 1],
      perc_names: [
        "Recently suffered from heart disease",
        "Smoker",
        "Heavy alcohol drinker",
        "Have had a stroke",
        "Have difficulty walking",
        "Diabetic",
        "Have asthma",
      ],
      means_names: ["BMI", "How would you describe your general health ?"],
      hist_names: ["Average BMI", "Average grade out of 4"],
      perc_USA: [8.53, 41.25, 6.82, 3.78, 13.91, 13.93, 13.41],
      perc_LISS: [2.54, 22.29, 13.57, 1.06, 6.1, 5.33, 4.51],
      means_USA: [28.33, 2.6],
      means_LISS: [25.61, 2.12],
      isMobile: isMobile(),
    };
  },
  computed: {
    chunkedProgressIndices() {
      const chunkSize = 3;
      const result = [];
      for (let i = 0; i < this.index_perc.length; i += chunkSize) {
        result.push(this.index_perc.slice(i, i + chunkSize));
      }
      return result;
    },
  },
  methods: {
    onResize() {
      this.isMobile = isMobile();
    },
    getEmptyCols(length) {
      const totalCols = 12;
      const occupiedCols = length * 4;
      const emptyCols = totalCols - occupiedCols;
      return emptyCols / 2;
    },
    getChartOptions(index) {
      const chartStyles = [
        { min: 0, max: undefined },
        {
          min: 0,
          max: 4,
          formatter: (value) =>
            ["Poor", "Fair", "Good", "Very Good", "Excellent"][value] || value,
        },
      ];
      const style = chartStyles[index % chartStyles.length];
      return {
        title: {
          text: `${this.means_names[index]}`,
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
          data: ["American Dataset", "European Dataset"],
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
            data: [this.means_USA[index], this.means_LISS[index]],
            itemStyle: {
              color: function (params) {
                const colors = ["#1976D2", "#4CAF50"];
                return colors[params.dataIndex];
              },
            },
          },
        ],
      };
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

.frame-text {
  width: 70%;
  padding: 10px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.frame-text.mobile {
  width: 100%;
  padding: 10px;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  margin-left: 10px;
  border-radius: 10px;
}

.stat-frame {
  width: 100%;
  border: 1px solid #000;
  padding: 10px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
}

.underlined {
  text-decoration: underline;
  text-align: center;
}

.centered-image {
  display: block;
  margin: 0 auto;
  width: 100%;
  margin-top: 20px;
}

.separator {
  width: 100%;
  height: 2px;
  background-color: #000;
  margin: 0 0;
}

.lin-bar {
  margin-bottom: 10px;
}

.stat-title {
  margin-bottom: 20px;
}

.ph-4 {
  padding-left: 16px !important;
  padding-right: 16px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

figcaption {
  margin-top: 5px;
  font-style: italic;
  font-size: 0.9em;
  text-align: center;
}
</style>
