export default {
  state: {
    departments: [],
    divisionDepartmens: [],
    department: {},
  },
  getters: {
    departments: (state) => state.departments,
    department: (state) => state.department,
    divisionDepartmens: (state) => state.divisionDepartmens,
  },
  mutations: {
    SET_DEPARTMENTS(state, departments) {
      if (departments != undefined) {
        state.departments  = departments;
      } else {
        state.departments = [];
      }
    },
    SET_DEPARTMENT(state, department) {
      state.department = department;
    },
    SET_DATA(state, record) {
      state.divisionDepartmens = record;
    }
  },
  actions: {
    async fetchDepartments({ commit }) {
      try {
        const departments = await this.getFullList("departments", {sort: "-created"});
        commit("SET_DEPARTMENTS", departments);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchDivisionDepartmens({ commit }, id) {
      try {
        const records = await this.getFullList("divisions_departments", {
          expand: "department_id,division_id",
          filter: `division_id="${id}"`,
        });
        commit("SET_DEPARTMENTS", records);
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
