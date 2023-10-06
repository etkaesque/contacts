export default {
  state: {
    groups: [],
    group: {},
  },
  getters: {
    groups: (state) => state.groups,
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
    SET_GROUP(state, group) {
      state.group = group;
    },
  },
  actions: {
    async createGroup({ commit, dispatch }, data) {
      try {
        await this.createInstanceInDb(data, "groups");
        commit("CONTROL_MODAL");
        dispatch("fetchGroups");
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
    async deleteGroup({ commit, dispatch }, id) {
      try {
        await this.deleteInstanceInDb(id, "groups");
        dispatch("fetchGroups");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė buvo ištrinta`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Grupė nebuvo ištrinta`,
          isSuccess: false,
        });
      }
    },
    async editGroup({ commit, dispatch }, { id, data }) {
      try {
        await this.editInstanceInDb(id, data, "groups");
        dispatch("fetchGroups");
        commit("CONTROL_MODAL");
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
    async fetchGroupById({ commit }, id) {
      try {
        const group = await this.fetchInstanceByIdFromDb(id, "groups", "");

        commit("SET_ACTIVE_STRUCTURE", { structure: group });
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
  },
};
