<template>
  <div>
    <Main v-if="Object.keys(contact.data).length != 0">
      <h1 class="text-5xl font-light mb-8">Detalesnė kontakto informacija</h1>
      <section class="flex mb-28 gap-x-8 items-center">
        <img
          style="width: auto; height: 80px"
          v-if="contact.data.photo == ''"
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
          :src="`https://contactspb.hop.sh/api/files/employees/${contact.id}/${contact.data.photo}`"
          alt="Contact picture"
        />

        <div class="truncate">
          <h2 class="text-4xl">{{ contact.data.name }} {{ contact.data.surname }}</h2>
          <p class="text-2xl">Pozicija: {{ contact.data.position }}</p>
        </div>
      </section>

      <section class="flex shadow-md p-8">
        <div class="flex flex-col gap-y-12 w-3/6">
          <h3 class="text-2xl">Kontaktinės detalės</h3>
          <div class="division"></div>
          <ul class="flex flex-col gap-y-12">
            <li>
              Elektroninis paštas:
              <a :href="`mailto:${contact.data.email}`">{{ contact.data.email }}</a>
            </li>
            <li>
              Telefono numeris:
              <a
                v-if="contact.data.phone_number"
                :href="`tel:${contact.data.phone_number}`"
                >{{ contact.data.phone_number }}</a
              >

              <span v-else>nenurodytas.</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-y-12 w-3/6">
          <h3 class="text-2xl">Kompanijos detalės</h3>
          <div class="division"></div>
          <ul class="flex flex-col gap-y-12">
            <li>Kompanija: {{ checkStructure(contact.data.expand.company_id) }}</li>
            <li>Būstinė: {{ checkStructure(contact.data.expand.office_id) }}</li>
            <li>Padalinys: {{ checkStructure(contact.data.expand.division_id) }}</li>
            <li>Skyrius: {{ checkStructure(contact.data.expand.department_id) }}</li>
            <li>Grupė: {{ checkStructure(contact.data.expand.group_id) }}</li>
          </ul>
        </div>
      </section>
    </Main>
  </div>
</template>

<script>
import profileIcon from "../assets/epicuser.svg";
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