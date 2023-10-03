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
      if (this.type === "Contact") {
        this.CONTROL_MODAL({ status: true, form: "createContact" });
      } else if (this.type === "Company") {
        this.CONTROL_MODAL({ status: true, form: "addCompany" });

      }
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
}
</style>
