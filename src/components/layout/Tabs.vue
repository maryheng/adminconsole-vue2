<template>
  <div>
  <!-- Tabs -->
  <div class="tabs">
    <ul>
      <li v-for="tab in tabs" :key="tab.name" :class=" { 'is-active': tab.isActive }"> 
        <a :href="tab.href" @click="selectTabWithHref(tab)">{{ tab.name }}</a>
      </li>
    </ul>
  </div>
  <!-- End of Tabs -->

  <div class="tabs-detail">
    <slot></slot>  
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: []
    }
  },
  created () {
    this.tabs = this.$children
  },
  methods: {
    selectTabWithHref (selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.href === selectedTab.href)
      })
    }
  }
}
</script>


<style>

</style>
