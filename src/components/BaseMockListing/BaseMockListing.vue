<template>
  <div class="base-mock-listing" :style="cssVars">
    <div class="image-container">
      <div class="image" :style="{backgroundImage: `url(${image})`}"/>
    </div>
    <div class="row">
      <div class="placeholder placeholder-1"/>
      <div class="placeholder placeholder-2"/>
    </div>
    <div class="row">
      <div class="placeholder placeholder-3"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false
    },
    listingWidth: {
      type: String,
      default: '18rem'
    },
    placeholderHeight: {
      type: String,
      default: '1.5rem'
    },
    spacing: {
      type: String,
      default: '1rem'
    }
  },
  computed: {
    cssVars () {
      return {
        '--listing-width': this.listingWidth,
        '--placeholder-height': this.placeholderHeight,
        '--spacing': this.spacing
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-mock-listing {
  display: flex;
  width: var(--listing-width);
  flex-direction: column;
  position: relative;
  padding: var(--spacing);
  box-shadow: var(--box-shadow-1);
  border-radius: var(--border-radius-1);
  background: var(--color-white-1);
  > *:not(:last-child) {
    margin-bottom: var(--spacing);
  }
}
.image-container {
  width: 100%;
  position: relative;
  padding-top: 105%;
  height: 0;
}
.image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: var(--color-gray-5);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: var(--border-radius-1);
}
.row {
  display: flex;
  justify-content: space-between;
  height: var(--placeholder-height);
  width: 100%;
}
.placeholder {
  height: 100%;
  border-radius: 100px;
  background: var(--color-gray-5);
  & :first-child { margin-right: auto }
}
.placeholder-1 {
  width: 40%;
}
.placeholder-2 {
  width: 25%;
}
.placeholder-3 {
  width: 65%;
}
</style>
