<template>
  <md-button class="dissmiss-btn md-icon-button md-raised" @click="dismiss">
    <md-icon>
      <img :src="addIcon" alt="" style="transform: rotate(0deg)" />
    </md-icon>
  </md-button>
</template>

<script>
import addIcon from "../../assets/dismiss.svg";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      addIcon,
    };
  },
  methods: {
    ...mapMutations([
      "CONTROL_MODAL",
      "SET_CONTACT",
      "SET_COMPANY",
      "SET_STRUCTURE",
      "SET_ADMIN",
      "SET_PASSWORD"
    ]),
    dismiss() {
      this.CONTROL_MODAL();
      this.SET_CONTACT();
      this.SET_ADMIN()
      this.SET_COMPANY();
      this.SET_STRUCTURE()
      this.SET_PASSWORD()
    },
  },
};
</script>

<style>
.dissmiss-btn {
  background-color: #0054a6 !important;
  width: auto !important;
  height: 40px !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
}
</style>
