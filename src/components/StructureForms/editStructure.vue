<template>
  <div class="styleStructure flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">{{ header }}</h2>

      <md-field class="w-full">
        <label>{{ label }}</label>
        <md-input maxlength="35" v-model="structureData.name"></md-input>
      </md-field>

      <button class="submitBtn uppercase" @click="handleSubmit()">
        Redaguoti
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
      type: "",
      id: "",
      structureData: {
        name: "",
      },
      validation: {
        tooLow: "",
        tooSpecial: "",
      },
      label: "",
      header: "",
    };
  },
  computed: {
    ...mapGetters(["active_structure"]),
  },
  components: {
    dissmiss,
  },
  methods: {
    ...mapActions([
      "fetchCompanyById",
      "fetchOfficeById",
      "fetchDivisionById",
      "fetchDepartmentById",
      "fetchGroupById",
      "editCompany",
      "editOffice",
      "editDivision",
      "editDepartment",
      "editGroup",
    ]),

    async handleSubmit() {
      const params = { id: this.id, data: this.structureData };

      if (this.type == "company") {
        await this.editCompany(params);
      } else if (this.type == "offices") {
        await this.editOffice(params);
      } else if (this.type == "divisions") {
        await this.editDivision(params);
      } else if (this.type == "departments") {
        await this.editDepartment(params);
      } else if (this.type == "groups") {
        await this.editGroup(params);
      }
    },
  },
  async created() {
    let type = this.active_structure.type;
    this.type = this.active_structure.type;
    this.id = this.active_structure.id;

    if (type == "company") {
      this.header = `Redaguoti įmonę`;
      this.label = `Įmonės pavadinimas`;
      await this.fetchCompanyById(this.id);
    } else if (type == "offices") {
      this.header = `Redaguoti ofisą`;
      this.label = `Ofiso pavadinimas`;
      await this.fetchOfficeById(this.id);
    } else if (type == "divisions") {
      this.header = `Redaguoti padalinį`;
      this.label = `Padalinio pavadinimas`;
      await this.fetchDivisionById(this.id);
    } else if (type == "departments") {
      this.header = `Redaguoti skyrių`;
      this.label = `Skyriaus pavadinimas`;
      await this.fetchDepartmentById(this.id);
    } else if (type == "groups") {
      this.header = `Redaguoti grupę`;
      this.label = `Grupės pavadinimas`;
      await this.fetchGroupById(this.id);
    }

    this.structureData.name = this.active_structure.structure.name;
  },
};
</script>

<style>
.styleStructure {
  width: 350px !important;
}
</style>
