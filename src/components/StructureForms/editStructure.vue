<template>
  <div class="styleStructure flex flex-col w-full items-center">
    <div class="grid grid-auto-col grid-auto-rows gap-x-8">
      <div
        class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start w-72"
      >
        <h2 class="text-2xl w-full mb-5">{{ structure.header }}</h2>

        <md-field class="w-full">
          <label>{{ structure.label }}</label>
          <md-input maxlength="35" v-model="structure.data.name"></md-input>
        </md-field>

        <div class="w-full">
          <md-field>
            <label for="relation">{{ structure.selectLabel }}</label>
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
      </div>

      <Office
        :officeData="structure.officeData"
        @handleChange="officeDataChange"
        class="col-start-2 col-end-3 row-start-2 row-end-3"
        v-if="type == `offices`"
      ></Office>

      <div
        class="w-full text-2xl col-start-1 col-span-4 row-start-1 row-end-2 h-10 flex justify-end"
      >
        <dissmiss></dissmiss>
      </div>

      <button
        class="row-start-3 row-end-4 submitBtn uppercase h-10 mt-5"
        @click="handleSubmit()"
      >
        Redaguoti
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
      id: "",
      structure: {
        items: [],
        relation: [],
        relationOld: [],
        label: "",
        header: "",
        selectLabel: "",
        data: {
          name: "",
        },
        officeData: {},
      },
      validation: {
        tooLow: "",
        tooSpecial: "",
      },
    };
  },
  components: {
    Office,
    dissmiss,
  },
  computed: {
    ...mapGetters([
      "active_structure",
      "relations",
      "companies",
      "offices",
      "divisions",
      "departments",
      "groups",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchCompanyById",
      "fetchOfficeById",
      "fetchDivisionById",
      "fetchDepartmentById",
      "fetchGroupById",
      "fetchCompanies",
      "fetchDivisions",
      "fetchDepartments",
      "fetchOffices",
      "fetchGroups",
      "fetchRelation",
      "deleteRelation",
      "editDivision",
      "editGroup",
      "editOffice",
      "editDepartment",
    ]),

    async officeDataChange(office) {
      this.structure.officeData = office;
      this.structure.officeData.name = this.structure.data.name;
    },
    async handleSubmit() {
      let target;
      if (this.type == "offices") {
        target = "company_id";
      } else if (this.type == "divisions") {
        target = "office_id";
      } else if (this.type == "departments") {
        target = "division_id";
      } else if (this.type == "groups") {
        target = "department_id";
      }

      let deleteThese = this.relations.rels.filter((item) => {
        if (!this.structure.relation.includes(item[target])) {
          return { id: item.id, collection: item.collectionName };
        }
      });

      let addThese = this.structure.relation.filter((item) => {
        if (!this.structure.relationOld.includes(item)) {
          return item;
        }
      });

      let params = {
        id: this.id,
        data: this.structure.data,
        relation: { create: addThese, delete: deleteThese },
      };

      if (this.type == "offices") {
        let params = {
          id: this.id,
          data: this.structure.officeData,
          relation: { create: addThese, delete: deleteThese },
        };

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

  watch: {
    "structure.data.name"() {
      if (this.type === "offices") {
        this.structure.officeData.name = this.structure.data.name;
      }
    },
  },

  async created() {
    this.type = this.active_structure.type;
    this.id = this.active_structure.id;
    this.structure.officeData = this.active_structure.structure;

    if (this.type == "offices") {
      await this.fetchCompanies();
      await this.fetchRelation({
        id: this.id,
        collection: "companies_offices",
        type: "office_id",
      });

      this.structure.items = this.companies;
      this.structure.relation = this.relations.ids;
      this.structure.relationOld = this.relations.ids;
      this.structure.header = `Redaguoti ofisą:`;
      this.structure.label = `Ofiso pavadinimas`;
      this.structure.selectLabel = `Pasirinkite įmones`;
    } else if (this.type == "divisions") {
      await this.fetchOffices();
      await this.fetchRelation({
        id: this.id,
        collection: "offices_divisions",
        type: "division_id",
      });

      this.structure.items = this.offices;
      this.structure.relation = this.relations.ids;
      this.structure.relationOld = this.relations.ids;
      this.structure.header = `Redaguoti padalinį:`;
      this.structure.label = `Padalinio pavadinimas`;
      this.structure.selectLabel = `Pasirinkite ofisus`;
    } else if (this.type == "departments") {
      await this.fetchDivisions();
      await this.fetchRelation({
        id: this.id,
        collection: "divisions_departments",
        type: "department_id",
      });

      this.structure.items = this.divisions;
      this.structure.relation = this.relations.ids;
      this.structure.relationOld = this.relations.ids;

      this.structure.header = `Redaguoti skyrių`;
      this.structure.label = `Skyriaus pavadinimas:`;
      this.structure.selectLabel = `Pasirinkite padalinius`;
    } else if (this.type == "groups") {
      await this.fetchDepartments();
      await this.fetchRelation({
        id: this.id,
        collection: "departments_groups",
        type: "group_id",
      });

      this.structure.items = this.departments;
      this.structure.relation = this.relations.ids;
      this.structure.relationOld = this.relations.ids;

      this.structure.header = `Redaguoti grupę:`;
      this.structure.label = `Grupės pavadinimas`;
      this.structure.selectLabel = `Pasirinkite skyrius`;
    }

    this.structure.data.name = this.active_structure.structure.name;
  },
};
</script>

<style>
.styleStructure {
  width: auto !important;
  min-width: 350px;
  z-index: 300 !important;
}
</style>
