<template>
  <div class="styleStructure flex flex-col w-full items-start">
    <div class="grid grid-auto-col grid-auto-rows gap-x-8 mt-6">
      <div
        class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start w-72"
      >
        <h2 class="text-2xl w-full mb-6">{{ header }}</h2>

        <div class="w-full">
          <md-field ref="type" :class="{ 'md-invalid': v$.type.$error }">
            <label for="structure">Struktūra</label>
            <md-select
              placeholder="Pasirinkite struktūrą"
              v-model="type"
              name="structure"
              id="structure"
              @md-opened="handleShow(true)"
              @md-closed="handleShow(false)"
            >
              <md-option value="">{{
                show ? "Pasirinkite struktūrą " : ""
              }}</md-option>
              <md-option v-if="createOffices" value="offices">Ofisas</md-option>
              <md-option v-if="createStructure" value="divisions">Padalinys</md-option>
              <md-option v-if="createStructure" value="departments">Skyrius</md-option>
              <md-option v-if="createStructure" value="groups">Grupė</md-option>
            </md-select>

            <div v-if="v$.type.$error">
              <span
                v-for="error of v$.type.$errors"
                :key="error.$uid"
                class="md-error"
                >{{ error.$message }}</span
              >
            </div>
          </md-field>
        </div>

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

      <office
        ref="officesComponent"
        @handleChange="officesDataChange"
        class="col-start-2 col-end-3 row-start-2 row-end-3"
        v-if="type == `offices`"
      ></office>

      <div
        class="w-full text-2xl col-start-1 col-span-4 row-start-1 row-end-2 h-10 flex justify-end"
      >
        <dissmiss></dissmiss>
      </div>

      <button
        class="row-start-3 row-end-4 submitBtn uppercase h-10 mt-5"
        @click="handleSubmit()"
      >
        Pridėti
      </button>
    </div>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);
import { mapActions, mapGetters, mapMutations } from "vuex";
import office from "./office.vue";
import dissmiss from "../Buttons/dissmiss.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
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
      structure: {
        items: [],
        relation: [],
        label: "",
        generalData: {
          name: "",
        },
        officesData: {
          street: "",
          street_number: "",
          city: "",
          country: "",
        },
      },
      show: false,
      header: "Pridėkite naują struktūrą:",
    };
  },
  validations() {
    return {
      type: {
        required: helpers.withMessage("Nepalikite lauko tuščio", required),
      },
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
  computed: {
    ...mapGetters(["offices", "companies", "divisions", "departments", "tab"]),
    createOffices() {
      if (pb.authStore) {
        return pb.authStore.model.expand.permissions_id.edit_offices;
      }
    },
    createStructure() {
      if (pb.authStore) {
        return pb.authStore.model.expand.permissions_id.edit_structure;
      }
    },
  },
  components: {
    dissmiss,
    office,
  },
  methods: {
    ...mapActions([
      "fetchOffices",
      "fetchPaginatedOffices",
      "fetchDivisions",
      "fetchPaginatedDivisions",
      "fetchDepartments",
      "fetchPaginatedDepartments",
      "fetchGroups",
      "fetchPaginatedGroups",
      "createCompany",
      "createOffice",
      "createDivision",
      "createDepartment",
      "createGroup",
      "fetchCompanies",
    ]),
    ...mapMutations(["CONTROL_MODAL"]),

    handleShow(boolean) {
      this.show = boolean;
    },

    officesDataChange(offices) {
      this.structure.officesData = offices;
    },
    async handleSubmit() {
      let isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      let params = {
        data: this.structure.generalData,
        relation: this.structure.relation,
      };

      if (this.type == "offices") {
        let data = {
          ...this.structure.officesData,
          name: this.structure.generalData.name,
        };
        params = {
          data: data,
          relation: this.structure.relation,
        };

        await this.createOffice(params);
        if (this.type === this.tab) await this.fetchPaginatedOffices();
      } else if (this.type == "divisions") {
        await this.createDivision(params);
        if (this.type === this.tab) await this.fetchPaginatedDivisions();
      } else if (this.type == "departments") {
        await this.createDepartment(params);
        if (this.type === this.tab) await this.fetchPaginatedDepartments();
      } else if (this.type == "groups") {
        await this.createGroup(params);
        if (this.type === this.tab) await this.fetchPaginatedGroups();
      }

      this.CONTROL_MODAL();
    },
  },
  watch: {
    async type() {
      if (this.type == "offices") {
        await this.fetchCompanies();
        this.structure.items = this.companies;
        this.structure.label = `Pasirinkite įmones`;
      } else if (this.type == "divisions") {
        await this.fetchOffices();
        this.structure.items = this.offices;
        this.structure.label = `Pasirinkite ofisus`;
      } else if (this.type == "departments") {
        await this.fetchDivisions();
        this.structure.items = this.divisions;
        this.structure.label = `Pasirinkite padalinius`;
      } else if (this.type == "groups") {
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
