<template>
  <div >
    <nav class="navbar navbar-expand navbar-dark bg-dark"  v-if="!isAdmin">
      <a href="https://vuejs.org" class="navbar-brand ms-1">
        <img src="./assets/logo.png" height="40" />Vue</a
      >
      <div class="navbar-nav mr-auto">
        <li class="nav-item" v-if="isAdmin">
          <router-link class="nav-link" to="/dashboard" active-class="active"
            >Admin</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/home" active-class="active"
            >Home</router-link
          >
        </li>
      </div>
      <div class="navbar-nav ml-auto" v-if="!currentUser">
        <li class="nav-item">
          <router-link class="nav-link" to="/register" active-class="active"
            >Sign Up</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login" active-class="active"
            >Sign In</router-link
          >
        </li>
      </div>
      <div class="navbar-nav ml-auto" v-if="currentUser&&!isAdmin">
        <li class="nav-item">
          <router-link class="nav-link" to="/register" active-class="active">{{
            currentUser.name
          }}</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="logOut"> Sign Out</a>
          
        </li>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import vuex from "vuex";
import Role from "./models/role";
export default {
  computed: {
    ...vuex.mapGetters(["currentUser"]),
    isAdmin() {
      return this.currentUser?.role === Role.ADMIN;
    },
  },
  methods: {
    ...vuex.mapActions(["clearUser"]),
    logOut() {
      this.clearUser();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss">

@import 'styles/style';
</style>
