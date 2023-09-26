<template>
  <md-button class="add-btn md-icon-button md-raised" @click="handleAdd">
    <md-icon style="width: 30px !important; height: 30px !important">
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
      if (this.type === "Contact") {
        this.CONTROL_MODAL({ status: true, form: "createContact" });
      }
    },
  },
};
</script>

<style>
.add-btn {
  background-color: #0054a6 !important;
  width: 60px !important;
  height: 60px !important;
  filter: drop-shadow(1px 1px 2px black) !important;
  z-index: 1 !important;
}
</style>
