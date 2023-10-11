<template>
  <div>
    <div v-if="contacts.length != 0">
      <section v-if="isCard">
        <Cards
          :profileIcon="profileIcon"
          :valid="isValid"
          :deleteEmployees="deleteEmployees"
          :editEmployees="editEmployees"
        ></Cards>
      </section>

      <section v-else>
        <Tables
          :valid="isValid"
          :deleteEmployees="deleteEmployees"
          :editEmployees="editEmployees"
        ></Tables>
      </section>
    </div>

    <div v-else class="w-full flex justify-center text-xl mt-6">
      Duomenų nėra
    </div>
  </div>
</template>

<script>
import profileIcon from "../../assets/user.svg";
import Cards from "./contactsGridView.vue";
import Tables from "./contactsTableView.vue";
import { mapActions, mapGetters } from "vuex";

import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  data() {
    return {
      profileIcon,
    };
  },
  components: {
    Cards,
    Tables,
  },
  computed: {
    ...mapGetters(["isCard", "contacts"]),
    isValid() {
      if (pb.authStore) {
        return pb.authStore.isValid;
      }
    },
    editEmployees() {
      if (pb.authStore.model) {
        return pb.authStore.model.expand.permissions_id.edit_employees;
      }
    },
    deleteEmployees() {
      if (pb.authStore.model) {
        return pb.authStore.model.expand.permissions_id.delete_employees;
      }
    },
  },

  methods: {
    ...mapActions(["fetchContacts"]),
  },
};
</script>

<style>
.md-card {
  width: 380px;
  height: 260px;
  display: inline-block;
  vertical-align: top;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.act {
  display: flex;
  column-gap: 5px;
}
</style>
