export default {
  state: {
    totalItems: 1,
    currentPage: 1,
    perPage: CONTACTS_PER_PAGE,
    maxPages: 0,
  },
  getters: {
    totalItems: (state) => state.totalItems,
    currentPage: (state) => state.currentPage,
    perPage: (state) => state.perPage,
    maxPages: (state) => state.maxPages,
  },
  mutations: {
    SET_CURRENT_PAGE(state, page) {
      let maxPages = Math.ceil(state.totalItems / state.perPage);
      if (page >= maxPages) {
        page = maxPages;
      }
      if (page < 1) {
        page = 1;
      }
      state.currentPage = page;
    },
    SET_PAGINATION(state, total) {
      state.totalItems = total;

      state.maxPages = Math.ceil(total / state.perPage);
    },
  },
  actions: {},
};
