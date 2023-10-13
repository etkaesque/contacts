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
    ...mapActions(["setActiveStructure", "fetchAdminById", "fetchCompanyById"]),
    ...mapMutations(["CONTROL_MODAL"]),
    async handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      if (this.type == `company`) {
        console.log(this.type)
        await this.fetchCompanyById(this.id);
      } else if (this.type == `admin`) {
        await this.fetchAdminById(this.id);
      } else {
        await this.setActiveStructure({ id: this.id, type: this.type });
      }

      this.CONTROL_MODAL({ status: true, form: "DeleteFrom", type: this.type });
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
