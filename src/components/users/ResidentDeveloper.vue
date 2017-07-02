<template>
  <div id="container">
    <router-link to="/user/AddResident">
      <button type="submit" class="button is-primary">Add Resident Developer</button>
    </router-link>
    <br>
    <br>
    <!--Vue Table-->
    <my-vuetable></my-vuetable>
    <br>
    <br>

    <router-view></router-view>
  </div>
</template>



<script>
import MyVuetable from '../../components/layout/MyVuetable.vue'
import { staffUrl } from '../../config'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  mounted () {
    axios.get(staffUrl)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

</script>

<style>
.button {
  margin-left: 2px;
}
</style>

