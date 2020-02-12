import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios';
import api from '../config/api';

import {
  TASK_SET_CREATE_FORM_NAME,
  TASK_SET_CREATE_FORM_PRIORITY,
  TASK_SET_CREATE_FORM_SCHEDULE,
  TASK_SET_CREATE_VISIBLE,
  TASK_SET_UPDATE_FORM_NAME,
  TASK_SET_UPDATE_FORM_PRIORITY,
  TASK_SET_UPDATE_FORM_SCHEDULE,
  TASK_SET_UPDATE_FORM_STATUS,
  TASK_SET_UPDATE_VISIBLE,
  TASK_SET_UPDATE_ID,
  TASK_SET_UPDATE_INDEX,
  TASK_SET_REMOVE_VISIBLE,
  TASK_SET_REMOVE_ID,
  TASK_SET_REMOVE_INDEX,
  TASK_INITIALIZE_TASKS,
  TASK_PUSH_TASK,
  TASK_REMOVE_TASK,
  TASK_UPDATE_TASK,
} from './mutation.type';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    tasks: [],
    priority: [
      { label: 'Low', value: 0 },
      { label: 'Mid', value: 1 },
      { label: 'High', value: 2 },
    ],
    create: {
      visible: false,
      form: {
        name: '',
        schedule: '',
        priority: '',
      },
    },
    update: {
      visible: false,
      id: '',
      index: '',
      form: {
        name: '',
        schedule: '',
        priority: '',
        status: '',
      },
    },
    remove: {
      visible: false,
      id: '',
      index: '',
    },
  },
  mutations: {
    [TASK_INITIALIZE_TASKS](state, value) {
      state.tasks = value;
    },
    [TASK_PUSH_TASK](state, value) {
      state.tasks.push(value);
    },
    [TASK_REMOVE_TASK](state) {
      state.tasks.splice(state.remove.index, 1);
    },
    TASK_UPDATE_TASK(state, value) {
      Vue.set(state.tasks[state.update.index], 'name', value.name);
      Vue.set(state.tasks[state.update.index], 'schedule', value.schedule);
      Vue.set(state.tasks[state.update.index], 'priority', value.priority);
      Vue.set(state.tasks[state.update.index], 'status', value.status);
    },
    [TASK_SET_CREATE_FORM_NAME](state, value) {
      state.create.form.name = value;
    },
    [TASK_SET_CREATE_FORM_SCHEDULE](state, value) {
      state.create.form.schedule = value;
    },
    [TASK_SET_CREATE_FORM_PRIORITY](state, value) {
      state.create.form.priority = value;
    },
    [TASK_SET_CREATE_VISIBLE](state, value) {
      state.create.visible = value;
    },
    [TASK_SET_UPDATE_VISIBLE](state, value) {
      state.update.visible = value;
    },
    [TASK_SET_UPDATE_ID](state, value) {
      state.update.id = value;
    },
    [TASK_SET_UPDATE_INDEX](state, value) {
      state.update.index = value;
    },
    [TASK_SET_UPDATE_FORM_NAME](state, value) {
      state.update.form.name = value;
    },
    [TASK_SET_UPDATE_FORM_SCHEDULE](state, value) {
      state.update.form.schedule = value;
    },
    [TASK_SET_UPDATE_FORM_PRIORITY](state, value) {
      state.update.form.priority = value;
    },
    [TASK_SET_UPDATE_FORM_STATUS](state, value) {
      state.update.form.status = value;
    },
    [TASK_SET_REMOVE_VISIBLE](state, value) {
      state.remove.visible = value;
    },
    [TASK_SET_REMOVE_ID](state, value) {
      state.remove.id = value;
    },
    [TASK_SET_REMOVE_INDEX](state, value) {
      state.remove.index = value;
    },
  },
  actions: {
    setCreateFormName(context, value) {
      context.commit(TASK_SET_CREATE_FORM_NAME, value);
    },
    setCreateFormPriority(context, value) {
      context.commit(TASK_SET_CREATE_FORM_PRIORITY, value);
    },
    setCreateFormSchedule(context, value) {
      context.commit(TASK_SET_CREATE_FORM_SCHEDULE, value);
    },
    setCreateVisible(context, value) {
      context.commit(TASK_SET_CREATE_VISIBLE, value);
    },
    setUpdateFormName(context, value) {
      context.commit(TASK_SET_UPDATE_FORM_NAME, value);
    },
    setUpdateFormPriority(context, value) {
      context.commit(TASK_SET_UPDATE_FORM_PRIORITY, value);
    },
    setUpdateFormSchedule(context, value) {
      context.commit(TASK_SET_UPDATE_FORM_SCHEDULE, value);
    },
    setUpdateFormStatus(context, value) {
      context.commit(TASK_SET_UPDATE_FORM_STATUS, value);
    },
    setUpdateVisible(context, value) {
      context.commit(TASK_SET_UPDATE_VISIBLE, value);
    },
    setUpdateId(context, value) {
      context.commit(TASK_SET_UPDATE_ID, value);
    },
    setUpdateIndex(context, value) {
      context.commit(TASK_SET_UPDATE_INDEX, value);
    },
    setRemoveVisible(context, value) {
      context.commit(TASK_SET_REMOVE_VISIBLE, value);
    },
    setRemoveId(context, value) {
      context.commit(TASK_SET_REMOVE_ID, value);
    },
    setRemoveIndex(context, value) {
      context.commit(TASK_SET_REMOVE_INDEX, value);
    },
    read: context => new Promise((resolve) => {
      axios.get(`http://${api.host}:${api.port}/api/tasks`).then((response) => {
        context.commit(TASK_INITIALIZE_TASKS, response.data);
        resolve(response);
      }).catch(() => {
        resolve(false);
      });
    }),
    create: context => new Promise((resolve) => {
      axios.post(`http://${api.host}:${api.port}/api/tasks`, {
        name: context.state.create.form.name,
        schedule: context.state.create.form.schedule,
        priority: context.state.create.form.priority,
      }).then((response) => {
        context.commit(TASK_PUSH_TASK, response.data);
        context.commit(TASK_SET_CREATE_FORM_NAME, '');
        context.commit(TASK_SET_CREATE_FORM_SCHEDULE, '');
        context.commit(TASK_SET_CREATE_FORM_PRIORITY, '');
        context.commit(TASK_SET_CREATE_VISIBLE, false);
        resolve(response);
      }).catch(() => {
        resolve(false);
      });
    }),
    update: context => new Promise((resolve) => {
      let s = new Date(context.state.update.form.schedule);
      s = s.toISOString();
      axios.put(`http://${api.host}:${api.port}/api/tasks`, {
        id: context.state.update.id,
        name: context.state.update.form.name,
        schedule: s,
        status: context.state.update.form.status,
        priority: context.state.update.form.priority,
      }).then((response) => {
        context.commit(TASK_UPDATE_TASK, response.data);
        context.commit(TASK_SET_UPDATE_ID, '');
        context.commit(TASK_SET_UPDATE_INDEX, '');
        context.commit(TASK_SET_UPDATE_FORM_NAME, '');
        context.commit(TASK_SET_UPDATE_FORM_SCHEDULE, '');
        context.commit(TASK_SET_UPDATE_FORM_PRIORITY, '');
        context.commit(TASK_SET_UPDATE_FORM_STATUS, '');
        context.commit(TASK_SET_UPDATE_VISIBLE, false);
        resolve(response);
      }).catch(() => {
        resolve(false);
      });
    }),
    remove: context => new Promise((resolve) => {
      axios.delete(`http://${api.host}:${api.port}/api/tasks`, { data: { id: context.state.remove.id } }).then((response) => {
        context.commit(TASK_REMOVE_TASK);
        resolve(response);
      }).catch(() => {
        resolve(false);
      });
    }),
  },
  modules: {
  },
};
