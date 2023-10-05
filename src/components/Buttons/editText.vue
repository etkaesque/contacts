<template>
  <md-button class="edit-btn-text md-raised" @click="handleClick($event)">
    Redaguoti
  </md-button>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    type: String,
    id: String,
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "SET_ACTIVE_COMPANY","SET_ACTIVE_STRUCTURE"]),
    handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      let options;

      if (this.type == `company`) {
        options = { status: true, form: "editCompany" };
        this.SET_ACTIVE_COMPANY(this.id);
      } else {
        options = { status: true, form: "editStructure" };
        this.SET_ACTIVE_STRUCTURE({ id: this.id, type: this.type });
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
