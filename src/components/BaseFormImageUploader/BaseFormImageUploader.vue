<template>
  <div class="base-form-image-uploader">
    <div class="container">
      <div
        class="item"
        v-for="(url, i) in value"
        :style="{backgroundImage: `url(${url})`}"
        :key="i"
      />
      <div class="item" @click="openUploader">
        <span>{{ value.length ? 'Edit photos' : 'Upload photos' }}</span>
        <img v-if="!value.length" src="@/assets/img/plus-light.svg">
      </div>
    </div>
  </div>
</template>

<script>
import uploadcare from 'uploadcare-widget'
export default {
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      files: null
    }
  },
  methods: {
    openUploader () {
      this.dialog = uploadcare.openDialog(this.files, null, {
        publicKey: '0d733b1aa49e3fa3156c',
        imagesOnly: true,
        multiple: true
      })
      this.dialog.always(async ({ files }) => {
        this.files = files()
        this.$emit('input', (await Promise.all(this.files)).map(file => file.cdnUrl))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: calc(-1 * var(--spacing-2));
}
.item {
  width: 130px;
  height: 70px;
  position: relative;
  color: var(--color-gray-4);
  border: solid 1px var(--color-gray-3);
  border-radius: var(--border-radius-1);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  margin-bottom: var(--spacing-2);
  &:not(:last-child) {
    margin-right: var(--spacing-2);
  }
  img {
    height: 0.9rem;
    margin-left: var(--spacing-1);
  }
  &:last-child {
    cursor: pointer;
  }
}
</style>
