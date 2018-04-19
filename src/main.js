import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '../node_modules/node-snackbar/dist/snackbar.css';

// vue-material
import {
  MdButton,
  MdContent,
  MdTabs,
  MdCard,
  MdIcon,
  MdBottomBar,
  MdRipple,
  MdField,
  MdSnackbar
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
// vue-openlayers
import '../node_modules/openlayers/css/ol.css';
localStorage.setItem('token', null);
Vue.config.productionTip = false;
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdCard);
Vue.use(MdBottomBar);
Vue.use(MdIcon);
Vue.use(MdRipple);
Vue.use(MdField);
Vue.use(MdSnackbar);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
