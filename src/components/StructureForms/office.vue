<template>
  <div class="w-72">

    <h2 class="text-2xl mb-6">Ofiso detalės:</h2>

    <md-field class="w-full">
      <label for="street">Gatvė</label>
      <md-input
        name="street"
        id="street"
        maxlength="35"
        v-model="office.street"
      ></md-input>
    </md-field>

    <md-field class="w-full">
      <label for="street_number">Gatvės numeris</label>
      <md-input
        name="street_number"
        id="street_number"
        type="number"
        v-model="office.street_number"
      ></md-input>
    </md-field>

    <md-field class="w-full">
      <label for="city">Miestas</label>
      <md-input
        name="city"
        id="city"
        maxlength="35"
        v-model="office.city"
      ></md-input>
    </md-field>

    <md-field class="w-full">
      <label for="country">Šalis</label>
      <md-input
        name="country"
        id="country"
        maxlength="35"
        v-model="office.country"
      ></md-input>
    </md-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      office: {
        name: "",
        street: "",
        street_number: "",
        city: "",
        country: "",
      },
    };
  },
};
</script>

<style scoped>
</style>
