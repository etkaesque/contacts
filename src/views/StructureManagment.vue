<template>
  <div>
    <Main>
      <section class="flex flex-col gap-y-2">
        <h1 class="text-5xl font-light mb-2">Struktūra</h1>
        <div class="flex items-center gap-x-3">
          <Add :type="type"></Add>
          <span class="text-xl">Pridėti naują struktūrą</span>
        </div>

        <div>
          <span v-html="structureMessage"></span>
        </div>
      </section>

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
    </Main>
  </div>
</template>

<script>
import Add from "../components/Buttons/add.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import Edit from "../components/Buttons/editText.vue";
import Delete from "../components/Buttons/deleteText.vue";

export default {
  data() {
    return {
      type: "",
      structure: [],
    };
  },
  components: {
    Add,
    Edit,
    Delete,
  },

  computed: {
    ...mapGetters(["offices", "divisions", "departments", "groups"]),
    structureMessage() {
      let total = this.structure.length;

      return `Iš viso rasta: <span class="font-semibold">${total}</span>.`;
    },
  },
  methods: {
    ...mapMutations([""]),
    ...mapActions([
      "fetchGroups",
      "fetchDivisions",
      "fetchDepartments",
      "fetchOffices",
    ]),
    async handleTab(type) {
      this.type = type;

      if (type == `offices`) {
        await this.fetchOffices();
        this.structure = this.offices;
      } else if (type == `divisions`) {
        await this.fetchDivisions();
        this.structure = this.divisions;
      } else if (type == `departments`) {
        await this.fetchDepartments();
        this.structure = this.departments;
      } else if (type == `groups`) {
        await this.fetchGroups();
        this.structure = this.groups;
      }
    },
  },
  watch: {
    offices() {
      if (this.type == `offices`) {
        this.structure = this.offices;
      }
    },
    divisions() {
      if (this.type == `divisions`) {
        this.structure = this.divisions;
      }
    },
    departments() {
      if (this.type == `departments`) {
        this.structure = this.departments;
      }
    },
    groups() {
      if (this.type == `groups`) {
        this.structure = this.groups;
      }
    },
  },
  async created() {
    await this.fetchOffices();
    this.structure = this.offices;
    this.type = `offices`;
  },
};
</script>

<style scoped>
.action {
  text-align: center;
  width: 400px;
}

.tabsWrapper * {
  z-index: 1 !important;
}

.action .md-table-head-label {
  display: flex !important;
  justify-content: center !important;
}

.t:nth-child(even) {
  background-color: rgb(253, 247, 247) !important;
}
</style>
