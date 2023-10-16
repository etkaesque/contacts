<template>
  <div class="stylestructureData flex flex-col w-full items-start">
    <div class="grid grid-auto-col grid-auto-rows gap-x-8 mt-6">
      <div
        class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start w-72"
      >
        <h2 class="text-2xl w-full mb-6">{{ header }}</h2>

        <div class="w-full">
          <md-field
            ref="relation"
            v-if="structureData.items.length != 0"
            :class="{ 'md-invalid': v$.structureData.relation.$error }"
          >
            <label for="relation">{{
              this.structureData.selectLabel
                ? this.structureData.selectLabel
                : "Pasirinkite struktūrą"
            }}</label>
            <md-select
              aria-placeholder="pasirinkite"
              v-model="structureData.relation"
              name="relation"
              id="relation"
              md-dense
              multiple
            >
              <md-option v-for="item in structureData.items" :value="item.id">{{
                item.name
              }}</md-option>
            </md-select>

            <div v-if="v$.structureData.relation.$error">
              <span class="md-error">{{
                v$.structureData.relation.$errors[0].$message
              }}</span>
            </div>
          </md-field>
        </div>

        <div class="w-full">
          <md-field
            ref="name"
            :class="{ 'md-invalid': v$.structureData.generalData.name.$error }"
          >
            <label for="name">{{ structureData.label }}</label>
            <md-input
              name="name"
              id="name"
              maxlength="35"
              v-model="structureData.generalData.name"
            ></md-input>

            <div v-if="v$.structureData.generalData.name.$error">
              <span class="md-error">{{
                v$.structureData.generalData.name.$errors[0].$message
              }}</span>
            </div>
          </md-field>
        </div>
      </div>

      <Office
        ref="officeComponent"
        :officeData="structureData.officeData"
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
import { mapActions, mapGetters, mapMutations } from "vuex";


const structureExists = function (value) {
    return !this.structure_names.names.includes(value);
};

const textPattern = /^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž0-9 ]+$/;
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
      structureData: {
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
      structureData: {
        generalData: {
          name: {
            required: helpers.withMessage("Nepalikite lauko tuščio", required),
            alpha1: helpers.withMessage(
              "Nenaudokite specialių simboblių",
              alpha1
            ),
            minLength: helpers.withMessage("Tekstas per trumpas", minLength(3)),
            structureExists: helpers.withMessage("Toks pavadinimas jau egzistuoja", structureExists)
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
      "structure",
      "relations",
      "companies",
      "offices",
      "divisions",
      "departments",
      "groups",
      "structure_names"
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
      "fetchStructureName"
    ]), ...mapMutations(["CONTROL_MODAL"]),

    handleShow(boolean) {
      this.show = boolean;
    },

    officeDataChange(data) {
      this.structureData.officeData = data;
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
        if (!this.structureData.relation.includes(item[target])) {
          return { id: item.id, collection: item.collectionName };
        }
      });

      let addThese = this.structureData.relation.filter((item) => {
        if (!this.structureData.relationOld.includes(item)) {
          return item;
        }
      });

      let params = {
        id: this.id,
        data: this.structureData.generalData,
        relation: { create: addThese, delete: deleteThese },
      };

      if (this.type == "offices") {
        let dataForOffice = {
          ...this.structureData.officeData,
          name: this.structureData.generalData.name,
        };

     
        params = {
          id: this.id,
          data: dataForOffice,
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

      this.CONTROL_MODAL()
    },
  },

  async created() {

    await this.fetchStructureName(this.structure.type)


    this.type = this.structure.type;  
    this.id = this.structure.id;
  
    this.structureData.officeData = this.structure.data;


    if (this.type == "offices") {
      await this.fetchCompanies();
      await this.fetchRelation({
        id: this.id,
        collection: "companies_offices",
        type: "office_id",
      });

      this.structureData.items = this.companies;
      this.structureData.relation = this.relations.ids;
      this.structureData.relationOld = this.relations.ids;
      this.structureData.header = `Redaguoti ofisą:`;
      this.structureData.label = `Ofiso pavadinimas`;
      this.structureData.selectLabel = `Pasirinkite įmones`;
    } else if (this.type == "divisions") {
      await this.fetchOffices();
      await this.fetchRelation({
        id: this.id,
        collection: "offices_divisions",
        type: "division_id",
      });

      this.structureData.items = this.offices;
      this.structureData.relation = this.relations.ids;
      this.structureData.relationOld = this.relations.ids;
      this.structureData.header = `Redaguoti padalinį:`;
      this.structureData.label = `Padalinio pavadinimas`;
      this.structureData.selectLabel = `Pasirinkite ofisus`;
    } else if (this.type == "departments") {
      await this.fetchDivisions();
      await this.fetchRelation({
        id: this.id,
        collection: "divisions_departments",
        type: "department_id",
      });

      this.structureData.items = this.divisions;
      this.structureData.relation = this.relations.ids;
      this.structureData.relationOld = this.relations.ids;

      this.structureData.header = `Redaguoti skyrių`;
      this.structureData.label = `Skyriaus pavadinimas:`;
      this.structureData.selectLabel = `Pasirinkite padalinius`;
    } else if (this.type == "groups") {
      await this.fetchDepartments();
      await this.fetchRelation({
        id: this.id,
        collection: "departments_groups",
        type: "group_id",
      });

      this.structureData.items = this.departments;
      this.structureData.relation = this.relations.ids;
      this.structureData.relationOld = this.relations.ids;

      this.structureData.header = `Redaguoti grupę:`;
      this.structureData.label = `Grupės pavadinimas`;
      this.structureData.selectLabel = `Pasirinkite skyrius`;
    }

    this.structureData.generalData.name = this.structure.data.name;
  },
};
</script>

<style>
.stylestructureData {
  width: auto !important;
  min-width: 350px;
  z-index: 300 !important;
}
</style>
