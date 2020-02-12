import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios';
import api from '../config/api';

import {
  USER_SET_CREATE_FORM_EMAIL,
  USER_SET_CREATE_FORM_NAME,
  USER_SET_CREATE_FORM_PASSWORD,
  USER_SET_CREATE_FORM_PASSWORD_CONFIRM,
  USER_SET_UPDATE_FORM_EMAIL,
  USER_SET_UPDATE_FORM_NAME,
  USER_SET_UPDATE_FORM_PASSWORD,
  USER_SET_UPDATE_VISIBLE,
} from './mutation.type';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    create: {
      form: {
        email: '',
        name: '',
        password: '',
        password_confirm: '',
      },
    },
    update: {
      visible: false,
      form: {
        email: '',
        name: '',
        password: '',
      },
    },
  },
  getters: {
  },
  mutations: {
    [USER_SET_CREATE_FORM_EMAIL](state, value) {
      state.create.form.email = value;
    },
    [USER_SET_CREATE_FORM_NAME](state, value) {
      state.create.form.name = value;
    },
    [USER_SET_CREATE_FORM_PASSWORD](state, value) {
      state.create.form.password = value;
    },
    [USER_SET_CREATE_FORM_PASSWORD_CONFIRM](state, value) {
      state.create.form.password_confirm = value;
    },
    [USER_SET_UPDATE_VISIBLE](state, value) {
      state.update.visible = value;
    },
    [USER_SET_UPDATE_FORM_EMAIL](state, value) {
      state.update.form.email = value;
    },
    [USER_SET_UPDATE_FORM_NAME](state, value) {
      state.update.form.name = value;
    },
    [USER_SET_UPDATE_FORM_PASSWORD](state, value) {
      state.update.form.password = value;
    },
  },
  actions: {
    setCreateFormEmail: (context, value) => {
      context.commit(USER_SET_CREATE_FORM_EMAIL, value);
    },
    setCreateFormName: (context, value) => {
      context.commit(USER_SET_CREATE_FORM_NAME, value);
    },
    setCreateFormPassword: (context, value) => {
      context.commit(USER_SET_CREATE_FORM_PASSWORD, value);
    },
    setCreateFormPasswordConfirm: (context, value) => {
      context.commit(USER_SET_CREATE_FORM_PASSWORD_CONFIRM, value);
    },
    setUpdateVisible: (context, value) => {
      context.commit(USER_SET_UPDATE_VISIBLE, value);
    },
    setUpdateFormEmail: (context, value) => {
      context.commit(USER_SET_UPDATE_FORM_EMAIL, value);
    },
    setUpdateFormName: (context, value) => {
      context.commit(USER_SET_UPDATE_FORM_NAME, value);
    },
    setUpdateFormPassword: (context, value) => {
      context.commit(USER_SET_UPDATE_FORM_PASSWORD, value);
    },
    create: context => new Promise((resolve) => {
      axios.post(`http://${api.host}:${api.port}/api/users`, {
        email: context.state.create.form.email,
        name: context.state.create.form.name,
        password: context.state.create.form.password,
        password_confirm: context.state.create.form.password_confirm,
      }).then((res) => {
        context.dispatch('session/setToken', res.data.token, { root: true });
        context.dispatch('session/setStatus', true, { root: true });
        context.commit(USER_SET_CREATE_FORM_EMAIL, '');
        context.commit(USER_SET_CREATE_FORM_NAME, '');
        context.commit(USER_SET_CREATE_FORM_PASSWORD, '');
        context.commit(USER_SET_CREATE_FORM_PASSWORD_CONFIRM, '');
        axios.setAuthorization();
        resolve(res);
      }).catch(() => {
        resolve(false);
      });
    }),
    update: context => new Promise((resolve) => {
      axios.put(`http://${api.host}:${api.port}/api/users`, {
        email: context.state.update.form.email,
        name: context.state.update.form.name,
        password: context.state.update.form.password,
      }).then((res) => {
        context.dispatch('session/updateToken', res.data.token, { root: true });
        context.dispatch('session/updateStatus', true, { root: true });
        context.commit(USER_SET_CREATE_FORM_EMAIL, '');
        context.commit(USER_SET_CREATE_FORM_NAME, '');
        context.commit(USER_SET_CREATE_FORM_PASSWORD, '');
        resolve(res);
      }).catch(() => {
        resolve(false);
      });
    }),
  },
};
