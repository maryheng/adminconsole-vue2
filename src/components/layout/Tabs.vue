<template>
  <div>
  <!-- Tabs -->
  <div class="tabs">
    <ul>
      <li v-for="tab in tabs" :key="tab.name" :class=" { 'is-active': tab.isActive }"> 
        <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
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
    selectTab (selectedTab) {
      console.log(selectedTab)
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectedTab.name)
        console.log('this is tab name: ' + tab.name)
        console.log('this is selected tab: ' + selectedTab.name)
        console.log('this is active tab: ' + tab.isActive)
        alert('hi')
        // if (tab.name === selectedTab.name) {
        //   tab.isActive = true
        // } else {
        //   tab.isActive = false
        // }
      })
    }
  }
}
</script>


<style>

</style>
