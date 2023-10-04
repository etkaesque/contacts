<template>
  <div class="flex gap-x-5 items-center mb-7" v-if="maxPages != 0">
    <div class="flex">
      <button class="pagButton" @click="handlePagination(-1)">
        <img :src="arrow" alt="" />
        Praeitas Puslapis
      </button>
    </div>

    <div>{{ currentPage }}/{{ maxPages }}</div>

    <button class="pagButton" @click="handlePagination(1)">
      Kitas Puslapis
      <img :src="arrow" alt="" class="rotate-180" />
    </button>
  </div>
</template>

<script>
import arrow from "../assets/darrow.png";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      arrow,
    };
  },
  computed: {
    ...mapGetters([
      "currentPage",
      "perPage",
      "contactsTotalItems",
      "filterData",
      "searchTerm",
    ]),
    maxPages() {
      return Math.ceil(this.contactsTotalItems / this.perPage);
    },
  },
  methods: {
    ...mapActions(["fetchContacts"]),
    ...mapMutations(["SET_CURRENT_PAGE"]),
    handlePagination(value) {
      const page = this.currentPage + value;
      this.SET_CURRENT_PAGE(page);

      this.fetchContacts({
        page: this.currentPage,
        searchTerm: this.searchTerm,
        filterData: this.filterData,
      });
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
</style>
