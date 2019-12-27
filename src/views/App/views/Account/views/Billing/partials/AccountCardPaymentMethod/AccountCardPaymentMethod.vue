<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Payment method"/>
        <BaseText5 class="value">
          <span class="card-brand">{{ cardBrand }}</span> ending in {{ cardLast4 }}.
        </BaseText5>
      </div>
      <BaseButton text="Update" @click.native="showModal = true"/>
    </div>
    <UpdatePaymentMethod v-if="showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseButton from '@/components/BaseButton/BaseButton'
import UpdatePaymentMethod from './partials/UpdatePaymentMethod/UpdatePaymentMethod'
import { mapState } from 'vuex'
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
  }),
  computed: mapState('user', {
    cardBrand: state => state.user.cardBrand,
    cardLast4: state => state.user.cardLast4
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
.card-brand {
  text-transform: capitalize;
}
</style>
