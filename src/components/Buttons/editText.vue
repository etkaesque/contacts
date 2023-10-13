<template>
  <md-button class="edit-btn-text md-raised" @click="handleClick($event)">
    {{ editLabel }}
  </md-button>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {

  props: {
    editLabel: String,
    type: String,
    id: String,
  },
  methods: {
    ...mapActions(["setActiveStructure", "fetchAdminById", "fetchCompanyById"]),
    ...mapMutations([
      "CONTROL_MODAL",
      "SET_STRUCTURE",
    ]),
   async handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      let options;

      if (this.type == `company`) {
        options = { status: true, form: "editCompany" };
        this.fetchCompanyById(this.id);
      } else if (this.type == `admin`) {
        options = { status: true, form: "editAdmin" };
        await this.fetchAdminById(this.id)
      } else {
        options = { status: true, form: "editStructure" };
        await this.setActiveStructure({ id: this.id, type: this.type });
      }

      this.CONTROL_MODAL(options);
    },
  },
};
</script>

<style>
.edit-btn-text {
  color: white !important;
  border-radius: 15px !important;
  background-color: #0054a6 !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
  text-transform: capitalize !important;
  margin: 0px !important;
  width: 250px !important;
  height: 40px !important;
}
</style>
