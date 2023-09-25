<template>
  <md-button class="arrow-btn md-icon-button md-raised" @click="handleClick">
    <md-icon style="width: 30px !important; height: 30px !important">
      <img :src="arrowIcon" alt=""  />
    </md-icon>
  </md-button>
</template>

<script>
import arrowIcon from "../../assets/arrow.png"

export default {
  data() {
    return {
      arrowIcon,
    };
  },
  methods: {
    handleClick() {
      this.$router.push(`/`);
    },
  },
};
</script>

<style>
.arrow-btn {
  background-color: white !important;
  width: 60px !important;
  height: 60px !important;
  filter: drop-shadow(1px 1px 2px black) !important;
  z-index: 1 !important;
}
</style>
