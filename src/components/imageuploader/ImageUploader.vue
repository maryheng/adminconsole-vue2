<template>
<div class="imageUploader">
  <vue-core-image-upload
    class="button is-primary"
    :crop="false"
    @imageuploaded="imageuploaded"
    :data="data"
    :max-file-size="5242880"
    :url="url" >
  </vue-core-image-upload>
</div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'

export default {
  components: {
    'vue-core-image-upload': VueCoreImageUpload
  },
  props: {
    url: {
      type: String,
      default () {
        return ''
      }
    },
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    imageuploaded (res) {
      if (res.errcode === 0) {
        this.src = res.data.src
        console.log(this.src) // i dont want this
        this.imageName = res.data.name
        console.log(this.imageName)
        this.name = res.data_post.name
        this.username = res.data_post.username
        this.password = res.data_post.password
      }
    }
  }
}
</script>

<style>

</style>
