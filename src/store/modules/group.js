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
        state.groups = groups;
      },
      SET_GROUP(state, group) {
        state.group = group;
      },
    },
    actions: {
      async fetchGroups({ commit }) {
        try {
          const groups = await this.fetchGroupsFromDb();
          commit("SET_GROUPS", groups);
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
  