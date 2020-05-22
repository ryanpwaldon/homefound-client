<template>
  <div class="base-icon-copy-grid">
    <BaseCard class="card" v-for="(feature, i) in features" :key="i">
      <div class="icon-container" v-if="feature.icon" :style="{height: feature.iconHeight || '3rem', width: feature.iconWidth || '5.5rem'}">
        <img class="icon" :src="feature.icon">
      </div>
      <div class="title">{{ feature.title }}</div>
      <div class="paragraph">{{ feature.paragraph }}</div>
    </BaseCard>
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
  grid-gap: var(--spacing-5);
  grid-template-columns: 1fr 1fr;
  @include media(sm-only) {
    grid-template-columns: 1fr;
    grid-gap: var(--spacing-8);
  }
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @include media(sm-only) {
    padding: 0;
    border: none;
    border-radius: 0;
    text-align: center;
    align-items: center;
    background: var(--color-transparent);
  }
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
    justify-content: center;
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
