<template>
  <div>
    <h1>this is edit admin form</h1>
    <p>{{ admin.data.name }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import admin from "../../store/modules/admin";

export default {
  data() {
    return {
      formData: {
        name: "",
        email: "",
        photo: "",
      },
    };
  },
  computed: {
    ...mapGetters(["admin"]),
  },
};
</script>
