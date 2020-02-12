import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios';
import api from '../config/api';

import {
  SESSION_SET_CREATE_FORM_EMAIL,
  SESSION_SET_CREATE_FORM_PASSWORD,
  SESSION_SET_TOKEN,
  SESSION_SET_STATUS,
} from './mutation.type';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    create: {
      form: {
        email: '',
        password: '',
      },
    },
    token: '',
    status: false,
  },
  mutations: {
    [SESSION_SET_CREATE_FORM_EMAIL](state, value) {
      state.create.form.email = value;
    },
    [SESSION_SET_CREATE_FORM_PASSWORD](state, value) {
      state.create.form.password = value;
    },
    [SESSION_SET_STATUS](state, value) {
      state.status = value;
    },
    [SESSION_SET_TOKEN](state, value) {
      state.token = value;
    },
  },
  actions: {
    setFormEmail: (context, value) => {
      context.commit(SESSION_SET_CREATE_FORM_EMAIL, value);
    },
    setFormPassword: (context, value) => {
      context.commit(SESSION_SET_CREATE_FORM_PASSWORD, value);
    },
    setStatus: (context, value) => {
      context.commit(SESSION_SET_STATUS, value);
    },
    setToken: (context, value) => {
      context.commit(SESSION_SET_TOKEN, value);
    },
    create: context => new Promise((resolve) => {
      axios.post(`http://${api.host}:${api.port}/api/session`, {
        email: context.state.create.form.email,
        password: context.state.create.form.password,
      }).then((response) => {
        context.commit(SESSION_SET_STATUS, true);
        context.commit(SESSION_SET_TOKEN, response.data.token);
        context.commit(SESSION_SET_CREATE_FORM_EMAIL, '');
        context.commit(SESSION_SET_CREATE_FORM_PASSWORD, '');
        axios.setAuthorization();
        resolve(response);
      }).catch(() => {
        resolve(false);
      });
    }),
    delete: (context) => {
      context.commit(SESSION_SET_STATUS, false);
      context.commit(SESSION_SET_TOKEN, '');
      context.commit(SESSION_SET_CREATE_FORM_EMAIL, '');
      context.commit(SESSION_SET_CREATE_FORM_PASSWORD, '');
    },
    isAuthorized: context => context.state.token !== '',
  },
  modules: {
  },
};
