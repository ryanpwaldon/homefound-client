<template>
  <BaseIconCopyGrid :features="features"/>
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
        icon: require('@/assets/img/question-circle.svg'),
        title: 'How it works',
        paragraph: 'Real estate agents use Homefound to get <span style="white-space: nowrap">off-market</span> properties in front of motivated buyers. Buyers subscribe to gain access.'
      },
      {
        icon: require('@/assets/img/search-circle.svg'),
        title: 'Save time. Discover more.',
        paragraph: `Don't rely solely on your network. Use Homefound to automate and improve your <span style="white-space: nowrap">off-market</span> property discovery.`
      }
    ]
  }
}
</script>
