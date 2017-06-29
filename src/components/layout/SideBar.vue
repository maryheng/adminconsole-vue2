<template>
<aside class="menu">
  <p class="menu-label">
    General
  </p>
  <ul class="menu-list">
    <li><a>Dashboard</a></li>
    <li><a>Manager Users</a></li>
  </ul>
  <p class="menu-label">
    Inventory
  </p>
  <ul class="menu-list">
    <li><a>Manage Items</a></li>
    <li><a>Manage Categories</a></li>
  </ul>
  <p class="menu-label">
    Loans
  </p>
  <ul class="menu-list">
    <li><a>Manage Loans</a></li>
  </ul>
  <p class="menu-label">
    Visitor Count
  </p>
  <ul class="menu-list">
    <li><a>Manage Visitor Count</a></li>
  </ul>
  <p class="menu-label">
    Training of Faces
  </p>
  <ul class="menu-list">
    <li><a>Manage Training</a></li>
  </ul>  
</aside>
</template>

<script>
export default {
  components: {
  },
  props: {
    show: Boolean
  },
  data () {
    return {

    }
  }
}
</script>

<style>
.menu {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  padding: 30px 0 50px;
  width: 230px;
  min-width: 45px;
  max-height: 100vh;
  height: calc(100% - 50px);
  z-index: 1024 - 1;
  background: #FFF;
  box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
}
  .menu-label {
    padding-left: 10px;
    padding-top: 5px;
  }
  .menu-list {
    li a {
      &[aria-expanded="true"] {
        .is-angle {
          transform: rotate(180deg);
        }
      }
    }
    li a + ul {
      margin: 0 10px 0 15px;
    }
  }
.menu-list li a {
  font-size: 15px;
  padding-left: 30px;
}
</style>
