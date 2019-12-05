<template>
  <notifications class="base-notifications" position="top right" :duration="4000">
    <template slot="body" slot-scope="props">
      <BaseCard @click.native="props.close">
        <div class="title-container">
          <div class="mark" :class="[props.item.type]"/>
          <BaseText4 class="title" text="Notification"/>
        </div>
        <BaseText5 class="text" :text="props.item.text"/>
      </BaseCard>
    </template>
  </notifications>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseText5 from '@/components/BaseText5/BaseText5'
export default {
  components: {
    BaseCard,
    BaseText4,
    BaseText5
  }
}
</script>

<style lang="scss" scoped>
.base-notifications {
  margin: var(--spacing-5);
  width: 360px !important;
}
::v-deep .vue-notification-wrapper {
  overflow: visible;
  margin-bottom: var(--spacing-5);
}
.title-container {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-2);
}
.title {
  color: var(--color-gray-4);
}
.mark {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: var(--spacing-2);
  &.success { background: var(--color-green-2) }
  &.warning { background: var(--color-yellow-2) }
  &.error { background: var(--color-red-1) }
}
</style>
