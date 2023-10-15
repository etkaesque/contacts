<template>
  <div class="editCompany grid grid-auto-col grid-auto-rows">
    <div class="col-start-2 col-end-3 row-start-1 row-end-2 h-10 flex justify-start">
      <dissmiss></dissmiss>
    </div>

    <div class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start">
      <h2 class="text-2xl w-full mb-2">Redaguoti įmonę:</h2>

      <md-field class="w-full" :class="{ 'md-invalid': v$.companyData.name.$error }">
        <label>Įmonės pavadinimas</label>
        <md-input maxlength="35" v-model="companyData.name"></md-input>


        <div v-if="v$.companyData.name.$error">
          <span class="md-error">{{
            v$.companyData.name.$errors[0].$message
          }}</span>
        </div>

      </md-field>


    </div>

    <button class="submitBtn uppercase mt-6 row-start-3 row-end-4 " @click="handleSubmit()">
      Redaguoti
    </button>

  </div>
</template>

<script>
import dissmiss from "../Buttons/dissmiss.vue";
import { mapGetters, mapActions } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, alphaNum } from "@vuelidate/validators";
const companyExists = function (value) {
  return !this.structure_names.names.includes(value);
};


const textPattern = /^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž0-9 ]+$/;
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
  validations() {
    return {
      companyData: {
        name: {
          required: helpers.withMessage("Nepalikite lauko tuščio", required),
          alpha1: helpers.withMessage(
            "Nenaudokite specialių simboblių",
            alpha1
          ),
          minLength: helpers.withMessage("Tekstas per trumpas", minLength(3)),
          companyExists: helpers.withMessage("Įmonė tokiu pavadinimu jau egzistuoja", companyExists)

        }
      }
    }
  },
  components: {
    dissmiss,
  },
  computed: {
    ...mapGetters(["company", "structure_names"]),
  },
  methods: {
    ...mapActions(["editCompany", "fetchCompanyById", "fetchStructureName"]),
    async handleSubmit() {
      let isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      await this.editCompany({ id: this.company.id, data: this.companyData });
    },
  },
  watch: {
    company() {
      this.companyData.name = this.company.data.name;
    }
  },
  async created() {

    await this.fetchStructureName("companies")

  }


};
</script>

<style>
.editCompany {
  width: auto !important;
}
</style>
