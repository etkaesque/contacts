<template>
  <div class="overlay" @click="dismissModal">
    <div class="modal">
      <KeepAlive>
        <component :is="modal.form" :propData="componentProps" />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import editContact from "../Contact/editContact.vue";
import createContact from "../Contact/addContact.vue";
import editCompany from "../Company/editCompany.vue";
import addCompany from "../Company/addCompany.vue";
import addStructure from "../StructureForms/addStructure.vue";
import editStructure from "../StructureForms/editStructure.vue";
import addAdmin from "../Admin/addAdmin.vue";
import editAdmin from "../Admin/editAdmin.vue";
import DeleteFrom from "./delete.vue";

export default {
  components: {
    editContact,
    createContact,
    editCompany,
    addCompany,
    editStructure,
    addStructure,
    addAdmin,
    editAdmin,
    DeleteFrom,
  },
  computed: {
    ...mapGetters(["modal", "company", "admin", "contact", "structure"]),
    componentProps() {
      let header;
      let text;
      let id;
      let type;

      if (this.modal.type == "company") {
        return {
          header: `įmonę`,
          text: `Pavadinimas: ${this.company.data.name}.`,
          id: this.company.id,
          type: this.modal.type,
        };
      } else if (this.modal.type == "admin") {
    
        return {
          header: `paskyrą`,
          text: `Vardas: ${this.admin.data.name}`,
          admin_id: this.admin.id,
          permissions_id:this.admin.data.permissions_id,
          type: this.modal.type,
        };
      } else if (this.modal.type == "contact") {
        return {
          header: `kontaktą`,
          text: `Vardas ir pavardė: ${this.contact.data.name} ${this.contact.data.surname}. <br> Pozicija: ${this.contact.data.position}.`,
          id: this.contact.id,
          type: this.modal.type,
        };
      } else  {

        type = this.structure.type;

        if (type == "offices") {
          header = "ofisą";
        } else if (type == "divisions") {
          header = "padalinį";
        } else if (type == "departments") {
          header = "skyrių";
        } else if (type == "groups") {
          header = "grupę";
        }
      }

      return {
        header: header,
        type: type,
        text: `Pavadinimas: ${this.structure.data.name}.`,
        id: this.structure.id,
      };
    },
  },
  methods: {
    ...mapMutations([
      "CONTROL_MODAL",
      "SET_CONTACT",
      "SET_COMPANY",
      "SET_STRUCTURE",
      "SET_ADMIN"
    ]),
    dismissModal(event) {
      if (event.target.className === "overlay") {
        this.CONTROL_MODAL();
        this.SET_CONTACT();
        this.SET_COMPANY();
        this.SET_STRUCTURE();
        this.SET_ADMIN();
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
  padding: 15px 15px 15px 15px !important;
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
