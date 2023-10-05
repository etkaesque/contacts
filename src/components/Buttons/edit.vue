<template>
  <md-button
    class="edit-btn md-icon-button md-raised"
    @click="handleClick($event)"
  >
    <md-icon style="width: 25px !important; height: 25px !important">
      <img :src="editIcon" alt="" />
    </md-icon>
  </md-button>
</template>

<script>
import editIcon from "../../assets/edit.svg";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      editIcon,
    };
  },
  props: {
    contactId: String,
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL", "SET_ACTIVE_CONTACT"]),
    handleClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.SET_ACTIVE_CONTACT(this.contactId);
      this.CONTROL_MODAL({ status: true, form: "editContact" });
    },
  },
};
</script>

<style>
.edit-btn {
  background-color: #0054a6 !important;
  width: 45px !important;
  height: 45px !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
}
</style>
