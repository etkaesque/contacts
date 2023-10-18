<template>
  <div class="p-2 ">
    <div class="h-5/6 truncate flex flex-col gap-y-2">
      <h2 class="text-2xl">Ar tikrai norite ištrinti {{ propData.header }}?</h2>
      <p v-html="propData.text" class="opacity-80"></p>
    </div>
    <div class="w-full flex justify-end gap-5 mt-2">
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
      "deleteStructure",
      "deleteAdmin"
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
      
      if (this.type == `contact`) {
        await this.deleteContact(this.id);
      } else if (this.type == `admin`) {
        await this.deleteAdmin({admin_id:this.propData.admin_id, permissions_id: this.propData.permissions_id});
      } else {
        await this.deleteStructure({ id: this.id, type: this.type });
      }

      this.CONTROL_MODAL();
    },
  },
  created() {
    this.type = this.propData.type;
    if(this.propData.id) {
      this.id = this.propData.id;
    }


  },
};
</script>
