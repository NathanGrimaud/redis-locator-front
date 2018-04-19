<template>
  <div>
      <md-button class="md-accent"  v-on:click="logout">LOGOUT</md-button>
  </div>
</template>

<script>
import store, { LOGOUT } from '../store';
import router from '../router';
export default {
  name: 'Account',
  methods: {
    logout: function() {
      this.$store.dispatch(LOGOUT);
      this.$router.push('login');
    }
  }
};
</script>

