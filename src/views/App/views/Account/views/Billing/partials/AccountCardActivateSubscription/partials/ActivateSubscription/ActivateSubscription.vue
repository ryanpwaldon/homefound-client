<template>
  <BaseModal @close="$emit('close')">
    <BaseActivateSubscription
      :customer-id="customerId"
      @payment-success="onPaymentSuccess"
    />
  </BaseModal>
</template>

<script>
import BaseActivateSubscription from '@/components/BaseActivateSubscription/BaseActivateSubscription'
import BaseModal from '@/components/BaseModal/BaseModal'
import { mapState } from 'vuex'
export default {
  components: {
    BaseModal,
    BaseActivateSubscription
  },
  computed: mapState('user', {
    customerId: state => state.user.customerId
  }),
  methods: {
    onPaymentSuccess ({ user, accessToken }) {
      this.$emit('close')
      this.$store.dispatch('user/loginSuccess', { user, accessToken })
    }
  }
}
</script>
