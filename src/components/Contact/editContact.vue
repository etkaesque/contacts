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
          <md-field ref="name">
            <label>Vardas</label>
            <md-input maxlength="35" v-model="formData.name"></md-input>
            <span v-if="this.formData.name.trim() === ''" class="md-error">{{
              validation.message
            }}</span>

            <span v-else-if="nameSpecial" class="md-error">
              {{ validation.textTooSpecial }}</span
            >

            <span v-else-if="nameLow" class="md-error">{{
              validation.textTooLow
            }}</span>
          </md-field>

          <md-field ref="surname">
            <label>Pavardė</label>
            <md-input maxlength="35" v-model="formData.surname"></md-input>
            <span v-if="this.formData.surname.trim() === ''" class="md-error">{{
              validation.message
            }}</span>

            <span v-else-if="surnameSpecial" class="md-error">
              {{ validation.textTooSpecial }}</span
            >

            <span v-else-if="surnameLow" class="md-error">{{
              validation.textTooLow
            }}</span>
          </md-field>

          <md-field ref="position">
            <label>Pozicija</label>
            <md-input maxlength="35" v-model="formData.position"></md-input>
            <span
              v-if="this.formData.position.trim() === ''"
              class="md-error"
              >{{ validation.message }}</span
            >

            <span v-else-if="positionSpecial" class="md-error">
              {{ validation.textTooSpecial }}</span
            >

            <span v-else-if="positionLow" class="md-error">{{
              validation.textTooLow
            }}</span>
          </md-field>
        </div>

        <div>
          <h3 class="text-lg pt-4">Kontaktinė informacija</h3>

          <md-field ref="email">
            <label>Elektroninis paštas</label>
            <md-input maxlength="40" v-model="formData.email"></md-input>
            <span class="md-error">{{
              formData.email == "" ? validation.message : validation.email
            }}</span>
          </md-field>

          <md-field ref="phone_number">
            <label>Telefono numeris</label>
            <md-input v-model="formData.phone_number" maxlength="15"></md-input>
            <span class="md-error" style="max-width: 180px">{{
              validation.phone
            }}</span>
          </md-field>
        </div>
      </div>

      <div class="md-layout-item col-start-2 col-end-3 row-start-2 row-end-3">
        <h2 class="text-2xl">Įmonės detalės:</h2>
        <div class="flex flex-col gap-y-4">
          <md-field ref="company_id">
            <label for="company">Įmonė</label>
            <md-select
              placeholder="Pasirinkite įmonę"
              ref="company"
              v-model="formData.company_id"
              name="company"
              id="company"
              @input="handleCompany(formData.company_id)"
            >
              <md-option v-if="formData.company_id != ``" value=""
                >Pasirinkite įmonę</md-option
              >
              <md-option v-for="company in companies" :value="company.id">{{
                company.name
              }}</md-option>
            </md-select>
            <span class="md-error">{{ validation.message }}</span>
          </md-field>

          <md-field ref="office_id">
            <label for="office">Ofisas</label>
            <md-select
              :disabled="isCompaniesEmpty"
              placeholder="Pasirinkite ofisą"
              v-model="formData.office_id"
              name="office"
              id="office"
              @input="handleOffice(formData.office_id)"
            >
              <md-option v-if="formData.office_id != ``" value=""
                >Pasirinkite ofisą</md-option
              >
              <div v-for="office in offices" :key="office.expand.office_id.id">
                <md-option :value="office.expand.office_id.id">{{
                  office.expand.office_id.name
                }}</md-option>
              </div>
            </md-select>
            <span class="md-error">{{ validation.message }}</span>
          </md-field>

          <div>
            <md-field ref="division_id">
              <label for="font">Padalinys</label>

              <md-select
                :disabled="isOfficesEmpty"
                placeholder="Pasirinkite padalinį"
                v-model="formData.division_id"
                name="font"
                id="division"
                @input="handleDivisions(formData.division_id)"
              >
                <md-option v-if="formData.division_id != ``" value=""
                  >Pasirinkite padalinį</md-option
                >

                <div
                  v-for="division in divisions"
                  :key="division.expand.division_id.id"
                >
                  <md-option :value="division.expand.division_id.id">{{
                    division.expand.division_id.name
                  }}</md-option>
                </div>
              </md-select>

              <span class="md-error">{{ validation.message }}</span>
            </md-field>

            <md-field ref="department_id">
              <label for="font">Skyrius</label>
              <md-select
                :disabled="isDivisionsEmpty"
                placeholder="Pasirinkite skyrių"
                @input="handleDepartment(formData.department_id)"
                v-model="formData.department_id"
                name="department"
                id="department"
              >
                <md-option v-if="formData.department_id != ``" value=""
                  >Pasirinkite Skyrių</md-option
                >

                <div v-if="departments.length != 0">
                  <div
                    v-for="department in departments"
                    :key="department.expand.department_id.id"
                  >
                    <md-option :value="department.expand.department_id.id">{{
                      department.expand.department_id.name
                    }}</md-option>
                  </div>
                </div>
              </md-select>
              <span class="md-error">{{ validation.message }}</span>
            </md-field>

            <md-field ref="group_id">
              <label for="font">Grupė</label>

              <md-select
                :disabled="isDepartmentsEmpty"
                placeholder="Pasirinkite grupę"
                v-model="formData.group_id"
                name="group"
                id="group"
              >
                <md-option v-if="formData.group_id != ``" value=""
                  >Pasirinkite grupę</md-option
                >

                <div v-if="groups.length != 0">
                  <div v-for="group in groups" :key="group.expand.group_id.id">
                    <md-option :value="group.expand.group_id.id"
                      >{{ group.expand.group_id.name }}
                    </md-option>
                  </div>
                </div>
              </md-select>
              <span class="md-error">{{ validation.message }}</span>
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

export default {
  data() {
    return {
      nameLow: false,
      nameSpecial: false,
      nameShort: false,
      surnameLow: false,
      surnameSpecial: false,
      surnameShort: false,
      positionLow: false,
      positionSpecial: false,
      positionShort: false,
      isFilePhoto: true,
      isFileTooLarge: false,
      photoSelected: false,
      temporary: "",
      temporarOffice: "",
      temporarDivision: "",
      temporarDepartment: "",
      validation: {
        isSuccess: false,
        message: "Nepalikite lauko tusčio.",
        textTooLow: "Bent trys raidės.",
        textTooSpecial: "Nenaudokite spec. simbolių, skaičių.",
        email: "Neteisingas e. paštas.",
        phone: "Numeris turi prasidėti + simboliu.",
        fileTooLarge: "Failo dydys neturi būti didesnis nei 5Mb.",
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
      oldOffices: [],
      oldDivisions: [],
      oldDepartments: [],
      oldGroups: [],
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
      "activeContact",
      "contact",
    ]),

    isCompaniesEmpty() {
      return this.formData.company_id == "" || this.companies.length == 0;
    },
    isOfficesEmpty() {
      return this.formData.office_id == "" || this.divisions.length == 0;
    },
    isDivisionsEmpty() {
      return this.formData.division_id == "" || this.departments.length == 0;
    },
    isDepartmentsEmpty() {
      return this.formData.department_id == "" || this.groups.length == 0;
    },
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

    checkIfFormValid() {
      let keyList = Object.keys(this.formData);
      keyList = keyList.filter(
        (key) =>
          key !== `photo` &&
          key !== `group_id` &&
          key !== `department_id` &&
          key !== `phone_number`
      );
      const areFieldEmpty = keyList.map((key) => {
        if (this.formData[key].trim() === "") {
          this.$refs[key].$el.classList.add("md-invalid");
          return false;
        } else {
          this.$refs[key].$el.classList.remove("md-invalid");
          return true;
        }
      });

      const checkText = (input, element, type) => {
        const textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u;

        if (textPattern.test(input.trim())) {
          element.classList.remove("md-invalid");

          if (type == "name") {
            this.nameSpecial = false;
          } else if (type == "surname") {
            this.surnameSpecial = false;
          } else {
            this.positionSpecial = false;
          }

          return true;
        } else {
          element.classList.add("md-invalid");

          if (type == "name") {
            this.nameSpecial = true;
          } else if (type == "surname") {
            this.surnameSpecial = true;
          } else {
            this.positionSpecial = true;
          }

          return false;
        }
      };

      const checkText2 = (input, element, type) => {
        if (input.trim().length < 3) {
          element.classList.add("md-invalid");

          if (type == "name") {
            this.nameLow = true;
          } else if (type == "surname") {
            this.surnameLow = true;
          } else {
            this.positionLow = true;
          }

          return false;
        } else {
          if (type == "name") {
            this.nameLow = false;
          } else if (type == "surname") {
            this.surnameLow = false;
          } else {
            this.positionLow = false;
          }
          return true;
        }
      };

      const checkEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(this.formData.email.trim())) {
          this.$refs.email.$el.classList.remove("md-invalid");
          return true;
        } else {
          this.$refs.email.$el.classList.add("md-invalid");
          return false;
        }
      };

      const checkPhone = () => {
        const phonePattern = /^\+[0-9]+$/;
        if (this.formData.phone_number.trim() == "") {
          this.$refs.phone_number.$el.classList.remove("md-invalid");
          return true;
        } else if (!phonePattern.test(this.formData.phone_number.trim())) {
          this.$refs.phone_number.$el.classList.add("md-invalid");
          return false;
        } else {
          this.$refs.phone_number.$el.classList.remove("md-invalid");
          return true;
        }
      };

      let isNameSpecial = checkText(
        this.formData.name,
        this.$refs.name.$el,
        `name`
      );
      let isNameNotLow = checkText2(
        this.formData.name,
        this.$refs.name.$el,
        `name`
      );

      let isSurnameSpecial = checkText(
        this.formData.surname,
        this.$refs.surname.$el,
        `surname`
      );
      let isSurnameNotLow = checkText2(
        this.formData.surname,
        this.$refs.surname.$el,
        `surname`
      );

      let isPositionSpecial = checkText(
        this.formData.position,
        this.$refs.position.$el,
        `position`
      );
      let isPositionNotLow = checkText2(
        this.formData.position,
        this.$refs.position.$el,
        `position`
      );

      const isPhoneValid = checkPhone();
      const isEmailValid = checkEmail();
      const isTextValid =
        isNameSpecial &&
        isNameNotLow &&
        isSurnameSpecial &&
        isSurnameNotLow &&
        isPositionSpecial &&
        isPositionNotLow;

      return (
        isEmailValid &&
        isPhoneValid &&
        !areFieldEmpty.includes(false) &&
        isTextValid
      );
    },

    handlePhotoUpload(event) {
      const allowedTypes = ["image/png", "image/jpeg"];
      const maxSize = 5 * 1024 * 1024;

      if (event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if (!allowedTypes.includes(selectedFile.type)) {
          this.isFilePhoto = false;
          this.isFileTooLarge = !this.isFileTooLarge;
          this.formData.photo = "";
          return;
        }

        if (selectedFile.size > maxSize) {
          this.isFileTooLarge = true;
          this.isFilePhoto = !this.isFilePhoto;
          this.formData.photo = "";
          return;
        }

        this.photoSelected = true;
        this.isFileTooLarge = false;
        this.isFilePhoto = true;
        this.formData.photo = selectedFile;
      } else {
        this.photoSelected = false;
        this.isFileTooLarge = false;
        this.isFilePhoto = true;
        this.formData.photo = "";
      }
    },
    async handleSubmit(event) {
      event.preventDefault();

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

      const isValid = this.checkIfFormValid();

      if (isValid) {
        await this.editContact({ id: this.activeContact, formData: data });
        this.CONTROL_MODAL();
      }
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

    this.formData.name = this.contact.name;
    this.formData.surname = this.contact.surname;
    this.formData.position = this.contact.position;
    this.formData.phone_number = this.contact.phone_number;
    this.formData.email = this.contact.email;
    this.formData.company_id = this.contact.company_id;
    this.formData.department_id = this.contact.department_id;
    this.formData.division_id = this.contact.division_id;
    this.formData.office_id = this.contact.office_id;
    this.formData.group_id = this.contact.group_id;

    this.temporary = this.contact.company_id;
    this.temporarOffice = this.contact.office_id;
    this.temporarDivision = this.contact.division_id;
    this.temporarDepartment = this.contact.department_id;
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
  top: 10px;
  text-transform: initial;
  display: block;
  width: max-content;
}

.isRed {
  color: red !important;
}

.md-error {
  max-width: 180px !important;
}
</style>
