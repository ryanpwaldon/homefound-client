<template>
  <BaseFeaturesGrid
    :features="[
      {
        icon: require('@/assets/img/approved.svg'),
        title: 'Off-market guarantee',
        paragraph: 'We monitor major listing sites to ensure our properties are genuinley off-market. Once they list on a major site, we flag them.'
      },
      {
        icon: require('@/assets/img/motivation.svg'),
        title: 'Built for homebuyers',
        paragraph: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.'
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
