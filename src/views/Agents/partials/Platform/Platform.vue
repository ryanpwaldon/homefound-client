<template>
  <div class="platform">
    <div class="title">How does it work?</div>
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
        image: require('@/assets/img/form.png'),
        title: 'List in 2 minutes',
        paragraph: `We’ve made it quick and easy. Pre-market listings are about showcasing property fundamentals. This keeps buyers focused and encourages high quality engagement.`
      },
      {
        image: require('@/assets/img/realtime-tracking.png'),
        title: 'Track your listings in real-time',
        paragraph: `Monitor listing performance in real-time with tools that track impressions, clicks, and contact detail views.`
      },
      {
        image: require('@/assets/img/performance-report.png'),
        title: 'Stay updated',
        paragraph: `We'll send you a daily summary of how your listing performed to your inbox.`
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-7);
  font-weight: var(--font-weight-bold);
  text-align: center;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-2);
  }
}
</style>
