<template>
  <div class="styleStructure flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">{{ header }}</h2>

      <md-field>
          <label for="movie">Movie</label>
          <md-select v-model="movie" name="movie" id="movie">
            <md-option value="fight-club">Fight Club</md-option>
            <md-option value="godfather">Godfather</md-option>
            <md-option value="godfather-ii">Godfather II</md-option>
            <md-option value="godfather-iii">Godfather III</md-option>
            <md-option value="godfellas">Godfellas</md-option>
            <md-option value="pulp-fiction">Pulp Fiction</md-option>
            <md-option value="scarface">Scarface</md-option>
          </md-select>
    </md-field>

      <md-field class="w-full">
        <md-input maxlength="35" v-model="structureData.street"></md-input>
      </md-field>

      <md-field class="w-full">
        <md-input
          maxlength="35"
          v-model="structureData.street_number"
        ></md-input>
      </md-field>

      <md-field class="w-full">
        <md-input maxlength="35" v-model="structureData.city"></md-input>
      </md-field>

      <md-field class="w-full">
        <md-input maxlength="35" v-model="structureData.country"></md-input>
      </md-field>

      <button class="submitBtn uppercase" @click="handleSubmit()">
        Pridėti
      </button>
    </div>
  </div>
</template>

<script>
import dissmiss from "../Buttons/dissmiss.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      structureData: {
        name: "",
        street: "",
        street_number: "",
        city: "",
        country: "",
      },
      header: "Pridėkite naują įmonę",
    };
  },
  computed: {
    ...mapGetters(["active_structure"]),
  },
  components: {
    dissmiss,
  },
  methods: {
    ...mapActions(["createOffice"]),

    async handleSubmit() {
      await this.createOffice(structureData);
    },
  },
  async created() {
    console.log("created add structure");
  },
};
</script>

<style>
.styleStructure {
  width: 350px !important;
}
</style>
