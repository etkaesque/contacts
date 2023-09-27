export default {
  state: {
    modal: { status: false, form: "" },
    deletePopUp: false,
    notification: { status: false, isSuccess: false, message: "Kontaktas sėkmingai ištrintas." }
  },
  getters: {
    modal: (state) => state.modal,
    deletePopUp: (state) => state.deletePopUp,
    notification: (state) => state.notification,

  },
  mutations: {
    CONTROL_MODAL(state, modal = { status: false, form: "" }) {

      state.modal.status = modal.status;
      state.modal.form = modal.form;
    },
    CONTROL_DELETE(state) {
      state.deletePopUp = !state.deletePopUp
    },
    CONTROL_NOTIFICATION(state, notification = { status: false, message: "", isSuccess: false }) {
      state.notification.status = notification.status
      state.notification.message = notification.message
      state.notification.isSuccess = notification.isSuccess
    }
  },
};