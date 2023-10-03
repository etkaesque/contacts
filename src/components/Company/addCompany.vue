<template>
  <div class="editCompany flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">Pridėti įmonę:</h2>

      <md-field class="w-full">
        <label>Įmonės pavadinimas</label>
        <md-input maxlength="35" v-model="companyName"></md-input>
      </md-field>

      <button class="submitBtn uppercase" @click="handleSubmit()">
        Pridėti
      </button>
    </div>
  </div>
</template>

<script>
import dissmiss from "../Buttons/dissmiss.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      companyName: "",
    };
  },
  components: {
    dissmiss,
  },
  methods: {
    ...mapActions(["addCompany"]),
    handleSubmit() {
        // this.addCompany(this.companyName)
    },
  },
};
</script>

<style>
.editCompany {
  width: 350px !important;
}
</style>
