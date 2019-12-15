<template>
  <div id="app">
    <router-view/>
    <BaseNotifications/>
    <BaseModal/>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal/BaseModal'
import BaseNotifications from '@/components/BaseNotifications/BaseNotifications'
export default {
  components: {
    BaseModal,
    BaseNotifications
  }
}
</script>
