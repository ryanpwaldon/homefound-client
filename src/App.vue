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
    titleTemplate: subtitle => subtitle ? `${subtitle} | Homefound` : 'Homefound'
  },
  components: {
    BaseNotifications
  }
}
</script>
