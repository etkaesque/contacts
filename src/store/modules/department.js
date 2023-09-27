export default {
  state: {
    departments: [],
    department: {},
  },
  getters: {
    departments: (state) => state.departments,
    department: (state) => state.department,
  },
  mutations: {
    SET_DEPARTMENTS(state, departments) {
      state.departments = departments;
    },
    SET_DEPARTMENT(state, department) {
      state.department = department;
    },
  },
  actions: {
    async fetchDepartments({ commit }) {
      try {
        const departments = await this.fetchDepartmentsFromDb();
        commit("SET_DEPARTMENTS", departments);
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
