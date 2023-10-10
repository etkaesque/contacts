<template>
  <div>
    <Main>
      <h1 class="text-5xl font-light mb-2">Įmonės</h1>

      <section class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-3">
          <Add :type="`company`"></Add>
          <span class="text-xl">Pridėti naują įmonę</span>
        </div>

        <div>
          <span v-html="foundItemsMessage"></span>
        </div>
      </section>

      <section>
        <div v-if="companies.length != 0" class="w-full">
          <md-table>
            <md-table-row class="headerRow">
              <md-table-head class="font-medium"
                >Įmonės pavadinimas</md-table-head
              >
              <md-table-head class="action">
                <span class="action-text font-medium">Veiksmas</span>
              </md-table-head>
            </md-table-row>

            <md-table-row
              class="t"
              v-for="company in companies"
              :key="company.id"
            >
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
    </Main>
  </div>
</template>

<script>
import Add from "../components/Buttons/add.vue";
import { mapGetters, mapActions } from "vuex";
import Edit from "../components/Buttons/editText.vue";
import Delete from "../components/Buttons/deleteText.vue";

export default {
  components: {
    Add,
    Edit,
    Delete,
  },

  computed: {
    ...mapGetters(["companies", "totalCompanies"]),
    foundItemsMessage() {
      let total = this.totalCompanies;
      return `Iš viso rasta: <span class="font-semibold">${total}</span>.`;
    },
  },
  methods: {
    ...mapActions(["fetchCompanies"]),
  },
  async created() {
    await this.fetchCompanies();
  },
};
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
