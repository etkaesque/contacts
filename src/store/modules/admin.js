export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const authData = await this.adminLogin(email, password);
        console.log(authData);
        // commit("SET_ADMIN", authData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
