<template>
  <div class="overlay" @click="dismissModal">
    <div class="modal">
      <KeepAlive>
        <component :is="modal.form" />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import editContact from "../Contact/editContact.vue";
import createContact from "../Contact/addContact.vue";
import editCompany from "../Company/editCompany.vue"
import addCompany from "../Company/addCompany.vue";
import addStructure from "../StructureForms/addStructure.vue";
import editStructure from "../StructureForms/editStructure.vue";

export default {
  components: {
    editContact,
    createContact,
    editCompany,
    addCompany,
    editStructure,
    addStructure

  },
  computed: {
    ...mapGetters(["modal"]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "SET_ACTIVE_CONTACT","SET_ACTIVE_COMPANY","SET_ACTIVE_STRUCTURE"]),
    dismissModal(event) {
      if (event.target.className === "overlay") {
        this.CONTROL_MODAL();
        this.SET_ACTIVE_CONTACT()
        this.SET_ACTIVE_COMPANY()
        this.SET_ACTIVE_STRUCTURE()
      }
    },
  },
};
</script>

<style>

.contact {
  width: 800px !important;
  padding: 10px 10px;
  padding-left: 20px;
}

.modal {
  width: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f7f4f4;
  padding: 20px 20px !important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  width: 230px;
}

.overlay {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
