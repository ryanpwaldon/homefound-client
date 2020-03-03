<template>
  <div class="header">
    <div class="content">
      <div class="title">List properties free forever</div>
      <div class="subtitle">Gain insights that improve your listing performance on REA and Domain</div>
      <div class="buttons">
        <router-link to="/signup/agent">
          <BaseButtonLarge text="Get started" design="red"/>
        </router-link>
      </div>
    </div>
    <div class="illustration">
      <div class="listings" ref="listings">
        <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
        <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem" :image="require('../../assets/1.jpg')"/>
        <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
      </div>
      <svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 51">
        <path ref="line-path" d="M2.5,2.5v46" fill="none" stroke="#00a672" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" stroke-dasharray="0.1 10"/>
      </svg>
      <img class="chart" src="../../assets/chart.png">
    </div>
  </div>
</template>

<script>
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseMockListing from '@/components/BaseMockListing/BaseMockListing'
import anime from 'animejs'
export default {
  name: 'agents',
  components: {
    BaseButtonLarge,
    BaseMockListing
  },
  mounted () {
    anime({
      targets: this.$refs['listings'].children,
      direction: 'alternate',
      rotateY: [-10, 10],
      easing: 'easeInOutSine',
      duration: 2000,
      loop: true
    })
    anime({
      targets: this.$refs['line-path'],
      strokeDashoffset: -20,
      easing: 'linear',
      duration: 2000,
      loop: true
    })
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
  @include media(sm-only) {
    height: auto;
    justify-content: center;
    padding: var(--spacing-8) 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 40rem;
    height: 100%;
    z-index: 1;
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
    max-width: 80%;
    @include media(sm-only) {
      width: 100%;
      margin-bottom: var(--spacing-4) !important;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    @include media(sm-only) {
      &, * { width: 100% }
    }
  }
  .illustration {
    position: relative;
    width: 47.5%;
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
    @include media(sm-only) {
      display: none;
    }
    .listings {
      width: 100%;
      display: grid;
      grid-gap: var(--spacing-4);
      grid-template-columns: 1fr 1fr 1fr;
      align-self: center;
      z-index: 1;
      perspective: 1000px;
      > * {
        &:nth-child(2n + 1) {
          position: relative;
          top: -3rem;
        }
      }
    }
    .line {
      height: 6rem;
      margin: -0.5rem 0;
    }
    .chart {
      width: 100%;
      box-shadow: var(--box-shadow-1);
    }
  }
}
</style>
