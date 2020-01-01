<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Subscription"/>
        <BaseBadge text="Cancelled"/>
      </div>
      <BaseButton text="Reactivate subscription" @click.native="showModal = true"/>
    </div>
    <ReactivateSubscription v-if="showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseBadge from '@/components/BaseBadge/BaseBadge'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseButton from '@/components/BaseButton/BaseButton'
import ReactivateSubscription from './partials/ReactivateSubscription/ReactivateSubscription'
export default {
  components: {
    BaseCard,
    BaseBadge,
    BaseText4,
    BaseButton,
    ReactivateSubscription
  },
  data: () => ({
    showModal: false
  })
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
