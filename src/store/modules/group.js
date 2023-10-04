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
          state.groups  = groups;
        } else {
          state.groups = [];
        }
      },
      SET_GROUP(state, group) {
        state.group = group;
      },
    },
    actions: {
      async fetchGroups({ commit }) {
        try {
          const groups = await this.getFullList("groups", {sort: "-created"});
          commit("SET_GROUPS", groups);
        } catch (error) {
          commit("CONTROL_NOTIFICATION", {
            status: true,
            message: error.message,
            isSuccess: false,
          });
        }
      },
      async fetchDepartmentGroups({commit}, id ) {
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
      }
    },
  };
  