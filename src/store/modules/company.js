export default {
  state: {
    companies: [],
    company: {},
    active_company: "",
    totalCompanies: 0,
  },
  getters: {
    companies: (state) => state.companies,
    company: (state) => state.company,
    active_company: (state) => state.active_company,
    totalCompanies: (state) => state.totalCompanies,
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      if (companies != undefined) {
        state.companies = companies;
        state.totalCompanies = companies.length;
      } else {
        state.companies = [];
      }
    },
    SET_ACTIVE_COMPANY(state, id) {
      if (id == undefined) {
        state.active_company = "";
        state.company = {};
      } else {
        state.active_company = id;
      }
    },
    SET_COMPANY(state, company) {
      state.company = company;
    },
  },
  actions: {
    async createCompany({ commit, dispatch }, data) {
      try {
        await this.createInstanceInDb(data, "companies");
        commit("CONTROL_MODAL");
        dispatch("fetchCompanies");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė sėkmingai sukurta.`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė nebuvo sukurta.`,
          isSuccess: false,
        });
      }
    },
    async deleteCompany({ commit, dispatch }, id) {
      try {
        await this.deleteInstanceInDb(id, "companies");
        dispatch("fetchCompanies");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė buvo ištrinta`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async editCompany({ commit, dispatch }, { id, data }) {
      try {
        await this.editInstanceInDb(id, data, "companies");
        dispatch("fetchCompanies");
        commit("CONTROL_MODAL");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Įmonė sėkmingai redaguota.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė nebuvo redaguota`,
          isSuccess: false,
        });
      }
    },
    async fetchCompanyById({ commit }, id) {
      try {
        const company = await this.fetchInstanceByIdFromDb(id, "companies", "");
        commit("SET_COMPANY", company);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchCompanies({ commit }) {
      try {
        const companies = await this.getFullList("companies", {
          sort: "-created",
        });
        commit("SET_COMPANIES", companies);
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
