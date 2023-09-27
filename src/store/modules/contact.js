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

    POP(state, id) {
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
      state.contactsTotalItems = state.contactsTotalItems - 1;
    },
    ADD(state, contact) {
      state.contacts.push(contact);
      state.contactsTotalItems = state.contactsTotalItems + 1;
    },
  },
  actions: {
    async fetchContacts({ commit }) {
      try {
        const contacts = await this.fetchContactsFromDb();
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

    async createContact({ commit }, formData) {
      try {
        const contact = await this.createContactInDb(formData);
        commit("ADD", contact);
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
        const contact = await this.editContactInDb(id, formData);
        console.log(contact);
        dispatch("fetchContacts");
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
