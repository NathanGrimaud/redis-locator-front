<template>
  <div class="search" v-bind:class="{ active: isActive }" >
    <div class="inner-search">
      <div style="display:flex;" @click="setActive">
        <md-icon style="padding:30px;"  >search</md-icon>
      </div>
      <md-field md-inline>
        <label>Search</label>
        <md-input type="text" v-model="searchContent" @keyup="filterFriends"/>
      </md-field>
    </div>
  </div>
</template>
<script>
import { getFriends } from '../model/friends';

import store from '../store';

let search = '';
export default {
  name: 'Search',
  data: () => ({
    searchContent: '',
    isActive: false
  }),
  methods: {
    filterFriends() {
      const reset = this.$store.state.friends.map(friend => {
        friend.shown = true;
        return friend;
      });
      const filtred = reset.map(friend => {
        const f = friend;
        if (friend.name.indexOf(this.searchContent) === -1) {
          f.shown = false;
        }
        return f;
      });
      store.commit('SET_FRIENDS', filtred);
    },

    setActive() {
      this.isActive = !this.isActive;
    }
  },
  mounted() {
    getFriends()
      .then(friends => {
        const filtred = friends.filter(f => true);
        this.$store.commit('SET_FRIENDS', filtred);
      })
      .catch(err => console.log(err));
  }
};
</script>
<style lang="scss">
.active {
  left: 10% !important;
}
.search {
  position: absolute;
  top: 5%;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.35, 0.01, 0.03, 1);
  left: 85%;
}
.inner-search {
  width: 100%;
  border-radius: 40px;
  display: flex;
  background-color: #fafafa;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}
</style>
