<template>
  <md-button class="dissmiss-btn md-icon-button md-raised" @click="dismiss">
    <md-icon style="width: 30px !important; height: 30px !important">
      <img :src="addIcon" alt="" style="transform: rotate(45deg)" />
    </md-icon>
  </md-button>
</template>

<script>
import addIcon from "../../assets/add.svg";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      addIcon,
    };
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL"]),
    dismiss() {
      this.CONTROL_MODAL();
    },
  },
};
</script>

<style>
.dissmiss-btn {
  background-color: #0054a6 !important;
  width: 60px !important;
  height: 60px !important;
  filter: drop-shadow(1px 1px 2px black) !important;
  z-index: 1 !important;
}
</style>
