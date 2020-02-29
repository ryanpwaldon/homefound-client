<template>
  <div class="features">
    <BaseCard>
      <div class="icon-container">
        <img src="@/assets/img/approved.svg" class="icon">
      </div>
      <div class="title">Off-market guarantee</div>
      <div class="paragraph">We monitor major listing sites to ensure our properties are genuinley off-market. Once they list on a major site, we flag them.</div>
    </BaseCard>
    <BaseCard>
      <div class="icon-container">
        <img src="@/assets/img/motivation.svg" class="icon">
      </div>
      <div class="title">Built for homebuyers</div>
      <div class="paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.</div>
    </BaseCard>
  </div>
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
.features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: var(--spacing-8);
  position: relative;
  padding: var(--spacing-10) 0;
  z-index: 1;
  @include media(sm-only) {
    grid-template-columns: 1fr;
    padding: var(--spacing-8) 0;
  }
}
.icon-container {
  height: 3rem;
  width: 5.5rem;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-5);
}
.icon {
  max-width: 100%;
  max-height: 100%;
  display: block;
}
.title {
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
}
.paragraph {
  font-size: 1.6rem;
  color: var(--color-gray-4);
  line-height: 1.5;
}
</style>
