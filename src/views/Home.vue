<template>
  <div>
    <Header></Header>
    <Main>
      <section>
        <h1 class="text-5xl">Kontaktų sistema</h1>



        <div class="flex items-center gap-5">
          <Search></Search>
          <paginationFilter></paginationFilter>
          <viewMode></viewMode>
          <add  v-if="isValid" :type="'Contact'"></add>
        </div>

        <div>
          <span>{{ foundItemsMessage }}</span>
        </div>

        <div>filter component will be here</div>
      </section>

      <Contacts></Contacts>
    </Main>

    <Footer class="flex justify-center">Pagination component Will Be Here</Footer
    >
  </div>
</template>

<script>
import viewMode from "../components/Buttons/viewMode.vue";
import paginationFilter from "../components/Buttons/paginationFilter.vue";
import add from "../components/Buttons/add.vue";
import Contacts from "../components/Contact/contacts.vue";
import Header from "../components/header.vue";
import Search from "../components/search.vue"
import { mapActions, mapGetters } from "vuex";

import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  components: {
    Header,
    Contacts,
    viewMode,
    add,
    paginationFilter,
    Search,
  },
  computed: {
    ...mapGetters(["contacts", "contactsTotalItems"]),
    foundItemsMessage() {
      if (this.contactsTotalItems === 1) {
        return `Iš viso rastas: ${this.contactsTotalItems} kontaktas.`;
      } else if (this.contactsTotalItems > 9) {
        return `Iš viso rasta ${this.contactsTotalItems} kontaktų.`;
      } else if (this.contactsTotalItems === 0) {
        return `Kontaktų nebuvo rasta.`;
      } else if (this.contactsTotalItems <= 9) {
        return `Iš viso rasti: ${this.contactsTotalItems} kontaktai.`;
      }
    },
    isValid() {
      if (pb.authStore) {
        return pb.authStore.isValid;
      }
    },
  },
  methods: {
    ...mapActions(["fetchContacts"]),
  },
  async created() {
    await this.fetchContacts();
  },
};
</script>
