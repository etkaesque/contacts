<template>
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
          <span v-if="this.formData.position.trim() === ''" class="md-error">{{
            validation.message
          }}</span>

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
          <md-select v-model="formData.company_id" name="company" id="company">
            <md-option v-for="company in companies" :value="company.id">{{
              company.name
            }}</md-option>
          </md-select>
          <span class="md-error">{{ validation.message }}</span>
        </md-field>

        <md-field ref="office_id">
          <label for="office">Ofisas</label>
          <md-select v-model="formData.office_id" name="office" id="office">
            <md-option v-for="office in offices" :value="office.id">{{
              office.name
            }}</md-option>
          </md-select>
          <span class="md-error">{{ validation.message }}</span>
        </md-field>

        <div>
          <md-field ref="division_id">
            <label for="font">Padalinys</label>
            <md-select v-model="formData.division_id" name="font" id="division">
              <md-option v-for="division in divisions" :value="division.id">{{
                division.name
              }}</md-option>
            </md-select>
            <span class="md-error">{{ validation.message }}</span>
          </md-field>

          <md-field ref="department_id">
            <label for="font">Skyrius</label>
            <md-select
              v-model="formData.department_id"
              name="department"
              id="department"
            >
              <md-option value=""></md-option>
              <md-option
                v-for="department in departments"
                :value="department.id"
                >{{ department.name }}</md-option
              >
            </md-select>
            <span class="md-error">{{ validation.message }}</span>
          </md-field>

          <md-field ref="group_id">
            <label for="font">Grupė</label>
            <md-select v-model="formData.group_id" name="group" id="group">
              <md-option value=""></md-option>
              <md-option v-for="group in groups" :value="group.id">{{
                group.name
              }}</md-option>
            </md-select>
            <span class="md-error">{{ validation.message }}</span>
          </md-field>
        </div>
      </div>

      <div class="fileLabelWrapper flex justify-center w-full">
        <label class="fileLabel uppercase" for="photo">Įkelti nuotrauką</label>
        <input
          type="file"
          name="photo"
          id="photo"
          class="fileInput"
          @change="handlePhotoUpload($event)"
        />
        <span class="photoValidation">{{
          photoSelected ? "Nuotrauka įkelta." : "Pasirinkite nuotrauką."
        }}</span>
      </div>
    </div>

    <div class="col-start-3 col-end-4 flex flex-col row-start-3 row-end-4">
      <button class="submitBtn uppercase" @click="handleSubmit($event)">
        Redaguoti
      </button>
    </div>
  </form>
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
      validation: {
        isSuccess: false,
        message: "Nepalikite lauko tusčio.",
        textTooLow: "Bent trys raidės.",
        textTooSpecial: "Nenaudokite spec. simbolių, skaičių.",
        email: "Neteisingas e. paštas.",
        phone: "Neteisingas formatas. Formato pvz.: +370 XXX XXXXX",
      },

      photoSelected: false,
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
    };
  },
  components: {
    dissmissButton,
  },
  computed: {
    ...mapGetters([
      "companies",
      "departments",
      "divisions",
      "offices",
      "groups",
      "activeContact",
      "contact",
    ]),
  },
  methods: {
    ...mapActions([
      "fetchCompanies",
      "fetchDepartments",
      "fetchDivisions",
      "fetchOffices",
      "fetchGroups",
      "fetchContactById",
      "editContact",
    ]),
    ...mapMutations(["CONTROL_MODAL"]),
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
        const textPattern = /^[\p{L}\p{M}\p{S}\sĄąČčĘęĖėĮįŠšŲųŪūŽž.]+$/u

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
      if (event.target.files.length > 0) {
        this.photoSelected = true;
        this.formData.photo = event.target.files[0];
      } else {
        this.photoSelected = false;
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
  },
  async created() {
    await this.fetchContactById(this.activeContact);
    await this.fetchCompanies();
    await this.fetchDepartments();
    await this.fetchDivisions();
    await this.fetchOffices();
    await this.fetchGroups();

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
