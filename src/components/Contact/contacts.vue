<template>
  <div>
    <section v-if="isCard">
      <Cards :profileIcon="profileIcon"></Cards>
    </section>

    <section v-else>
      <Tables></Tables>
    </section>
  </div>
</template>

<script>
import profileIcon from "../../assets/user.svg";
import Cards from "./contactCards.vue";
import Tables from "./contactTables.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      profileIcon,
    };
  },
  components: {
    Cards,
    Tables,
  },
  computed: {
    ...mapGetters(["isCard"]),
  },
  methods: {
    ...mapActions(["fetchContacts"]),
  },
};
</script>

<style>
.md-card {
  width: 415px;
  height: 335px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.act {
  display: flex;
  column-gap: 20px;
}
</style>
