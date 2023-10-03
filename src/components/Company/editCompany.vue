<template>
  <div class="editCompany flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">Redaguoti įmonę:</h2>

      <md-field class="w-full">
        <label>Įmonės pavadinimas</label>
        <md-input maxlength="35" v-model="companyName"></md-input>
      </md-field>

      <button class="submitBtn uppercase" @click="handleSubmit()">
        Redaguoti
      </button>
    </div>
  </div>
</template>

<script>
import dissmiss from "../Buttons/dissmiss.vue";

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
    handleSubmit() {
      console.log(this.companyName);
    },
  },
};
</script>

<style>

.editCompany {
  width: 350px !important;
}

</style>
