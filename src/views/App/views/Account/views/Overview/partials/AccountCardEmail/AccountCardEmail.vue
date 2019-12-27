<template>
  <BaseCard>
    <div class="container">
      <div class="content">
        <BaseText4 class="label" text="Email"/>
        <BaseText5 :text="email"/>
      </div>
      <BaseButton text="Update" @click.native="showModal = true"/>
    </div>
    <UpdateEmail v-if="showModal" @close="showModal = false"/>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
import BaseButton from '@/components/BaseButton/BaseButton'
import UpdateEmail from './partials/UpdateEmail/UpdateEmail'
import { mapState } from 'vuex'
export default {
  components: {
    BaseCard,
    BaseText4,
    BaseText5,
    BaseButton,
    UpdateEmail
  },
  data: () => ({
    showModal: false
  }),
  computed: mapState('user', {
    email: state => state.user.email
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
