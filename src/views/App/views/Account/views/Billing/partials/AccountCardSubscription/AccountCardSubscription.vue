<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Subscription"/>
        <BaseText5 class="value" :text="subscribed ? 'Active' : 'Inactive'"/>
      </div>
      <BaseButton text="Subscribe" @click.native="showActivationModal = true" v-if="!subscribed"/>
      <BaseButton text="Cancel subscription" @click.native="showCancelationModal = true" v-else/>
    </div>
    <ActivateSubscription v-show="showActivationModal" @close="showActivationModal = false"/>
    <CancelSubscription v-show="showCancelationModal" @close="showCancelationModal = false"/>
  </BaseCard>
</template>

<script>
import BillingService from '@/services/Api/services/BillingService/BillingService'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseButton from '@/components/BaseButton/BaseButton'
import ActivateSubscription from './partials/ActivateSubscription/ActivateSubscription'
import CancelSubscription from './partials/CancelSubscription/CancelSubscription'
import { mapState } from 'vuex'
export default {
  components: {
    BaseCard,
    BaseText5,
    BaseText4,
    BaseButton,
    ActivateSubscription,
    CancelSubscription
  },
  data: () => ({
    showActivationModal: false,
    showCancelationModal: false
  }),
  computed: mapState('user', {
    subscribed: state => state.user.roles.includes('buyer')
  }),
  methods: {
    redirectToCheckout: () => BillingService.redirectToCheckout()
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.label {
  margin-bottom: var(--spacing-2);
  color: var(--color-gray-4);
}
</style>
