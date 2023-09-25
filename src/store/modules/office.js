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
      state.offices = offices;
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
        console.log(error);
      }
    },
  },
};
