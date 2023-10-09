<template>
  <md-button class="delete-btn-text md-raised" @click="handleClick($event)">
    Ištrinti
  </md-button>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    id: String,
    type: String,
  },
  methods: {
    ...mapActions(["setActiveStructure"]),
    ...mapMutations([
      "CONTROL_DELETE",
      "SET_ACTIVE_COMPANY",
      "SET_ACTIVE_STRUCTURE",
    ]),
    handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      if (this.type == `company`) {
        this.SET_ACTIVE_COMPANY(this.id);
      } else {
        this.setActiveStructure({ id: this.id, type: this.type });
      }

      this.CONTROL_DELETE();
    },
  },
};
</script>

<style>
.delete-btn-text {
  color: white !important;
  border-radius: 15px !important;
  background-color: #a61a11 !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
  text-transform: capitalize !important;
  margin: 0px !important;
  width: 75px !important;
  height: 40px !important;
}
</style>
