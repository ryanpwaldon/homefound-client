<template>
  <div class="home">
    <BaseNavHorizontalPrimary/>
    <div class="container">
      <div class="section section-1">
        <div class="content">
          <div class="copy-1">Discover properties before the crowd</div>
          <div class="copy-2">Access off-market and pre-market properties before they’re listed on realestate.com.au or Domain</div>
          <div class="buttons">
            <BaseButtonLarge text="Get started" design="red"/>
            <BaseButtonLarge text="View properties" design="white"/>
          </div>
          <div class="copy-3">Agents list free. Find out more <img src="@/assets/img/arrow-right.svg"></div>
        </div>
        <div class="illustration" ref="illustration">
          <MockListing :image="require('./assets/1.jpg')"/>
          <MockListing :image="require('./assets/2.jpg')"/>
          <MockListing :image="require('./assets/3.jpg')"/>
          <MockListing :image="require('./assets/4.jpg')"/>
        </div>
        <div class="background">
          <div class="image" :style="{backgroundImage: `url(${require('./assets/map.png')})`}"/>
          <div class="gradient"/>
        </div>
      </div>
      <div class="divider"/>
    </div>
  </div>
</template>

<script>
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import MockListing from './partials/MockListing/MockListing'
import anime from 'animejs'
export default {
  name: 'home',
  components: {
    BaseNavHorizontalPrimary,
    BaseButtonLarge,
    MockListing
  },
  mounted () {
    anime({
      targets: this.$refs['illustration'].children,
      direction: 'alternate',
      rotateY: [-10, 10],
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true
    })
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.container {
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-5);
  align-items: center;
  background: var(--color-gray-2);
}
.section {
  width: 100%;
  max-width: 90rem;
  padding: var(--spacing-5) 0;
  position: relative;
}
.divider {
  width: 100%;
  height: 1px;
  background: var(--color-gray-1);
}
.section-1 {
  height: 60rem;
  display: flex;
  justify-content: space-between;
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
  .copy-1 {
    font-size: 4.5rem;
    font-weight: var(--font-weight-bold);
  }
  .copy-2 {
    font-size: 1.9rem;
    line-height: 1.5;
  }
  .buttons {
    > :first-child {
      margin-right: var(--spacing-5);
    }
  }
  .copy-3 {
    font-size: 1.5rem;
    color: var(--color-gray-6);
    display: flex;
    align-items: baseline;
    align-self: flex-start;
    cursor: pointer;
    img {
      height: 1ex;
      margin-left: 0.75ex;
    }
  }
  .illustration {
    display: grid;
    grid-gap: var(--spacing-5);
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-self: center;
    z-index: 1;
    perspective: 1000px;
    > * {
      transform: rotateY(-30deg);
      &:nth-child(2n + 1) {
        position: relative;
        top: 10rem;
      }
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
  }
  .image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: right center;
  }
  .gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(250, 250, 250, 1) 60%, rgba(250, 250, 250, 0))
  }
}
</style>
