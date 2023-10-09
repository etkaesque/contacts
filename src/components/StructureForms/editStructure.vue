<template>
  <div class="styleStructure flex flex-col w-full items-center">
    <div class="flex w-full justify-end">
      <dissmiss></dissmiss>
    </div>

    <div class="w-3/4">
      <h2 class="text-2xl w-full">{{ structure.header }}</h2>

      <md-field class="w-full">
        <label>{{ structure.label }}</label>
        <md-input maxlength="35" v-model="structure.data.name"></md-input>
      </md-field>

      <div class="w-full">
        <md-field>
          <label for="relation">{{
            this.structure.label
            ? this.structure.label
            : "Pasirinkite struktūrą"
          }}</label>
          <md-select aria-placeholder="pasirinkite" v-model="structure.relation" name="relation" id="relation" md-dense
            multiple>
            <md-option v-for="item in structure.items" :value="item.id">{{
              item.name
            }}</md-option>
          </md-select>
        </md-field>
      </div>

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
      structure: {
        items: [],
        relation: [],
        relationOld: [],
        label: "",
        header: "",
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

    async handleSubmit() {


      

      let target
      if (this.type == "offices") {
        target = 'company_id'
      } else if (this.type == "divisions") {
        target = 'office_id'
      } else if (this.type == "departments") {
        target = 'division_id'
      } else if (this.type == "groups") {
        target = 'department_id'
      }

      let deleteThese = this.relations.rels.filter(item => {
        if (!this.structure.relation.includes(item[target])) {
          return { id: item.id, collection: item.collectionName }
        }
      })

      let addThese = this.structure.relation.filter(item => {

        if (!this.structure.relationOld.includes(item)) {
          return item
        }
      })

      let params = {
        id: this.id,
        data: this.structure.data,
        relation: {create: addThese, delete: deleteThese},
      };


      // console.log("hit")

      if (this.type == "offices") {
        let params = {
          data: this.officeData,
          relation: this.structure.relation,
        };

        await this.editOffice(params);
      } else if (this.type == "divisions") {
        console.log("create division hit")
        await this.editDivision(params);
      } else if (this.type == "departments") {
        await this.editDepartment(params);
      } else if (this.type == "groups") {
        await this.editGroup(params);
      }







    },
  },
  async created() {
    this.type = this.active_structure.type;
    this.id = this.active_structure.id;

    if (this.type == "offices") {
      await this.fetchCompanies();
      await this.fetchRelation({
        id: this.id,
        collection: "companies_offices",
        type: "office_id",
      });



      this.structure.items = this.companies;
      this.structure.relation = this.relations.ids
      this.structure.relationOld = this.relations.ids
      this.structure.header = `Redaguoti ofisą`;
      this.structure.label = `Ofiso pavadinimas`;


      console.log(" this.structure.items", this.structure.items);
      console.log("this.structure.relation", this.structure.relation);


    } else if (this.type == "divisions") {
      await this.fetchOffices();
      await this.fetchRelation({
        id: this.id,
        collection: "offices_divisions",
        type: "division_id",
      });

      this.structure.items = this.offices;
      this.structure.relation = this.relations.ids
      this.structure.relationOld = this.relations.ids
      this.structure.header = `Redaguoti padalinį`;
      this.structure.label = `Padalinio pavadinimas`;
      console.log(" this.structure.items", this.structure.items);
      console.log("this.structure.relation", this.structure.relation);
    } else if (this.type == "departments") {
      await this.fetchDivisions();
      await this.fetchRelation({
        id: this.id,
        collection: "divisions_departments",
        type: "department_id",
      });

      this.structure.items = this.divisions;
      this.structure.relation = this.relations.ids
      this.structure.relationOld = this.relations.ids

      this.structure.header = `Redaguoti skyrių`;
      this.structure.label = `Skyriaus pavadinimas`;
    } else if (this.type == "groups") {
      await this.fetchDepartments();
      await this.fetchRelation({
        id: this.id,
        collection: "departments_groups",
        type: "group_id",
      });

      this.structure.items = this.departments;
      this.structure.relation = this.relations.ids
      this.structure.relationOld = this.relations.ids

      this.structure.header = `Redaguoti grupę`;
      this.structure.label = `Grupės pavadinimas`;
    }

    this.structure.data.name = this.active_structure.structure.name;
  },
};
</script>

<style>
.styleStructure {
  width: 350px !important;
}
</style>
