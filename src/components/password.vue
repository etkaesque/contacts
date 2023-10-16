<template>
  <div class="perPageSetting grid grid-auto-col grid-auto-rows h-26">
    <div class="col-start-2 col-end-3 row-start-1 row-end-2 flex justify-end">
      <dissmiss></dissmiss>
    </div>

    <div
      class="col-start-1 col-end-2 row-start-2 row-end-3 flex flex-col items-start"
    >
      <h2 class="w-full text-xl mb-2">Slaptažodis:</h2>
      <p>{{ password }}</p>
    </div>
  </div>
</template>

<script>
import dissmiss from "./Buttons/dissmiss.vue";

export default {
  data() {
    return {
      password: "",
    };
  },
  props: {
    propData: Object,
  },
  components: {
    dissmiss,
  },
  created() {
    if (this.propData.password) {
      this.password = this.propData.password;
    }
  },
};
</script>
