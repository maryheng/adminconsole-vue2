<template>
<div id="sidebar">
<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/'} "><li><a>Dashboard</a></li></router-link>
    <router-link :to=" { path: '/user/staff'} "><li><a>Manager Users</a></li></router-link>
  </ul>
  <p class="menu-label">
    Inventory
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/category'} "><li><a>Manage Categories</a></li></router-link>
    <router-link :to=" { path: '/item'} "><li><a>Manage Items</a></li></router-link>
  </ul>
  <p class="menu-label">
    Loans
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/loan/ongoingloans'} "><li><a>Manage Loans</a></li></router-link>
  </ul>
  <p class="menu-label">
    Visitor Count
  </p>
  <ul class="menu-list">
    <router-link :to=" { path: '/visitor/visitordetails'} "><li><a>Manage Visitor Count</a></li></router-link>
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
#sidebar {
  float: left;
  position: absolute;
  top: 5.5%;
  left: 0px;
  bottom: 0;
   /* z-index: 0;   */
}

#sidebar .menu {
  height: 100%;
  float: left;
  padding: 30px 0 50px;
  width: 230px;
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
