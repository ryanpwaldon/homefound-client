<template>
  <div class="features">
    <BaseCard>
      <div class="icon-container">
        <img class="icon" src="@/assets/img/free.svg">
      </div>
      <div class="title">Free forever</div>
      <div class="paragraph">Off market property listings are in high demand by property seekers – so we will never charge an agent to list on our platform.</div>
    </BaseCard>
    <BaseCard>
      <div class="icon-container">
        <img class="icon" src="@/assets/img/up-trend.svg">
      </div>
      <div class="title">Real-time analytics</div>
      <div class="paragraph">Get instant insights into the demand for your property and inform your strategy to listing on major property real estate sites.</div>
    </BaseCard>
    <BaseCard>
      <div class="icon-container">
        <img class="icon" src="@/assets/img/hidden.svg">
      </div>
      <div class="title">Privacy</div>
      <div class="paragraph">Vendors want to keep their sale private? Your listings will only be visible to our private audience.</div>
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
