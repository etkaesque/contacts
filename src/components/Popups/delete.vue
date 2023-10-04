<template>
  <div class="overlay" @click="dismissModal">
    <div class="deletePopUp">
      <div class="h-5/6 truncate">
        <h2 class="text-2xl">Ar tikrai norite ištrinti {{ header }}?</h2>
        <p v-html="text" class="opacity-80"></p>
      </div>
      <div class="w-full flex justify-end gap-5">
        <button class="text-teltonikaBlue uppercase" @click="handleDelete">
          Taip
        </button>
        <button class="text-teltonikaBlue uppercase" @click="dismiss">
          Ne
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  props: {
    type: String,
    text: String,
    id: String,
    header: String,
  },

  methods: {
    ...mapActions(["deleteContact", "deleteCompany"]),
    ...mapMutations([
      "CONTROL_DELETE",
      "SET_ACTIVE_CONTACT",
      "SET_ACTIVE_COMPANY",
    ]),
    dismiss() {
      if (this.type == `company`) {
        this.SET_ACTIVE_COMPANY();
      } else if (this.type == `contact`) {
        this.SET_ACTIVE_CONTACT();
      }

      this.CONTROL_DELETE();
    },
    handleDelete() {
      if (this.type == `company`) {
        this.deleteCompany(this.id);
        this.SET_ACTIVE_COMPANY();
      } else if (this.type == `contact`) {
        this.deleteContact(this.id);
        this.SET_ACTIVE_CONTACT();
      }

      this.CONTROL_DELETE();
    },
    dismissModal(event) {
      if (event.target.className === "overlay") {
        if (this.type == `company`) {
          this.SET_ACTIVE_COMPANY();
        } else if (this.type == `contact`) {
          this.SET_ACTIVE_CONTACT();
        }

        this.CONTROL_DELETE();
      }
    },
  },
};
</script>

<style>
.deletePopUp {
  max-width: 40%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f7f4f4;
  padding: 40px 30px !important;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
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
