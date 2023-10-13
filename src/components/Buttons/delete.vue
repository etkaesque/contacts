<template>
  <md-button
    class="delete-btn md-icon-button md-raised"
    @click="handleClick($event)"
  >
    <md-icon style="width: 25px !important; height: 25px !important">
      <img :src="deleteIcon" alt="" />
    </md-icon>
  </md-button>
</template>

<script>
import deleteIcon from "../../assets/delete.svg";
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      deleteIcon,
    };
  },
  props: {
    contactId: String,
  },
  methods: {
    ...mapActions(["fetchContactById"]),
    ...mapMutations(["CONTROL_MODAL"]),
    async handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      await this.fetchContactById(this.contactId);
      this.CONTROL_MODAL({ status: true, form: "DeleteFrom", type: "contact" });
  
    },
  },
};
</script>

<style>
.delete-btn {
  background-color: #a61a11 !important;
  width: 45px !important;
  height: 45px !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
}
</style>
