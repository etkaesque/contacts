<template>
  <div class="h-5/6 flex flex-col">
    <Main>
      <section class="flex flex-col gap-y-2">
        <h1 class="text-5xl font-light mb-2">Paskyros</h1>

        <div v-if="editPermissions" class="flex items-center gap-x-3">
          <Add :type="`admin`"></Add>
          <span class="text-xl">Pridėti naują administratorių (-e)</span>
        </div>
        <div>
          Iš viso rasta: <span class="font-semibold">{{ totalItems }}</span>.
        </div>

        <AdminsTable :admins="admins" :editPermissions="editPermissions" :deletePermissions="deletePermissions"></AdminsTable>
      </section>
    </Main>

    <Footer class="flex justify-center grow items-end">
      <Pagination v-if="admins.length != 0" :type="`admin`"></Pagination>
    </Footer>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);
import Add from "../components/Buttons/add.vue";
import Pagination from "../components/pagination.vue";
import AdminsTable from "../components/Admin/adminTableView.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";


export default {
  data() {
    return {
      hello:"world",
    };
  },
  computed:{
    ...mapGetters(["admins", "totalItems"]),
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
  },
  methods:{
    ...mapActions(["fetchPaginatedAdmins"]),
    ...mapMutations(["SET_CURRENT_PAGE", "SET_TOTAL_ITEMS"]),
  },
  components:{
    Add,
    Pagination,
    AdminsTable
  },

  beforeRouteLeave(to, from, next) {
    this.SET_TOTAL_ITEMS()
    this.SET_CURRENT_PAGE({page: 1});
    next();
  },
  async created() {

    if (!pb.authStore.isValid) {
      this.$router.push("/login");
    } else if(!this.editPermissions && !this.deletePermissions){
      this.$router.push("/");
    } else {
      await this.fetchPaginatedAdmins();

    }

  },
};
</script>


<style>



</style>