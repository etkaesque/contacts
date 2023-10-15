<template>
  <div class="flex justify-start flex-wrap gap-3">
    <article v-for="contact in contacts" :key="contact.id">
      <router-link class="links" :to="`contact/${contact.id}`" target="_blank">
        <md-card md-with-hover class="card">
          <md-card-header>
            <img v-if="contact.photo == ''" :src="profileIcon" alt="Contact picture" />
            <img v-else style="
                width: 60px;
                height: 60px;
                object-fit: cover !important;
                border-radius: 50px;
              " :src="`${SERVER_ADDR}/api/files/employees/${contact.id}/${contact.photo}`" alt="Contact picture" />

            <div class="flex flex-col">
              <div class="text-xl">
                {{ contact.name }} {{ contact.surname }}
              </div>
              <div class="text-base">Pozicija: {{ contact.position }}</div>
            </div>
          </md-card-header>

          <md-card-content>
            <ul>
              <li class="text-base">
                Telefono nr:
                {{
                  contact.phone_number ? contact.phone_number : "nenurodytas"
                }}
              </li>
              <li class="text-base">El. paštas: {{ contact.email }}</li>
              <li v-if="contact.expand" class="text-base">
                Adresas: {{ contact.expand.office_id.name }}
              </li>
            </ul>
          </md-card-content>

          <div v-if="valid" class="flex ml-5 mb-4 mb-t">
            <md-card-actions>
              <div class="act">
                <Edit v-if="editEmployees" :contactId="contact.id"></Edit>
                <Delete v-if="deleteEmployees" :contactId="contact.id"></Delete>
              </div>
            </md-card-actions>
          </div>
        </md-card>
      </router-link>
    </article>
  </div>
</template>

<script>
import Edit from "../Buttons/edit.vue";
import Delete from "../Buttons/delete.vue";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      SERVER_ADDR
    }
  },
  computed: {
    ...mapGetters(["contacts"]),
  },
  components: {
    Edit,
    Delete,
  },
  props: {
    profileIcon: String,
    editEmployees: Boolean,
    deleteEmployees: Boolean,
    valid: Boolean,
  },
};
</script>

<style>
.card {

  display: flex !important;
  flex-direction: column;
  justify-content: space-around;
}

.links {
  text-decoration: none !important;
}
</style>