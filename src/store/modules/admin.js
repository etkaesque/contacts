export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        await this.adminLogin(email, password);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
  },
};
