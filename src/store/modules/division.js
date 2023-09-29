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
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },

    async fetchOfficeDivisions({ commit }, id) {
   
      try {
        const divisions = await this.getFullList("offices_divisions", {
          expand: "office_id,division_id",
          filter: `office_id="${id}"`,
        });

        commit("SET_DIVISIONS", divisions);
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
