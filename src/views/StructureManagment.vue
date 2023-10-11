<template>
  <div class="h-5/6 flex flex-col">
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

      <Structure
        :structure="structure"
        :type="type"
        @handleTabs="handleTab"
      ></Structure>
    </Main>

    <Footer class="flex justify-center grow items-end">
      <Pagination :type="type"></Pagination>
    </Footer>
  </div>
</template>

<script>
import Add from "../components/Buttons/add.vue";
import Structure from "../components/StructureForms/structure.vue";
import Pagination from "../components/pagination.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  data() {
    return {
      type: "",
      structure: [],
    };
  },
  components: {
    Add,
    Structure,
    Pagination,
  },

  computed: {
    ...mapGetters([
      "offices",
      "divisions",
      "departments",
      "groups",
      "totalItems",
    ]),
    structureMessage() {
      return `Iš viso rasta: <span class="font-semibold">${this.totalItems}</span>.`;
    },
    isValid() {
      if (pb.authStore) {
        return pb.authStore.isValid;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapMutations(["SET_CURRENT_PAGE"]),
    ...mapActions([
      "fetchPaginatedGroups",
      "fetchPaginatedDivisions",
      "fetchPaginatedDepartments",
      "fetchPaginatedOffices",
    ]),
    async handleTab(type) {
      this.type = type;
      this.SET_CURRENT_PAGE(1);

      if (type == `offices`) {
        await this.fetchPaginatedOffices();
        this.structure = this.offices;
      } else if (type == `divisions`) {
        await this.fetchPaginatedDivisions();
        this.structure = this.divisions;
      } else if (type == `departments`) {
        await this.fetchPaginatedDepartments();
        this.structure = this.departments;
      } else if (type == `groups`) {
        await this.fetchPaginatedGroups();
        this.structure = this.groups;
      }
    },
  },
  watch: {
    offices() {
      if (this.type == `offices`) {
        this.structure = this[this.type];
      }
    },
    divisions() {
      if (this.type == `divisions`) {
        this.structure = this[this.type];
      }
    },
    departments() {
      if (this.type == `departments`) {
        this.structure = this[this.type];
      }
    },
    groups() {
      if (this.type == `groups`) {
        this.structure = this[this.type];
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    console.log("is hit");
    this.SET_CURRENT_PAGE(1);
    next();
  },
  async created() {
    if (pb.authStore && !pb.authStore.isValid) {
      this.$router.push("/login");
    } else {
      await this.fetchPaginatedOffices();
      this.structure = this.offices;
      this.type = `offices`;
    }
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
