<template>
  <div class="h-5/6 flex flex-col">
    <Main>
      <section class="flex flex-col gap-y-2">
        <h1 class="text-5xl font-light mb-2">Kontaktų sistema</h1>

        <div class="flex items-center gap-5">
          <Search></Search>
          <perPageSetting></perPageSetting>
          <viewMode></viewMode>
          <add v-if="isValid && addEmployees" :type="'Contact'"></add>
        </div>

        <div>
          <span v-html="foundItemsMessage"></span>
        </div>

        <Filters></Filters>
      </section>

      <Contacts></Contacts>
    </Main>

    <Footer class="flex justify-center grow items-end">
      <Pagination v-if="contacts.length != 0" :type="`contact`"></Pagination>
    </Footer>
  </div>
</template>

<script>
import viewMode from "../components/Buttons/viewMode.vue";
import perPageSetting from "../components/Buttons/perPageSetting.vue";
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
    perPageSetting,
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
      "perPage"
    ]),

    foundItemsMessage() {
      return `Iš viso rasta: <span class="font-semibold">${this.totalItems}</span>.`;
    },
    isValid() {
      if (pb.authStore) {
        return pb.authStore.isValid;
      }
    },
    addEmployees(){
      if(pb.authStore && pb.authStore.model){
        return pb.authStore.model.expand.permissions_id.edit_employees;
      }
    }
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
      "SET_PER_PAGE",
      "SET_TOTAL_ITEMS"
    ]),
  },
  async created() {

    if(localStorage.getItem("perPage") == undefined){
    
      this.SET_PER_PAGE(8)
    } else {
      this.SET_PER_PAGE(localStorage.getItem("perPage"))
    }

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
    this.SET_CURRENT_PAGE({page: 1});
    this.SET_SEARCH_TERM("");
    this.SET_FILTERS();
    this.SET_TOTAL_ITEMS()

    next();
  },
};
</script>

<style></style>
