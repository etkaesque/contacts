export default {
  state: {
    modal: { status: false, form: "" },
    deletePopUp: false
  },
  getters: {
    modal: (state) => state.modal,
    deletePopUp: (state) => state.deletePopUp
  },
  mutations: {
    CONTROL_MODAL(state, modal = { status: false, form: "" }) {

      state.modal.status = modal.status;
      state.modal.form = modal.form;
    },
    CONTROL_DELETE(state) {
      state.deletePopUp = !state.deletePopUp
    }
  },
};
