<template>
  <div class="billing">
    <BaseCard class="card">
      <div class="row">
        <div class="info">
          <BaseText4 class="label" text="Status"/>
          <BaseText5 class="value" :text="subscribed ? 'Subscribed' : 'Not subscribed'"/>
        </div>
        <BaseButton text="Unsubscribe" v-if="subscribed"/>
        <BaseButton text="Subscribe for $74 per month" design="blue" v-else/>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseButton from '@/components/BaseButton/BaseButton'
import { mapState } from 'vuex'
export default {
  name: 'billing',
  components: {
    BaseCard,
    BaseText5,
    BaseText4,
    BaseButton
  },
  computed: mapState('user', {
    subscribed: state => state.user.roles.includes('buyer')
  })
}
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.info {
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
