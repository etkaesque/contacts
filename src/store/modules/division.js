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
      console.log("data", data);
      console.log("relation", relation);

      try {
        let division = await this.createInstanceInDb(data, "divisions");

        console.log("got back this divisio", division.id);

        let relationData = {};

        console.log("after cancel", division.id);
        pb.autoCancellation(false);

        relation.forEach((office) => {
          console.log("loop", office);
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
        pb.autoCancellation(true);
      } catch(error) {

        console.log("EEEEROR", error)

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
    async editDivision({ commit, dispatch }, { id, data }) {
      try {
        await this.editInstanceInDb(id, data, "divisions");
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
        commit("SET_ACTIVE_STRUCTURE", { structure: division });
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
      console.log("createOfficeDivisions is hit");
      try {
        const officeDivisions = await this.createRelation(
          "offices_divisions",
          data
        );
        console.log("relation was created", officeDivisions);
      } catch (error) {
        console.log("EEEEROR", error)
        commit("CONTROL_NOTIFICATION", {
          status: true,
          message: "Ofisams padalinys nebuvo priskirtas.",
          isSuccess: false,
        });
      }
    },
  },
};
