<template>
  <div class="notification">
    <div
      v-if="!notification.isSuccess"
      class="shadow-lg rounded-lg mx-auto m-8 p-4 flex gap-5 items-center"
      style="background-color: #f1f2f4"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200"
      >
        <svg
          class="w-10 h-10"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          style="fill: #A61A11;"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"
          />
        </svg>
        <span class="sr-only">Error icon</span>
      </div>
      <div class="w-full">
        <div class="text-sm pb-2 flex justify-between w-full">
          <span class="text-base">Klaida</span>
          <button @click="dismiss">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
            >
              <path
                d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
              />
            </svg>
          </button>
        </div>
        <div class="text-sm text-gray-600 tracking-tight">
          {{ notification.message }}
        </div>
      </div>
    </div>

    <div
      v-else
      class="shadow-lg rounded-lg mx-auto m-8 p-4 flex gap-5 items-center"
      style="background-color: #f1f2f4"
    >
      <div
        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
      >
        <svg
          class="w-10 h-10"
          aria-hidden="true"
          fill="green"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        <span class="sr-only">Check icon</span>
      </div>
      <div class="w-full">
        <div class="text-sm pb-2 flex justify-between w-full">
          <span class="text-base">Atlikta</span>
          <button @click="dismiss">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
            >
              <path
                d="M16.24 14.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 0 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12l2.83 2.83z"
              />
            </svg>
          </button>
        </div>
        <div class="text-sm text-gray-600 tracking-tight">
          {{ notification.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["notification"]),
  },
  methods: {
    ...mapMutations(["CONTROL_NOTIFICATION"]),
    dismiss() {
      this.CONTROL_NOTIFICATION();
    },
  },
  async created(){
    await setTimeout(()=>{
      this.CONTROL_NOTIFICATION();
    }, 3000)
  }
};
</script>

<style>
.notification {
  width: 370px;
  position: fixed;
  top: 10%;
  right: 0%;
  transform: translate(-50%, -50%);
  z-index: 100;
}
</style>
