<template>
  <div class="base-listing-card-buyer">
    <div class="image" :style="{backgroundImage: `url(${image + '-/resize/400x/'})`}"/>
    <div class="contents">
      <div class="row r-1">
        <BaseText2 class="text" :text="price | numeral('0a')"/>
        <BaseText2 class="text" :text="`${bedrooms} | ${bathrooms} | ${carSpaces}`"/>
      </div>
      <BaseDivider class="divider"/>
      <div class="row r-2">
        <BaseText2 class="text" :text="createdAt | moment('from', 'now')"/>
      </div>
    </div>
  </div>
</template>

<script>
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
export default {
  components: {
    BaseText2,
    BaseDivider
  },
  props: {
    image: {
      type: String,
      default: 'https://ucarecdn.com/48db410d-7b1f-4ec6-8e6c-e8a188c72e15/'
    },
    price: {
      type: String,
      required: true
    },
    bedrooms: {
      type: String,
      required: true
    },
    bathrooms: {
      type: String,
      required: true
    },
    carSpaces: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-listing-card-buyer {
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
  padding: var(--spacing-2);
}
.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.r-2 {
  color: var(--color-gray-4);
}
.divider {
  margin: var(--spacing-2) 0;
}
</style>
