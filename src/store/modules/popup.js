export default {
  state: {
    modal: { status: false, form: "" },
  },
  getters: {
    modal: (state) => state.modal,
  },
  mutations: {
    CONTROL_MODAL(state, modal = { status: false, form: "" }) {
      console.log("modal change")
      state.modal.status = modal.status;
      state.modal.form = modal.form;
    },
  },
};
