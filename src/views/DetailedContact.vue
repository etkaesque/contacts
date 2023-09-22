<template>
  <div>
    <Header></Header>

    <Main v-if="Object.keys(contact).length != 0">
      <h1 class="text-6xl font-light mb-16">Detalesnė kontakto informacija</h1>
      <section class="flex mb-28">
        <img
          style="width: auto; height: 80px"
          v-if="contact.photo == ''"
          :src="profileIcon"
          alt="Contact picture"
        />

        <img v-else src="url" alt="Contact picture" />

        <div>
          <h2 class="text-5xl">{{ contact.name }} {{ contact.surname }}</h2>
          <p class="text-3xl">Pozicija: {{ contact.position }}</p>
        </div>
      </section>

      <section class="flex shadow-md p-8">
        <div class="flex flex-col gap-y-12 w-3/6">
          <h3 class="text-3xl">Kontaktinės detalės</h3>
          <div class="division"></div>
          <ul class="flex flex-col gap-y-12">
            <li>
              Elektroninis paštas:
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </li>
            <li>
              Telefono numeris:
              <a :href="`tel:${contact.phone_number}`">{{
                contact.phone_number
              }}</a>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-y-12 w-3/6">
          <h3 class="text-3xl">Kompanijos detalės</h3>
          <div class="division"></div>
          <ul class="flex flex-col gap-y-12">
            <li>
              Kompanija: {{ checkStructure(contact.expand.company_id.name) }}
            </li>
            <li>
              Būstinė: {{ checkStructure(contact.expand.office_id.name) }}
            </li>
            <li>
              Padalinys: {{ checkStructure(contact.expand.division_id.name) }}
            </li>
            <li>
              Skyrius: {{ checkStructure(contact.expand.department_id.name) }}
            </li>
            <li>Grupė: {{ checkStructure(contact.group_id) }}</li>
          </ul>
        </div>
      </section>
    </Main>
  </div>
</template>

<script>
import Header from "../components/header.vue";
import profileIcon from "../assets/user.svg";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      profileIcon,
    };
  },
  components: {
    Header,
  },
  computed: {
    ...mapGetters(["contact"]),
  },
  methods: {
    ...mapActions(["fetchContactById"]),
    checkStructure(name) {
      if (name === "") {
        return `nepriskirta`;
      }
      return name;
    },
  },
  async created() {
    await this.fetchContactById(this.$route.params.id);
  },
};
</script>

<style>
.division {
  height: 1px;
  background-color: #212121;
  opacity: 0.08;
}
</style>
