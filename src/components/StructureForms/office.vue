<template>
  <div class="w-72 flex flex-col">

    <h2 class="text-2xl mb-6">Ofiso detalės:</h2>

    <md-field ref="street" class="w-full" :class="{ 'md-invalid': v$.office.street.$error }">
      <label for="street">Gatvė</label>
      <md-input @input="handleChange" name="street" id="street" maxlength="35" v-model="office.street"></md-input>

      <div v-if="v$.office.street.$error">
        <span class="md-error">{{
          v$.office.street.$errors[0].$message
        }}</span>
      </div>

    </md-field>

    <md-field ref="street_number" class="w-full" :class="{ 'md-invalid': v$.office.street_number.$error }">
      <label for="street_number">Namo numeris</label>
      <md-input @input="handleChange" name="street_number" id="street_number" maxlength="10"
        v-model="office.street_number"></md-input>

      <div v-if="v$.office.street_number.$error">
        <span class="md-error">{{
          v$.office.street_number.$errors[0].$message
        }}</span>
      </div>


    </md-field>

    <md-field ref="city" class="w-full" :class="{ 'md-invalid': v$.office.city.$error }">
      <label for="city">Miestas</label>
      <md-input @input="handleChange" name="city" id="city" maxlength="35" v-model="office.city"></md-input>

      <div v-if="v$.office.city.$error">
        <span class="md-error">{{
          v$.office.city.$errors[0].$message
        }}</span>
      </div>



    </md-field>

    <md-field ref="country" class="w-full" :class="{ 'md-invalid': v$.office.country.$error }">
      <label for="country">Šalis</label>
      <md-input @input="handleChange" name="country" id="country" maxlength="35" v-model="office.country"></md-input>

      <div v-if="v$.office.country.$error">
        <span class="md-error">{{
          v$.office.country.$errors[0].$message }}</span>
      </div>


    </md-field>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  minLength,
  minValue,
  helpers,
} from "@vuelidate/validators";

const textPattern2 = /^[a-zA-ZĄąČčĘęĖėĮįŠšŲųŪūŽž. ]+$/
const alpha2 = helpers.regex(textPattern2);

const textPattern3 = /^[^\d]+$/
const alpha3 = helpers.regex(textPattern3)
const textPatter4 = /^(?=.*\d).+$/
const alpha4 = helpers.regex(textPatter4)

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      office: {
        street: "",
        street_number: "",
        city: "",
        country: "",
      },
      messageEmpty: "Nepalikite lauko tuščio",
      messageTooLow: "Įrašykite bent 3 simbolius",
      messageTooSpecial: "Nenaudokite specialių simbolių",
      messageHasZero: "Reikšmė neturi būti 0",
      messageOnlyLetter: "Nenaudokite skaičių",
      meesageNeedsNumbers: "Įveskite bent vieną skaičių"
    };
  },
  validations() {
    return {
      office: {
        city: {
          required: helpers.withMessage(this.messageEmpty, required),
          alpha3: helpers.withMessage(this.messageOnlyLetter, alpha3),
          alpha2: helpers.withMessage(
            this.messageTooSpecial,
            alpha2
          ),

          minLength: helpers.withMessage(this.messageTooLow, minLength(3)),
        },
        country: {
          required: helpers.withMessage(this.messageEmpty, required),
          alpha3: helpers.withMessage(this.messageOnlyLetter, alpha3),
          alpha2: helpers.withMessage(this.messageTooSpecial, alpha2),

          minLength: helpers.withMessage(this.messageTooLow, minLength(3))
        },

        street: {
          required: helpers.withMessage(this.messageEmpty, required),
          minLength: helpers.withMessage(this.messageTooLow, minLength(3)),
          alpha3: helpers.withMessage(this.messageOnlyLetter, alpha3),
          alpha2: helpers.withMessage(this.messageTooSpecial, alpha2),

          minLength: helpers.withMessage(this.messageTooLow, minLength(3))

        },
        street_number: {
          required: helpers.withMessage(this.messageEmpty, required),
          alpha4: helpers.withMessage(this.meesageNeedsNumbers, alpha4)
        },
      },
    }
  },
  props: {
    officeData: Object,
  },
  emits: ["handleChange"],
  methods: {
    handleChange() {
      this.$emit("handleChange", this.office);
    }
  },
  created() {
    
    if (this.officeData) {

      this.office.street = this.officeData.street
      this.office.street_number = this.officeData.street_number
      this.office.city = this.officeData.city
      this.office.country = this.officeData.country
    }

  }
}
</script>

</style>