<template>
<div id="app">
<nav class="nav has-shadow">
  <div class="container">
      <img src="../../assets/logo.png">
      <!--<div class="nav-right nav-menu">
      <a class="nav-item is-tab">Sign out</a>
    </div>-->
    <slot></slot>
  </div>
</nav>
</div>
</template>

<script>
export default {
  name: 'app',
  components: 'navbar',
  data () {
    return {
      token: window.localStorage.getItem('access_token')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  height: 60px;
 /* background: linear-gradient(to right, #DA3E61 1%, #E76570 70%, #F58773); */
}

#app {
  position: absolute;
  width: 100%;
  /* z-index: 0; cover the whole thing w simplert */
  z-index: 50; 
}  

.container img {
  width: 150px;
  height: 100px;
  margin-top: -1.2%;
  margin-left: -9%;
}
</style>
