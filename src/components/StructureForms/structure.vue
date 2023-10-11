<template>
  <section>
    <div class="tabsWrapper">
      <md-tabs>
        <md-tab
          id="tab-office"
          md-label="Ofisai"
          @click="handleTab('offices')"
        ></md-tab>
        <md-tab
          id="tab-divisions"
          md-label="Padaliniai"
          @click="handleTab('divisions')"
        ></md-tab>
        <md-tab
          id="tab-departments"
          md-label="Skyriai"
          @click="handleTab('departments')"
        ></md-tab>
        <md-tab
          id="tab-groups"
          md-label="Grupės"
          @click="handleTab('groups')"
        ></md-tab>
      </md-tabs>
    </div>
    <div v-if="structure.length != 0" class="w-full">
      <md-table>
        <md-table-row class="headerRow">
          <md-table-head class="font-medium">Pavadinimas</md-table-head>
          <md-table-head class="action">
            <span class="action-text font-medium">Veiksmas</span>
          </md-table-head>
        </md-table-row>

        <md-table-row class="t" v-for="item in structure" :key="item.id">
          <md-table-cell>{{ item.name }}</md-table-cell>
          <md-table-cell>
            <div class="flex gap-3 justify-end">
              <Edit :id="item.id" :type="type"></Edit>
              <Delete :id="item.id" :type="type"></Delete>
            </div>
          </md-table-cell>
        </md-table-row>
      </md-table>
    </div>
    <div
      v-if="structure.length == 0"
      class="w-full flex justify-center text-xl mt-6"
    >
      Duomenų nėra
    </div>
  </section>
</template>

<script>
import Edit from "../Buttons/editText.vue";
import Delete from "../Buttons/deleteText.vue";

export default {
  props: {
    structure: Array,
    type: String,
  },
  components: {
    Edit,
    Delete,
  },
  methods: {
    handleTab(value){
        this.$emit("handleTabs", value)
    }
  }
};
</script>
