<template>
  <header class="header">
    <img :src="logo_uni_mainz" :class="['logo', { 'logo-mobile': isMobile }]"/>
    <div :class="['title-container', { 'title-container-mobile': isMobile }]">
      <h1 :class="['title', { 'title-mobile': isMobile }]">
        <span v-if="isMobile">Heart<br />Clusters</span>
        <span v-else>Heart Clusters</span>
      </h1>
    </div>
    <button :class="['popup-button', { 'popup-button-mobile': isMobile }]" @click="showPopup = true">
      About the<br />service
    </button>
  </header>
  <div v-if="showPopup" class="overlay" @click="hidePopup">
    <div class="popup" @click.stop>
      <button class="close-btn" @click="hidePopup">×</button>
      <h2 class="title-popup">About the service</h2>
      <br />
      <p>
        The algorithm begins by analyzing a dataset (either an American or
        European) containing responses from patients to a questionnaire. Using a
        technique called clustering, the algorithm categorizes patients with
        common characteristics into 8 separate groups.
      </p>
      <br />
      <p>
        After the clustering, the algorithm processes your responses to the same
        questionnaire, excluding the question about heart disease. It then
        identifies the cluster to which you are most similar by comparing your
        answers with the clusters formed from the original dataset.
      </p>
      <br />
      <p>
        Finally, we can see how many people have heart disease in your cluster,
        and compare it to the percentage of people with heart disease in the
        whole dataset, determining whether or not you have a high risk of
        developing heart problems.
      </p>
    </div>
  </div>
  <div id="nav">
    <router-link :to="{ name: 'FormUSA' }">American Dataset Form</router-link>
    <router-link :to="{ name: 'FormLiss' }">European Dataset Form</router-link>
    <router-link :to="{ name: 'Dataset_comparison' }"
      >Dataset comparison</router-link
    >
  </div>
  <router-view @formSubmitted="handleFormSubmitted"></router-view>
</template>

<script>
import { isMobile, addResizeListener, removeResizeListener } from "./tools/device";

export default {
  name: "App",
  data() {
    return {
      logo_uni_mainz: require("@/assets/logo_uni_mainz.png"),
      showPopup: true,
      isMobile: isMobile(),
    };
  },
  methods: {
    handleFormSubmitted(data) {
      if (data.Id === "USA") {
        this.$router.push({ name: "ResultUSA", query: { resultData: data } });
      } else if (data.Id === "LISS") {
        this.$router.push({ name: "ResultLiss", query: { resultData: data } });
      }
    },
    hidePopup() {
      this.showPopup = false;
    },
    onResize() {
      this.isMobile = isMobile();
    },
  },
  mounted() {
    addResizeListener(this.onResize);
  },
  beforeDestroy() {
    removeResizeListener(this.onResize);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 0px;
  display: flex;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #c1002a;
  text-decoration: none;
  padding: 10px;
  flex: 1;
  text-align: center;
  border: 2px solid #c1002a;
  background-color: white;
}

#nav a.router-link-exact-active {
  color: white;
  background: #c1002a;
}

body {
  background: #eee;
  margin: 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: start;
  height: 135px;
  padding-right: 20px;
  padding-left: 0px;
  text-align: center;
  position: relative;
}

.logo {
  height: 150px;
  margin-right: 30px;
  margin-bottom: 10px;
}

.logo-mobile {
  height: 100px;
  margin-right: 20px;
  margin-bottom: 10px;
}

.title {
  text-align: center;
}

.title-mobile {
  text-align: center; 
  line-height: 1.5;
  font-size: 24px;
}

.separator_app {
  width: 100%;
  height: 5px;
  background-color: #c1002a;
  margin: 0 0;
}

.head-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #c1002a;
  height: 50px;
  margin-bottom: 10px;
}

.title-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
}

.title-container-mobile {
  position: absolute; 
  text-align: center; 
  left: 0; 
  transform: none; 
}

.info-icon {
  font-size: 1.2em;
}

.popup-button {
  margin-left: auto;
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #c1002a;
  color: white;
  border: none;
  border-radius: 5px;
  position: relative;
  z-index: 100;
  font-weight: bold;
}

.popup-button-mobile {
  margin-left: auto;
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 12px;
  cursor: pointer;
  background-color: #c1002a;
  color: white;
  border: none;
  border-radius: 5px;
  position: relative;
  z-index: 100;
  font-weight: bold;
}

.popup-button:hover {
  background-color: #a11b1b;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  position: relative;
  background: white;
  border: solid 5px #a11b1b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 100%;
  text-align: left;
}

.title-popup {
  text-decoration: underline;
  text-align: center;
}

.popup h2 {
  margin-top: 0;
}

.close-btn {
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  font-size: 34px;
  cursor: pointer;
}
</style>
