<template>
  <div class="platform">
    <div class="header">
      <div class="title">Dashboard</div>
      <div class="subtitle">A convenient place to view our properties</div>
    </div>
    <img class="example" src="@/assets/img/platform.png">
    <div class="spacer"/>
    <BaseImageCopyGrid :features="features"/>
  </div>
</template>

<script>
import BaseImageCopyGrid from '@/components/BaseImageCopyGrid/BaseImageCopyGrid'
export default {
  components: {
    BaseImageCopyGrid
  },
  created () {
    this.features = [
      {
        image: require('@/assets/img/filter-by-status.gif'),
        title: 'Filter by status',
        paragraph: 'Distinguish between off-market and on-market listings. Properties don’t say off-market forever, so we make it clear what is and what isn’t.'
      },
      {
        image: require('@/assets/img/listing-price.png'),
        title: 'Always know the price',
        paragraph: 'We’ve made the price compulsory for all listings on Homefound.'
      },
      {
        image: require('@/assets/img/market-report.png'),
        title: 'Daily reports',
        paragraph: 'Keep updated with a daily summary of new off-market properties sent to your inbox.'
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.platform {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-2);
  font-weight: var(--font-weight-bold);
  text-align: center;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-2);
  }
}
.subtitle {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  text-align: center;
  line-height: 1.5;
  @include media(sm-only) {
    margin-bottom: var(--spacing-5);
  }
}
.example {
  width: 100%;
  position: relative;
  border-radius: var(--border-radius-1);
  background: var(--color-white-1);
  border: solid 1px var(--color-gray-1);
  overflow: hidden;
  display: block;
}
.spacer {
  width: 100%;
  height: 15rem;
  @include media(sm-only) {
    height: 6rem;
  }
}
</style>
