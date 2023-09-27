<template>
  <div class="overlay" @click="dismissModal">
    <div class="modal">
      <KeepAlive>
        <component :is="modal.form" />
      </KeepAlive>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import editContact from "../Contact/editContact.vue";
import createContact from "../Contact/addContact.vue";

export default {
  components: {
    editContact,
    createContact,
  },
  computed: {
    ...mapGetters(["modal"]),
  },
  methods: {
    ...mapMutations(["CONTROL_MODAL"]),
    dismissModal(event) {
      if (event.target.className === "overlay") {
        this.CONTROL_MODAL();
      }
    },
  },
};
</script>

<style>
.modal {
  min-width: 1000px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f7f4f4;
  padding: 30px 20px !important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  width: 230px;
}

.overlay {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
}
</style>
