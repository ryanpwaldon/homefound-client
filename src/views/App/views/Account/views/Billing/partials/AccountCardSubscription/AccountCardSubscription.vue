<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Subscription"/>
        <BaseText5 class="value" text="Inactive"/>
      </div>
      <BaseButton text="Subscribe" @click.native="showModal = true"/>
    </div>
    <UpdateSubscription v-show="showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BillingService from '@/services/Api/services/BillingService/BillingService'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseButton from '@/components/BaseButton/BaseButton'
import UpdateSubscription from './partials/UpdateSubscription/UpdateSubscription'
import { mapState } from 'vuex'
export default {
  components: {
    BaseCard,
    BaseText5,
    BaseText4,
    BaseButton,
    UpdateSubscription
  },
  data: () => ({
    showModal: false
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
