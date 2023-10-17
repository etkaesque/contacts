export default {
  state: {
    totalItems: 0,
    currentPage: 1,
    perPage: 8,
    maxPages: 0,
    structurePerPage: STRUCTURES_PER_PAGE,
  },
  getters: {
    totalItems: (state) => state.totalItems,
    currentPage: (state) => state.currentPage,
    perPage: (state) => state.perPage,
    maxPages: (state) => state.maxPages,
  },
  mutations: {
    SET_TOTAL_ITEMS(state){
      state.totalItems = 0
    },
    SET_CURRENT_PAGE(state, { page, isContact }) {
      let perPage;

      if (isContact == undefined) {
        perPage = state.structurePerPage;
      } else {
        perPage = state.perPage;
      }

      let maxPages = Math.ceil(state.totalItems / perPage);
      if (page >= maxPages) {
        page = maxPages;
      }
      if (page < 1) {
        page = 1;
      }
      state.currentPage = page;
    },
    SET_PAGINATION(state, { total, isStructure }) {
      let perPage;

      state.totalItems = total;
      if (isStructure) {
        perPage = state.structurePerPage;
      } else {
        perPage = state.perPage;
      }

      state.maxPages = Math.ceil(total / perPage);
    },
    SET_PER_PAGE(state, number) {
      if (number < 1) {
        localStorage.setItem("perPage", 1);
        localStorage.setItem("perPage", 1);
      } else if (number > 50) {
        localStorage.setItem("perPage", 50);
        localStorage.setItem("perPage", 50);
      } else {
        localStorage.setItem("perPage", number);
        state.perPage = localStorage.getItem("perPage");
      }
    },
  },
  actions: {
    async checkServer({ commit }) {
      try {
        const connection = await this.checkServerConnection();
        return connection;
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
        return false;
      }
    },
  },
};
