<template>
  <div class="h-5/6 flex flex-col">
    <Main>
      <section>
        <h1 class="text-5xl font-light">Kontaktų sistema</h1>

        <div class="flex items-center gap-5">
          <Search></Search>
          <paginationFilter></paginationFilter>
          <viewMode></viewMode>
          <add v-if="isValid" :type="'Contact'"></add>
        </div>

        <div>
          <span v-html="foundItemsMessage"></span>
        </div>

        <Filters></Filters>
      </section>

      <Contacts></Contacts>
    </Main>

    <Footer class="flex justify-center grow items-end">
      <Pagination :type="`contact`"></Pagination>
    </Footer>
  </div>
</template>

<script>
import viewMode from "../components/Buttons/viewMode.vue";
import paginationFilter from "../components/Buttons/paginationFilter.vue";
import add from "../components/Buttons/add.vue";
import Contacts from "../components/Contact/contactsDisplay.vue";

import Search from "../components/search.vue";
import Pagination from "../components/pagination.vue";
import Filters from "../components/filter.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";

import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  components: {
    Contacts,
    viewMode,
    add,
    paginationFilter,
    Search,
    Pagination,
    Filters,
  },
  computed: {
    ...mapGetters([
      "contacts",
      "totalItems",
      "searchTerm",
      "currentPage",
      "filterData",
    ]),

    foundItemsMessage() {
      return `Iš viso rasta: <span class="font-semibold">${this.totalItems}</span>.`;
    },
    isValid() {
      if (pb.authStore) {
        return pb.authStore.isValid;
      }
    },
  },
  methods: {
    ...mapActions(["fetchContacts"]),
    ...mapMutations([
      "SET_COMPANIES",
      "SET_OFFICES",
      "SET_GROUPS",
      "SET_DIVISIONS",
      "SET_DEPARTMENTS",
      "SET_CURRENT_PAGE",
      "SET_SEARCH_TERM",
      "SET_FILTERS",
    ]),
  },
  async created() {
    this.SET_COMPANIES();
    this.SET_OFFICES();
    this.SET_GROUPS();
    this.SET_DIVISIONS();
    this.SET_DEPARTMENTS();
    await this.fetchContacts({
      page: this.currentPage,
      searchTerm: this.searchTerm,
      filterData: this.filterData,
    });


  },
  beforeRouteLeave(to, from, next) {
    this.SET_CURRENT_PAGE(1);
    this.SET_SEARCH_TERM("");
    this.SET_FILTERS();

    next();
  },
};
</script>

<style></style>
