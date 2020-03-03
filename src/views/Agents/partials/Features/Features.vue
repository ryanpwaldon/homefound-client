<template>
  <BaseFeaturesGrid
    :features="[
      {
        icon: require('@/assets/img/free.svg'),
        title: 'Free forever',
        paragraph: 'Off market property listings are in high demand by property seekers – so we will never charge an agent to list on our platform.'
      },
      {
        icon: require('@/assets/img/up-trend.svg'),
        title: 'Real-time analytics',
        paragraph: 'Get instant insights into the demand for your property and inform your strategy to listing on major property real estate sites.'
      },
      {
        icon: require('@/assets/img/hidden.svg'),
        title: 'Privacy',
        paragraph: 'Vendors want to keep their sale private? Your listings will only be visible to our private audience.'
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
