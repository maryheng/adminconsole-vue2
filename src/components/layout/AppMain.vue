<template>
  <section class="app-main">
    <div class="container is-fluid is-marginless app-content">
      <transition mode="out-in" enter-active-class="fadeIn" leave-active-class="fadeOut" appear>
        <router-view class="animated"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  components: {

  }
}
</script>

<style>
.app-main {
  padding-top: 5px;
  padding-left: 20px;
  margin-left: 220px;
  transform: translate3d(0, 0, 0);
}
html {
  background-color: whitesmoke;
}

.app-content {
  padding: 20px;
}
</style>
