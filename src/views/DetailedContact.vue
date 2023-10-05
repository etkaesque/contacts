<template>
  <div>
  

    <Main v-if="Object.keys(contact).length != 0">
      <h1 class="text-6xl font-light mb-16">Detalesnė kontakto informacija</h1>
      <section class="flex mb-28 gap-x-8 items-center">
        <img
          style="width: auto; height: 80px"
          v-if="contact.photo == ''"
          :src="profileIcon"
          alt="Contact picture"
        />

        <img
          v-else
          style="
            width: 110px;
            height: 110px;
            object-fit: cover !important;
            border-radius: 50px;
          "
          :src="`http://127.0.0.1:8090/api/files/employees/${contact.id}/${contact.photo}`"
          alt="Contact picture"
        />

        <div class="truncate">
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
              <a
                v-if="contact.phone_number"
                :href="`tel:${contact.phone_number}`"
                >{{ contact.phone_number }}</a
              >

              <span v-else>nenurodytas.</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-y-12 w-3/6">
          <h3 class="text-3xl">Kompanijos detalės</h3>
          <div class="division"></div>
          <ul class="flex flex-col gap-y-12">
            <li>Kompanija: {{ checkStructure(contact.expand.company_id) }}</li>
            <li>Būstinė: {{ checkStructure(contact.expand.office_id) }}</li>
            <li>Padalinys: {{ checkStructure(contact.expand.division_id) }}</li>
            <li>Skyrius: {{ checkStructure(contact.expand.department_id) }}</li>
            <li>Grupė: {{ checkStructure(contact.expand.group_id) }}</li>
          </ul>
        </div>
      </section>
    </Main>
  </div>
</template>

<script>

import profileIcon from "../assets/user.svg";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      profileIcon,
    };
  },
  computed: {
    ...mapGetters(["contact"]),
  },
  methods: {
    ...mapActions(["fetchContactById"]),
    checkStructure(structure) {
      
      if (structure === "" || structure == undefined) {
        return "nepriskirta";
      }
      return structure.name;
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

.flex > div {
  word-wrap: break-word;
}
</style>