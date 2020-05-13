<template>
  <div class="base-icon-copy-grid">
    <div class="card-container" v-for="(feature, i) in features" :key="i">
      <BaseCard class="card">
        <div class="icon-container">
          <img class="icon" :src="feature.icon">
        </div>
        <div class="title">{{ feature.title }}</div>
        <div class="paragraph">{{ feature.paragraph }}</div>
      </BaseCard>
    </div>
    <div class="card-container" v-if="features.length % 2"/>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard/BaseCard'
export default {
  props: {
    features: {
      type: Array,
      required: true
    }
  },
  components: {
    BaseCard
  }
}
</script>

<style lang="scss" scoped>
.base-icon-copy-grid {
  position: relative;
  display: grid;
  grid-gap: 1px;
  background: var(--color-gray-1);
  grid-template-columns: 1fr 1fr;
}
.card-container {
  display: flex;
  background: var(--color-gray-2);
  &:not(:nth-child(1)):not(:nth-child(2)) { padding-top: var(--spacing-5) }
  &:not(:nth-last-child(1)):not(:nth-last-child(2)) { padding-bottom: var(--spacing-5) }
  &:nth-child(2n + 1) { padding-right: var(--spacing-5) }
  &:nth-child(2n) { padding-left: var(--spacing-5) }
}
.icon-container {
  height: 3rem;
  width: 5.5rem;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-4);
  @include media(sm-only) {
    margin-bottom: var(--spacing-4);
  }
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
