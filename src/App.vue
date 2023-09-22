<template>
  <div>
    <Modal v-if="modal.status"></Modal>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "./components/Popups/modal.vue"
import {mapGetters} from "vuex";

export default {
  components: {
    Modal,
  },
  computed: {
    ...mapGetters(["modal"]),
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  margin: 0px;
  font-family: "Roboto", sans-serif;
  background-color: white !important;
}

main {
  padding: 30px 80px;
}
</style>
