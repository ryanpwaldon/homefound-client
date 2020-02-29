<template>
  <Notify class="base-notifications" position="bottom center" :duration="4000">
    <template v-slot:body="{ close, item }">
      <BaseCard class="card" :class="[item.type]" @click.native="close">
        <div class="text">
          <span v-if="item.text">{{ item.text }}</span>
          <span v-else style="text-transform: capitalize">{{ item.type }}</span>
        </div>
      </BaseCard>
    </template>
  </Notify>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
export default {
  components: {
    BaseCard
  }
}
</script>

<style lang="scss" scoped>
.base-notifications {
  width: auto !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}
::v-deep .vue-notification-wrapper {
  display: flex;
  margin-bottom: var(--spacing-5);
  justify-content: center;
}
.card {
  padding: var(--spacing-2) var(--spacing-7);
  &.success { background: var(--color-green-9) }
  &.error { background: var(--color-red-1) }
}
.text {
  color: var(--color-white-1);
  font-size: 1.6rem;
  font-weight: var(--font-weight-medium);
  text-align: center;
}
</style>
