<template>
  <div class="w-full">
    <md-table>
      <md-table-row class="headerRow">
        <md-table-head class="font-medium">Vardas ir pavardė</md-table-head>
        <md-table-head class="font-medium">Pozicija</md-table-head>
        <md-table-head class="font-medium">Telefono numeris</md-table-head>
        <md-table-head class="font-medium">Elektroninis paštas</md-table-head>
        <md-table-head class="font-medium">Adresas</md-table-head>
      </md-table-row>

      <md-table-row
        class="tableRow"
        v-for="contact in contacts"
        :key="contact.id"
        @click="handleClick(contact.id)"
      >
        <md-table-cell>{{ contact.name }} {{ contact.surname }}</md-table-cell>
        <md-table-cell>{{ contact.position }}</md-table-cell>
        <md-table-cell>{{
          contact.phone_number ? contact.phone_number : "nenurodytas"
        }}</md-table-cell>
        <md-table-cell>{{ contact.email }}</md-table-cell>
        <md-table-cell v-if="contact.expand">{{
          contact.expand.office_id.name
        }}</md-table-cell>
        <md-table-cell v-if="valid">
          <div class="flex ml-5 mb-7 mb-t">
            <md-card-actions>
              <div class="act">
                <Edit v-if="editEmployees" :contactId="contact.id"></Edit>
                <Delete v-if="deleteEmployees" :contactId="contact.id"></Delete>
              </div>
            </md-card-actions>
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Edit from "../Buttons/edit.vue";
import Delete from "../Buttons/delete.vue";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["contacts"]),
  },
  components: {
    Edit,
    Delete,
  },
  props: {
    editEmployees: Boolean,
    deleteEmployees: Boolean,
    valid: Boolean,
  },
  methods: {
    handleClick(id) {
      this.$router.push(`contact/${id}`);
    },
  },
};
</script>

<style>
.headerRow {
  width: 100% !important;
}
.headerRow * {
  font-size: 16px;
  color: black;
  
}

.tableRow:hover {
  background-color: #f1f2f4 !important;
  cursor: pointer;
}

.md-table-cell {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
