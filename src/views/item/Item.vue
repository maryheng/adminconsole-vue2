<template>
  <div id="container">
    <p class="title is-4">Manage Items</p>
    <div class="box">
      <router-link to="/user/AddStaff">
        <button type="submit" class="button is-primary">Add Item</button>
      </router-link>
      <br>
      <br>
      <!--Vue Table-->
      <my-vuetable></my-vuetable>
      <br>
      <br>
  
      <router-view></router-view>
    </div>
  </div>
</template>



<script>
import MyVuetable from '../../components/MyVuetable.vue'
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

</style>
