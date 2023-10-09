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
        state.departments = departments;
      } else {
        state.departments = [];
      }
    },
    SET_DEPARTMENT(state, department) {
      state.department = department;
    },
    SET_DATA(state, record) {
      state.divisionDepartmens = record;
    },
  },
  actions: {
    async createDepartment({ commit, dispatch }, { data, relation }) {
      try {
        const department = await this.createInstanceInDb(data, "departments");

        let relationData = {};

        relation.forEach((division) => {
       
          relationData = {
            department_id: department.id,
            division_id: division,
          };

          dispatch("createDivisionsDepartments", relationData);
        });

        commit("CONTROL_MODAL");
        dispatch("fetchDepartments");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius sėkmingai sukurtas.`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius nebuvo sukurtas.`,
          isSuccess: false,
        });
      }
    },
    async deleteDepartment({ commit, dispatch }, id) {
      try {
        await this.deleteInstanceInDb(id, "departments");
        dispatch("fetchDepartments");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius buvo ištrintas`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius nebuvo ištrintas`,
          isSuccess: false,
        });
      }
    },
    async editDepartment({ commit, dispatch }, { id, data }) {
      try {
        await this.editInstanceInDb(id, data, "departments");
        dispatch("fetchDepartments");
        commit("CONTROL_MODAL");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Skyrius sėkmingai redaguotas.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius nebuvo redaguotas`,
          isSuccess: false,
        });
      }
    },
    async fetchDepartments({ commit }) {
      try {
        const departments = await this.getFullList("departments", {
          sort: "-created",
        });
        commit("SET_DEPARTMENTS", departments);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchDepartmentById({ commit }, id) {
      try {
        const department = await this.fetchInstanceByIdFromDb(
          id,
          "departments",
          ""
        );
        commit("SET_ACTIVE_STRUCTURE", { 
          id: id,
          type: "departments", 
          structure: department });
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

    async createDivisionsDepartments({ commit }, data) {
     
      try {
        const divisionsDepartments = await this.createRelation(
          "divisions_departments",
          data
        );
     
      } catch (error) {
       
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Ofisams padalinys nebuvo priskirtas.",
          isSuccess: false,
        });
      }
    },
  },
};
