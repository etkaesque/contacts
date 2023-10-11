<template>
  <div class="w-72">

    <h2 class="text-2xl mb-6">Ofiso detalės:</h2>

    <md-field ref="street" class="w-full">
      <label for="street">Gatvė</label>
      <md-input
      @input="handleChange"
        name="street"
        id="street"
        maxlength="35"
        v-model="office.street"
      ></md-input>

      <span v-if="validation.office.street.empty" class="md-error">{{
              validation.message.empty
            }}</span>
            <span v-else-if="validation.office.street.tooLow" class="md-error">{{
              validation.message.tooLow
            }}</span>
            <span v-else="validation.office.street.tooSpecial" class="md-error">{{
              validation.message.tooSpecial
            }}</span>

    </md-field>

    <md-field ref="street_number" class="w-full">
      <label for="street_number">Gatvės numeris</label>
      <md-input
      @input="handleChange"
        name="street_number"
        id="street_number"
        type="number"
        v-model="office.street_number"
      ></md-input>


      <span v-if="validation.office.street_number.empty" class="md-error">{{
              validation.message.empty
            }}</span>
            <span v-else-if="validation.office.street_number.tooLow" class="md-error">{{
              validation.message.tooLow
            }}</span>
            <span v-else="validation.office.street_number.tooSpecial" class="md-error">{{
              validation.message.tooSpecial
            }}</span>
    </md-field>

    <md-field  ref="city" class="w-full">
      <label for="city">Miestas</label>
      <md-input
      @input="handleChange"
        name="city"
        id="city"
        maxlength="35"
        v-model="office.city"
      ></md-input>

      <span v-if="validation.office.city.empty" class="md-error">{{
              validation.message.empty
            }}</span>
            <span v-else-if="validation.office.city.tooLow" class="md-error">{{
              validation.message.tooLow
            }}</span>
            <span v-else="validation.office.city.tooSpecial" class="md-error">{{
              validation.message.tooSpecial
            }}</span>
    </md-field>

    <md-field ref="country" class="w-full">
      <label for="country">Šalis</label>
      <md-input
      @input="handleChange"
        name="country"
        id="country"
        maxlength="35"
        v-model="office.country"
      ></md-input>


      <span v-if="validation.office.country.empty" class="md-error">{{
              validation.message.empty
            }}</span>
            <span v-else-if="validation.office.country.tooLow" class="md-error">{{
              validation.message.tooLow
            }}</span>
            <span v-else="validation.office.country.tooSpecial" class="md-error">{{
              validation.message.tooSpecial
            }}</span>





    </md-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      office: {
        street: "",
        street_number: "",
        city: "",
        country: "",
      },
    };
  },
  props:{
    officeData: Object,
    validation: Object,

  },
  emits: ["handleChange"],
  methods: {
    handleChange() {
      this.$emit("handleChange", this.office);
    }},
  created(){
 
    if(this.officeData) {
   
      this.office.name = this.propName
      this.office.street = this.officeData.street
      this.office.street_number = this.officeData.street_number
      this.office.city = this.officeData.city
      this.office.country = this.officeData.country
    }

  }
}
</script>

</style>