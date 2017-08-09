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
      return '/user/' + this.name.toLowerCase().replace(/\s+/g, '')
    }
  },
  mounted () {
    this.isActive = this.selected
  }
}
</script>


<style>

</style>
