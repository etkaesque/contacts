<template>
  <header
    class="bg-darkBlue w-full pl-16 pt-7 pb-7 flex justify-between items-center"
  >
    <router-link :to="`/`" class="block w-max">
      <img
        src="../assets/teltonikaLogo.png"
        alt="Teltonika logotype"
        class="block"
        style="width: 300px; min-width: 300px"
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
        <li v-if="editPermissions || deletePermissions">
          <router-link :to="`/admin`">Paskyros</router-link>
        </li>
      </ul>
    </nav>

    <div v-if="!isValid" class="relative mr-3">
      <router-link :to="`/login`">
        <img
          :src="profileIcon"
          alt="Contact picture"
          style="max-height: 50px; fill: rgb(255, 255, 255) !important"
        />
      </router-link>
    </div>

    <div v-if="isValid" class="relative mr-10">
      <button class="flex gap-x-5 items-center" @click="handleClick">
        <span class="text-lg" style="color: white !important">{{ name }}</span>
        <img v-if="avatar" :src="avatar" style="max-width: 50px" alt="" />
        <img
          v-else
          :src="profileIcon"
          alt="Contact picture"
          style="max-height: 50px; fill: rgb(255, 255, 255) !important"
        />
      </button>

      <Menu @logout="handleLogout" v-if="menu"></Menu>
    </div>
  </header>
</template>

<script>
import PocketBase from "pocketbase";
import profileIcon from "../assets/averageuser.svg";
import Menu from "./menu.vue";

const pb = new PocketBase(SERVER_ADDR);

export default {
  data() {
    return {
      isValid: false,
      menu: false,
      profileIcon,
    };
  },
  components: {
    Menu,
  },
  computed: {
    editPermissions() {
   
      if (pb.authStore) {

        return pb.authStore.model.expand.permissions_id.edit_permissions;
      }
    },
    deletePermissions() {
   
      if (pb.authStore) {

        return pb.authStore.model.expand.permissions_id.delete_permissions;
      }
    },
    name() {
      return pb.authStore.model.name;
    },
    avatar() {
      if (pb.authStore.model.avatar.length == 0) {
        return false;
      } else {
        let source = `${SERVER_ADDR}/api/files/users/${pb.authStore.model.id}/${pb.authStore.model.avatar}`;
        return source;
      }
    },
  },
  methods: {
    handleLogout() {
      pb.authStore.clear();
      if (pb.authStore) {
        this.isValid = pb.authStore.isValid;
        if (this.$route.path != "/") {
          this.$router.push("/");
        } else {
          window.location.reload()
        }
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
  },
};
</script>

<style>
nav * {
  color: white !important;
}
</style>
