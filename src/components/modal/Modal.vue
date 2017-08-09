<template>
   <!-- <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>
    <button class="modal-close is-large" @click="$emit('close')"></button>
  </div>  -->

   <div class="modal is-active">
    <div class="modal-background"></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Change your password</p>
      <button class="delete" @click="$emit('close')"></button>
    </header>
    <section class="modal-card-body">
      <slot></slot>
    </section>
    <footer class="modal-card-foot">
      <a class="button" @click="$emit('close')">Cancel</a>
    </footer>
  </div>

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

