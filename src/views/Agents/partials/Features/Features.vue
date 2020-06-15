<template>
  <BaseIconCopyGrid
    :features="features"
  />
</template>

<script>
import BaseIconCopyGrid from '@/components/BaseIconCopyGrid/BaseIconCopyGrid'
export default {
  components: {
    BaseIconCopyGrid
  },
  created () {
    this.features = [
      {
        icon: require('@/assets/img/agent-persona-1.svg'),
        iconHeight: '8.8rem',
        iconWidth: '8.8rem',
        title: 'For real estate agents',
        paragraph: `We're an advertising platform for pre-market and off-market listings. Use Homefound to seek <span style="white-space: nowrap">pre-market</span> interest, or simply advertise privately for free.`
      },
      {
        icon: require('@/assets/img/audience-persona.svg'),
        iconHeight: '8.8rem',
        iconWidth: '8.8rem',
        title: 'Our audience',
        paragraph: `We exclusively deliver your properties to our audience of registered buyers agents – ideal for driving a strong pre-market campaign, or for a quick way to test the market.`
      }
    ]
  }
}
</script>
