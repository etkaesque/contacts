export default {
  state: {
    contacts: [],
    contact: {},
    contactsTotalItems: 0,
    isCard: true,
  },
  getters: {
    contacts: (state) => state.contacts,
    contact: (state) => state.contact,
    isCard: (state) => state.isCard,
    contactsTotalItems: (state) => state.contactsTotalItems,
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts.items;
      state.contactsTotalItems = contacts.totalItems;
    },
    SET_CONTACT(state, contact) {
      state.contact = contact;
    },
    SET_VIEW_MODE(state) {
      state.isCard = !state.isCard;
    },
  },
  actions: {
    async fetchContacts({ commit }) {
      try {
      
        const contacts = await this.fetchContactsFromDb();
        commit("SET_CONTACTS", contacts);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchContactById({ commit }, id) {
      try {
        const contact = await this.fetchContactByIdFromDb(id);
        commit("SET_CONTACT", contact);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
