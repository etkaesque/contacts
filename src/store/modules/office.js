export default {
  state: {
    offices: [],
    office: {},
  },
  getters: {
    offices: (state) => state.offices,
    office: (state) => state.office,
  },
  mutations: {
    SET_OFFICES(state, offices) {
      if (offices != undefined) {
        state.offices = offices;
      } else {
        state.offices = [];
      }
    },
    SET_OFFICE(state, office) {
      state.office = office;
    },
  },
  actions: {
    async createOffice({ commit, dispatch }, { data, relation }) {
      try {
        const office = await this.createInstanceInDb(data, "offices");

        let relationData = {};
        relation.forEach((company) => {
          relationData = {
            office_id: office.id,
            company_id: company,
          };

          dispatch("createCompanyOffices", relationData);
        });

        commit("CONTROL_MODAL");
        dispatch("fetchOffices");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Ofisas sėkmingai sukurtas.`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Ofisas nebuvo sukurtas.`,
          isSuccess: false,
        });
      }
    },
    async deleteOffice({ commit, dispatch }, id) {
      try {
        await this.deleteInstanceInDb(id, "offices");
        dispatch("fetchOffices");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Ofisas buvo ištrintas`,
          isSuccess: true,
        });
      } catch ({ message }) {
        let errMessage;
        if (message == "400") {
          errMessage =
            "Ištrinti ofiso negalima. Ši struktūra yra priskirta darbuotojui.";
        } else {
          errMessage = "Ofisas nebuvo ištrintas. Pabandykite vėliau.";
        }
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: errMessage,
          isSuccess: false,
        });
      }
    },
    async editOffice({ commit, dispatch }, { id, data, relation }) {
      try {
        await this.editInstanceInDb(id, data, "offices");

    
        if (relation.create.length != 0) {
          let relationData = {};
          relation.create.forEach((company) => {
            relationData = {
              office_id: id,
              company_id: company,
            };
            dispatch("createCompanyOffices", relationData);
          });
        }

        if (relation.delete.length != 0) {
          relation.delete.forEach((item) => {
            dispatch("deleteRelation", {
              id: item.id,
              collection: item.collectionName,
            });
          });
        }

        dispatch("fetchOffices");
        commit("CONTROL_MODAL");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Ofisas sėkmingai redaguotas.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Ofisas nebuvo redaguotas`,
          isSuccess: false,
        });
      }
    },
    async fetchOffices({ commit }) {
      try {
        const offices = await this.getFullList("offices", { sort: "-created" });
        commit("SET_OFFICES", offices);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchOfficeById({ commit }, id) {
      try {
        const office = await this.fetchInstanceByIdFromDb(id, "offices", "");
        commit("SET_ACTIVE_STRUCTURE", {
          id: id,
          type: "offices",
          structure: office,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchCompanyOffices({ commit }, id) {
      try {
        const offices = await this.getFullList("companies_offices", {
          expand: "company_id,office_id",
          filter: `company_id="${id}"`,
        });

        commit("SET_OFFICES", offices);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async createCompanyOffices({ commit }, data) {
      try {
        const offices = await this.createRelation("companies_offices", data);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Įmonėms ofisas nebuvo priskirtas.",
          isSuccess: false,
        });
      }
    },
  },
};
