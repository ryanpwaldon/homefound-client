<template>
  <LayoutFocus>
    <BaseActivateSubscription
      :customer-id="customerId"
      @payment-success="onPaymentSuccess"
    />
  </LayoutFocus>
</template>

<script>
import LayoutFocus from '@/layouts/LayoutFocus/LayoutFocus'
import BaseActivateSubscription from '@/components/BaseActivateSubscription/BaseActivateSubscription'
import { mapState } from 'vuex'
export default {
  name: 'activate',
  components: {
    LayoutFocus,
    BaseActivateSubscription
  },
  computed: mapState('user', {
    customerId: state => state.user.customerId
  }),
  methods: {
    onPaymentSuccess ({ user, accessToken }) {
      this.$store.dispatch('user/loginSuccess', { user, accessToken })
    }
  }
}
</script>
