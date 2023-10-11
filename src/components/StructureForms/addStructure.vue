<template>
  <div class="styleStructure flex flex-col w-full items-start">
    <div class="grid grid-auto-col grid-auto-rows gap-x-8 mt-6">
      <div
        class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start w-72"
      >
        <h2 class="text-2xl w-full mb-6">{{ header }}</h2>

        <div class="w-full">
          <md-field ref="type">
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

            <span v-if="validation.type.empty" class="md-error">{{
              validation.message.empty
            }}</span>
          </md-field>
        </div>

        <div class="w-full">
          <md-field ref="relation" v-if="structure.items.length != 0">
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

            <span v-if="validation.relation.empty" class="md-error">{{
              validation.message.empty
            }}</span>
          </md-field>
        </div>

        <div class="w-full">
          <md-field ref="name">
            <label for="name">Pavadinimas</label>
            <md-input
              name="name"
              id="name"
              maxlength="35"
              v-model="structure.data.name"
            ></md-input>
            <span v-if="validation.name.empty" class="md-error">{{
              validation.message.empty
            }}</span>
            <span v-else-if="validation.name.tooLow" class="md-error">{{
              validation.message.tooLow
            }}</span>
            <span v-else="validation.name.tooSpecial" class="md-error">{{
              validation.message.tooSpecial
            }}</span>
          </md-field>
        </div>
      </div>

      <Office
        ref="officeComponent"
        :validation="validation"
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
        class="row-start-3 row-end-4 submitBtn uppercase h-10 mt-5"
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
import Validation from "../../validate";
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
        officeData: {
          street: "",
          street_number: "",
          city: "",
          country: "",
        },
      },
      validation: {
        message: {
          empty: "Nepalikite lauko tusčio.",
          tooLow: "Bent trys raidės.",
          tooSpecial: "Nenaudokite spec. simbolių, skaičių.",
        },
        name: {
          empty: false,
          tooLow: false,
          tooSpecial: false,
        },
        relation: {
          empty: false,
        },
        type: {
          empty: false,
        },
        office: {
          street: {
            empty: false,
            tooLow: false,
            tooSpecial: false,
          },
          street_number: {
            empty: false,
            tooLow: false,
            tooSpecial: false,
          },
          city: {
            empty: false,
            tooLow: false,
            tooSpecial: false,
          },
          country: {
            empty: false,
            tooLow: false,
            tooSpecial: false,
          },
        },
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
    validateField(value, field, ref) {
      let isValid = false;

      if (field == `name`) {
        this.validation[field].tooSpecial =
          !Validation.validateTextSpecial(value);
        this.validation[field].tooLow = Validation.validateTextLength(value);
        console.log(value, field, ref);
      }

      if (field != `office`) {
        this.validation[field].empty = Validation.validateEmpty(value);
        isValid =
          !this.validation[field].empty &&
          !this.validation[field].tooSpecial &&
          !this.validation[field].tooLow;

        if (this.$refs[ref]) {
          this.$refs[ref].$el.classList.toggle("md-invalid", !isValid);
        }
      }

      if (field == "office") {
        this.validation.office[ref].empty = Validation.validateEmpty(value);
        this.validation.office[ref].tooSpecial =
          !Validation.validateTextSpecial(value);
        this.validation.office[ref].tooLow =
          Validation.validateTextLength(value);

        isValid =
          !this.validation.office[ref].empty &&
          !this.validation.office[ref].tooSpecial &&
          !this.validation.office[ref].tooLow;

        if (this.$refs.officeComponent.$refs[ref]) {
          this.$refs.officeComponent.$refs[ref].$el.classList.toggle(
            "md-invalid",
            !isValid
          );
        }
      }

      return isValid;
    },

    validateBeforeSubmit() {
      const isValidName = this.validateField(
        this.structure.data.name,
        "name",
        `name`
      );
      const isValidRelation = this.validateField(
        this.structure.relation,
        "relation",
        `relation`
      );
      const isValidType = this.validateField(this.type, "type", `type`);

      if (this.type == "office") {
        console.log("city is", this.structure.officeData.city);
        console.log("country is", this.structure.officeData.country);
        console.log("street is", this.structure.officeData.street);
        console.log(
          "street_number is",
          this.structure.officeData.street_number
        );

        const isValidOfficeCity = this.validateField(
          this.structure.officeData.city,
          "office",
          "city"
        );
        const isValidOfficeCountry = this.validateField(
          this.structure.officeData.country,
          "office",
          "country"
        );
        const isValidOfficeStreet = this.validateField(
          this.structure.officeData.street,
          "office",
          "street"
        );
        const isValidOfficeStreetNumber = this.validateField(
          this.structure.officeData.street_number,
          "office",
          `street_number`
        );
        const isOfficeValid =
          isValidOfficeCity &&
          isValidOfficeCountry &&
          isValidOfficeStreet &&
          isValidOfficeStreetNumber;
        return isValidName && isValidRelation && isValidType && isOfficeValid;
      }

      return isValidName && isValidRelation && isValidType;
    },
    officeDataChange(office) {
      console.log("change is happening");
      this.structure.officeData = Object.assign(
        {},
        this.structure.data,
        office
      );
    },
    async handleSubmit() {
      let isValidated = this.validateBeforeSubmit();

      if (isValidated) {
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
