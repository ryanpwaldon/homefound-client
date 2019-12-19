<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Payment method"/>
        <BaseText5 class="value" text="Mastercard"/>
      </div>
      <BaseButton text="Update" @click.native="showModal = true"/>
    </div>
    <UpdatePaymentMethod v-show="showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseButton from '@/components/BaseButton/BaseButton'
import UpdatePaymentMethod from './partials/UpdatePaymentMethod/UpdatePaymentMethod'
export default {
  components: {
    BaseCard,
    BaseText4,
    BaseText5,
    BaseButton,
    UpdatePaymentMethod
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
