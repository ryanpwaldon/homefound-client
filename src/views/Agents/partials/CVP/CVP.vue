<template>
  <div class="cvp">
    <img class="icon" src="@/assets/img/agent-persona-2.svg">
    <div class="title">Why Homefound?</div>
    <BaseIconCopyGrid :features="features"/>
  </div>
</template>

<script>
import BaseIconCopyGrid from '@/components/BaseIconCopyGrid/BaseIconCopyGrid'
export default {
  components: {
    BaseIconCopyGrid
  },
  created () {
    this.features = [
      {
        icon: require('@/assets/img/price-tag.svg'),
        title: 'Perfect your listing price',
        paragraph: `Use Homefound to test your pricing strategy. Determine the perfect price before spending thousands on an underperforming advertising campaign.`
      },
      {
        icon: require('@/assets/img/cash.svg'),
        title: 'Save money',
        paragraph: `Vendors don’t want to spend money on marketing? Homefound is free for agents. Sell property without an advertising expense.`
      },
      {
        icon: require('@/assets/img/eye.svg'),
        title: 'Privacy',
        paragraph: `Some vendors prefer the idea of selling off-market. Use Homefound to get your property in front of a targeted audience without compromising on vendor privacy.`
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.cvp {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icon {
  width: 12rem;
  margin-bottom: var(--spacing-4);
}
.title {
  font-size: 3.5rem;
  text-align: center;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-8);
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-8);
  }
}
</style>
