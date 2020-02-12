import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';

Vue.use(Vuex);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
