<template>
  <div class="map">
    <ol-map :center="coords"></ol-map>
  </div>
</template>

<script>
import store from '../store';
export default {
  name: 'Map',
  computed: {
    coords() {
      return store.state.location;
    }
  },
  mounted() {
    navigator.geolocation.getCurrentPosition(location =>
      this.move([location.coords.longitude, location.coords.latitude])
    );
  },
  methods: {
    move(coords) {
      store.commit('move', coords);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
