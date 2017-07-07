<template>
  <div class="filter">
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field is-grouped">
        <div class="field is-narrow">
          <input type="text" v-model="filterText" class="input" @keyup.enter="doFilter" placeholder="Search...">
        </div>
        <button class="button is-light" @click="doFilter">Filter</button>
      </div>
    </div>
  </div>
</div>
</template>

  <script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      console.log('doFilter:', this.filterText)
    }
  }
}
</script>

<style>
.filter {
  float: right;
  padding-bottom: 15px;
}
</style>
