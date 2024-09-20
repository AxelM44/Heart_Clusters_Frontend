<template>
  <br />
  <form @submit.prevent="submit">
    <div class="form-container" :class="{ 'single-column': isMobile }">
      <div class="left-column">
        <div>
          <div class="form-group" v-if="!isMobile">
            <v-container class="mt-4 pa-0">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="Height.value.value"
                    v-bind="Height.attrs"
                    ref="HeightRef"
                    :error-messages="
                      Height.meta.touched ? Height.errorMessage.value : []
                    "
                    label="Height (cm)"
                    @blur="Height.meta.touched = true"
                    @keydown.enter.prevent=""
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="Weight.value.value"
                    v-bind="Weight.attrs"
                    ref="WeightRef"
                    :error-messages="
                      Weight.meta.touched ? Weight.errorMessage.value : []
                    "
                    label="Weight (kg)"
                    @blur="Weight.meta.touched = true"
                    @keydown.enter.prevent=""
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div class="form-group" v-else>
            <v-text-field
              v-model="Height.value.value"
              v-bind="Height.attrs"
              ref="HeightRef"
              :error-messages="
                Height.meta.touched ? Height.errorMessage.value : []
              "
              label="Height (cm)"
              @blur="Height.meta.touched = true"
              @keydown.enter.prevent=""
            ></v-text-field>
            <v-text-field
              v-model="Weight.value.value"
              v-bind="Weight.attrs"
              ref="WeightRef"
              :error-messages="
                Weight.meta.touched ? Weight.errorMessage.value : []
              "
              label="Weight (kg)"
              @blur="Weight.meta.touched = true"
              @keydown.enter.prevent=""
            ></v-text-field>
          </div>
        </div>
        <div class="form-group">
          <v-select
            v-model="Age.value.value"
            v-bind="Age.attrs"
            ref="AgeRef"
            label="Age"
            :error-messages="Age.errorMessage.value"
            :items="[
              '18-24',
              '25-29',
              '30-34',
              '35-39',
              '40-44',
              '45-49',
              '50-54',
              '55-59',
              '60-64',
              '65-69',
              '70-74',
              '75-79',
              '80 or older',
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <v-select
            label="Sex"
            v-bind="Sex.attrs"
            ref="SexRef"
            v-model="Sex.value.value"
            :error-messages="Sex.errorMessage.value"
            :items="['Male', 'Female', 'Other']"
          ></v-select>
        </div>
        <div class="form-group">
          <label>
            Thinking about your physical health, which includes physical illness and
            injury, for how many days during the past 30 days was your physical
            health not good ?
          </label>
          <v-select
            label="Physical Health"
            v-bind="PhysicalHealth.attrs"
            ref="PhysicalHealthRef"
            v-model="PhysicalHealth.value.value"
            :error-messages="PhysicalHealth.errorMessage.value"
            :items="[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <label>
            Thinking about your mental health, which includes stress,
            depression, and problems with emotions, for how many days during the
            past 30 days was your mental health not good ?
          </label>
          <v-select
            label="Mental Health"
            v-bind="MentalHealth.attrs"
            ref="MentalHealthRef"
            v-model="MentalHealth.value.value"
            :error-messages="MentalHealth.errorMessage.value"
            :items="[
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <label>Are you diabetic ?</label>
          <v-select
            label="Diabetes"
            v-bind="Diabetes.attrs"
            ref="DiabetesRef"
            v-model="Diabetes.value.value"
            :error-messages="Diabetes.errorMessage.value"
            :items="['Yes', 'No', 'No, borderline diabetes']"
          ></v-select>
        </div>
        <div :class="{ 'no-border': !isMobile }" class="form-group">
          <label>
            On average, how many hours of sleep do you get per day ?
          </label>
          <v-text-field
            v-model="Sleeptime.value.value"
            v-bind="Sleeptime.attrs"
            ref="SleeptimeRef"
            :error-messages="
              Sleeptime.meta.touched ? Sleeptime.errorMessage.value : []
            "
            label="Sleeptime"
            @blur="Sleeptime.meta.touched = true"
            @keydown.enter.prevent=""
          ></v-text-field>
        </div>
      </div>
      <div class="divider" v-if="!isMobile"></div>
      <div class="right-column">
        <div class="form-group">
          <label for="GenHealth"
            >How would you describe your general health ?</label
          >
          <v-select
            label="General Health"
            v-bind="GenHealth.attrs"
            ref="GenHealthRef"
            v-model="GenHealth.value.value"
            :error-messages="GenHealth.errorMessage.value"
            :items="['Excellent', 'Very good', 'Good', 'Fair', 'Poor']"
          ></v-select>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': Smoking.errorMessage.value }"
        >
          <label
            >Have you smoked at least 100 cigarettes in your entire life
            ?</label
          >
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="Smoking.value.value"
                value="yes"
                class="radio-input"
                ref="SmokingRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="Smoking.value.value"
                value="no"
                class="radio-input"
                ref="SmokingRef"
              />No</label
            >
          </div>
          <span v-if="Smoking.errorMessage.value" class="error-message">{{
            Smoking.errorMessage.value
          }}</span>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': AlcoholDrinking.errorMessage.value }"
        >
          <label
            >Are you a heavy drinker (adult men having more than 14 drinks per
            week and adult women having more than 7 drinks per week) ?</label
          >
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="AlcoholDrinking.value.value"
                value="yes"
                class="radio-input"
                ref="AlcoholDrinkingRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="AlcoholDrinking.value.value"
                value="no"
                class="radio-input"
                ref="AlcoholDrinkingRef"
              />No</label
            >
          </div>
          <span
            v-if="AlcoholDrinking.errorMessage.value"
            class="error-message"
            >{{ AlcoholDrinking.errorMessage.value }}</span
          >
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': PhysicalActivity.errorMessage.value }"
        >
          <label
            >Have you done any physical activity during the past 30 days other
            than your regular job ?</label
          >
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="PhysicalActivity.value.value"
                value="yes"
                class="radio-input"
                ref="PhysicalActivityRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="PhysicalActivity.value.value"
                value="no"
                class="radio-input"
                ref="PhysicalActivityRef"
              />No</label
            >
          </div>
          <span
            v-if="PhysicalActivity.errorMessage.value"
            class="error-message"
            >{{ PhysicalActivity.errorMessage.value }}</span
          >
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': DiffWalking.errorMessage.value }"
        >
          <label
            >Do you have serious difficulty walking or climbing stairs ?
          </label>
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="DiffWalking.value.value"
                value="yes"
                class="radio-input"
                ref="DiffWalkingRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="DiffWalking.value.value"
                value="no"
                class="radio-input"
                ref="DiffWalkingRef"
              />No</label
            >
          </div>
          <span v-if="DiffWalking.errorMessage.value" class="error-message">{{
            DiffWalking.errorMessage.value
          }}</span>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': Asthma.errorMessage.value }"
        >
          <label>Do you have asthma ?</label>
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="Asthma.value.value"
                value="yes"
                class="radio-input"
                ref="AsthmaRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="Asthma.value.value"
                value="no"
                class="radio-input"
                ref="AsthmaRef"
              />No</label
            >
          </div>
          <span v-if="Asthma.errorMessage.value" class="error-message">{{
            Asthma.errorMessage.value
          }}</span>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': KidneyDisease.errorMessage.value }"
        >
          <label
            >Not including kidney stones, bladder or incontinence, have you ever
            had kidney disease ?</label
          >
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="KidneyDisease.value.value"
                value="yes"
                class="radio-input"
                ref="KidneyDiseaseRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="KidneyDisease.value.value"
                value="no"
                class="radio-input"
                ref="KidneyDiseaseRef"
              />No</label
            >
          </div>
          <span v-if="KidneyDisease.errorMessage.value" class="error-message">{{
            KidneyDisease.errorMessage.value
          }}</span>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': Stroke.errorMessage.value }"
        >
          <label>Have you ever had a stroke ? </label>
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="Stroke.value.value"
                value="yes"
                class="radio-input"
                ref="StrokeRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="Stroke.value.value"
                value="no"
                class="radio-input"
                ref="StrokeRef"
              />No</label
            >
          </div>
          <span v-if="Stroke.errorMessage.value" class="error-message">{{
            Stroke.errorMessage.value
          }}</span>
        </div>
        <div
          class="form-group no-border"
          :class="{
            'has-error': SkinCancer.errorMessage.value,
          }"
        >
          <label>Have you ever had skin cancer ? </label>
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="SkinCancer.value.value"
                value="yes"
                class="radio-input"
                ref="SkinCancerRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="SkinCancer.value.value"
                value="no"
                class="radio-input"
                ref="SkinCancerRef"
              />No</label
            >
          </div>
          <span v-if="SkinCancer.errorMessage.value" class="error-message">{{
            SkinCancer.errorMessage.value
          }}</span>
        </div>
      </div>
      <v-btn class="submit-btn" type="submit">Submit</v-btn>
    </div>
  </form>
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script setup>
import { useField, useForm } from "vee-validate";
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as yup from "yup";
import router from "../router";
import {
  isMobile as checkIfMobile,
  addResizeListener,
  removeResizeListener,
} from "../tools/device";

const { handleSubmit } = useForm({
  validationSchema: yup.object().shape({
    Height: yup
      .number()
      .required("This field is required")
      .typeError("Height must be a number")
      .min(100, "Height should be greater than 100 cm")
      .max(300, "Height should be less than 300 cm"),
    Weight: yup
      .number()
      .required("This field is required")
      .typeError("Weight must be a number")
      .min(40, "Weight should be greater than 40 kg")
      .max(300, "Weight should be less than 300 kg"),
    Sleeptime: yup
      .number()
      .required("This field is required")
      .typeError("Sleep time must be a number")
      .min(4, "Sleep time be greater than 4h")
      .max(16, "Sleep time be less than 16h"),
    Sex: yup.string().required("This field is required"),
    Age: yup.string().required("This field is required"),
    PhysicalHealth: yup.string().required("This field is required"),
    MentalHealth: yup.string().required("This field is required"),
    GenHealth: yup.string().required("This field is required"),
    Diabetes: yup.string().required("This field is required"),
    Smoking: yup.string().required("This field is required"),
    AlcoholDrinking: yup.string().required("This field is required"),
    PhysicalActivity: yup.string().required("This field is required"),
    DiffWalking: yup.string().required("This field is required"),
    Asthma: yup.string().required("This field is required"),
    KidneyDisease: yup.string().required("This field is required"),
    Stroke: yup.string().required("This field is required"),
    SkinCancer: yup.string().required("This field is required"),
  }),
});

const HeightRef = ref(null);
const WeightRef = ref(null);
const AgeRef = ref(null);
const SexRef = ref(null);
const PhysicalHealthRef = ref(null);
const MentalHealthRef = ref(null);
const SleeptimeRef = ref(null);
const GenHealthRef = ref(null);
const DiabetesRef = ref(null);
const SmokingRef = ref(null);
const AlcoholDrinkingRef = ref(null);
const PhysicalActivityRef = ref(null);
const DiffWalkingRef = ref(null);
const AsthmaRef = ref(null);
const KidneyDiseaseRef = ref(null);
const StrokeRef = ref(null);
const SkinCancerRef = ref(null);

const Height = useField("Height");
const Weight = useField("Weight");
const Age = useField("Age");
const Sex = useField("Sex");
const PhysicalHealth = useField("PhysicalHealth");
const MentalHealth = useField("MentalHealth");
const Sleeptime = useField("Sleeptime");
const GenHealth = useField("GenHealth");
const Diabetes = useField("Diabetes");
const Smoking = useField("Smoking");
const AlcoholDrinking = useField("AlcoholDrinking");
const PhysicalActivity = useField("PhysicalActivity");
const DiffWalking = useField("DiffWalking");
const Asthma = useField("Asthma");
const KidneyDisease = useField("KidneyDisease");
const Stroke = useField("Stroke");
const SkinCancer = useField("SkinCancer");

const refsMap = {
  Height: HeightRef,
  Weight: WeightRef,
  Age: AgeRef,
  Sex: SexRef,
  PhysicalHealth: PhysicalHealthRef,
  MentalHealth: MentalHealthRef,
  Sleeptime: SleeptimeRef,
  GenHealth: GenHealthRef,
  Diabetes: DiabetesRef,
  Smoking: SmokingRef,
  AlcoholDrinking: AlcoholDrinkingRef,
  PhysicalActivity: PhysicalActivityRef,
  DiffWalking: DiffWalkingRef,
  Asthma: AsthmaRef,
  KidneyDisease: KidneyDiseaseRef,
  Stroke: StrokeRef,
  SkinCancer: SkinCancerRef,
};

const submit = handleSubmit(
  async (values) => {
    try {
      const baseUrl = process.env.VUE_APP_BASE_URL;
      const apiEndpoint = process.env.VUE_APP_API_ENDPOINT;
      
      const url = `${baseUrl}${apiEndpoint}/predictionalgo1`;
      const response = await fetch(url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      router.push({ name: "ResultUSA", query: { data: data } });
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  ({ errors }) => {
    for (const fieldName of Object.keys(errors)) {
      const ref = refsMap[fieldName]?.value;
      if (ref) {
        // Center the element in view
        ref.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
      }
    }
  }
);

const isMobile = ref(checkIfMobile());

function onResize() {
  isMobile.value = checkIfMobile();
}

onMounted(() => {
  addResizeListener(onResize);
});

onBeforeUnmount(() => {
  removeResizeListener(onResize);
});
</script>

<style scoped>
.form-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  max-width: 1200px;
  margin: 10px auto;
  background: white;
  border-radius: 10px;
  border: 1px solid #ccc;
  position: relative;
}

.single-column {
  flex-direction: column;
}

.form-group {
  margin-top: 0.5em;
  border-bottom: 1px solid #ccc;
  margin-left: 10px;
  margin-right: 10px;
  position: relative;
}

.no-border {
  border-bottom: none;
  margin-bottom: 50px;
}

.left-column,
.right-column {
  flex: 1;
  max-width: 1200px;
}

.divider {
  width: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 60px;
}

.error-message {
  color: #b20d0d;
  font-size: 0.75rem;
  text-align: center;
  position: absolute;
  bottom: -0.1em;
  left: 30%;
  width: 40%;
}

.radio-group {
  margin-top: 0.5em;
  position: relative;
}

.radio-group label {
  margin-right: 50px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 1em;
  position: relative;
}

.radio-input {
  appearance: none;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  position: relative;
  cursor: pointer;
  outline: none;
  margin-right: 10px;
}

.radio-input:checked::before {
  content: "";
  display: block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.radio-input:hover {
  border-color: #888;
  background-color: #f5f5f5;
}

.radio-input:checked {
  border-color: #000;
}

label {
  display: block;
  margin-bottom: 0.5em;
  text-align: left;
  margin-right: 10px;
  margin-left: 10px;
  color: black;
}

input:not([type="radio"]) {
  text-align: center;
  padding: 10px;
  font-size: 16px;
  width: 180px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.has-error .radio-input {
  border-color: #b20d0d;
}

.has-error .radio-group label {
  color: #b20d0d;
}

button:hover {
  background-color: #a11b1b;
}

.submit-btn {
  position: absolute;
  width: 500px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #c1002a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  height: 45px !important;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
