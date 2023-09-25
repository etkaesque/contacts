export default {
  state: {
    admin: "",
  },
  getters: {
    admin: (state) => state.admin,
  },
  mutations: {
    SET_ADMIN(state, admin) {
      state.admin = admin;
    },
  },
  actions: {
    async login({ commit }, {email, password}) {
      try {
        const authData = await this.adminLogin(email, password);
        console.log(authData)
        console.log("token", authData.token)
      
      } catch (error) {
        console.log(error);
      }
    },
  },
};
