<template>
  <div id="app">
    <map-view />
  </div>
</template>

<script>
import store, { LOGOUT } from './store';
import MapComponent from './components/Map.vue';
export default {
  name: 'App',
  components: {
    'map-view': MapComponent
  },
  methods: {
    logout() {
      store.dispatch(LOGOUT);
    }
  }
};
</script>


<style lang="scss">
@import '~vue-material/dist/theme/engine'; // Import the theme engine

@include md-register-theme('default', (
  primary: md-get-palette-color(indigo, A200), 
  accent: md-get-palette-color(amber, A200),
));

@import '~vue-material/dist/theme/all'; // Apply the theme

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
