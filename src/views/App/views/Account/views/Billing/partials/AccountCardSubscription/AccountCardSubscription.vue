<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Subscription"/>
        <BaseBadge :text="config.badgeText" :design="config.badgeDesign"/>
      </div>
      <BaseButton
        :text="config.buttonText"
        @click.native="showModal = true"
      />
    </div>
    <ActivateSubscription v-show="config.modal === 'activate' && showModal" @close="showModal = false"/>
    <ReactivateSubscription v-show="config.modal === 'reactivate' && showModal" @close="showModal = false"/>
    <CancelSubscription v-show="config.modal === 'cancel' && showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BillingService from '@/services/Api/services/BillingService/BillingService'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseBadge from '@/components/BaseBadge/BaseBadge'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseButton from '@/components/BaseButton/BaseButton'
import ActivateSubscription from './partials/ActivateSubscription/ActivateSubscription'
import ReactivateSubscription from './partials/ReactivateSubscription/ReactivateSubscription'
import CancelSubscription from './partials/CancelSubscription/CancelSubscription'
import { mapState } from 'vuex'
export default {
  components: {
    BaseCard,
    BaseBadge,
    BaseText4,
    BaseButton,
    ActivateSubscription,
    ReactivateSubscription,
    CancelSubscription
  },
  data: () => ({
    showModal: false
  }),
  computed: {
    ...mapState('user', {
      subscribed: state => state.user.roles.includes('buyer'),
      subscriptionCancelled: state => state.user.subscriptionCancelled
    }),
    subscriptionStatus () {
      let subscriptionStatus
      if (!this.subscribed) subscriptionStatus = 'inactive'
      if (this.subscribed && !this.subscriptionCancelled) subscriptionStatus = 'active'
      if (this.subscribed && this.subscriptionCancelled) subscriptionStatus = 'cancelled'
      return subscriptionStatus
    },
    config () {
      let config
      if (this.subscriptionStatus === 'active') config = { badgeText: 'Active', badgeDesign: 'green', buttonText: 'Cancel subscription', modal: 'cancel' }
      if (this.subscriptionStatus === 'inactive') config = { badgeText: 'Inactive', badgeDesign: 'red', buttonText: 'Activate subscription', modal: 'activate' }
      if (this.subscriptionStatus === 'cancelled') config = { badgeText: 'Cancelled', badgeDesign: 'yellow', buttonText: 'Reactivate subscription', modal: 'reactivate' }
      return config
    }
  },
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
