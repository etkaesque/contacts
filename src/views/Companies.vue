<template>
  <div class="h-5/6 flex flex-col">
    <Main>
      <section class="flex flex-col gap-y-2">
        <h1 class="text-5xl font-light mb-2">Įmonės</h1>
        <div class="flex items-center gap-x-3" v-if="editCompanies">
          <Add :type="`company`"></Add>
          <span class="text-xl">Pridėti naują įmonę</span>
        </div>

        <div>
          <span v-html="foundItemsMessage"></span>
        </div>
      </section>

      <Company :companies="companies" :editCompanies="editCompanies" :deleteCompanies="deleteCompanies"></Company>
    </Main>

    <Footer class="flex justify-center grow items-end">
      <Pagination v-if="companies.length != 0" :type="`company`"></Pagination>
    </Footer>
  </div>
</template>

<script>
import Add from "../components/Buttons/add.vue";
import Company from "../components/Company/company.vue";
import Pagination from "../components/pagination.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);


export default {
  components: {
    Add,
    Company,
    Pagination,
  },

  computed: {
    ...mapGetters(["companies", "totalItems"]),
    foundItemsMessage() {
      let total = this.totalItems;
      return `Iš viso rasta: <span class="font-semibold">${total}</span>.`;
    },
    isValid() {
      if (pb.authStore) {
        return pb.authStore.isValid;
      } else {
        return false;
      }
    },
    editCompanies() {
      if (pb.authStore) {
        return pb.authStore.model.expand.permissions_id.edit_companies;
      }
    },
    deleteCompanies() {
      if (pb.authStore) {
        return pb.authStore.model.expand.permissions_id.delete_companies;
      } 
    },

  },
  methods: {
    ...mapActions(["fetchPaginatedCompanies"]),
    ...mapMutations(["SET_CURRENT_PAGE", "SET_COMPANIES", "SET_COMPANY"]),
  },
  beforeRouteLeave(to, from, next) {
    this.SET_CURRENT_PAGE({page: 1});
    this.SET_COMPANIES()
    this.SET_COMPANY()
    next();
  },
  async created() {
    if (pb.authStore && !pb.authStore.isValid) {
      this.$router.push("/login");
    } else {
      await this.fetchPaginatedCompanies();
    }

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
