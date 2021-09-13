export const UserModule = {
  namespaced: true,

  state: {
    user: null,
  },

  //Functions that affect the state
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },

  //Actions are functions that you call throughout your application that call mutations
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
  },
};
