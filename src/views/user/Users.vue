<template>
    <div id="test">
        <p class="title is-4">Manage Users</p>
        <div class="box">
            <div class="tabs">
                <ul>
                    <li class="is-active">
                        <a>Staff</a>
                    </li>
                    <li>
                        <a>Resident Developers</a>
                    </li>
                </ul>
            </div>
            <form v-on:submit.prevent="test()">
                <button type="submit" class="button is-primary">Add Staff</button><br>
            </form>
            <!--Vue Table-->
            <!--https://github.com/ratiw/vuetable-2-tutorial/wiki/lesson-01-->
             <br><my-vuetable></my-vuetable>
            <br>
            <br>
        </div>
    </div>

    <!--Staff Tab-->
    
</template>

<script>
import router from '../../router'
import MyVuetable from '../../components/MyVuetable.vue'
import { staffUrl } from '../../config'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    MyVuetable
  },
  methods: {
    test () {
      router.push({ path: '/addstaff' })
    }
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
