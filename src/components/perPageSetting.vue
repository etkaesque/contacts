<template>
  <div class="perPageSetting grid grid-auto-col grid-auto-rows">
    <div class="col-start-2 col-end-3 row-start-1 row-end-2 h-10 flex justify-start">
      <dissmiss></dissmiss>
    </div>

    <div class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start">
      <h2 class="text-2xl w-full mb-2">Kontaktų skaičius puslapyje:</h2>

      <md-field  :class="{ 'md-invalid': v$.number.$error }">
      <label>Skaičius</label>
      <md-input v-model="number" type="number"></md-input>


      <div v-if="v$.number.$error">
                <span class="md-error">{{
                  v$.number.$errors[0].$message
       }}</span>
      </div>


    </md-field> 


    </div>

    <button class="submitBtn uppercase mt-6 row-start-3 row-end-4 " @click="handleClick()">
        Redaguoti
    </button>

  </div>
</template>

<script>

import dissmiss from './Buttons/dissmiss.vue';
import { mapMutations,mapGetters, mapActions } from 'vuex';

import { useVuelidate } from "@vuelidate/core";
import { helpers, between } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      number: "",
    };
  },
  validations(){
    return{
      number: {
        betweenValue: helpers.withMessage("Įrašykite skaičių tarp 1 ir 50", between(1, 50))
      }
    }
  },
  computed: {
    ...mapGetters(["perPage", "filterData", "searchTerm", "currentPage"]),
  },
  components:{
    dissmiss
  },
  methods:{
    ...mapMutations(["SET_PER_PAGE", "CONTROL_MODAL", "SET_CURRENT_PAGE"]),
    ...mapActions(["fetchContacts"]),
    async handleClick(){


      let isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) return;

      this.SET_PER_PAGE(this.number)

      this.SET_CURRENT_PAGE({page: 1, isContact:true});

      await this.fetchContacts({
      page: this.currentPage,
      searchTerm: this.searchTerm,
      filterData: this.filterData,
     });

      this.CONTROL_MODAL()
    }
  },
  created(){
    this.number = localStorage.getItem("perPage")
  }
};
</script>

<style>

.perPageSetting {
  width: 280px !important;
}

</style>