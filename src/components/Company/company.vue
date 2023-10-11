<template>
  <section>
    <div v-if="companies.length != 0" class="w-full">
      <md-table>
        <md-table-row class="headerRow">
          <md-table-head class="font-medium">Įmonės pavadinimas</md-table-head>
          <md-table-head class="action">
            <span class="action-text font-medium">Veiksmas</span>
          </md-table-head>
        </md-table-row>

        <md-table-row class="t" v-for="company in companies" :key="company.id">
          <md-table-cell>{{ company.name }}</md-table-cell>
          <md-table-cell>
            <div class="flex gap-3 justify-end">
              <Edit :id="company.id" :type="`company`"></Edit>
              <Delete :id="company.id" :type="`company`"></Delete>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>

    <div v-else class="w-full flex justify-center text-xl mt-6">
      Duomenų nėra
    </div>
  </section>
</template>


<script>
import Edit from "../Buttons/editText.vue";
import Delete from "../Buttons/deleteText.vue";


export default {
    props:{
        companies: Array,

    },
    components:{
        Edit,
        Delete
    }

}



</script>
