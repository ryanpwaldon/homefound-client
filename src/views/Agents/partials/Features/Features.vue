<template>
  <BaseFeaturesGrid
    :features="[
      {
        icon: require('@/assets/img/free.svg'),
        title: 'Free forever',
        paragraph: `Off-market properties are in high demand, so we've flipped the traditional pricing model. Buyers pay for access and agents list for free. If you make a sale, we won't charge.`
      },
      {
        icon: require('@/assets/img/up-trend.svg'),
        title: 'Pre-market testing',
        paragraph: `Use Homefound to quickly identify the level of demand for your property. Use this information to strategise and plan your approach to listing on the major property advertising sites.`
      },
      {
        icon: require('@/assets/img/hidden.svg'),
        title: 'Privacy',
        paragraph: `Vendors want to keep their sale private? Homefound enables you to gather leads, while keeping your property hidden from the public.`
      }
    ]"
  />
</template>

<script>
import BaseFeaturesGrid from '@/components/BaseFeaturesGrid/BaseFeaturesGrid'
export default {
  components: {
    BaseFeaturesGrid
  }
}
</script>
