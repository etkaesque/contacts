export default {
  state: {
    offices: [],
    office: {},
  },
  getters: {
    offices: (state) => state.offices,
    office: (state) => state.office,
  },
  mutations: {
    SET_OFFICES(state, offices) {
      if (offices != undefined) {
        state.offices = offices;
      } else {
        state.offices = [];
      }
    },
    SET_OFFICE(state, office) {
      state.office = office;
    },
  },
  actions: {
    async fetchOffices({ commit }) {
      try {
        const offices = await this.fetchOfficesFromDb();
        commit("SET_OFFICES", offices);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchCompanyOffices({ commit }, id) {
      try {
        const offices = await this.getFullList("companies_offices", {
          expand: "company_id,office_id",
          filter: `company_id="${id}"`,
        });

        commit("SET_OFFICES", offices);
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
