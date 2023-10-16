export default {
  state: {
    contacts: [],
    contact_emails: [],
    contact: { data: {}, id: "" },
    isCard: true,
    searchTerm: "",
    filterData: {},
  },
  getters: {
    contacts: (state) => state.contacts,
    contact: (state) => state.contact,
    isCard: (state) => state.isCard,
    searchTerm: (state) => state.searchTerm,
    filterData: (state) => state.filterData,
    contact_emails: (state) => state.contact_emails,
  },
  mutations: {
    SET_CONTACTS(state, contacts) {
      if (contacts === undefined) {
        state.contacts = [];
      } else {
        state.contacts = contacts.items;
      }
   
    },
    SET_FILTERS(state, filters) {
      if (filters === undefined) {
        state.filterData = {};
      } else {
        state.filterData = filters;
      }
    },
    SET_CONTACT(state, contact) {
      if (contact != undefined) {
        state.contact = { data: contact.data, id: contact.id };
      } else {
        state.contact = { data: {}, id: "" };
      }
    },
    SET_VIEW_MODE(state) {
      state.isCard = !state.isCard;
    },

    SET_SEARCH_TERM(state, term) {
      state.searchTerm = term;
    },
    SET_CONTACT_EMAILS(state, emails) {
      if (emails != undefined) {
        state.contact_emails = emails;
      } else {
        state.contact_emails = [];
      }
    }
  },
  actions: {
    async fetchContacts(
      { commit,getters },
      { page = 1, searchTerm = "", filterData = {} }
    ) {
      try {
        const contacts = await this.fetchContactsFromDb(
          page, getters.perPage,
          searchTerm,
          filterData
        );

        commit("SET_PAGINATION", {total:contacts.totalItems, isStructure: false});
        commit("SET_CONTACTS", contacts);
      } catch (error) {
        commit("SET_PAGINATION", {total:0, isStructure: false});
        commit("SET_CONTACTS")
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },
    async fetchContactEmails({ commit, getters }) {

      try {
        const records = await this.getFullList("employees", {
          fields: "email",
        });

        let emails = []

        records.forEach(record => {
          if (getters.contact.data.email != record.email) {
            emails.push(record.email)
          }
        })
        commit("SET_CONTACT_EMAILS", emails)
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }

    },
    async fetchContactById({ commit }, id) {
      try {
        const query = {
          expand: `company_id,office_id,division_id,department_id,group_id`,
        };
        const contact = await this.fetchInstanceByIdFromDb(
          id,
          "employees",
          query
        );
        commit("SET_CONTACT", { data: contact, id: id });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `${error.message}`,
          isSuccess: false,
        });
      }
    },
    async createContact({ commit, dispatch, getters }, formData) {
      try {

        await this.createInstanceInDb(formData, "employees");

        dispatch("fetchContacts", {
          page: getters.currentPage,
          searchTerm: getters.searchTerm,
          filterData: getters.filterData,
        });

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Kontaktas sėkmingai pridėtas.",
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Kontaktas nebuvo sukurtas.`,
          isSuccess: false,
        });
      }
    },
    async editContact({ commit, dispatch, getters }, { id, formData }) {
      try {
        await this.editInstanceInDb(id, formData, "employees");
        dispatch("fetchContacts", {
          page: getters.currentPage,
          searchTerm: getters.searchTerm,
          filterData: getters.filterData,
        });
        commit("SET_CONTACT");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Kontaktas sėkmingai redaguotas.",
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Kontaktas nebuvo redaguotas.`,
          isSuccess: false,
        });
      }
    },
    async deleteContact({ commit, dispatch, getters }, id) {
      try {
        await this.deleteInstanceInDb(id, "employees");

        if (getters.contacts.length === 1) {
          commit("SET_CURRENT_PAGE", {page: getters.currentPage - 1, isContact: true});
        }

        commit("SET_CONTACT") // clear
        dispatch("fetchContacts", {
          page: getters.currentPage,
          searchTerm: getters.searchTerm,
          filterData: getters.filterData,
        });

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
