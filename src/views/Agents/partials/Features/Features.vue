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
        icon: require('@/assets/img/agent-persona.svg'),
        iconHeight: '8.8rem',
        iconWidth: '8.8rem',
        title: 'Homefound for agents',
        paragraph: `We are a free advertising platform for pre-market and off-market property listings. Use Homefound to seek pre-market interest, or simply advertise for free.`
      },
      {
        icon: require('@/assets/img/audience-persona.svg'),
        iconHeight: '8.8rem',
        iconWidth: '8.8rem',
        title: 'Our audience',
        paragraph: `Your listings will be shown to our audience of registered buyers - they pay a monthly subscription to access your listings.`
      }
    ]
  }
}
</script>
