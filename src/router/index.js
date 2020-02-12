import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import HomeView from '../views/Home.vue';
import SignupView from '../views/Signup.vue';
import SigninView from '../views/Signin.vue';

Vue.use(VueRouter);

const isAuthorized = (to, from, next) => {
  store.dispatch('session/isAuthorized').then((result) => {
    if (result) {
      next();
      return;
    }
    next('/signin');
  });
};

const isNotAuthorized = (to, from, next) => {
  store.dispatch('session/isAuthorized').then((result) => {
    if (result) {
      next('/');
      return;
    }
    next();
  });
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: isAuthorized,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
    beforeEnter: isNotAuthorized,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
    beforeEnter: isNotAuthorized,
  },
  // {
  // path: '/about',
  // name: 'about',
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
