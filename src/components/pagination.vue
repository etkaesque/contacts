<template>
  <div class="flex gap-x-5 items-center mb-7" v-if="maxPages != 0">
    <div class="flex">
      <button  :disabled="buttonDisabled"
      :class="{ 'pagButton': !buttonDisabled, 'pagButtonDisabled': buttonDisabled }"
      
      @click="handlePagination(-1)">
        <img :src="arrow" alt="" />
        Praeitas Puslapis
      </button>
    </div>

    <div>{{ currentPage }}/{{ maxPages }}</div>

    <button :disabled="buttonDisabled" 
    :class="{ 'pagButton': !buttonDisabled, 'pagButtonDisabled': buttonDisabled }"
    class="pagButton" @click="handlePagination(1)">
      Kitas Puslapis
      <img :src="arrow" alt="" class="rotate-180" />
    </button>
  </div>
</template>

<script>
import PocketBase from "pocketbase";
import arrow from "../assets/darrow.png";
import { mapActions, mapGetters, mapMutations } from "vuex";
const pb = new PocketBase(SERVER_ADDR);

export default {
  data() {
    return {
      buttonDisabled: false,
      arrow,
    };
  },
  props: {
    type: String,
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "perPage",
      "filterData",
      "searchTerm",
      "maxPages",
  
    ]),
  },
  methods: {
    ...mapActions([
      "fetchContacts",
      "fetchPaginatedCompanies",
      "fetchPaginatedStructures",
      "fetchPaginatedGroups",
      "fetchPaginatedDivisions",
      "fetchPaginatedDepartments",
      "fetchPaginatedOffices",
      "fetchPaginatedAdmins",
      "checkServer"
    ]),
    ...mapMutations(["SET_CURRENT_PAGE"]),
    async handlePagination(value) {
      const page = this.currentPage + value;

      const isServerUp = await this.checkServer()
  
      if (!isServerUp) {
        this.buttonDisabled = true
        return;
      } else {
        this.buttonDisabled = false
      }

      if(page > this.maxPages) {
        console.log("stop")
        return
      } else if (page < 1) {
        console.log("stop")
        return
      }


      if (this.type == `contact`) {
        this.SET_CURRENT_PAGE({ page: page, isContact: true });
      } else {
        this.SET_CURRENT_PAGE({ page: page });
      }

      if (this.type == "contact") {
        await this.fetchContacts({
          page: this.currentPage,
          searchTerm: this.searchTerm,
          filterData: this.filterData,
        });
      } else if (this.type == "company") {
        await this.fetchPaginatedCompanies();
      } else if (this.type == `offices`) {
        await this.fetchPaginatedOffices();
      } else if (this.type == `divisions`) {
        await this.fetchPaginatedDivisions();
      } else if (this.type == `departments`) {
        await this.fetchPaginatedDepartments();
      } else if (this.type == `groups`) {
        await this.fetchPaginatedGroups();
      } else if (this.type == `admin`) {
        await this.fetchPaginatedAdmins();
      }
    },
  },
};
</script>

<style>
.pagButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  background-color: #0054a6;
  width: 270px;
  height: 40px;
  padding: 10px;
}

.pagButtonDisabled {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  opacity: 0.5;
  background-color: grey;
  width: 270px;
  height: 40px;
  padding: 10px;

}
</style>
