import { createStore } from "vuex";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    token: "",
    user: {}
  },
  mutations: {

    SET_TOKEN(state, token) {
      state.token = token;
    },
    
    SET_USER(state, data) {
      state.user = data;
    },

    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    navbarMinimize(state) {
      const sidenav_show = document.querySelector(".g-sidenav-show");

      if (sidenav_show.classList.contains("g-sidenav-hidden")) {
        sidenav_show.classList.remove("g-sidenav-hidden");
        sidenav_show.classList.add("g-sidenav-pinned");
        state.isPinned = true;
      } else {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload);
    },

    setToken({ commit }, token) {

      localStorage.setItem('token', token);

      commit('SET_TOKEN', token);
    },
    setUser({ commit }, data) {

      localStorage.setItem('user', data);

      commit('SET_USER', data);
    },

    rehydrateToken({ commit }) {
      const token = localStorage.getItem('token');
      if (token) {
        commit('SET_TOKEN', token);
      }
    },

    rehydrateUser({ commit }) {
      const user = localStorage.getItem('user');
      if (user) {
        commit('SET_USER', user);
      }
    },

  },
  getters: {
    getToken: state => state.token,
    getUser: state => state.user,

  }
});
