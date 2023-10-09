<template>
  <div class="styleStructure flex flex-col w-full items-start">
    <div class="grid grid-auto-col grid-auto-rows gap-x-8 mt-6">
      <div
        class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start w-72"
      >
        <h2 class="text-2xl w-full mb-6">{{ header }}</h2>

        <div class="w-full">
          <md-field>
            <label for="structure">Struktūra</label>
            <md-select
              placeholder="Pasirinkite struktūrą"
              v-model="type"
              name="structure"
              id="structure"
            >
              <md-option value="``">Pasirinkite struktūrą</md-option>
              <md-option value="office">Ofisas</md-option>
              <md-option value="division">Padalinys</md-option>
              <md-option value="department">Skyrius</md-option>
              <md-option value="group">Grupė</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="w-full">
          <md-field v-if="structure.items.length != 0">
            <label for="relation">{{
              this.structure.label
                ? this.structure.label
                : "Pasirinkite struktūrą"
            }}</label>
            <md-select
              aria-placeholder="pasirinkite"
              v-model="structure.relation"
              name="relation"
              id="relation"
              md-dense
              multiple
            >
              <md-option v-for="item in structure.items" :value="item.id">{{
                item.name
              }}</md-option>
            </md-select>
          </md-field>
        </div>

        <div class="w-full">
          <md-field>
            <label for="name">Pavadinimas</label>
            <md-input
              name="name"
              id="name"
              maxlength="35"
              v-model="structure.data.name"
            ></md-input>
          </md-field>
        </div>
      </div>

      <Office
        @handleChange="officeDataChange"
        class="col-start-2 col-end-3 row-start-2 row-end-3"
        v-if="type == `office`"
      ></Office>

      <div
        class="w-full text-2xl col-start-1 col-span-4 row-start-1 row-end-2 h-10 flex justify-end"
      >
        <dissmiss></dissmiss>
      </div>

      <button
        class="row-start-3 row-end-4 submitBtn uppercase h-10"
        @click="handleSubmit()"
      >
        Pridėti
      </button>
    </div>
  </div>
</template>

<script>
import Office from "./office.vue";
import dissmiss from "../Buttons/dissmiss.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      type: "",
      structure: {
        items: [],
        relation: [],
        label: "",
        data: {
          name: "",
        },
        officeData: {},
      },
      validation: {
        tooLow: "",
        tooSpecial: "",
      },

      header: "Pridėkite naują struktūrą:",
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
    Office,
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

    officeDataChange(office) {
      this.officeData = Object.assign({}, this.structure.data, office);
    },
    async handleSubmit() {
      let params = {
        data: this.structure.data,
        relation: this.structure.relation,
      };

      if (this.type == "company") {
        await this.createCompany(params);
      } else if (this.type == "office") {
        let params = {
          data: this.officeData,
          relation: this.structure.relation,
        };

        await this.createOffice(params);
      } else if (this.type == "division") {
        await this.createDivision(params);
      } else if (this.type == "department") {
        await this.createDepartment(params);
      } else if (this.type == "group") {
        await this.createGroup(params);
      } else {
        return;
      }
    },
  },
  watch: {
    async type() {
      if (this.type == "office") {
        await this.fetchCompanies();
        this.structure.items = this.companies;
        this.structure.label = `Pasirinkite įmones`;
      } else if (this.type == "division") {
        await this.fetchOffices();
        this.structure.items = this.offices;
        this.structure.label = `Pasirinkite ofisus`;
      } else if (this.type == "department") {
        await this.fetchDivisions();
        this.structure.items = this.divisions;
        this.structure.label = `Pasirinkite padalinius`;
      } else if (this.type == "group") {
        await this.fetchDepartments();
        this.structure.items = this.departments;
        this.structure.label = `Pasirinkite skyrius`;
      } else {
        this.structure.items = [];
        this.structure.label = ``;
      }
    },
  },
};
</script>

<style scoped>
.styleStructure {
  width: auto !important;
  min-width: 350px;
  z-index: 300 !important;
}
</style>
