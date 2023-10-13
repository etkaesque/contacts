<template>
  <div>
    <div class="h-5/6 truncate">
      <h2 class="text-2xl">Ar tikrai norite ištrinti {{ propData.header }}?</h2>
      <p v-html="propData.text" class="opacity-80"></p>
    </div>
    <div class="w-full flex justify-end gap-5">
      <button class="text-teltonikaBlue uppercase" @click="handleDelete">
        Taip
      </button>
      <button class="text-teltonikaBlue uppercase" @click="dismiss">Ne</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      type: "",
      id: "",
    };
  },
  props: {
    propData: Object,
  },

  methods: {
    ...mapActions([
      "deleteContact",
      "deleteCompany",
      "deleteStructure",
      "deleteAdmin",
    ]),
    ...mapMutations([
      "CONTROL_MODAL",
      "SET_CONTACT",
      "SET_COMPANY",
      "SET_STRUCTURE",
      "SET_ADMIN"
    ]),
    dismiss() {
    
      this.SET_CONTACT();
      this.SET_COMPANY();
      this.SET_STRUCTURE()
      this.SET_ADMIN();

      this.CONTROL_MODAL();
    },
    async handleDelete() {
      console.log("delete activated", this.id);

      if (this.type == `company`) {
        console.log("deleteting company");
        await this.deleteCompany(this.id);
      } else if (this.type == `contact`) {
        await this.deleteContact(this.id);
      } else if (this.type == `admin`) {
        await this.deleteAdmin(this.id);
      } else {
        await this.deleteStructure({ id: this.id, type: this.type });
      }

      this.CONTROL_MODAL();
    },
  },
  created() {
    this.type = this.propData.type;
    this.id = this.propData.id;
  },
};
</script>
