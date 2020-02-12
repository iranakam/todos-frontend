import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import session from './session';
import user from './user';
import task from './task';

export default new Vuex.Store({
  modules: {
    session,
    user,
    task,
  },
  plugins: [createPersistedState(
    {
      key: 'todoapp/session',
      paths: ['session.token', 'session.status'],
      storage: window.localStorage,
    },
  )],
});
