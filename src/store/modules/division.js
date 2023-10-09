import PocketBase from "pocketbase";
const pb = new PocketBase(SERVER_ADDR);

export default {
  state: {
    divisions: [],
    division: {},
  },
  getters: {
    divisions: (state) => state.divisions,
    division: (state) => state.division,
  },
  mutations: {
    SET_DIVISIONS(state, divisions) {
      if (divisions != undefined) {
        state.divisions = divisions;
      } else {
        state.divisions = [];
      }
    },
    SET_DIVISION(state, division) {
      state.department = division;
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

        commit("CONTROL_MODAL");
        dispatch("fetchDivisions");
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
    async deleteDivision({ commit, dispatch }, id) {
      try {
        await this.deleteInstanceInDb(id, "divisions");
        dispatch("fetchDivisions");
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Padalinys buvo ištrintas`,
          isSuccess: true,
        });
      } catch (error) {
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: `Padalinys nebuvo ištrintas`,
          isSuccess: false,
        });
      }
    },
    async editDivision({ commit, dispatch }, { id, data, relation }) {
      try {
        await this.editInstanceInDb(id, data, "divisions");

        if (relation.create.length != 0) {
          let relationData = {}
          relation.create.forEach((office) => {
            relationData = {
              division_id: id,
              office_id: office,
            };
            dispatch("createOfficeDivisions", relationData);
          });
        }
        
        if (relation.delete.length != 0) {
          relation.delete.forEach(item => {
            dispatch("deleteRelation", { id: item.id, collection: item.collectionName });
          })
        }

        dispatch("fetchDivisions");
        commit("CONTROL_MODAL");
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
    async fetchDivisionById({ commit }, id) {
      try {
        const division = await this.fetchInstanceByIdFromDb(
          id,
          "divisions",
          ""
        );
        commit("SET_ACTIVE_STRUCTURE", {
          id: id,
          type: "divisions",
          structure: division
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
