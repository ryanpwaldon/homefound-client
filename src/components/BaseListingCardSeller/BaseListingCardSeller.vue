<template>
  <div class="base-listing-card-seller">
    <div class="image" :style="{backgroundImage: `url(${image + '-/resize/400x/'})`}" v-if="image"/>
    <div class="image backup" v-else/>
    <div class="contents">
      <BaseText2 class="text" :text="address || 'Untitled'"/>
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
    image: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-listing-card-seller {
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
  border-bottom: 1px solid var(--color-gray-1);
}
.image.backup {
  background-image: url('../../assets/img/image.svg');
  background-size: 30% auto;
}
.contents {
  flex-shrink: 0;
  padding: var(--spacing-4) var(--spacing-2);
}
.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
