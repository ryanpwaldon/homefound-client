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
        title: 'How does it work?',
        paragraph: 'Agents use Homefound to get their off-market properties in front of motivated buyers. Buyers subscribe to gain access.'
      },
      {
        icon: require('@/assets/img/approved.svg'),
        title: 'Off-market assurance',
        paragraph: `We continuously update our off-market properties to accurately reflect what's listed in the public market.`
      }
    ]
  }
}
</script>
