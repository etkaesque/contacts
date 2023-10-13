<template>
  <div class="contact">
    <form action="sumbit" class="grid grid-cols-3 gap-x-14">
      <div
        class="w-full text-2xl col-start-1 col-end-4 row-start-1 row-end-2 flex justify-end"
      >
        <dissmissButton></dissmissButton>
      </div>

      <div class="col-start-1 col-end-2 row-start-2 row-end-3">
        <h2 class="text-2xl">Redaguoti kontaktą:</h2>
        <div class="flex flex-col gap-y-4">
          <md-field
            ref="name"
            :class="{ 'md-invalid': v$.formData.name.$error }"
          >
            <label>Vardas</label>
            <md-input maxlength="35" v-model="formData.name"></md-input>

            <div v-if="v$.formData.name.$error">
              <span class="md-error">{{
                v$.formData.name.$errors[0].$message
              }}</span>
            </div>
          </md-field>

          <md-field
            ref="surname"
            :class="{ 'md-invalid': v$.formData.surname.$error }"
          >
            <label>Pavardė</label>
            <md-input maxlength="35" v-model="formData.surname"></md-input>

            <div v-if="v$.formData.surname.$error">
              <span class="md-error">{{
                v$.formData.surname.$errors[0].$message
              }}</span>
            </div>
          </md-field>

          <md-field
            ref="position"
            :class="{ 'md-invalid': v$.formData.position.$error }"
          >
            <label>Pozicija</label>
            <md-input maxlength="35" v-model="formData.position"></md-input>

            <div v-if="v$.formData.position.$error">
              <span class="md-error">{{
                v$.formData.position.$errors[0].$message
              }}</span>
            </div>
          </md-field>
        </div>

        <div>
          <h3 class="text-lg pt-4">Kontaktinė informacija</h3>

          <md-field
            ref="email"
            :class="{ 'md-invalid': v$.formData.email.$error }"
          >
            <label>Elektroninis paštas</label>
            <md-input maxlength="40" v-model="formData.email"></md-input>
            <span class="md-error">{{
              formData.email == "" ? validation.message : validation.email
            }}</span>

            <div v-if="v$.formData.email.$error">
              <span class="md-error">{{
                v$.formData.email.$errors[0].$message
              }}</span>
            </div>
          </md-field>

          <md-field
            ref="phone_number"
            :class="{ 'md-invalid': v$.formData.phone_number.$error }"
          >
            <label>Telefono numeris</label>
            <md-input v-model="formData.phone_number" maxlength="15"></md-input>

            <div v-if="v$.formData.phone_number.$error">
              <span class="md-error">{{
                v$.formData.phone_number.$errors[0].$message
              }}</span>
            </div>
          </md-field>
        </div>
      </div>
      <!-- company details -->
      <div class="md-layout-item col-start-2 col-end-3 row-start-2 row-end-3">
        <h2 class="text-2xl">Įmonės detalės:</h2>
        <div class="flex flex-col gap-y-4">
          <md-field
            ref="company_id"
            class="fieldElement"
            :class="{ 'md-invalid': v$.formData.company_id.$error }"
          >
            <label v-if="formData.company_id != ''" for="company">Įmonė</label>
            <md-select
              ref="overwrite"
              placeholder="Pasirinkite įmonę"
              v-model="formData.company_id"
              name="company"
              id="company"
              @input="handleCompany(formData.company_id)"
              @md-opened="handleShow(true, `company`)"
              @md-closed="handleShow(false, `company`)"
            >
              <md-option value="">
                {{ showCompany ? "Pasirinkite įmonę " : "" }}</md-option
              >
              <md-option v-for="company in companies" :value="company.id">{{
                company.name
              }}</md-option>
            </md-select>
            <!-- 
            error message -->

            <div v-if="v$.formData.company_id.$error">
              <span class="md-error">{{
                v$.formData.company_id.$errors[0].$message
              }}</span>
            </div>
          </md-field>

          <md-field
            ref="office_id"
            :class="{ 'md-invalid': v$.formData.office_id.$error }"
          >
            <label v-if="formData.office_id != ''" for="office">Ofisas</label>
            <md-select
              placeholder="Pasirinkite ofisą"
              v-model="formData.office_id"
              name="office"
              id="office"
              @input="handleOffice(formData.office_id)"
              @md-opened="handleShow(true, `office`)"
              @md-closed="handleShow(false, `office`)"
            >
              <md-option value="">{{
                showOffice ? "Pasirinkite ofisą " : ""
              }}</md-option>
              <md-option
                v-for="office in offices"
                :value="office.expand.office_id.id"
                >{{ office.expand.office_id.name }}</md-option
              >
            </md-select>

            <div v-if="v$.formData.office_id.$error">
              <span class="md-error">{{
                v$.formData.office_id.$errors[0].$message
              }}</span>
            </div>
          </md-field>

          <div>
            <md-field
              ref="division_id"
              :class="{ 'md-invalid': v$.formData.division_id.$error }"
            >
              <label v-if="formData.division_id != ''" for="font"
                >Padalinys</label
              >
              <md-select
                placeholder="Pasirinkite padalinį"
                v-model="formData.division_id"
                name="font"
                id="division"
                @input="handleDivisions(formData.division_id)"
                @md-opened="handleShow(true, `division`)"
                @md-closed="handleShow(false, `division`)"
              >
                <md-option value="">
                  {{ showDivision ? "Pasirinkite padalinį " : "" }}
                </md-option>
                <md-option
                  v-for="division in divisions"
                  :value="division.expand.division_id.id"
                  >{{ division.expand.division_id.name }}</md-option
                >
              </md-select>

              <div v-if="v$.formData.division_id.$error">
                <span class="md-error">{{
                  v$.formData.division_id.$errors[0].$message
                }}</span>
              </div>
            </md-field>

            <md-field ref="department_id">
              <label v-if="formData.department_id != ''" for="font"
                >Skyrius</label
              >
              <md-select
                placeholder="Pasirinkite skyrių"
                @input="handleDepartment(formData.department_id)"
                v-model="formData.department_id"
                name="department"
                id="department"
                @md-opened="handleShow(true, `department`)"
                @md-closed="handleShow(false, `department`)"
              >
                <md-option value="">
                  {{ showDepartment ? "Pasirinkite skyrių " : "" }}
                </md-option>
                <md-option
                  v-for="department in departments"
                  :value="department.expand.department_id.id"
                  >{{ department.expand.department_id.name }}</md-option
                >
              </md-select>
            </md-field>

            <md-field ref="group_id">
              <label v-if="formData.group_id != ''" for="font">Grupė</label>
              <md-select
                placeholder="Pasirinkite grupę"
                v-model="formData.group_id"
                name="group"
                id="group"
                @md-opened="handleShow(true, `group`)"
                @md-closed="handleShow(false, `group`)"
              >
                <md-option value="">
                  {{ showGroup ? "Pasirinkite grupę " : "" }}</md-option
                >
                <md-option
                  v-for="group in groups"
                  :value="group.expand.group_id.id"
                  >{{ group.expand.group_id.name }}</md-option
                >
              </md-select>
            </md-field>
          </div>
        </div>

        <div class="fileLabelWrapper flex justify-center w-full">
          <label class="fileLabel uppercase" for="photo"
            >Įkelti nuotrauką</label
          >
          <input
            type="file"
            name="photo"
            id="photo"
            class="fileInput"
            @change="handlePhotoUpload($event)"
          />
          <div class="photoValidation">
            <span style="color: #a61a11 !important" v-if="!isFilePhoto">
              {{ validation.fileNotPhoto }}</span
            >
            <span style="color: #a61a11 !important" v-else-if="isFileTooLarge">
              {{ validation.fileTooLarge }}</span
            >
            <span v-else>{{
              photoSelected ? "Failas pasirinktas." : "Pasirinkite failą."
            }}</span>
          </div>
        </div>
      </div>

      <div class="col-start-3 col-end-4 flex flex-col row-start-3 row-end-4">
        <button class="submitBtn uppercase" @click="handleSubmit($event)">
          Redaguoti
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import dissmissButton from "../Buttons/dissmiss.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers, email } from "@vuelidate/validators";
const textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u;
const phonePattern = /^\+[0-9]+$/;
const alpha1 = helpers.regex(textPattern);
const phone1 = helpers.regex(phonePattern);

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      photoValid: true,
      isFilePhoto: true,
      isFileTooLarge: false,
      photoSelected: false,
      temporary: "",
      temporarOffice: "",
      temporarDivision: "",
      temporarDepartment: "",
      validation: {
        empty: "Nepalikite lauko tusčio.",
        textTooLow: "Bent trys raidės.",
        textTooSpecial: "Nenaudokite spec. simbolių, skaičių.",
        email: "Neteisingas e. paštas.",
        phone: "Numeris turi prasidėti + simboliu.",
        fileTooLarge: "Failo dydis neturi būti didesnis nei 5Mb.",
        fileNotPhoto:
          "Neteisingas failo formatas. Pridėkite JPEG arba PNG failą.",
      },
      formData: {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        position: "",
        company_id: "",
        office_id: "",
        division_id: "",
        department_id: "",
        group_id: "",
        photo: "",
      },
      showCompany: false,
      showOffice: false,
      showDivision: false,
      showDepartment: false,
      showGroup: false,
      oldOffices: [],
      oldDivisions: [],
      oldDepartments: [],
      oldGroups: [],
    };
  },
  validations() {
    return {
      formData: {
        name: {
          required: helpers.withMessage(this.validation.empty, required),
          alpha1: helpers.withMessage(this.validation.textTooSpecial, alpha1),
          minLength: helpers.withMessage(
            this.validation.textTooLow,
            minLength(3)
          ),
        },
        surname: {
          required: helpers.withMessage(this.validation.empty, required),
          alpha1: helpers.withMessage(this.validation.textTooSpecial, alpha1),
          minLength: helpers.withMessage(
            this.validation.textTooLow,
            minLength(3)
          ),
        },
        phone_number: {
          phone1: helpers.withMessage(this.validation.phone, phone1),
        },

        email: {
          email: helpers.withMessage(this.validation.email, email),
          required: helpers.withMessage(this.validation.empty, required),
        },
        position: {
          required: helpers.withMessage(this.validation.empty, required),
          alpha1: helpers.withMessage(this.validation.textTooSpecial, alpha1),
          minLength: helpers.withMessage(
            this.validation.textTooLow,
            minLength(3)
          ),
        },

        company_id: {
          required: helpers.withMessage(this.validation.empty, required),
        },
        office_id: {
          required: helpers.withMessage(this.validation.empty, required),
        },
        division_id: {
          required: helpers.withMessage(this.validation.empty, required),
        },
      },
    };
  },
  components: {
    dissmissButton,
  },
  computed: {
    ...mapGetters([
      "groups",
      "companies",
      "departments",
      "divisions",
      "offices",
      "contact",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchCompanies",
      "createContact",
      "fetchCompanyOffices",
      "fetchOfficeDivisions",
      "fetchDivisionDepartmens",
      "fetchDepartmentGroups",
      "fetchContactById",
      "editContact",
    ]),
    ...mapMutations([
      "CONTROL_MODAL",
      "SET_OFFICES",
      "SET_GROUPS",
      "SET_DIVISIONS",
      "SET_DEPARTMENTS",
      "SET_COMPANIES",
    ]),

    handlePhotoUpload(event) {
      const allowedTypes = ["image/png", "image/jpeg"];
      const maxSize = 5 * 1024 * 1024;

      if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if (!allowedTypes.includes(selectedFile.type)) {
          this.isFilePhoto = false;
          this.isFileTooLarge = false;
          this.formData.photo = "";
          this.photoValid = false;

          return;
        }

        if (selectedFile.size > maxSize) {
          this.isFileTooLarge = true;
          this.isFilePhoto = true;
          this.formData.photo = "";
          this.photoValid = false;

          return;
        }

        this.formData.photo = selectedFile;
        this.isFileTooLarge = false;
        this.isFilePhoto = true;
        this.photoSelected = true;
        this.photoValid = true;
      } else {
        this.photoSelected = false;
        this.isFileTooLarge = false;
        this.isFilePhoto = true;
        this.formData.photo = "";
        this.photoValid = true;
      }
    },
    handleShow(boolean, type) {
      if (type == "company") {
        this.showCompany = boolean;
      } else if (type == `office`) {
        this.showOffice = boolean;
      } else if (type == `division`) {
        this.showDivision = boolean;
      } else if (type == `department`) {
        this.showDepartment = boolean;
      } else if (type == `group`) {
        this.showGroup = boolean;
      }
    },
    async handleSubmit(event) {
      event.preventDefault();

      let isFormCorrect = await this.v$.$validate();
      isFormCorrect = isFormCorrect && this.photoValid;
      if (!isFormCorrect) return;

      const data = new FormData();
      data.append("name", this.formData.name);
      data.append("surname", this.formData.surname);
      data.append("email", this.formData.email);
      data.append("phone_number", this.formData.phone_number);
      data.append("position", this.formData.position);
      data.append("company_id", this.formData.company_id);
      data.append("office_id", this.formData.office_id);
      data.append("division_id", this.formData.division_id);
      data.append("department_id", this.formData.department_id);
      data.append("group_id", this.formData.group_id);
      if (this.formData.photo != "") {
        data.append("photo", this.formData.photo);
      }

      await this.editContact({ id: this.contact.id, formData: data });
      this.CONTROL_MODAL();
    },
    async handleCompany(id) {
      if (this.formData.company_id != this.temporary) {
        this.formData.office_id = "";
        this.formData.division_id = "";
        this.formData.department_id = "";
        this.formData.group_id = "";
        this.temporary = "";
        await this.fetchCompanyOffices(this.formData.company_id);
      } else {
        await this.fetchCompanyOffices(this.formData.company_id);
      }
    },
    async handleOffice(id) {
      if (this.formData.office_id != this.temporarOffice) {
        this.formData.division_id = "";
        this.formData.department_id = "";
        this.formData.group_id = "";
        await this.fetchOfficeDivisions(id);
      } else {
        await this.fetchOfficeDivisions(id);
      }
    },
    async handleDivisions(id) {
      if (this.formData.division_id != this.temporarDivision) {
        this.formData.department_id = "";
        this.formData.group_id = "";
        await this.fetchDivisionDepartmens(id);
      } else {
        await this.fetchDivisionDepartmens(id);
      }
    },
    async handleDepartment(id) {
      if (this.formData.department_id != this.temporarDepartment) {
        this.formData.group_id = "";
        await this.fetchDepartmentGroups(id);
      } else {
        await this.fetchDepartmentGroups(id);
      }
    },
  },
  async created() {
    this.oldOffices = this.offices;
    this.oldDivisions = this.divisions;
    this.oldDepartments = this.departments;
    this.oldGroups = this.groups;

    this.SET_COMPANIES();
    this.SET_OFFICES();
    this.SET_GROUPS();
    this.SET_DIVISIONS();
    this.SET_DEPARTMENTS();

    await this.fetchCompanies();

    let contact = this.contact.data;

    this.formData.name = contact.name;
    this.formData.surname = contact.surname;
    this.formData.position = contact.position;
    this.formData.phone_number = contact.phone_number;
    this.formData.email = contact.email;
    this.formData.company_id = contact.company_id;
    this.formData.department_id = contact.department_id;
    this.formData.division_id = contact.division_id;
    this.formData.office_id = contact.office_id;
    this.formData.group_id = contact.group_id;

    this.temporary = contact.company_id;
    this.temporarOffice = contact.office_id;
    this.temporarDivision = contact.division_id;
    this.temporarDepartment = contact.department_id;
  },
  beforeDestroy() {
    this.SET_OFFICES(this.oldOffices);
    this.SET_GROUPS(this.oldGroups);
    this.SET_DIVISIONS(this.oldDivisions);
    this.SET_DEPARTMENTS(this.oldDepartments);
  },
};
</script>

<style>
label {
  color: rgba(0, 0, 0, 0.589) !important;
}

.fileLabel,
.submitBtn {
  padding: 10px 30px;
  background-color: #0054a6;
  color: white !important;
  border: none;
  cursor: pointer;
}

.submitBtn {
  margin-top: 10px;
}

.fileLabelWrapper {
  position: relative;
  width: 200px;
}

.fileInput {
  display: none;
}

.photoValidation {
  color: black;
  position: absolute;
  left: 210px;
  top: 8px !important;
  text-transform: initial;
  display: block;
  width: 200px !important;
}

.isRed {
  color: red !important;
}

.md-error {
  max-width: 180px !important;
}
</style>
