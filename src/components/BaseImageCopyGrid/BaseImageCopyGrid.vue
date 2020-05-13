<template>
  <div class="base-image-copy-grid">
    <div class="container" v-for="(feature, i) in features" :key="i">
      <div class="image" :style="{backgroundImage: `url(${feature.image})`}"/>
      <div class="title">{{ feature.title }}</div>
      <div class="paragraph">{{ feature.paragraph }}</div>
    </div>
    <div class="container" v-if="features.length % 2"/>
  </div>
</template>

<script>
export default {
  props: {
    features: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.base-image-copy-grid {
  position: relative;
  display: grid;
  grid-gap: 1px;
  background: var(--color-gray-1);
  grid-template-columns: 1fr 1fr;
}
.container {
  display: flex;
  flex-direction: column;
  background: var(--color-gray-2);
  &:not(:nth-child(1)):not(:nth-child(2)) { padding-top: var(--spacing-5) }
  &:not(:nth-last-child(1)):not(:nth-last-child(2)) { padding-bottom: var(--spacing-5) }
  &:nth-child(2n + 1) { padding-right: var(--spacing-5) }
  &:nth-child(2n) { padding-left: var(--spacing-5) }
}
.image {
  height: 0;
  width: 100%;
  padding-top: 55%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: solid 1px var(--color-gray-1);
  border-radius: var(--border-radius-1);
  margin-bottom: var(--spacing-4);
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
