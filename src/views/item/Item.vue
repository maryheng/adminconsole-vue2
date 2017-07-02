<template>
  <div id="container">
    <p class="title is-4">Manage Items</p>
    <div class="box">
      <router-link to="/user/AddStaff">
        <button type="submit" class="button is-primary">Add Item</button>
      </router-link>
  
      <router-view></router-view>
    </div>
  </div>
</template>



<script>
export default {
  name: 'app'
}

</script>


<style>

</style>
