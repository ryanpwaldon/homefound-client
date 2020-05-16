<template>
  <div class="cvp">
    <div class="title">Why list on Homefound?</div>
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
        title: 'Perfect your price',
        paragraph: `Use Homefound to test your pricing strategy. Determine the perfect price to list before spending thousands on an underperforming advertising campaign.`
      },
      {
        icon: require('@/assets/img/cash.svg'),
        title: 'Free advertising',
        paragraph: `Vendors don’t want to spend money on marketing? Homefound is completely free for agents. Sell property without paying a cent on advertising.`
      },
      {
        icon: require('@/assets/img/eye.svg'),
        title: 'Privacy',
        paragraph: `Some vendors prefer the idea of selling off-market. Use Homefound to get your property in front of a quality audience without compromising on privacy.`
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-7);
  font-weight: var(--font-weight-bold);
  text-align: center;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-2);
  }
}
</style>
