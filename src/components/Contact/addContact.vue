<template>
  <form action="sumbit" class="grid grid-cols-3 grid-rows- gap-x-14">
    <div
      class="w-full text-2xl col-start-1 col-end-4 row-start-1 row-end-2 flex justify-end"
    >
      <dissmissButton></dissmissButton>
    </div>

    <div class="col-start-1 col-end-2 row-start-2 row-end-3">
      <h2 class="text-2xl">Pridėti kontaktą:</h2>
      <div>
        <md-field>
          <label>Vardas</label>
          <md-input   v-model="formData.name"></md-input>
        </md-field>

        <md-field>
          <label>Pavardė</label>
          <md-input v-model="formData.surname"></md-input>
        </md-field>

        <md-field>
          <label>Pozicija</label>
          <md-input v-model="formData.position"></md-input>
        </md-field>
      </div>

      <div>
        <h3 class="text-lg">Kontaktinė informacija</h3>

        <md-field>
          <label>Elektroninis paštas</label>
          <md-input v-model="formData.email"></md-input>
        </md-field>

        <md-field>
          <label>Telefono numeris</label>
          <md-input v-model="formData.phone_number"></md-input>
        </md-field>
      </div>
    </div>

    <div class="md-layout-item col-start-2 col-end-3 row-start-2 row-end-3">
      <h2 class="text-2xl">Įmonės detalės:</h2>
      <md-field>
        <label for="company">Įmonė</label>
        <md-select v-model="formData.company_id" name="company" id="company">
          <md-option v-for="company in companies" :value="company.id">{{
            company.name
          }}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="office">Ofisas</label>
        <md-select v-model="formData.office_id" name="office" id="office">
          <md-option v-for="office in offices" :value="office.id">{{
            office.name
          }}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="font">Padalinys</label>
        <md-select v-model="formData.division_id" name="font" id="division">
          <md-option v-for="division in divisions" :value="division.id">{{
            division.name
          }}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="font">Skyrius</label>
        <md-select
          v-model="formData.department_id"
          name="department"
          id="department"
        >
          <md-option v-for="department in departments" :value="department.id">{{
            department.name
          }}</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="font">Grupė</label>
        <md-select v-model="formData.group_id" name="group" id="group">
          <md-option v-for="group in groups" :value="group.id">{{
            group.name
          }}</md-option>
        </md-select>
      </md-field>

      <div class="fileLabelWrapper flex justify-center">
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
        Pridėti
      </button>
    </div>

    <div class="col-start-1 col-end-3 row-start-3 row-end-4" v-if="!validation.isSuccess">{{ validation.message }}</div>

  </form>
</template>

<script>
import dissmissButton from "../Buttons/dissmiss.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isRed: [],
      validation: { isSuccess: false, message: "" },
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
    ]),
  },
  methods: {
    ...mapActions([
      "fetchCompanies",
      "fetchDepartments",
      "fetchDivisions",
      "fetchOffices",
      "fetchGroups",
      "createContact",
    ]),
    checkIfFormValid() {
  
      let keyList = Object.keys(this.formData)


      keyList.forEach(key => {

        console.log(key, this.formData[key])

        if (this.formData[key].trim() === ""){
          this.validation = { isSuccess: false, message: "Užpldykite visus laukus" };
          
          this.isRed = this.formData[key]

          // ir uždėti raudoną ant this.formData[key] (pvz: name)
        }


      })


      // valueList.forEach((value) => {
      //   if (value.trim() === "") {
      //     console.log("false validation")
      //     this.validation = { isSuccess: false, message: "Užpldykite visus laukus" };
      //   }
  
      // });

      // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // if (!emailPattern.test(this.formData.email.trim())) {
      //   this.validationMessage = "Neteisingas elektroninio pašto adresas.";
      //   return false;
      // }

      // const phonePattern = /^\d{9}$/; // Assuming a 9-digit format
      // if (!phonePattern.test(this.formData.phone_number.trim())) {
      //   this.validationMessage = "Neteisingas telefono numerio formatas.";
      //   return false;
      // }


    },

    handlePhotoUpload(event) {
      console.log(event.target.files[0]);
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
      data.append("phone_number", this.formData.phone_number); // o
      data.append("position", this.formData.position);
      data.append("company_id", this.formData.company_id);
      data.append("office_id", this.formData.office_id);
      data.append("division_id", this.formData.division_id);
      data.append("department_id", this.formData.department_id); // o
      data.append("group_id", this.formData.group_id); // o
      data.append("photo", this.formData.photo); // o

      await this.checkIfFormValid() 

      if (this.validation.isSuccess) {
        console.log("send");
        await this.createContact(data);
      }
    },
  },
  async created() {
    await this.fetchCompanies();
    await this.fetchDepartments();
    await this.fetchDivisions();
    await this.fetchOffices();
    await this.fetchGroups();
  },
};
</script>

<style>
.fileLabel,
.submitBtn {
  padding: 10px 30px;
  background-color: #0054a6;
  color: white;
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
</style>
