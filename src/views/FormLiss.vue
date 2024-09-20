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
            label="Sex"
            v-bind="Sex.attrs"
            ref="SexRef"
            v-model="Sex.value.value"
            :error-messages="Sex.errorMessage.value"
            :items="['Male', 'Female', 'Other']"
          ></v-select>
        </div>
        <div class="form-group">
          <v-text-field
            v-model="Age.value.value"
            v-bind="Age.attrs"
            ref="AgeRef"
            :error-messages="Age.meta.touched ? Age.errorMessage.value : []"
            label="Age"
            @blur="Age.meta.touched = true"
            @keydown.enter.prevent=""
          ></v-text-field>
        </div>
        <div class="form-group">
          <label>How would you describe your health, generally speaking?</label>
          <v-select
            label="General Health"
            v-bind="GenHealth.attrs"
            ref="GenHealthRef"
            v-model="GenHealth.value.value"
            :error-messages="GenHealth.errorMessage.value"
            :items="['Poor', 'Moderate', 'Good', 'Very good', 'Excellent']"
          ></v-select>
        </div>
        <div class="form-group">
          <label class="comment"
            >The following questions are about how you felt over the past month.
            Please choose the answer that best describes how you felt during
            this past month.</label
          >
          <br />
          <label>• I felt very anxious.</label>
          <v-select
            label="Mental Health"
            v-bind="MentalHealth1.attrs"
            ref="MentalHealth1Ref"
            v-model="MentalHealth1.value.value"
            :error-messages="MentalHealth1.errorMessage.value"
            :items="[
              'Never',
              'Seldom',
              'Sometimes',
              'Often',
              'Mostly',
              'Continuously',
            ]"
          ></v-select>
          <label>• I felt so down that nothing could cheer me up.</label>
          <v-select
            label="Mental Health"
            v-bind="MentalHealth2.attrs"
            ref="MentalHealth2Ref"
            v-model="MentalHealth2.value.value"
            :error-messages="MentalHealth2.errorMessage.value"
            :items="[
              'Never',
              'Seldom',
              'Sometimes',
              'Often',
              'Mostly',
              'Continuously',
            ]"
          ></v-select>
          <label>• I felt calm and peaceful.</label>
          <v-select
            label="Mental Health"
            v-bind="MentalHealth3.attrs"
            ref="MentalHealth3Ref"
            v-model="MentalHealth3.value.value"
            :error-messages="MentalHealth3.errorMessage.value"
            :items="[
              'Never',
              'Seldom',
              'Sometimes',
              'Often',
              'Mostly',
              'Continuously',
            ]"
          ></v-select>
          <label>• I felt depressed and gloomy.</label>
          <v-select
            label="Mental Health"
            v-bind="MentalHealth4.attrs"
            ref="MentalHealth4Ref"
            v-model="MentalHealth4.value.value"
            :error-messages="MentalHealth4.errorMessage.value"
            :items="[
              'Never',
              'Seldom',
              'Sometimes',
              'Often',
              'Mostly',
              'Continuously',
            ]"
          ></v-select>
          <label>• I felt happy.</label>
          <v-select
            label="Mental Health"
            v-bind="MentalHealth5.attrs"
            ref="MentalHealth5Ref"
            v-model="MentalHealth5.value.value"
            :error-messages="MentalHealth5.errorMessage.value"
            :items="[
              'Never',
              'Seldom',
              'Sometimes',
              'Often',
              'Mostly',
              'Continuously',
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <label
            >Did your physical health or emotional problems hinder your daily
            activities over the past month, for instance in going for a walk,
            walking upstairs, dressing yourself, washing yourself, visiting the
            toilet?</label
          >
          <v-select
            label="Physical and Mental Health"
            v-bind="PhyMenHealth1.attrs"
            ref="PhyMenHealth1Ref"
            v-model="PhyMenHealth1.value.value"
            :error-messages="PhyMenHealth1.errorMessage.value"
            :items="[
              'Not at all',
              'Hardly',
              'Sometimes',
              'A bit',
              'Quite a lot',
              'Very much',
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <label
            >To what extent did your physical health or emotional problems
            hinder your social activities over the past month?</label
          >
          <v-select
            label="Physical and Mental Health"
            v-bind="PhyMenHealth2.attrs"
            ref="PhyMenHealth2Ref"
            v-model="PhyMenHealth2.value.value"
            :error-messages="PhyMenHealth2.errorMessage.value"
            :items="[
              'Not at all',
              'Hardly',
              'Sometimes',
              'A bit',
              'Quite a lot',
              'Very much',
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <label
            >To what extent did your physical health or emotional problems
            hinder your work over the past month, for instance in your job, the
            housekeeping, taking care of the children, doing volunteer work, or
            in school?</label
          >
          <v-select
            label="Physical and Mental Health"
            v-bind="PhyMenHealth3.attrs"
            ref="PhyMenHealth3Ref"
            v-model="PhyMenHealth3.value.value"
            :error-messages="PhyMenHealth3.errorMessage.value"
            :items="[
              'Not at all',
              'Hardly',
              'Sometimes',
              'A bit',
              'Quite a lot',
              'Very much',
            ]"
          ></v-select>
        </div>
        <div :class="{ 'no-border': !isMobile }" class="form-group">
          <label
            >How many days during the last month were you unable to go to work,
            perform housekeeping work or attend school, due to disease?</label
          >
          <v-select
            label="Physical Health"
            v-bind="PhysicalHealth.attrs"
            ref="PhysicalHealthRef"
            v-model="PhysicalHealth.value.value"
            :error-messages="PhysicalHealth.errorMessage.value"
            :items="[
              '0 days',
              '1 or 2 days',
              '3 to 5 days',
              '5 to 10 days',
              'More than ten day',
            ]"
          ></v-select>
        </div>
      </div>
      <div class="divider" v-if="!isMobile"></div>
      <div class="right-column">
        <div class="form-group">
          <label class="comment"
            >Below you will find a number of actions that some people have
            difficulties with.</label
          >
          <label class="comment"
            >Can you indicate, for each activity, whether you can perform it
            without any trouble, with some trouble, with a lot of trouble, only
            with the help of others or not at all?</label
          >
          <label class="comment"
            >This question does not apply to problems which you expect will not
            last longer than three months.</label
          >
          <br />
          <label>• Walking 100 meters</label>
          <v-select
            label="Mobility"
            v-bind="DiffWalking1.attrs"
            ref="DiffWalking1Ref"
            v-model="DiffWalking1.value.value"
            :error-messages="DiffWalking1.errorMessage.value"
            :items="[
              'Without any trouble',
              'With some trouble',
              'With a lot of trouble',
              'Only with an aid or the help of others',
              'Unable to',
            ]"
          ></v-select>
          <label>• Walking several stairs without resting in between</label>
          <v-select
            label="Mobility"
            v-bind="DiffWalking2.attrs"
            ref="DiffWalking2Ref"
            v-model="DiffWalking2.value.value"
            :error-messages="DiffWalking2.errorMessage.value"
            :items="[
              'Without any trouble',
              'With some trouble',
              'With a lot of trouble',
              'Only with an aid or the help of others',
              'Unable to',
            ]"
          ></v-select>
          <label>• Walking up a staircase without resting</label>
          <v-select
            label="Mobility"
            v-bind="DiffWalking3.attrs"
            ref="DiffWalking3Ref"
            v-model="DiffWalking3.value.value"
            :error-messages="DiffWalking3.errorMessage.value"
            :items="[
              'Without any trouble',
              'With some trouble',
              'With a lot of trouble',
              'Only with an aid or the help of others',
              'Unable to',
            ]"
          ></v-select>
          <label>• Walking across the room</label>
          <v-select
            label="Mobility"
            v-bind="DiffWalking4.attrs"
            ref="DiffWalking4Ref"
            v-model="DiffWalking4.value.value"
            :error-messages="DiffWalking4.errorMessage.value"
            :items="[
              'Without any trouble',
              'With some trouble',
              'With a lot of trouble',
              'Only with an aid or the help of others',
              'Unable to',
            ]"
          ></v-select>
        </div>
        <div class="form-group">
          <label class="comment"
            >Has a physician told you this last year that you suffer from one of
            the following diseases / problems?</label
          >
          <br />
          <label>• High blood pressure or hypertension</label>
          <div :class="{ 'has-error': Highbp.errorMessage.value }">
            <div class="radio-group">
              <div>
                <label
                  ><input
                    type="radio"
                    v-model="Highbp.value.value"
                    value="yes"
                    class="radio-input"
                    ref="HighbpRef"
                  />Yes</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="Highbp.value.value"
                    value="no"
                    class="radio-input"
                    ref="HighbpRef"
                  />No</label
                >
              </div>
              <span v-if="Highbp.errorMessage.value" class="error-message">{{
                Highbp.errorMessage.value
              }}</span>
            </div>
          </div>
          <label>• High cholesterol content in blood</label>
          <div :class="{ 'has-error': Highchol.errorMessage.value }">
            <div class="radio-group">
              <div>
                <label
                  ><input
                    type="radio"
                    v-model="Highchol.value.value"
                    value="yes"
                    class="radio-input"
                    ref="HighcholRef"
                  />Yes</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="Highchol.value.value"
                    value="no"
                    class="radio-input"
                    ref="HighcholRef"
                  />No</label
                >
              </div>
              <span v-if="Highchol.errorMessage.value" class="error-message">{{
                Highchol.errorMessage.value
              }}</span>
            </div>
          </div>
          <label
            >• A stroke or a disease affecting the blood vessels in the
            brain</label
          >
          <div :class="{ 'has-error': Stroke.errorMessage.value }">
            <div class="radio-group">
              <div>
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
          </div>
          <label>• Diabetes or a too high blood sugar level</label>
          <div :class="{ 'has-error': Diabetes.errorMessage.value }">
            <div class="radio-group">
              <div>
                <label
                  ><input
                    type="radio"
                    v-model="Diabetes.value.value"
                    value="yes"
                    class="radio-input"
                    ref="DiabetesRef"
                  />Yes</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="Diabetes.value.value"
                    value="no"
                    class="radio-input"
                    ref="DiabetesRef"
                  />No</label
                >
              </div>
              <span v-if="Diabetes.errorMessage.value" class="error-message">{{
                Diabetes.errorMessage.value
              }}</span>
            </div>
          </div>
          <label
            >• A chronic lung disease such as chronic bronchitis or
            emphysema</label
          >
          <div :class="{ 'has-error': Chrld.errorMessage.value }">
            <div class="radio-group">
              <div>
                <label
                  ><input
                    type="radio"
                    v-model="Chrld.value.value"
                    value="yes"
                    class="radio-input"
                    ref="ChrldRef"
                  />Yes</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="Chrld.value.value"
                    value="no"
                    class="radio-input"
                    ref="ChrldRef"
                  />No</label
                >
              </div>
              <span v-if="Chrld.errorMessage.value" class="error-message">{{
                Chrld.errorMessage.value
              }}</span>
            </div>
          </div>
          <label>• Asthma</label>
          <div :class="{ 'has-error': Asthma.errorMessage.value }">
            <div class="radio-group">
              <div>
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
          </div>
          <label
            >• Arthritis, including osteoarthritis, bone decalcification or
            osteoporosis</label
          >
          <div :class="{ 'has-error': Arthritis.errorMessage.value }">
            <div class="radio-group">
              <div>
                <label
                  ><input
                    type="radio"
                    v-model="Arthritis.value.value"
                    value="yes"
                    class="radio-input"
                    ref="ArthritisRef"
                  />Yes</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="Arthritis.value.value"
                    value="no"
                    class="radio-input"
                    ref="ArthritisRef"
                  />No</label
                >
              </div>
              <span v-if="Arthritis.errorMessage.value" class="error-message">{{
                Arthritis.errorMessage.value
              }}</span>
            </div>
          </div>
          <label
            >• Cancer or malignant tumor, including leukemia or lymphoma, but
            excluding less serious forms of skin cancer</label
          >
          <div :class="{ 'has-error': Cancer.errorMessage.value }">
            <div class="radio-group">
              <div>
                <label
                  ><input
                    type="radio"
                    v-model="Cancer.value.value"
                    value="yes"
                    class="radio-input"
                    ref="CancerRef"
                  />Yes</label
                >
                <label
                  ><input
                    type="radio"
                    v-model="Cancer.value.value"
                    value="no"
                    class="radio-input"
                    ref="CancerRef"
                  />No</label
                >
              </div>
              <span v-if="Cancer.errorMessage.value" class="error-message">{{
                Cancer.errorMessage.value
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': SleepPb.errorMessage.value }"
        >
          <label>Do you regularily suffer from sleeping problems?</label>
          <div class="radio-group">
            <label
              ><input
                type="radio"
                v-model="SleepPb.value.value"
                value="yes"
                class="radio-input"
                ref="SleepPbRef"
              />Yes</label
            >
            <label
              ><input
                type="radio"
                v-model="SleepPb.value.value"
                value="no"
                class="radio-input"
                ref="SleepPbRef"
              />No</label
            >
          </div>
          <span v-if="SleepPb.errorMessage.value" class="error-message">{{
            SleepPb.errorMessage.value
          }}</span>
        </div>
        <div
          class="form-group"
          :class="{ 'has-error': Smoking.errorMessage.value }"
        >
          <label>Have you ever smoked (even if it was long ago)?</label>
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
        <div class="form-group no-border">
          <label
            >Now think of all the sorts of drink that exist. How often did you
            have a drink containing alcohol over the last 12 months?</label
          >
          <v-select
            label="Alcohol Drinking"
            v-bind="AlcoholDrinking.attrs"
            ref="AlcoholDrinkingRef"
            v-model="AlcoholDrinking.value.value"
            :error-messages="AlcoholDrinking.errorMessage.value"
            :items="[
              'Almost every day',
              'Five or six days per week',
              'Three or four days per week',
              'Once or twice a week',
              'Once or twice a month',
              'Once every two months',
              'Once or twice a year',
              'Not at all over the last 12 months',
            ]"
          ></v-select>
        </div>
      </div>
      <v-btn class="submit-btn" type="submit">Submit</v-btn>
    </div>
  </form>
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
    Age: yup
      .number()
      .required("Age is required")
      .typeError("Age must be a number")
      .min(0, "Age should be greater than 0")
      .max(100, "Age should be less than 100"),
    Sex: yup.string().required("This field is required"),
    GenHealth: yup.string().required("This field is required"),
    MentalHealth1: yup.string().required("This field is required"),
    MentalHealth2: yup.string().required("This field is required"),
    MentalHealth3: yup.string().required("This field is required"),
    MentalHealth4: yup.string().required("This field is required"),
    MentalHealth5: yup.string().required("This field is required"),
    PhyMenHealth1: yup.string().required("This field is required"),
    PhyMenHealth2: yup.string().required("This field is required"),
    PhyMenHealth3: yup.string().required("This field is required"),
    SleepPb: yup.string().required("This field is required"),
    DiffWalking1: yup.string().required("This field is required"),
    DiffWalking2: yup.string().required("This field is required"),
    DiffWalking3: yup.string().required("This field is required"),
    DiffWalking4: yup.string().required("This field is required"),
    Highbp: yup.string().required("This field is required"),
    Highchol: yup.string().required("This field is required"),
    Stroke: yup.string().required("This field is required"),
    Diabetes: yup.string().required("This field is required"),
    Chrld: yup.string().required("This field is required"),
    Asthma: yup.string().required("This field is required"),
    Arthritis: yup.string().required("This field is required"),
    Cancer: yup.string().required("This field is required"),
    PhysicalHealth: yup.string().required("This field is required"),
    Smoking: yup.string().required("This field is required"),
    AlcoholDrinking: yup.string().required("This field is required"),
  }),
});

const HeightRef = ref(null);
const WeightRef = ref(null);
const AgeRef = ref(null);
const SexRef = ref(null);
const GenHealthRef = ref(null);
const MentalHealth1Ref = ref(null);
const MentalHealth2Ref = ref(null);
const MentalHealth3Ref = ref(null);
const MentalHealth4Ref = ref(null);
const MentalHealth5Ref = ref(null);
const PhyMenHealth1Ref = ref(null);
const PhyMenHealth2Ref = ref(null);
const PhyMenHealth3Ref = ref(null);
const SleepPbRef = ref(null);
const DiffWalking1Ref = ref(null);
const DiffWalking2Ref = ref(null);
const DiffWalking3Ref = ref(null);
const DiffWalking4Ref = ref(null);
const HighbpRef = ref(null);
const HighcholRef = ref(null);
const StrokeRef = ref(null);
const DiabetesRef = ref(null);
const ChrldRef = ref(null);
const AsthmaRef = ref(null);
const ArthritisRef = ref(null);
const CancerRef = ref(null);
const PhysicalHealthRef = ref(null);
const SmokingRef = ref(null);
const AlcoholDrinkingRef = ref(null);

const Height = useField("Height");
const Weight = useField("Weight");
const Age = useField("Age");
const Sex = useField("Sex");
const GenHealth = useField("GenHealth");
const MentalHealth1 = useField("MentalHealth1");
const MentalHealth2 = useField("MentalHealth2");
const MentalHealth3 = useField("MentalHealth3");
const MentalHealth4 = useField("MentalHealth4");
const MentalHealth5 = useField("MentalHealth5");
const PhyMenHealth1 = useField("PhyMenHealth1");
const PhyMenHealth2 = useField("PhyMenHealth2");
const PhyMenHealth3 = useField("PhyMenHealth3");
const SleepPb = useField("SleepPb");
const DiffWalking1 = useField("DiffWalking1");
const DiffWalking2 = useField("DiffWalking2");
const DiffWalking3 = useField("DiffWalking3");
const DiffWalking4 = useField("DiffWalking4");
const Highbp = useField("Highbp");
const Highchol = useField("Highchol");
const Stroke = useField("Stroke");
const Diabetes = useField("Diabetes");
const Chrld = useField("Chrld");
const Asthma = useField("Asthma");
const Arthritis = useField("Arthritis");
const Cancer = useField("Cancer");
const PhysicalHealth = useField("PhysicalHealth");
const Smoking = useField("Smoking");
const AlcoholDrinking = useField("AlcoholDrinking");

const refsMap = {
  Height: HeightRef,
  Weight: WeightRef,
  Age: AgeRef,
  Sex: SexRef,
  GenHealth: GenHealthRef,
  MentalHealth1: MentalHealth1Ref,
  MentalHealth2: MentalHealth2Ref,
  MentalHealth3: MentalHealth3Ref,
  MentalHealth4: MentalHealth4Ref,
  MentalHealth5: MentalHealth5Ref,
  PhyMenHealth1: PhyMenHealth1Ref,
  PhyMenHealth2: PhyMenHealth2Ref,
  PhyMenHealth3: PhyMenHealth3Ref,
  SleepPb: SleepPbRef,
  DiffWalking1: DiffWalking1Ref,
  DiffWalking2: DiffWalking2Ref,
  DiffWalking3: DiffWalking3Ref,
  DiffWalking4: DiffWalking4Ref,
  Highbp: HighbpRef,
  Highchol: HighcholRef,
  Stroke: StrokeRef,
  Diabetes: DiabetesRef,
  Chrld: ChrldRef,
  Asthma: AsthmaRef,
  Arthritis: ArthritisRef,
  Cancer: CancerRef,
  PhysicalHealth: PhysicalHealthRef,
  Smoking: SmokingRef,
  AlcoholDrinking: AlcoholDrinkingRef,
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
      router.push({ name: "ResultLiss", query: { data: data } });
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

.has-error .radio-input {
  border-color: #b20d0d;
}

.has-error .radio-group label {
  color: #b20d0d;
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

input:focus {
  border-color: black;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  outline: none;
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
