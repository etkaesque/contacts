export default {
  state: {
    contacts: [],
    activeContact: "",
    contact: {},
    contactsTotalItems: 0,
    isCard: true,
  },
  getters: {
    contacts: (state) => state.contacts,
    contact: (state) => state.contact,
    isCard: (state) => state.isCard,
    contactsTotalItems: (state) => state.contactsTotalItems,
    activeContact: (state) => state.activeContact,
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts.items;
      state.contactsTotalItems = contacts.totalItems;
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

    async createContact({ commit }, formData) {
      try {
        const contact = await this.createContactInDb(formData);
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    },

    async editContact({ commit }, {id, formData}) {
      try {
        const contact = await this.editContactInDb(id, formData);
        console.log("success");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
