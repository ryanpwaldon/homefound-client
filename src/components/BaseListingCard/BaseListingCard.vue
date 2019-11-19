<template>
  <div class="base-listing-card">
    <div class="image" :style="{backgroundImage: `url(${image})`}"/>
    <div class="contents">
      <BaseText2 :text="address"/>
    </div>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
export default {
  components: {
    BaseText2
  },
  props: {
    id: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-listing-card {
  display: flex;
  position: relative;
  flex-direction: column;
  background: var(--color-white-1);
  border-radius: var(--border-radius-1);
  box-shadow: var(--box-shadow-1);
  overflow: hidden;
}
.image {
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.contents {
  padding: var(--spacing-4) var(--spacing-2);
}
</style>
