<template>
  <BaseModalContainer v-if="activeModalType">
    <component :is="component"/>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/components/BaseModalContainer/BaseModalContainer'
import { mapState } from 'vuex'
const components = {
  UpdateEmail: () => import('./partials/UpdateEmail/UpdateEmail'),
  UpdatePassword: () => import('./partials/UpdatePassword/UpdatePassword')
}
export default {
  components: {
    BaseModalContainer,
    ...components
  },
  computed: {
    ...mapState('ui', [
      'activeModalType'
    ]),
    component () {
      return components[this.activeModalType]
    }
  }
}
</script>
