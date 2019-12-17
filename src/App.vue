<template>
  <div id="app">
    <router-view/>
    <BaseNotifications/>
  </div>
</template>

<script>
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications'
export default {
  components: {
    BaseNotifications
  }
}
</script>
