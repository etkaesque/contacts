<template>
  <div class="bg-darkBlue w-screen h-screen flex justify-center items-center relative">
    <Main class="w-3/6 h-5/6">
      <section class="section h-full w-full bg-white z-50 flex flex-col justify-start items-center pt-20 gap-10">
        <h1 class="text-3xl">Admin prisijungimas:</h1>
        <form action="submit" class="w-2/3 flex flex-col gap-5 items-center">
          <md-field :class="{ 'md-invalid': v$.formData.email.$error }">
            <label>Elektroninis paštas</label>
            <md-input v-model="formData.email"></md-input>

            <div v-if="v$.formData.email.$error">
                    <span class="md-error">{{
                        v$.formData.email.$errors[0].$message
                    }}</span>
            </div>


          </md-field>

          <md-field :class="{ 'md-invalid': v$.formData.password.$error }">
            <label>Slaptažodis</label>
            <md-input v-model="formData.password" type="password"></md-input>

            <div v-if="v$.formData.password.$error">
                    <span class="md-error">{{
                        v$.formData.password.$errors[0].$message
            }}</span>
            </div>


          </md-field>

          <button class="submitBtn mt-20 w-3/4 align-center" @click="handleLogin($event)">
            Prisijungti
          </button>
        </form>
      </section>
    </Main>
    <goBackBtn class="goBack"></goBackBtn>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import goBackBtn from "../components/Buttons/goBack.vue";
import { mapActions } from "vuex";

import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      validation: {
        fieldEmpty: "Nepalikite tusčio lauko",
        emailInvalid: "Neteisingas e. pašto adresas",

      },
    };
  },
  components: {
    goBackBtn,
  },
  validations() {
    return {
      formData: {
        password: {
          required: helpers.withMessage(this.validation.fieldEmpty, required),
        },
        email: {
          email: helpers.withMessage(this.validation.emailInvalid, email),
          required: helpers.withMessage(this.validation.fieldEmpty, required),
        }

      }
    }
  },
  methods: {
    ...mapActions(["login"]),
    async handleLogin(e) {
      e.preventDefault();
      let isFormCorrect = await this.v$.$validate();
      if(!isFormCorrect) return

      await this.login({
        email: this.formData.email,
        password: this.formData.password,
      });
      if (pb.authStore.isValid) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.section {
  background: white;
}

.submitBtn {
  padding: 10px 60px;
  background-color: #0054a6;
  color: white;
  border: none;
  cursor: pointer;
}

.goBack {
  position: absolute !important;
  top: 40px;
  left: 40px;
}
</style>
