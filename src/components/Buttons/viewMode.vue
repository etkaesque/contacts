<template>
  <md-button class="view-btn md-icon-button md-raised" @click="setViewMode">
    <md-icon style="width: 30px !important; height: 30px !important">
      <img v-if="isCard" :src="profileIcon" alt="" />
      <img v-else :src="bulletIcon" alt="" />
    </md-icon>
  </md-button>
</template>

<script>
import profileIcon from "../../assets/profile.svg";
import bulletIcon from "../../assets/bullet.svg";
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      profileIcon,
      bulletIcon,
    };
  },
  computed: {
    ...mapGetters(["isCard"]),
  },
  methods: {
    ...mapMutations(["SET_VIEW_MODE"]),
    setViewMode() {
      this.SET_VIEW_MODE();
    },
  },
};
</script>

<style>
.view-btn {
  background-color: #0054a6 !important;
  border-radius: 50px !important;
  width: 75px !important;
  height: 60px !important;
  filter: drop-shadow(1px 1px 2px black) !important;
  z-index: 1 !important;
}
</style>
