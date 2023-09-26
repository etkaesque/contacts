<template>
  <md-button
    class="edit-btn md-icon-button md-raised"
    @click="handleClick($event)"
  >
    <md-icon style="width: 30px !important; height: 30px !important">
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

      this.CONTROL_MODAL({ status: true, form: "editContact" });
      this.SET_ACTIVE_CONTACT(this.contactId);
    },
  },
};
</script>

<style>
.edit-btn {
  background-color: #0054a6 !important;
  width: 56px !important;
  height: 58px !important;
  filter: drop-shadow(1px 1px 2px black) !important;
  z-index: 1 !important;
}
</style>
