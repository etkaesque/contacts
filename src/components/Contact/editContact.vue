<template>
  <form action="sumbit" class="grid grid-cols-3 grid-rows- gap-x-14">
    <div
      class="w-full text-2xl col-start-1 col-end-4 row-start-1 row-end-2 flex justify-end"
    >
      <dissmissButton></dissmissButton>
    </div>

    <div class="col-start-1 col-end-2 row-start-2 row-end-3">
      <h2 class="text-2xl">Redaguoti kontaktą:</h2>
      <div>
        <md-field>
          <label>Vardas</label>
          <md-input v-model="formData.name"></md-input>
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
          <md-option value="Company">Company</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="office">Ofisas</label>
        <md-select v-model="formData.office_id" name="office" id="office">
          <md-option value="Ofisas">Ofisas</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="font">Padalinys</label>
        <md-select v-model="formData.division_id" name="font" id="division">
          <md-option value="Division">Division</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="font">Skyrius</label>
        <md-select
          v-model="formData.department_id"
          name="department"
          id="department"
        >
          <md-option value="Company">Company</md-option>
        </md-select>
      </md-field>

      <md-field>
        <label for="font">Grupė</label>
        <md-select v-model="formData.group_id" name="group" id="group">
          <md-option value="group">Grupė</md-option>
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
        <span class="photoValidation">{{ photoSelected ? "Nuotrauka įkelta." : "Pasirinkite nuotrauką." }}</span>
      </div>
    </div>

    <div class="col-start-3 col-end-4 flex flex-col row-start-3 row-end-4">
      <button class="submitBtn uppercase">Pridėti</button>
    </div>
  </form>
</template>

<script>
import dissmissButton from "../Buttons/dissmiss.vue";

export default {
  data() {
    return {
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
      },
    
    };
  },
  components: {
    dissmissButton,
  },
  methods: {
    handlePhotoUpload(event) {
      if (event.target.files.length > 0) {
        this.photoSelected = true;
      } else {
        this.photoSelected = false;
      }
    },
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
