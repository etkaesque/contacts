<template>
  <header
    class="bg-darkBlue w-full pl-16 pt-7 pb-7 pr-6 flex justify-between items-center"
  >
    <router-link :to="`/`" class="block w-max">
      <img
        src="../assets/teltonikaLogo.png"
        alt="Teltonika logotype"
        class="block"
      />
    </router-link>

    <nav class="w-full flex justify-start pl-16" v-if="isValid">
      <ul class="flex justify-center gap-x-24 text-xl font-bold">
        <li>
          <router-link :to="`/`">Kontaktai</router-link>
        </li>
        <li>
          <router-link :to="`/companies`">Įmonės</router-link>
        </li>
        <li>
          <router-link :to="`/structure`">Struktūra</router-link>
        </li>
        <li v-if="readPermissions">
          <router-link :to="`/admin`">Paskyros</router-link>
        </li>
      </ul>
    </nav>

    <div v-if="!isValid">
      <router-link :to="`/login`">
        <svg
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <rect width="50" height="50" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlink:href="#image0_6_159" transform="scale(0.01)" />
            </pattern>
            <image
              id="image0_6_159"
              width="100"
              height="100"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </router-link>
    </div>

    <div v-if="isValid" class="relative">
      <button class="flex gap-x-5 items-center" @click="handleClick">
        <span class="text-lg" style="color: white !important">{{ name }}</span>
        <img :src="avatar" style="max-width: 50px" alt="" />
      </button>

      <Menu @logout="handleLogout" v-if="menu"></Menu>
    </div>
  </header>
</template>

<script>
import PocketBase from "pocketbase";
import Menu from "./menu.vue";

const pb = new PocketBase(SERVER_ADDR);

export default {
  data() {
    return {
      isValid: false,
      menu: false,
    };
  },
  components: {
    Menu,
  },
  computed: {
    readPermissions() {
      if (pb.authStore) {
        return pb.authStore.model.expand.permissions_id.read_permissions;
      }
    },
    name() {
      return pb.authStore.model.name;
    },
    avatar() {
      let source = `http://127.0.0.1:8090/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.avatar}`;
      return source;
    },
  },
  methods: {
    handleLogout() {
      console.log("pb value", pb.authStore.isValid);
      console.log("log out");
      pb.authStore.clear();
      console.log("pb value", pb.authStore.isValid);
      console.log(pb.authStore);

      if (pb.authStore) {
        this.isValid = pb.authStore.isValid;
        this.$router.push("/")
      }
    },

    handleClick() {
      this.menu = !this.menu;
    },
  },
  created() {
    if (pb.authStore) {
      this.isValid = pb.authStore.isValid;
    }

    console.log("im create");
  },
};
</script>

<style>
nav * {
  color: white !important;
}
</style>
