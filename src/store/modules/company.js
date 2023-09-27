export default {
  state: {
    companies: [],
    company: {},
  },
  getters: {
    companies: (state) => state.companies,
    company: (state) => state.company,
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      state.companies = companies;
    },
    SET_COMPANY(state, company) {
      state.company = company;
    },
  },
  actions: {
    async fetchCompanies({ commit }) {
      try {
        const companies = await this.fetchCompaniesFromDb();
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
