<template>
  <md-button
    class="delete-btn md-icon-button md-raised"
    @click="handleClick($event)"
  >
    <md-icon style="width: 30px !important; height: 30px !important">
      <img :src="deleteIcon" alt="" />
    </md-icon>
  </md-button>
</template>

<script>
import deleteIcon from "../../assets/delete.svg";
import { mapMutations } from "vuex";

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
    ...mapMutations(["CONTROL_DELETE", "SET_ACTIVE_CONTACT"]),
    handleClick(event) {
      event.preventDefault();
      event.stopPropagation();

      this.CONTROL_DELETE();
      this.SET_ACTIVE_CONTACT(this.contactId);
    },
  },
};
</script>

<style>
.delete-btn {
  background-color: #a61a11 !important;
  width: 50px !important;
  height: 50px !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
}
</style>
