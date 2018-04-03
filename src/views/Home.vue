<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Map/>
  </div>
</template>

<script>
// @ is an alias to /src
import Map from '@/components/Map';

export default {
  name: 'home',
  components: {
    Map
  }
};
</script>
