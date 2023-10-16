<template>
  <md-button @click="handleClick"  class="pipet-btn md-icon-button md-raised">
    <md-icon style="width: 25px !important; height: 25px !important">
      <img :src="pipetIcon" alt="" />
    </md-icon>
  </md-button>
</template>

<script>
import pipetIcon from "../../assets/pipet.svg";
import {mapMutations} from "vuex"

export default {
  data() {
    return {
      pipetIcon,
    };
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL"]),
    handleClick(){
      this.CONTROL_MODAL({ status: true, form: "perPageSetting" });
    }
  }
};
</script>

<style>
.pipet-btn {
  background-color: #0054a6 !important;
  border-radius: 50px !important;
  width: 50px !important;
  height: 50px !important;
  filter: drop-shadow(0.5px 0.5px 0.5px black) !important;
  z-index: 1 !important;
}
</style>
