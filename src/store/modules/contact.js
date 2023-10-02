export default {
  state: {
    contacts: [],
    activeContact: "",
    contact: {},
    contactsTotalItems: 0,
    isCard: true,
    currentPage: 1,
    searchTerm: "",
    perPage: CONTACTS_PER_PAGE,
    filterData: {}
  },
  getters: {
    contacts: (state) => state.contacts,
    contact: (state) => state.contact,
    isCard: (state) => state.isCard,
    contactsTotalItems: (state) => state.contactsTotalItems,
    activeContact: (state) => state.activeContact,
    currentPage: (state) => state.currentPage,
    searchTerm: (state) => state.searchTerm,
    perPage: (state) => state.perPage,
    filterData: (state) => state.filterData,
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts.items;
      state.contactsTotalItems = contacts.totalItems;
    },
    SET_FILTERS(state, filters) {
      state.filterData = filters;

    },
    SET_CONTACT(state, contact) {
      state.contact = contact;
    },
    SET_ACTIVE_CONTACT(state, id) {
      state.activeContact = id;
    },
    SET_VIEW_MODE(state) {
      state.isCard = !state.isCard;
    },
    POP(state, id) {
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
      state.contactsTotalItems = state.contactsTotalItems - 1;
    },
    SET_CURRENT_PAGE(state, page) {
      let maxPages = Math.ceil(state.contactsTotalItems / state.perPage);

      if (page < 1) {
        page = 1;
      }

      if (page > maxPages) {
        page = maxPages;
      }

      state.currentPage = page;
    },
    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term;
    },
  },
  actions: {
    async fetchContacts({ commit }, { page = 1, searchTerm = "",filterData = {} }) {
      try {
        const contacts = await this.fetchContactsFromDb(page, searchTerm, filterData);
   
        commit("SET_CONTACTS", contacts);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },
    async fetchContactById({ commit }, id) {
      try {
        const contact = await this.fetchContactByIdFromDb(id);
        commit("SET_CONTACT", contact);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },

    async createContact({ commit, dispatch }, formData) {
      try {
        await this.createContactInDb(formData);

        dispatch("fetchContacts", {});

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Kontaktas sėkmingai pridėtas.",
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },

    async editContact({ commit, dispatch }, { id, formData }) {
      try {
        await this.editContactInDb(id, formData);
        dispatch("fetchContacts", {});
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Kontaktas sėkmingai redaguotas.",
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },

    async deleteContact({ commit }, id) {
      try {
        await this.deleteContactInDb(id);

        commit("POP", id);
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Kontaktas sėkmingai ištrintas`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },
  },
};
