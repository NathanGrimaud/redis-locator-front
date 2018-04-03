import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// vue-material
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
// vue-openlayers
import '../node_modules/openlayers/css/ol.css';
import olMap from 'vue-openlayers/src/ol-map.vue';
import olMarker from 'vue-openlayers/src/ol-marker.vue';
import olBalloon from 'vue-openlayers/src/ol-balloon.vue';

Vue.config.productionTip = false;
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);

const VueOpenlayers = {
  install: function(Vue, options) {
    // wiring project components
    Vue.component('ol-map', olMap);
    Vue.component('ol-marker', olMarker);
    Vue.component('ol-balloon', olBalloon);
  }
};

Vue.use(VueOpenlayers);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
