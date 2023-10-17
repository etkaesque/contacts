

export default {
  state: {
    admins: [],
    admin: { data: {}, id: "", permissions: {}},
    emails: [],
    password: "",

  },
  getters: {
    admins: (state) => state.admins,
    admin: (state) => state.admin,
    emails: (state) => state.emails,
    password: (state) => state.password,
  },
  mutations: {
    SET_ADMINS(state, admins) {
      if (admins != undefined) {
        state.admins = admins;
      } else {
        state.admins = [];
      }
    },
    SET_PASSWORD(state, password) {
      if (password != undefined) {
        state.password = password;
      } else {
        state.password = "";
      }
    },
    SET_EMAILS(state, emails){
      state.emails = emails

    },
    SET_ADMIN(state, admin) {
      if (admin != undefined) {
        state.admin = { data: admin.data, id: admin.id, permissions: admin.permissions };
      } else {
        state.admin = { data: {}, id: "", permissions: {} };
      }
    },
  },
  actions: {
    async createAdmin({ commit,dispatch }, { adminData, permissionsData }) {

      try {

        let permissions = await this.createInstanceInDb(permissionsData, 'user_permissions')

        let adminPermisions = {
          ...adminData,
          permissions_id: permissions.id
        }
        const admin = await this.createInstanceInDb(adminPermisions, 'users')

        dispatch("fetchPaginatedAdmins")

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Paskyra sėkmingai sukurta.",
          isSuccess: true,
        });


      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Paskyra nebuvo sukurta. Pabandykite vėliau.`,
          isSuccess: false,
        });
      }
      

    },
    async editAdmin({ commit,dispatch },{ adminData, admin_id, permissionsData, permissions_id } ){
      

      try {
        await this.editInstanceInDb(admin_id, adminData, "users");
        await this.editInstanceInDb(permissions_id, permissionsData, "user_permissions");
       
       
        await this.adminRefresh()
        dispatch("fetchPaginatedAdmins")

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Paskyra sėkmingai redaguota.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Paskyra nebuvo redaguota. Pabandykite vėliau.`,
          isSuccess: false,
        });
      }
    },

    async login({ commit }, { email, password }) {
      try {
        localStorage.removeItem("perPage");
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
        let admins = await this.getPaginatedList(
          "users",
          getters.currentPage,
          getters.perPage
        );

        let emails = []


        admins.items.forEach(admin => {
          emails.push(admin.email)
        });

        commit("SET_EMAILS",emails)
        commit("SET_PAGINATION", {total:admins.totalItems, isStructure: true});
        commit("SET_ADMINS", admins.items);
      } catch (error) {
        commit("SET_EMAILS")
        commit("SET_PAGINATION", {total:0, isStructure: true});
        commit("SET_ADMINS");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchAdminById({ commit }, id) {
      try {
        const admin = await this.fetchInstanceByIdFromDb(id, "users", "");
        const permissions = await this.fetchInstanceByIdFromDb(admin.permissions_id, "user_permissions", "")

        commit("SET_ADMIN", { data: admin, id: id, permissions: permissions});
      } catch (error) {
        
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async deleteAdmin({ commit,dispatch,getters }, {admin_id, permissions_id}) {

      try {

        await this.deleteInstanceInDb(admin_id, "users");
        await this.deleteInstanceInDb(permissions_id,"user_permissions")

        if (getters.admins.length === 1) {
          commit("SET_CURRENT_PAGE", {page: getters.currentPage - 1});
        }

        dispatch("fetchPaginatedAdmins")

        commit("SET_ADMIN");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Paskyra sėkmingai ištrinta.",
          isSuccess: true,
        });


      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Paskyra nebuvo ištrinta. Pabandykite vėliau.",
          isSuccess: false,
        });
      }

    }
  },
};
