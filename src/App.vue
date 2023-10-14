<template>
  <div class="h-screen">
    <Header v-if="$route.path !== '/login'"> ></Header>
    <Modal v-if="modal.status" ></Modal>
    <Notification v-if="notification.status"></Notification>
    <router-view></router-view>
  </div>
</template>

<script>
import Modal from "./components/Popups/modal.vue";
import Notification from "./components/Popups/notification.vue";
import Header from "./components/header.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Modal,
    Notification,
    Header,
  },
  computed: {
    ...mapGetters([
      "modal",
      "notification",
    ]),
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

.md-ripple{
  z-index: 1 !important;
}

.md-table-head-label{
  margin-left: 10px !important;
  padding-left: 10px !important;
}

.md-table-cell-container{
  margin-left: 10px !important;
  padding-left: 10px !important;
}

.md-table-cell{
  min-width: 200px !important;
}


</style>
