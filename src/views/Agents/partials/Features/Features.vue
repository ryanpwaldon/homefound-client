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
        paragraph: `We're a <span style="font-weight: var(--font-weight-medium); color: var(--color-black-2);">private</span> advertising platform for pre-market and off-market listings. Use Homefound to seek <span style="white-space: nowrap">pre-market</span> interest, or simply advertise privately for free.`
      },
      {
        icon: require('@/assets/img/audience-persona.svg'),
        iconHeight: '8.8rem',
        iconWidth: '8.8rem',
        title: 'Our audience',
        paragraph: `We deliver your properties exclusively to our audience of registered <span style="font-weight: var(--font-weight-medium); color: var(--color-black-2);">buyers agents</span> – ideal for driving a strong pre-market campaign, or for a quick way to test the market.`
      }
    ]
  }
}
</script>
