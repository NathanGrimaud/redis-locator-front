<template>
    <div class="login" v-bind:class="{ active: isActive }" >
        <div class="inner-login">
        <div class="login-icon" @click="setActive">
            <md-icon >account_circle</md-icon>   
        </div>
        <div v-if="isRegistering" class="login-form">
          <h2>REGISTER</h2>
           <md-field>
                <label for="login">Login</label>
                <md-input name="login" v-model="username"  />
            </md-field>
            <md-field>
                <label for="password">password</label>
                <md-input type="password" name="password" v-model="password"  />
            </md-field>
            <md-field>
                <label for="name">name</label>
                <md-input type="text" name="name" v-model="name"  />
            </md-field>
            <md-button v-on:click="register">REGISTER</md-button>
            <md-button v-on:click="setIsRegistering">LOGIN PAGE</md-button>
            
        </div>
        <div v-else-if="isLoggedIn===true" class="login-form">  
          <h2>ACCOUNT</h2>
          <div>
            hello @{{username}}
          </div>
          <account-vue /> 
        </div>
        <div v-else class="login-form">
          <h2>LOGIN</h2>
          
          <md-field>
                <label for="first-name">Login</label>
                <md-input name="login" v-model="username"  />
            </md-field>
            <md-field>
                <label for="first-name">password</label>
                <md-input type="password" name="password" v-model="password"  />
            </md-field>
            <md-button v-on:click="login">LOGIN</md-button>
            <md-button v-on:click="setIsRegistering">CREATE ACCOUNT</md-button>
        </div>
      </div> 
    </div>
</template>

<script>
import store, { LOGIN, SET_USERNAME } from '../store';
import router from '../router';
import { AUTH_URL } from '../constants';
import AccountVue from './Account';
import Snackbar from 'node-snackbar';
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    name: '',
    isActive: false,
    isRegistering: false,
    isLoggedIn: false
  }),
  components: {
    'account-vue': AccountVue
  },
  mounted() {
    this.$store.watch(
      state => this.$store.state.isLoggedIn,
      newValue => (this.isLoggedIn = newValue)
    );
  },
  methods: {
    register() {
      fetch(`${AUTH_URL}/users`, {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          name: this.name
        })
      }).then(response => {
        this.isRegistering = false;
        Snackbar.show({ text: 'Account created !' });
      });
    },
    login() {
      store
        .dispatch(LOGIN, { username: this.username, password: this.password })
        .then(res => {
          this.$store.commit(SET_USERNAME, this.username);
          this.$router.push('/');
        })
        .catch(err => {
          Snackbar.show({ text: 'Invalid credentials, please try again !' });
          this.username = '';
          this.password = '';
        });
    },
    setActive() {
      this.isActive = !this.isActive;
    },
    setIsRegistering() {
      this.isRegistering = !this.isRegistering;
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  left: 10% !important;
}
.login-icon {
  padding: 26px;
  /*padding-left: 100px;*/
  background-color: #fafafa;
  border-radius: 40px;
  -webkit-box-shadow: -6px 9px 32px -11px rgba(0, 0, 0, 0.76);
  -moz-box-shadow: -6px 9px 32px -11px rgba(0, 0, 0, 0.76);
  box-shadow: -6px 9px 32px -11px rgba(0, 0, 0, 0.76);
  border-radius: 40px 0px 0px 40px;
  height: 0%;
  z-index: 4;
}

.login {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 70%;
  align-items: flex-start;
  z-index: 2;
  display: flex;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.35, 0.01, 0.03, 1);
  left: 85%;
}
.inner-login {
  width: 100%;
  display: flex;
}
.login-form {
  padding: 20px;
  padding-right: 20%;
  z-index: 2;
  background-color: #fafafa;
  width: 100%;
  border-radius: 0px 20px 20px 20px;
  -webkit-box-shadow: -6px 9px 32px -11px rgba(0, 0, 0, 0.76);
  -moz-box-shadow: -6px 9px 32px -11px rgba(0, 0, 0, 0.76);
  box-shadow: -6px 9px 32px -11px rgba(0, 0, 0, 0.76);
}
</style>
