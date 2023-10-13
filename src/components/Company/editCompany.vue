<template>
  <div class="editCompany flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full mb-2">Redaguoti įmonę:</h2>

      <md-field class="w-full" :class="{ 'md-invalid': v$.companyData.name.$error }">
        <label>Įmonės pavadinimas</label>
        <md-input maxlength="35" v-model="companyData.name"></md-input>


        <div v-if="v$.companyData.name.$error" >
              <span class="md-error">{{
                v$.companyData.name.$errors[0].$message
              }}</span>
            </div>

      </md-field>

      <button class="submitBtn uppercase mt-6" @click="handleSubmit()">
        Redaguoti
      </button>
    </div>
  </div>
</template>

<script>
import dissmiss from "../Buttons/dissmiss.vue";
import { mapGetters, mapActions } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
const textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u;
const alpha1 = helpers.regex(textPattern);

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      companyData: {
        name: "",
      },
    };
  },
  validations(){
    return{
      companyData:{
        name: {
        required: helpers.withMessage("Nepalikite lauko tuščio", required),
        alpha1: helpers.withMessage(
              "Nenaudokite specialių simboblių",
              alpha1
            ),
        minLength: helpers.withMessage("Tekstas per trumpas", minLength(3))
      
      }
      }
    }
  },
  components: {
    dissmiss,
  },
  computed: {
    ...mapGetters(["company"]),
  },
  methods: {
    ...mapActions(["editCompany", "fetchCompanyById"]),
    async handleSubmit() {
      let isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      await this.editCompany({ id: this.company.id, data: this.companyData });
    },
  },
  watch: {
    company(){
      this.companyData.name = this.company.data.name;
    }
  }
  
};
</script>

<style>
.editCompany {
  width: 350px !important;
}
</style>
