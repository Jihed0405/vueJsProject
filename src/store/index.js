import { createStore } from "vuex";

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    currentUser: JSON.parse(localStorage.getItem("currentUser")),
  },
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    updateUserInMutation(state, user) {
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },
    clearUserInMutation(state) {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
  actions: {
    updateUser(state, user) {
      state.commit("updateUserInMutation", user);
    },
    clearUser(state) {
      state.commit("clearUserInMutation");
    },
  },
  modules: {},
});
