<template>
  <div
    class="shadow-xl rounded-lg mx-auto m-8 p-4 flex gap-5 items-center absolute right-2 w-40"
    style="background-color: #f1f2f4"
  >
    <div class="flex flex-col items-start gap-y-5">
      <button @click="handlePassword" class="text-sm">
        Priminti slaptažodį
      </button>
      <button @click="handleLogout" class="text-sm">Atsijungti</button>
    </div>
  </div>
</template>

<script>

import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  methods: {
    handleLogout() {
      pb.authStore.clear()
      this.$router.go()
    },
    handlePassword() {
      console.log('change pass')
    },
  },
};
</script>

<style></style>
