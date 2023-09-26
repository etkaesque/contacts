<template>
  <div>
    <Modal v-if="modal.status"></Modal>
    <Delete v-if="deletePopUp"></Delete>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "./components/Popups/modal.vue"
import Delete from "./components/Popups/delete.vue"
import {mapGetters} from "vuex";

export default {
  components: {
    Modal,
    Delete
  },
  computed: {
    ...mapGetters(["modal", "deletePopUp"]),
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
