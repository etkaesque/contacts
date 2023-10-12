export default {
  state: {
    departments: [],
    paginatedDepartments: [],
    department: {},
  },
  getters: {
    departments: (state) => state.departments,
    department: (state) => state.department,
    paginatedDepartments: (state) => state.paginatedDepartments,
  },
  mutations: {
    SET_DEPARTMENTS(state, departments) {
      if (departments != undefined) {
        state.departments = departments;
      } else {
        state.departments = [];
      }
    },
    SET_PAGINATED_DEPARTMENTS(state, paginatedDepartments) {
      if (paginatedDepartments != undefined) {
        state.paginatedDepartments = paginatedDepartments;
      } else {
        state.paginatedDepartments = [];
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
        dispatch("fetchPaginatedDepartments");
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
    async deleteDepartment({ commit, dispatch, getters }, id) {
      try {
        await this.deleteInstanceInDb(id, "departments");

        if (getters.departments.length === 1) {
          commit("SET_CURRENT_PAGE", getters.currentPage - 1);
        }

        dispatch("fetchPaginatedDepartments");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius buvo ištrintas`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Skyrius nebuvo ištrintas. Pabandykite vėliau.`,
          isSuccess: false,
        });
      }
    },
    async editDepartment({ commit, dispatch }, { id, data, relation }) {
      try {
        await this.editInstanceInDb(id, data, "departments");

        if (relation.create.length != 0) {
          let relationData = {};
          relation.create.forEach((division) => {
            relationData = {
              department_id: id,
              division_id: division,
            };
            dispatch("createDivisionsDepartments", relationData);
          });
        }
        if (relation.delete.length != 0) {
          relation.delete.forEach((item) => {
            dispatch("deleteRelation", {
              id: item.id,
              collection: item.collectionName,
            });
          });
        }
        dispatch("fetchPaginatedDepartments");
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
    async fetchPaginatedDepartments({ commit, getters }) {
      try {
        const departments = await this.getPaginatedList(
          "departments",
          getters.currentPage,
          getters.perPage
        );
        commit("SET_PAGINATION", departments.totalItems);
        commit("SET_PAGINATED_DEPARTMENTS", departments.items);
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
          structure: department,
        });
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
