<template>
  <div class="base-image-copy-grid">
    <div class="container" v-for="(feature, i) in features" :key="i">
      <div class="image" :style="{backgroundImage: `url(${feature.image})`}"/>
      <div class="content">
        <div class="title">{{ feature.title }}</div>
        <div class="paragraph">{{ feature.paragraph }}</div>
      </div>
    </div>
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
  grid-gap: var(--spacing-8);
  grid-template-columns: 1fr 1fr;
  @include media(sm-only) {
    text-align: center;
    grid-template-columns: 1fr;
    grid-gap: var(--spacing-8);
  }
}
.container {
  display: flex;
  flex-direction: column;
  @include media(sm-only) {
    flex-direction: column-reverse;
  }
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
  margin-bottom: 2.5rem;
  @include media(sm-only) {
    margin-bottom: 0;
  }
}
.content {
  display: flex;
  flex-direction: column;
  margin-bottom: 0;
  @include media(sm-only) {
    margin-bottom: var(--spacing-3);
  }
}
.title {
  font-size: 2.2rem;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-3);
  @include media(sm-only) {
    font-size: 2rem;
    margin-bottom: var(--spacing-2);
  }
}
.paragraph {
  font-size: 1.6rem;
  color: var(--color-gray-4);
  line-height: 1.5;
}
</style>
