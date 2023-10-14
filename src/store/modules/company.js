export default {
  state: {
    companies: [],
    company: { data: {}, id: "" },
    totalCompanies: 0,
    structure: { id: "", type: "", data: {} },
    relations: [],
    tab:"",
  },
  getters: {
    companies: (state) => state.companies,
    company: (state) => state.company,
    structure: (state) => state.structure,
    totalCompanies: (state) => state.totalCompanies,
    relations: (state) => state.relations,
    tab: (state) => state.tab,
  },
  mutations: {
    SET_TAB(state, tab){
      if (tab != undefined) {
        state.tab = tab;
      } else {
        state.tab = "";
      }
    },
    SET_COMPANIES(state, companies) {
      if (companies != undefined) {
        state.companies = companies;
        state.totalCompanies = companies.length;
      } else {
        state.companies = [];
      }
    },
    SET_COMPANY(state, company) {
      if (company != undefined) {
        state.company = { data: company.data, id: company.id };
      } else {
        state.company = { data: {}, id: "" };
      }
    },
    SET_STRUCTURE(state, structure) {
      if (structure != undefined) {
        state.structure = {
          id: structure.id,
          type: structure.type,
          data: structure.data,
        };
      } else {
        state.structure = { id: "", type: "", data: {} };
      }
    },

    SET_RELATIONS(state, { relations, ids }) {
      if (relations == undefined) {
        state.relations = [];
      } else {
        state.relations = { rels: relations, ids: ids };
      }
    },
  },
  actions: {
    async createCompany({ commit, dispatch }, data) {
      try {
        await this.createInstanceInDb(data, "companies");
        commit("CONTROL_MODAL");
        dispatch("fetchPaginatedCompanies");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė sėkmingai sukurta.`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė nebuvo sukurta.`,
          isSuccess: false,
        });
      }
    },
    async deleteCompany({ commit, dispatch, getters }, id) {
      try {
        await this.deleteInstanceInDb(id, "companies");

        if (getters.companies.length === 1) {
          commit("SET_CURRENT_PAGE", getters.currentPage - 1);
        }
        commit("SET_COMPANY") // clear
        dispatch("fetchPaginatedCompanies");

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė buvo ištrinta`,
          isSuccess: true,
        });
      } catch ({ message }) {
        let errMessage;
        if (message == "400") {
          errMessage =
            "Ištrinti įmonės negalima. Ši struktūra yra priskirta darbuotojui.";
        } else {
          errMessage = "Įmonė nebuvo ištrinta. Pabandykite vėliau.";
        }
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: errMessage,
          isSuccess: false,
        });
      }
    },
    async editCompany({ commit, dispatch }, { id, data }) {
      try {
        await this.editInstanceInDb(id, data, "companies");
        dispatch("fetchCompanies");

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Įmonė sėkmingai redaguota.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė nebuvo redaguota`,
          isSuccess: false,
        });
      }
    },
    async fetchCompanyById({ commit }, id) {
      try {
        const company = await this.fetchInstanceByIdFromDb(id, "companies", "");
        commit("SET_COMPANY", { data: company, id: id });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchCompanies({ commit }) {
      try {
        const companies = await this.getFullList("companies", {
          sort: "-created",
        });
        commit("SET_COMPANIES", companies);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchPaginatedCompanies({ commit, getters }) {
      try {
        const companies = await this.getPaginatedList(
          "companies",
          getters.currentPage,
          getters.perPage
        );
        commit("SET_PAGINATION", companies.totalItems);
        commit("SET_COMPANIES", companies.items);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },

    async setActiveStructure({ commit, dispatch }, { id, type }) {
      if (id == undefined) {
        commit.SET_STRUCTURE(); // clear
      }

      if (type == "offices") {
        await dispatch("fetchOfficeById", id);
      } else if (type == "divisions") {
        await dispatch("fetchDivisionById", id);
      } else if (type == "departments") {
        await dispatch("fetchDepartmentById", id);
      } else if (type == "groups") {
        await dispatch("fetchGroupById", id);
      }
    },

    async deleteStructure({ commit, dispatch }, { id, type }) {
      if (type == "offices") {
        dispatch("deleteOffice", id);
      } else if (type == "divisions") {
        dispatch("deleteDivision", id);
      } else if (type == "departments") {
        dispatch("deleteDepartment", id);
      } else if (type == "groups") {
        dispatch("deleteGroup", id);
      }
    },

    async fetchRelation({ commit }, { id, collection, type }) {
      try {
        const relations = await this.fetchRelationFromDb(id, collection, type);

        let ids = [];

        relations.items.forEach((item) => {
          if (type == "office_id") {
            ids.push(item.company_id);
          } else if (type == "division_id") {
            ids.push(item.office_id);
          } else if (type == "department_id") {
            ids.push(item.division_id);
          } else if (type == "group_id") {
            ids.push(item.department_id);
          }
        });
        commit("SET_RELATIONS", { relations: relations.items, ids: ids });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },

    async deleteRelation({ commit }, { id, collection }) {
      try {
        const relations = await this.deleteRelationInDb(id, collection);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Nebuvo redaguota.",
          isSuccess: false,
        });
      }
    },
  },
};
