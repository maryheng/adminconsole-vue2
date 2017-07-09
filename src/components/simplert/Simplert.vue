<template>
  <div>
    <simplert useRadius=true
              useIcon=true
              :ref="simplert">
    </simplert>    
  </div>
</template>

<script>
import Simplert from 'vue2-simplert'

export default {
  components: {
    'vue2-simplert': Simplert
  },
  props: {
    ref: {
      type: String,
      default () {
        return ''
      }
    }
  }
}
</script>

<style>

</style>
