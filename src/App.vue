<template>
  <div id="app">
    <router-view/>
    <BaseNotifications/>
  </div>
</template>

<script>
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications'
export default {
  metaInfo: {
    titleTemplate: subtitle => subtitle ? `Homefound – ${subtitle}` : 'Homefound',
    meta: [
      { vmid: 'title', name: 'title', content: 'Homefound – Off market property for buyers agents' },
      { vmid: 'description', name: 'description', content: `We connect real estate agents and buyers agents with Australia's first off-market property subscription. Agents list free, buyers pay for access.` },
      { vmid: 'og:type', property: 'og:type', content: 'website' },
      { vmid: 'og:url', property: 'og:url', content: 'https://homefound.net.au/' },
      { vmid: 'og:title', property: 'og:title', content: 'Homefound – Off market property for buyers agents' },
      { vmid: 'og:description', property: 'og:description', content: `We connect real estate agents and buyers agents with Australia's first off-market property subscription. Agents list free, buyers pay for access.` },
      { vmid: 'og:image', property: 'og:image', content: require('@/assets/img/meta-image.png') },
      { vmid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' },
      { vmid: 'twitter:url', property: 'twitter:url', content: 'https://homefound.net.au/' },
      { vmid: 'twitter:title', property: 'twitter:title', content: 'Homefound – Off market property for buyers agents' },
      { vmid: 'twitter:description', property: 'twitter:description', content: `We connect real estate agents and buyers agents with Australia's first off-market property subscription. Agents list free, buyers pay for access.` },
      { vmid: 'twitter:image', property: 'twitter:image', content: require('@/assets/img/meta-image.png') }
    ]
  },
  components: {
    BaseNotifications
  }
}
</script>
