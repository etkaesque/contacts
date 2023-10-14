<template>
  <section>
    <div class="tabsWrapper">
      <md-tabs style="z-index: 1 !important;">
        <md-tab id="tab-office" md-label="Ofisai" @click="handleTab('offices')" style="z-index: 1 !important;"></md-tab>
        <md-tab id="tab-divisions" md-label="Padaliniai" @click="handleTab('divisions')"
          style="z-index: 1 !important;"></md-tab>
        <md-tab id="tab-departments" md-label="Skyriai" @click="handleTab('departments')"
          style="z-index: 1 !important;"></md-tab>
        <md-tab id="tab-groups" md-label="Grupės" @click="handleTab('groups')" style="z-index: 1 !important;"></md-tab>
      </md-tabs>
    </div>
    <div v-if="structure.length != 0" class="w-full">
      <md-table>
        <md-table-row class="headerRow">
          <md-table-head class="font-medium">Pavadinimas</md-table-head>
          <md-table-head v-if="editPermission || deletePermissions" class="action">
            <span class="action-text font-medium">Veiksmas</span>
          </md-table-head>
        </md-table-row>

        <md-table-row class="t" v-for="item in structure" :key="item.id">
          <md-table-cell>{{ item.name }}</md-table-cell>
          <md-table-cell  v-if="editPermission || deletePermissions">
            <div class="flex gap-3 justify-end">
              <Edit v-if="editPermission" :id="item.id" :editLabel="`Redaguoti`" :type="type"></Edit>
              <Delete v-if="deletePermissions" :id="item.id" :type="type"></Delete>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div v-if="structure.length == 0" class="w-full flex justify-center text-xl mt-6">
      Duomenų nėra
    </div>
  </section>
</template>

<script>
import Edit from "../Buttons/editText.vue";
import Delete from "../Buttons/deleteText.vue";

export default {
  data() {
    return {
      editPermission: false,
      deletePermissions: false,
    }
  },
  props: {
    structure: Array,
    type: String,
    editOffices: Boolean,
    editStructure: Boolean,
    deleteOffices: Boolean,
    deleteStructure: Boolean,
  },
  components: {
    Edit,
    Delete
  },
  methods: {
    handleTab(value) {
      this.$emit("handleTabs", value)
    }
  },
  watch: {
    type() {

      if (this.type == 'offices') {
  
        this.editPermission = this.editOffices
        this.deletePermissions = this.deleteOffices
      } else {

        this.editPermission = this.editStructure
        this.deletePermissions = this.deleteStructure

      }


    }
  },


};
</script>

