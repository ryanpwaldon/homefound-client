<template>
  <BaseCard class="buyer">
    <div class="top">
      <div class="plan">Buyer</div>
      <div class="period">billed monthly / yearly</div>
    </div>
    <div class="divider"/>
    <div class="middle">
      <div class="feature bold">What's included?</div>
      <div class="feature">Full off-market access</div>
      <div class="feature">Daily off-market reports</div>
      <div class="feature">Unlimited users</div>
    </div>
    <div class="divider"/>
    <div class="bottom">
    <a :href="`mailto:${contactEmail}`" target="_blank">
      <BaseButtonLarge class="button" text="Contact us" design="red"/>
    </a>
    </div>
  </BaseCard>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
export default {
  metaInfo: {
    title: 'Pricing: Buyer'
  },
  components: {
    BaseCard,
    BaseButtonLarge
  },
  created () {
    this.contactEmail = process.env.VUE_APP_CONTACT_EMAIL
  }
}
</script>

<style lang="scss" scoped>
.buyer {
  width: 38rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  @include media(sm-only) {
    width: 100%;
  }
}
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.plan {
  font-size: 3.6rem;
  letter-spacing: 0.02em;
  font-weight: var(--font-weight-medium);
  margin-bottom: 1rem;
}
.period {
  font-size: 1.6rem;
  color: var(--color-gray-4);
}
.divider {
  position: relative;
  width: calc(100% + 6rem);
  left: -3rem;
  height: 1px;
  background: var(--color-gray-1);
  margin: var(--spacing-5) 0;
}
.middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-5);
  }
}
.feature {
  font-size: 1.6rem;
}
.button {
  width: 100%;
}
.toggle-container {
  position: absolute;
  width: 100%;
  bottom: 100%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  > *:not(:last-child) {
    margin-right: var(--spacing-2);
  }
  .active {
    color: var(--color-black-2);
  }
  .label {
    cursor: pointer;
    font-weight: var(--font-weight-medium);
    transition: color var(--transition-settings-1);
  }
  @include media(sm-only) {
    position: static;
  }
}
.bold {
  font-weight: var(--font-weight-medium);
}
</style>
