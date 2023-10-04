<template>
  <div>
    <Header></Header>
    <Main>
      <h1 class="text-5xl font-light mb-2">Įmonės</h1>

      <section class="flex flex-col gap-y-2">
        <div class="flex items-center gap-x-3">
          <Add :type="`Company`"></Add>
          <span class="text-xl">Pridėti naują įmonę</span>
        </div>

        <div>
          <span> {{ foundItemsMessage }}</span>
        </div>
      </section>

      <section>
        <div class="w-full">
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
              class="tableRow"
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
      </section>
    </Main>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import Add from "../components/Buttons/add.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Edit from "../components/Buttons/editText.vue";
import Delete from "../components/Buttons/deleteText.vue";

export default {
  components: {
    Header,
    Add,
    Edit,
    Delete,
  },

  computed: {
    ...mapGetters(["companies", "totalCompanies"]),
    foundItemsMessage() {
      if (this.totalCompanies === 1) {
        return `Iš viso rasta: ${this.totalCompanies} įmonė.`;
      } else if (this.totalCompanies > 9) {
        return `Iš viso rasta ${this.totalCompanies} įmonių.`;
      } else if (this.totalCompanies === 0) {
        return `Įmonių nebuvo rasta.`;
      } else if (this.totalCompanies <= 9) {
        return `Iš viso rastos: ${this.totalCompanies} įmonės.`;
      }
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
</style>
