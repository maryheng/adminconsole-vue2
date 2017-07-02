<template>
  <div id="container">
      <router-link to="/user/AddStaff">
        <button type="submit" class="button is-primary">Add Staff</button>
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
  },
  computed: {
    href () {
      return '' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  }
}

</script>

<style>
.button {
  margin-left: 2px;
}
</style>
