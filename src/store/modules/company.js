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
      state.active_company = id;
    },
    SET_COMPANY(state, company) {
      state.company = company;
    },
  },
  actions: {
    async addCompany({ commit }, data) {
      try {
        const company = await this.addCompanyToDb();

        console.log(company);
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
        const companies = await this.fetchCompaniesFromDb();
        console.log(companies);
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
