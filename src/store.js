import Vue from 'vue';
import Vuex from 'vuex';
import { AUTH_URL } from './constants';
Vue.use(Vuex);
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const MOVE = 'MOVE';
export const ADMIN_LOGIN = 'ADMIN_LOGIN';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SET_MAP = 'SET_MAP';
export const SET_FRIENDS = 'SET_FRIENDS';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_SOCKET = 'SET_SOCKET';

import proj from 'ol/proj';
const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    location: [0, 0],
    olmap: null,
    token: '',
    username: '',
    friends: [],
    socket: null
  },
  mutations: {
    [SET_SOCKET]: (state, socket) => (state.socket = socket),
    [SET_USERNAME]: (state, value) => (state.username = value),
    [SET_TOKEN]: (state, value) => (state.token = value),
    [SET_MAP]: (state, olmap) => (state.olmap = olmap),
    [MOVE]: (state, location) => (state.location = location),
    [LOGIN]: state => (state.isLoggedIn = true),
    [ADMIN_LOGIN]: state => {
      state.isLoggedIn = true;
      state.isAdmin = true;
    },
    [LOGOUT]: state => {
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
    [SET_FRIENDS]: (state, friends) => (state.friends = friends)
  },
  actions: {
    [LOGOUT]: ({ commit }) => {
      localStorage.setItem('token', null);
      store.commit(LOGOUT);
    },
    [MOVE]: ({ commit }, location) => {
      store.state.olmap.setCenter(proj.fromLonLat(location));
      store.commit('MOVE', location);
    },
    [CHECK_LOGIN]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        if (localStorage.getItem('token') !== 'null') {
          store.commit(LOGIN);
          return resolve(store.state.isLoggedIn);
        }
        store.commit(LOGOUT);
        return resolve(store.state.isLoggedIn);
      });
    },
    [LOGIN]: ({ commit }, creds) => {
      return fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds)
      }).then(response => {
        const token = response.headers.get('access-token');
        if (token !== null) {
          localStorage.setItem('token', token);
          if (creds.username === 'admin') {
            store.commit(ADMIN_LOGIN);
          } else {
            store.commit(LOGIN);
          }
          store.commit(SET_TOKEN, token);
        } else {
          store.commit(LOGOUT);
        }
      });
    }
  }
});

export default store;
