<template>
  <div id="PageNotFoundDiv">
    <section class="box">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-2">
            <strong>Sorry!</strong>
          </h1>
          <br>
          <h2 class="subtitle">
            The page you are looking for is unavailable or the link is broken.
          </h2>
          <br>
          <h6 class="subtitle is-6">
            Click on button to go back to the dashboard!
          </h6>          
          <a class="button is-outlined" @click="returnToDashboard">Go Dashboard</a>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import router from '../../router'

export default {
  methods: {
    returnToDashboard () {
      router.push({ path: '/' })
    }
  }
}
</script>

<style>
#PageNotFoundDiv h1, h2, h6 {
  text-align: center;
}

#PageNotFoundDiv .button {
  margin-left: 45.3%;
}
</style>
