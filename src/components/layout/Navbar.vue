<template>
<div id="app">
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">
      <p>Pixel Labs</p>
    </div>
    <button type="signOut" class="button is-outlined">Sign Out</button>
    <!--<div class="nav-right nav-menu">
      <a class="nav-item is-tab">Sign out</a>
    </div>-->
  </div>
</nav>
</div>
</template>

<script>
export default {
  name: 'app',
  components: 'navbar',
  methods: {
    data () {
      return {

      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  height: 60px;
}

p {
  font-size: 21px;
  margin: 15px 0px 0 50px;
  font-weight: bold;
}
.button {
  margin-top: 12px;
}

</style>
