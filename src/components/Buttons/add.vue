<template>
  <md-button class="add-btn md-icon-button md-raised" @click="handleAdd">
    <md-icon style="width: 25px !important; height: 25px !important">
      <img :src="addIcon" alt="" />
    </md-icon>
  </md-button>
</template>

<script>
import addIcon from "../../assets/add.svg";
import { mapMutations } from "vuex";
export default {
  props: {
    type: String,
  },
  data() {
    return {
      addIcon,
    };
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL"]),
    handleAdd() {
      let options;

      if (this.type == "Contact") {
        options = { status: true, form: "createContact" };
      } else if (this.type == "company") {
        options = { status: true, form: "addCompany" };
      } else if (this.type == "admin") {
        options = { status: true, form: "addAdmin" };
      } else {
        options = { status: true, form: "addStructure" };
      }

      this.CONTROL_MODAL(options);
    },
  },
};
</script>

<style>
.add-btn {
  background-color: #0054a6 !important;
  width: 50px !important;
  height: 50px !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
  margin: 0px !important;
}
</style>
