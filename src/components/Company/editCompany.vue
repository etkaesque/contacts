<template>
  <div class="editCompany flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">Redaguoti įmonę:</h2>

      <md-field class="w-full">
        <label>Įmonės pavadinimas</label>
        <md-input maxlength="35" v-model="companyData.name"></md-input>
      </md-field>

      <button class="submitBtn uppercase" @click="handleSubmit()">
        Redaguoti
      </button>
    </div>
  </div>
</template>

<script>
import dissmiss from "../Buttons/dissmiss.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      companyData: {
        name: "",
      },
    };
  },
  components: {
    dissmiss,
  },
  computed: {
    ...mapGetters(["active_company", "company"]),
  },
  methods: {
    ...mapActions(["editCompany", "fetchCompanyById"]),
    handleSubmit() {
      this.editCompany({ id: this.active_company, data: this.companyData });
    },
  },
  watch: {
    company(){
      this.companyData.name = this.company.name;
    }
  }
  
};
</script>

<style>
.editCompany {
  width: 350px !important;
}
</style>
