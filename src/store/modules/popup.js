export default {
  state: {
    modal: { status: false, form: "", type: "" },
    notification: { status: false, isSuccess: false, message: "" }
  },
  getters: {
    modal: (state) => state.modal,

    notification: (state) => state.notification,

  },
  mutations: {
    CONTROL_MODAL(state, modal = { status: false, form: "", type: "" }) {
      state.modal.status = modal.status;
      state.modal.form = modal.form;
      state.modal.type = modal.type;
    },
    CONTROL_NOTIFICATION(state, notification = { status: false, message: "", isSuccess: false }) {
      state.notification.status = notification.status
      state.notification.message = notification.message
      state.notification.isSuccess = notification.isSuccess
    }
  },
};