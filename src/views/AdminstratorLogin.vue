<template>
  <div class="bg-darkBlue w-screen h-screen flex justify-center items-center relative ">
  
    <Main class="w-3/6 h-5/6">
  
      <section
        class="section h-full w-full bg-white z-50 flex flex-col justify-start items-center pt-20 gap-10"
      >
        <h1 class="text-3xl">Admin prisijungimas:</h1>

        <form action="submit" class="w-2/3 flex flex-col gap-5 items-center">
          <md-field>
            <label>Elektroninis paštas</label>
            <md-input v-model="formData.email"></md-input>
          </md-field>

          <md-field>
            <label>Slaptažodis</label>
            <md-input v-model="formData.password" type="password"></md-input>
          </md-field>

          <button
            class="submitBtn mt-20 w-3/4 align-center"
            @click="handleLogin($event)"
          >
            Prisijungti
          </button>
        </form>
        
      </section>
    </Main>
    <goBackBtn class="goBack"></goBackBtn>
  </div>
</template>

<script>
import goBackBtn from "../components/Buttons/goBack.vue";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
    };
  },
  components: {
    goBackBtn,
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin(e) {
      e.preventDefault();
      console.log("login",this.formData.email, this.formData.password);
      this.login({email:this.formData.email, password: this.formData.password})
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
