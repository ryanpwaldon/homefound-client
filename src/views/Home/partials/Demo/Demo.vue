<template>
  <div class="demo">
    <div class="header">
      <div class="title">Built for homebuyers</div>
      <div class="subtitle">Enjoy a search experience with no ads, the ability to filter by date listed, and where every listing has a price.</div>
    </div>
    <div class="video-container">
      <BaseVideo class="video" :src="require('@/assets/vid/demo.mp4')" :poster="require('@/assets/img/demo-poster.png')"/>
    </div>
  </div>
</template>

<script>
import BaseVideo from '@/components/BaseVideo/BaseVideo'
export default {
  components: {
    BaseVideo
  }
}
</script>

<style lang="scss" scoped>
.demo {
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-4);
  font-weight: var(--font-weight-bold);
  text-align: center;
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
    margin-bottom: var(--spacing-2);
  }
}
.subtitle {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-7);
  color: var(--color-gray-4);
  text-align: center;
  line-height: 1.5;
  @include media(sm-only) {
    margin-bottom: var(--spacing-5);
  }
}
.video-container {
  width: 100%;
  position: relative;
  border-radius: var(--border-radius-1);
  background: var(--color-white-1);
  border: solid 1px var(--color-gray-1);
  overflow: hidden;
}
.video {
  width: 100%;
}
</style>
