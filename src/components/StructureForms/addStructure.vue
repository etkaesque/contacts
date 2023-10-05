<template>
  <div class="styleStructure flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">{{ header }}</h2>

      <md-field>
        <label for="structure">Pasirinkite struktūrą</label>
        <md-select
          @input="handleChange()"
          v-model="type"
          name="structure"
          id="structure"
        >
          <md-option value="office">Ofisas</md-option>
          <md-option value="division">Padalinys</md-option>
          <md-option value="department">Skyrius</md-option>
          <md-option value="group">Grupė</md-option>
        </md-select>
      </md-field>

      <md-field v-if="type == `office`">
        <label for="relation">Pasirinkite įmonę</label>
        <md-select
          aria-placeholder="pasirinkite"
          v-model="relation"
          name="relation"
          id="relation"
          md-dense
          multiple
        >
          <md-option v-for="item in structure" :value="item.id">{{
            item.name
          }}</md-option>
        </md-select>
      </md-field>

      <md-field class="w-full">
        <label for="name">Pavadinimas</label>
        <md-input
          name="name"
          id="name"
          maxlength="35"
          v-model="structureData.name"
        ></md-input>
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
      relation: [],
      structure: [],
      type: "",
      structureData: {
        name: "",
      },
      validation: {
        tooLow: "",
        tooSpecial: "",
      },

      header: "Pridėkite naują struktūrą",
    };
  },
  computed: {
    ...mapGetters([
      "active_structure",
      "offices",
      "companies",
      "divisions",
      "departments",
    ]),
  },
  components: {
    dissmiss,
  },
  methods: {
    ...mapActions([
      "fetchOffices",
      "fetchDivisions",
      "fetchDepartments",
      "fetchGroups",
      "createCompany",
      "createOffice",
      "createDivision",
      "createDepartment",
      "createGroup",
      "fetchCompanies",
    ]),

    async handleSubmit() {
      const params = { id: this.id, data: this.structureData };

      if (this.type == "company") {
        await this.createCompany(params);
      } else if (this.type == "offices") {
        await this.createOffice(params);
      } else if (this.type == "divisions") {
        await this.createDivision(params);
      } else if (this.type == "departments") {
        await this.createDepartment(params);
      } else if (this.type == "groups") {
        await this.createGroup(params);
      }
    },
    handleChange() {
      console.log(this.type);
      console.log(this.relation);
      this.fetchCompanies();
    },
  },
  watch: {
    async type() {
      if (this.type == "company") {
        await this.createCompany();
      } else if (this.type == "offices") {
        await this.fetchCompanies();
      } else if (this.type == "divisions") {
        await this.fetchOffices();
      } else if (this.type == "departments") {
        await this.fetchDivisions();
      } else if (this.type == "groups") {
        await this.createDepartments();
      }
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
