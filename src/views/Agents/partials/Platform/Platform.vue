<template>
  <div class="platform">
    <div class="title">How it works</div>
    <div class="subtitle">List property. Track engagement. Gain insights.</div>
    <BaseImageCopyGrid class="grid" :features="features"/>
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
        image: require('@/assets/img/form.png'),
        title: 'List in 2 minutes flat',
        paragraph: `We’ve made it quick and easy. Pre-market listings are about showcasing fundamentals. This keeps buyers focused and encourages high quality engagement.`
      },
      {
        image: require('@/assets/img/buyer-engagement.png'),
        title: 'Buyers are notified',
        paragraph: `Subscribed buyers are notified. They can view your listings on our private platform.`
      },
      {
        image: require('@/assets/img/realtime-tracking.png'),
        title: 'Track performance',
        paragraph: `Monitor listing performance in real-time. Track impressions, clicks, and contact detail views.`
      },
      {
        image: require('@/assets/img/performance-report.png'),
        title: 'Stay updated',
        paragraph: `Receive a daily email summarising the performance of your listings.`
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3.5rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  text-align: center;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-2);
  }
}
.subtitle {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-8);
  color: var(--color-gray-4);
  text-align: center;
  transition: var(--transition-settings-1) opacity;
  line-height: 1.5;
}
</style>
