<template>
<div id="sidebar">
<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/'} "><li><a>Dashboard</a></li></router-link>
    <router-link :to=" { path: '/user/Staff'} "><li><a>Manager Users</a></li></router-link>
  </ul>
  <p class="menu-label">
    Inventory
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/item'} "><li><a>Manage Items</a></li></router-link>
    <router-link :to=" { path: '/category'} "><li><a>Manage Categories</a></li></router-link>
  </ul>
  <p class="menu-label">
    Loans
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/loan/OngoingLoans'} "><li><a>Manage Loans</a></li></router-link>
  </ul>
  <p class="menu-label">
    Visitor Count
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/visitor/VisitorDetails'} "><li><a>Manage Visitor Count</a></li></router-link>
  </ul>
  <p class="menu-label">
    Training of Faces
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/training'} "><li><a>Manage Training</a></li></router-link>
  </ul>  
</aside>
</div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style>
#sidebar .menu {
  position: absolute;
  top: 60px;
  left: 0px;
  bottom: 0;
  padding: 30px 0 50px;
  width: 230px;
  height: 100%;
  z-index: 1;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
}
#sidebar .menu-label {
    padding-left: 15px;
   
  }
#sidebar .menu-list li a {
  font-size: 15px;
  padding-left: 30px;
}
</style>
