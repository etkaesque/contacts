export default {
  state: {
    groups: [],
    group: {},
    paginatedGroups: [],
  },
  getters: {
    groups: (state) => state.groups,
    paginatedGroups: (state) => state.paginatedGroups,
    group: (state) => state.group,
  },
  mutations: {
    SET_GROUPS(state, groups) {
      if (groups != undefined) {
        state.groups = groups;
      } else {
        state.groups = [];
      }
    },
    SET_PAGINATED_GROUPS(state, paginatedGroups) {
      if (paginatedGroups != undefined) {
        state.paginatedGroups = paginatedGroups;
      } else {
        state.paginatedGroups = [];
      }
    },
    SET_GROUP(state, group) {
      if (group != undefined) {
        state.group = group;
      } else {
        state.group = {};
      }
    },
  },
  actions: {
    async createGroup({ commit, dispatch }, { data, relation }) {
      try {
        const group = await this.createInstanceInDb(data, "groups");
        let relationData = {};

        relation.forEach((department) => {
          relationData = {
            group_id: group.id,
            department_id: department,
          };

          dispatch("createDepartmentsGroups", relationData);
        });

    
 
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė sėkmingai sukurta.`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė nebuvo sukurta.`,
          isSuccess: false,
        });
      }
    },
    async deleteGroup({ commit, dispatch, getters }, id) {

      try {
        await this.deleteInstanceInDb(id, "groups");

        if (getters.paginatedGroups.length === 1) {
          commit("SET_CURRENT_PAGE", {page: getters.currentPage - 1});
        }

        commit("SET_GROUP"); // clear
        dispatch("fetchPaginatedGroups");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė buvo ištrinta`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė nebuvo ištrinta. Pabandykite vėliau.`,
          isSuccess: false,
        });
      }
    },
    async editGroup({ commit, dispatch }, { id, data, relation }) {
      try {
        await this.editInstanceInDb(id, data, "groups");

        if (relation.create.length != 0) {
          let relationData = {};

          relation.create.forEach((department) => {
            relationData = {
              group_id: id,
              department_id: department,
            };

            dispatch("createDepartmentsGroups", relationData);
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

        dispatch("fetchPaginatedGroups");

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Grupė sėkmingai redaguota.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė nebuvo redaguota`,
          isSuccess: false,
        });
      }
    },
    async fetchGroups({ commit }) {
      try {
        const groups = await this.getFullList("groups", { sort: "-created" });
        commit("SET_GROUPS", groups);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchPaginatedGroups({ commit, getters }) {
      try {
        const groups = await this.getPaginatedList(
          "groups",
          getters.currentPage,
          getters.perPage
        );

        commit("SET_PAGINATION", {total:groups.totalItems, isStructure: true});
        commit("SET_PAGINATED_GROUPS", groups.items);
      } catch (error) {
        commit("SET_PAGINATION", {total:0, isStructure: true});
        commit("SET_PAGINATED_GROUPS")
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchGroupById({ commit }, id) {
      try {
        const group = await this.fetchInstanceByIdFromDb(id, "groups", "");

        commit("SET_STRUCTURE", {
          id: id,
          type: "groups",
          data: group,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchDepartmentGroups({ commit }, id) {
      try {
        const records = await this.getFullList("departments_groups", {
          expand: "department_id,group_id",
          filter: `department_id="${id}"`,
        });

        commit("SET_GROUPS", records);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },

    async createDepartmentsGroups({ commit }, data) {
      try {
        const departmentsGroups = await this.createRelation(
          "departments_groups",
          data
        );
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Padaliniui ofisas nebuvo priskirtas.",
          isSuccess: false,
        });
      }
    },
  },
};
