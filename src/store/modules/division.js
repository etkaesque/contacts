export default {
  state: {
    divisions: [],
    division: {},
  },
  getters: {
    divisions: (state) => state.divisions,
    division: (state) => state.division,
  },
  mutations: {
    SET_DIVISIONS(state, divisions) {
      state.divisions = divisions;
    },
    SET_DIVISION(state, division) {
      state.department = division;
    },
  },
  actions: {
    async fetchDivisions({ commit }) {
      try {
        const divisions = await this.fetchDivisionsFromDb();
        commit("SET_DIVISIONS", divisions);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
