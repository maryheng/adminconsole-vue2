<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close is-large" @click="$emit('close')"></button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showChangePasswordModal: false
    }
  }
}
</script>

<style>

</style>

