<template>
  <div class="editCompany grid grid-auto-col grid-auto-rows">
    <div class="col-start-2 col-end-3 row-start-1 row-end-2 h-10 flex justify-start">
      <dissmiss></dissmiss>
    </div>

    <div class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start">
      <h2 class="text-2xl w-full mb-2">Pridėti įmonę:</h2>

      <md-field class="w-full" :class="{ 'md-invalid': v$.companyData.name.$error }">
        <label>Įmonės pavadinimas</label>
        <md-input maxlength="35" v-model="companyData.name" ></md-input>


        <div v-if="v$.companyData.name.$error" >
              <span class="md-error">{{
                v$.companyData.name.$errors[0].$message
              }}</span>
            </div>
      </md-field>

    </div>


    <button class="submitBtn uppercase mt-6 row-start-3 row-end-4 " @click="handleSubmit()">
        Pridėti
      </button>

  </div>
</template>

<script>

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
const textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u;
const alpha1 = helpers.regex(textPattern);


import dissmiss from "../Buttons/dissmiss.vue";
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions(["createCompany"]),

    async handleSubmit() {
      let isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      await this.createCompany(this.companyData);
    },
  },
};
</script>

<style>
.editCompany {
  width: auto !important;
}
</style>
