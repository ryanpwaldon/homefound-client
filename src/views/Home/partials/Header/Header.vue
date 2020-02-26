<template>
  <div class="header">
    <div class="content">
      <div class="title">Discover properties before the crowd</div>
      <div class="subtitle">Australia's most reliable platform for off-market property listings</div>
      <div class="buttons">
        <router-link to="/signup/buyer">
          <BaseButtonLarge text="Get started" design="red"/>
        </router-link>
        <BaseButtonLarge text="Explore listings" design="white"/>
      </div>
    </div>
    <div class="illustration">
      <BaseMockListing :image="require('../../assets/4.jpg')"/>
      <BaseMockListing :image="require('../../assets/5.jpg')"/>
      <BaseMockListing :image="require('../../assets/6.jpg')"/>
      <BaseMockListing :image="require('../../assets/7.jpg')"/>
    </div>
    <div class="background">
      <div class="image" :style="{backgroundImage: `url(${require('../../assets/map.png')})`}"/>
      <div class="gradient"/>
    </div>
  </div>
</template>

<script>
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseMockListing from '@/components/BaseMockListing/BaseMockListing'
export default {
  components: {
    BaseButtonLarge,
    BaseMockListing
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60rem;
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-5) 0;
  position: relative;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 45rem;
    height: 100%;
    z-index: 1;
    > *:not(:last-child) {
      margin-bottom: var(--spacing-5);
    }
  }
  .title {
    font-size: 4.5rem;
    font-weight: var(--font-weight-bold);
  }
  .subtitle {
    font-size: 2rem;
    line-height: 1.5;
    color: var(--color-gray-4);
    font-weight: var(--font-weight-medium);
    width: 80%;
  }
  .buttons > *:first-child {
    margin-right: var(--spacing-5);
  }
  .illustration {
    display: grid;
    grid-gap: var(--spacing-5);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-self: center;
    z-index: 2;
    > *:nth-child(2n + 1) {
      position: relative;
      top: 10rem;
    }
  }
  .background {
    position: absolute;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    pointer-events: none;
  }
  .image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right center;
    pointer-events: none;
  }
  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(250, 250, 250, 1) 60%, rgba(250, 250, 250, 0));
    pointer-events: none;
  }
}
</style>
