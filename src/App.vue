<template>
  <div>
    <Modal v-if="modal.status"></Modal>
    <Delete v-if="deletePopUp"></Delete>
    <Notification v-if="notification.status"></Notification>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "./components/Popups/modal.vue";
import Delete from "./components/Popups/delete.vue";
import Notification from "./components/Popups/notification.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Modal,
    Delete,
    Notification,
  },
  computed: {
    ...mapGetters(["modal", "deletePopUp", "notification"]),
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
  background-color: white !important;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  
}

footer {
  background-color: white !important;
}
</style>
