<template>
  <BaseLayoutFocus>
    <BaseActivateSubscription
      :customer-id="customerId"
      @payment-success="onPaymentSuccess"
    />
  </BaseLayoutFocus>
</template>

<script>
import BaseLayoutFocus from '@/components/BaseLayoutFocus/BaseLayoutFocus'
import BaseActivateSubscription from '@/components/BaseActivateSubscription/BaseActivateSubscription'
import { mapState } from 'vuex'
export default {
  name: 'activate',
  components: {
    BaseLayoutFocus,
    BaseActivateSubscription
  },
  computed: mapState('user', {
    customerId: state => state.user.customerId
  }),
  methods: {
    onPaymentSuccess ({ user, accessToken }) {
      this.$store.dispatch('user/loginSuccess', { user, accessToken })
      this.$router.push('/app')
    }
  }
}
</script>
