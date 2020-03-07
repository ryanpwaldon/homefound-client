<template>
  <div class="header">
    <div class="content">
      <div class="title">Discover properties before the crowd</div>
      <div class="subtitle">Australia's most reliable platform for off-market property listings</div>
      <div class="buttons">
        <router-link to="/signup/buyer">
          <BaseButtonLarge text="Get started" design="red"/>
        </router-link>
        <BaseButtonLarge text="Explore listings" design="pink"/>
      </div>
      <router-link class="question" to="/faqs/buyer">
        What's an off-market property?
      </router-link>
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
  position: relative;
  @include media(sm-only) {
    height: auto;
    justify-content: center;
    padding: var(--spacing-8) 0;
  }
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 45rem;
  height: 100%;
  z-index: 1;
  margin-right: var(--spacing-5);
  align-items: flex-start;
  > *:not(:last-child) {
    margin-bottom: var(--spacing-5);
  }
  @include media(sm-only) {
    text-align: center;
    align-items: center;
    margin-right: 0;
    max-width: none;
    > *:not(:last-child) {
      margin-bottom: var(--spacing-3);
    }
  }
}
.title {
  font-size: 4.5rem;
  font-weight: var(--font-weight-bold);
  @include media(sm-only) {
    font-size: 3rem;
    line-height: 1.3;
  }
}
.subtitle {
  font-size: 2rem;
  line-height: 1.5;
  color: var(--color-gray-4);
  width: 80%;
  @include media(sm-only) {
    width: 100%;
    margin-bottom: var(--spacing-4) !important;
  }
}
.buttons {
  display: flex;
  > *:first-child {
    margin-right: var(--spacing-4);
  }
  @include media(sm-only) {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--spacing-4) !important;
    width: 100%;
    * {
      width: 100%;
    }
    > *:first-child {
      margin-right: 0;
      margin-bottom: var(--spacing-2);
    }
  }
}
.question {
  font-size: 1.5rem;
  color: var(--color-gray-4);
  border-bottom: solid 1px var(--color-gray-4);
  padding-bottom: 5px;
  opacity: 0.8;
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
  @include media(sm-only) {
    display: none;
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
  @include media(sm-only) {
    display: none;
  }
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
  background: linear-gradient(to right, var(--color-gray-2) 60%, rgba(250, 250, 250, 0));
  pointer-events: none;
}
</style>
