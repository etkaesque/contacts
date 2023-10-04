<template>
  <div>
    <Modal v-if="modal.status"></Modal>
    <Delete
      :type="type"
      :id="id"
      :text="text"
      :header="header"
      v-if="deletePopUp"
    ></Delete>
    <Notification v-if="notification.status"></Notification>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "./components/Popups/modal.vue";
import Delete from "./components/Popups/delete.vue";
import Notification from "./components/Popups/notification.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      header: "",
      type: "",
      text: "",
      id: "",
    };
  },

  components: {
    Modal,
    Delete,
    Notification,
  },
  computed: {
    ...mapGetters([
      "modal",
      "deletePopUp",
      "notification",
      "company",
      "contact",
      "activeContact",
      "active_company",
    ]),
  },
  methods: {
    ...mapActions(["fetchContactById", "fetchCompanyById"]),
  },
  watch: {
    async active_company() {
      if (this.active_company != "") {
        await this.fetchCompanyById(this.active_company);
        this.type = `company`;
        this.header = `įmonę`;
        this.text = `Pavadinimas: ${this.company.name}.`;
        this.id = this.active_company;
      }
    },

    async activeContact() {
      if (this.activeContact != "") {
        await this.fetchContactById(this.activeContact);
        this.type = `contact`;
        this.header = `kontaktą`;
        this.text = `Vardas ir pavardė: ${this.contact.name} ${this.contact.surname}. <br> Pozicija: ${this.contact.position}.`;
        this.id = this.activeContact;
      }
    },
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  margin: 0px;
  font-family: "Roboto", sans-serif;
  background-color: white !important;
}

main {
  background-color: white !important;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
}

footer {
  background-color: white !important;
}
</style>
