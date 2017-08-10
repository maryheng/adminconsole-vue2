<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: { required: true },
    selected: { default: false }
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    href () {
      // Resident Developer --> resident-developer
      // return '#' + this.name.toLowerCase().replace(/ /g, '-')
      return '' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  },
  mounted () {
    let windowLocationHash = window.location.pathname
    const segments = windowLocationHash.split('/')
    var hrefName = segments[2]
    if (this.href === hrefName) {
      this.selected = true
      this.isActive = this.selected
    }
  }
}
</script>


<style>

</style>
