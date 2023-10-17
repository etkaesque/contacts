import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  state: {
    divisions: [],
    division: {},
    paginatedDivisions: [],
  },
  getters: {
    divisions: (state) => state.divisions,
    division: (state) => state.division,
    paginatedDivisions: (state) => state.paginatedDivisions,
  },
  mutations: {
    SET_DIVISIONS(state, divisions) {
      if (divisions != undefined) {
        state.divisions = divisions;
      } else {
        state.divisions = [];
      }
    },
    SET_PAGINATED_DIVISIONS(state, paginatedDivisions) {
      if (paginatedDivisions != undefined) {
        state.paginatedDivisions = paginatedDivisions;
      } else {
        state.paginatedDivisions = [];
      }
    },
    SET_DIVISION(state, division) {
      if (division != undefined) {
        state.division = division;
      } else {
        state.division = {};
      }
    },
  },
  actions: {
    async createDivision({ commit, dispatch }, { data, relation }) {
      try {
        let division = await this.createInstanceInDb(data, "divisions");

        let relationData = {};

        relation.forEach((office) => {
          relationData = {
            division_id: division.id,
            office_id: office,
          };

          dispatch("createOfficeDivisions", relationData);
        });

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Padalinys sėkmingai sukurtas.`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Padalinys nebuvo sukurtas.`,
          isSuccess: false,
        });
      }
    },
    async deleteDivision({ commit, dispatch, getters }, id) {
      try {
        await this.deleteInstanceInDb(id, "divisions");

        if (getters.paginatedDivisions.length === 1) {
          commit("SET_CURRENT_PAGE", { page: getters.currentPage - 1 });
        }

        commit("SET_DIVISION"); // clear
        dispatch("fetchPaginatedDivisions");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Padalinys buvo ištrintas`,
          isSuccess: true,
        });
      } catch ({ message }) {
        let errMessage;
        if (message == "400") {
          errMessage =
            "Ištrinti padalinio negalima. Ši struktūra yra priskirta darbuotojui.";
        } else {
          errMessage = "Padalinys nebuvo ištrintas. Pabandykite vėliau.";
        }
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: errMessage,
          isSuccess: false,
        });
      }
    },
    async editDivision({ commit, dispatch }, { id, data, relation }) {
      try {
        await this.editInstanceInDb(id, data, "divisions");

        if (relation.create.length != 0) {
          let relationData = {};
          relation.create.forEach((office) => {
            relationData = {
              division_id: id,
              office_id: office,
            };
            dispatch("createOfficeDivisions", relationData);
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

        dispatch("fetchPaginatedDivisions");

        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Padalinys sėkmingai redaguotas.",
          isSuccess: true,
        });
      } catch {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Padalinys nebuvo redaguotas`,
          isSuccess: false,
        });
      }
    },
    async fetchDivisions({ commit }) {
      try {
        const divisions = await this.getFullList("divisions", {
          sort: "-created",
        });
        commit("SET_DIVISIONS", divisions);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchPaginatedDivisions({ commit, getters }) {
      try {
        const divisions = await this.getPaginatedList(
          "divisions",
          getters.currentPage,
          getters.perPage
        );

        commit("SET_PAGINATION", {
          total: divisions.totalItems,
          isStructure: true,
        });
        commit("SET_PAGINATED_DIVISIONS", divisions.items);
      } catch (error) {
        commit("SET_PAGINATION", { total: 0, isStructure: true });
        commit("SET_PAGINATED_DIVISIONS");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchDivisionById({ commit }, id) {
      try {
        const division = await this.fetchInstanceByIdFromDb(
          id,
          "divisions",
          ""
        );
        commit("SET_STRUCTURE", {
          id: id,
          type: "divisions",
          data: division,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },
    async fetchOfficeDivisions({ commit }, id) {
      try {
        const divisions = await this.getFullList("offices_divisions", {
          expand: "office_id,division_id",
          filter: `office_id="${id}"`,
        });

        commit("SET_DIVISIONS", divisions);
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: error.message,
          isSuccess: false,
        });
      }
    },

    async createOfficeDivisions({ commit }, data) {
      try {
        const officeDivisions = await this.createRelation(
          "offices_divisions",
          data
        );
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Ofisams padalinys nebuvo priskirtas.",
          isSuccess: false,
        });
      }
    },
  },
};
