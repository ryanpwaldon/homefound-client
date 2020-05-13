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
        paragraph: 'We provide agents with incentives to list on our platform before they list on other sites so you can be the first to discover new property. Learn more.'
      },
      {
        icon: require('@/assets/img/price-tag.svg'),
        title: 'Find great deals',
        paragraph: 'Use Homefound to find great deals on property. Reduced buyer competition means off-market properties are more likely to sell at a discount. Learn more.'
      },
      {
        icon: require('@/assets/img/approved.svg'),
        title: 'Off-market reliability',
        paragraph: 'We monitor major listing sites so you can be confident our properties are off-market. If a property lists on a major site, we update its status.'
      },
      {
        icon: require('@/assets/img/motivation.svg'),
        title: 'Built for homebuyers',
        paragraph: 'Search with clarity, and always see a price with our improved property search experience.'
      }
    ]
  }
}
</script>
