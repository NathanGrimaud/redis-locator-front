import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import MapComponent from './components/Map.vue';
import Search from './components/Search.vue';
import Login from './components/Login.vue';
import Account from './components/Account.vue';

import { sync } from 'vuex-router-sync';
import store from './store';
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      /*  meta: {
        requiresAuth: true
      }*/
    },

    {
      path: '/map',
      name: 'map',
      component: MapComponent
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

/** auth guard */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.isLoggedIn === false) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export const unsync = sync(store, router);

export default router;
