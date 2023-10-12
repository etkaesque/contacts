<template>
  <div class="styleStructure flex flex-col w-full items-start">
    <div class="grid grid-auto-col grid-auto-rows gap-x-8 mt-6">
      <div
        class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start w-72"
      >
        <h2 class="text-2xl w-full mb-6">{{ header }}</h2>

        <div class="w-full">
          <md-field
            ref="relation"
            v-if="structure.items.length != 0"
            :class="{ 'md-invalid': v$.structure.relation.$error }"
          >
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

            <div v-if="v$.structure.relation.$error">
              <span class="md-error">{{
                v$.structure.relation.$errors[0].$message
              }}</span>
            </div>
          </md-field>
        </div>

        <div class="w-full">
          <md-field
            ref="name"
            :class="{ 'md-invalid': v$.structure.generalData.name.$error }"
          >
            <label for="name">Pavadinimas</label>
            <md-input
              name="name"
              id="name"
              maxlength="35"
              v-model="structure.generalData.name"
            ></md-input>

            <div v-if="v$.structure.generalData.name.$error">
              <span class="md-error">{{
                v$.structure.generalData.name.$errors[0].$message
              }}</span>
            </div>
          </md-field>
        </div>
      </div>

      <Office
        ref="officeComponent"
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
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { mapActions, mapGetters } from "vuex";

const textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u;

const alpha1 = helpers.regex(textPattern);

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
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
        generalData: {
          name: "",
        },
        officeData: {
          street: "",
          street_number: "",
          city: "",
          country: "",
        },
      },
      show: false,
      header: "Redaguokite struktūrą:",
    };
  },
  validations() {
    return {
      structure: {
        generalData: {
          name: {
            required: helpers.withMessage("Nepalikite lauko tuščio", required),
            alpha1: helpers.withMessage(
              "Nenaudokite specialių simboblių",
              alpha1
            ),
            minLength: helpers.withMessage("Tekstas per trumpas", minLength(3)),
          },
        },
        relation: {
          required: helpers.withMessage("Nepalikite lauko tuščio", required),
        },
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

    handleShow(boolean) {
      this.show = boolean;
    },

    officeDataChange(data) {
      this.structure.officeData = data;
    },

    async handleSubmit() {
      let isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

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
        data: this.structure.generalData,
        relation: { create: addThese, delete: deleteThese },
      };

      if (this.type == "offices") {
        let data = {
          ...this.structure.officeData,
          name: this.structure.generalData.name,
        };

     
        params = {
          id: this.id,
          data: data,
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

    this.structure.generalData.name = this.active_structure.structure.name;
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
