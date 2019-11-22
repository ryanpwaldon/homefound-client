<template>
  <div class="base-listing-card-seller">
    <div class="image" :style="{backgroundImage: `url(${image + '-/resize/400x/'})`}"/>
    <div class="contents">
      <BaseText2 class="text" :text="address"/>
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
      default: 'https://ucarecdn.com/48db410d-7b1f-4ec6-8e6c-e8a188c72e15/'
    },
    address: {
      type: String,
      default: 'Untitled'
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
