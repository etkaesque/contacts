export default {
  state: {
    companies: [],
    company: {},
    active_company: "",
    totalCompanies: 0,
    active_structure: { id: "", type: "", structure: {} },
    relations: [],
  },
  getters: {
    companies: (state) => state.companies,
    company: (state) => state.company,
    active_company: (state) => state.active_company,
    active_structure: (state) => state.active_structure,
    totalCompanies: (state) => state.totalCompanies,
    relations: (state) => state.relations,
  },
  mutations: {
    SET_COMPANIES(state, companies) {
      if (companies != undefined) {
        state.companies = companies;
        state.totalCompanies = companies.length;
      } else {
        state.companies = [];
      }
    },
    SET_ACTIVE_COMPANY(state, id) {
      if (id == undefined) {
        state.active_company = "";
        state.company = {};
      } else {
        state.active_company = id;
      }
    },
    SET_ACTIVE_STRUCTURE(state, { id, type, structure }) {
      if (id == undefined && type == undefined && structure == undefined) {
        state.active_structure = { id: "", type: "", structure: {} };
      } else {
        state.active_structure = { id: id, type: type, structure: structure };
      }
    },
    SET_COMPANY(state, company) {
      state.company = company;
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
        dispatch("fetchCompanies");
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
    async deleteCompany({ commit, dispatch }, id) {
      try {
        await this.deleteInstanceInDb(id, "companies");
        dispatch("fetchCompanies");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Įmonė buvo ištrinta`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async editCompany({ commit, dispatch }, { id, data }) {
      try {
        await this.editInstanceInDb(id, data, "companies");
        dispatch("fetchCompanies");
        commit("CONTROL_MODAL");
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
        commit("SET_COMPANY", company);
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
    async setActiveStructure({ commit, dispatch }, { id, type }) {
      if (id == undefined) {
        commit.SET_ACTIVE_STRUCTURE({}); // clear
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
