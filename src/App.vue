<template>
  <div>
    <Header v-if="$route.path !== '/login'"> ></Header>
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
import Header from "./components/header.vue";
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
    Header,
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
      "active_structure",
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

    async active_structure() {
      this.type = this.active_structure.type;
      this.text = `Pavadinimas: ${this.active_structure.structure.name}.`;
      this.id = this.active_structure.structure.id


      if (this.type == "offices") {
        this.header = "ofisą";
      } else if (this.type == "divisions") {
        this.header = "padalinį";
      } else if (this.type == "departments") {
        this.header = "skyrių";
      } else if (this.type == "groups") {
        this.header = "grupę";
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
