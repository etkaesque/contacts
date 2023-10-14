<template>
    <section>
      <div v-if="admins.length != 0" class="w-full">
        <md-table>
          <md-table-row class="headerRow">
            <md-table-head  class="tableHead font-medium">Vardas</md-table-head>
            <md-table-head class="tableHead font-medium">El.Paštas</md-table-head>
            <md-table-head class="tableHead action">
              <span class="action-text font-medium">Veiksmas</span>
            </md-table-head>
          </md-table-row>
  
          <md-table-row class="t" v-for="admin in admins" :key="admin.id">
            <md-table-cell>{{ admin.name }}</md-table-cell>
            <md-table-cell>{{ admin.email }}</md-table-cell>
            <md-table-cell>
              <div class="flex gap-3 justify-end">
                <Edit :id="admin.id" :editLabel="editLabel" :type="`admin`"></Edit>
                <Delete :id="admin.id" :type="`admin`"></Delete>
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
      data(){
        return{
          editLabel: "Keisti leidimus"
        }
       
      }, 
      props:{
          admins: Array,
  
      },
      components:{
          Edit,
          Delete
      }
  
  }
  
  
  
  </script>
  

<style>



.action {
  text-align: center;
  width: 400px;
}

.action .md-table-head-label {
  display: flex !important;
  justify-content: center !important;
}

.t:nth-child(even) {
  background-color: rgb(253, 247, 247) !important;
}




</style>