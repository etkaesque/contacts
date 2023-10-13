export default {
  state: {
    admins: [],
    admin: { data: {}, id: "" },
    
  },
  getters: {
    admins: (state) => state.admins,
    admin: (state) => state.admin,
  },
  mutations: {
    SET_ADMINS(state, admins) {
      if (admins != undefined) {
        state.admins = admins;
      } else {
        state.admins = [];
      }
    },
    SET_ADMIN(state, admin) {
      if (admin != undefined) {
        state.admin = { data: admin.data, id: admin.id };
      } else {
        state.admin = { data: {}, id: "" };
      }
    },
  },
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
    async fetchPaginatedAdmins({ commit, getters }) {
      try {
        const admins = await this.getPaginatedList(
          "users",
          getters.currentPage,
          getters.perPage
        );
        commit("SET_PAGINATION", admins.totalItems);
        commit("SET_ADMINS", admins.items);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchAdminById({commit}, id){
      try {
        const admin = await this.fetchInstanceByIdFromDb(id, "users", "");
        commit("SET_ADMIN", {data: admin, id: id});
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async deleteAdmin({commit}, id) {

      try {
        await this.deleteInstanceInDb(id, "users");

        if (getters.admins.length === 1) {
          commit("SET_CURRENT_PAGE", getters.currentPage - 1);
        }

        commit("SET_ADMIN"); // clear
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }

    }
  },
};
