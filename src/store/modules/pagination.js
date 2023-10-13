export default {
  state: {
    totalItems: 0,
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
      console.log("CORRENT PAGE ON SET CURRENT PAGE", page)
      console.log("total",state.totalItems)
      let maxPages = Math.ceil(state.totalItems / state.perPage);
      if (page >= maxPages) {
        page = maxPages;
      }
      if (page < 1) {
        page = 1;
      }
      console.log("SETTING PAGE ", page)
      state.currentPage = page;
    },
    SET_PAGINATION(state, total) {
      state.totalItems = total;

      state.maxPages = Math.ceil(total / state.perPage);



      
    },
  },
  actions: {


  },
};
