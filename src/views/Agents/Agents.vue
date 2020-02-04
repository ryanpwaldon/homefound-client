<template>
  <div class="agents">
    <BaseNavHorizontalPrimary/>
    <div class="container">
      <div class="section section-1">
        <div class="content">
          <div class="copy-1">List for free and<br>gain quality insights</div>
          <div class="copy-2">Advertise your pre-market and off-market listings to our private audience of motivated buyers and gain quality market insights</div>
          <div class="buttons">
            <BaseButtonLarge text="Get started" design="red"/>
          </div>
        </div>
        <div class="illustration">
          <div class="listings" ref="listings">
            <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
            <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem" :image="require('./assets/1.jpg')"/>
            <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
          </div>
          <svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 51">
            <path ref="line-path" d="M2.5,2.5v46" fill="none" stroke="#00a672" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" stroke-dasharray="0.1 10"/>
          </svg>
          <img class="chart" src="./assets/chart.png">
        </div>
      </div>
    </div>
    <BaseFooter/>
  </div>
</template>

<script>
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseMockListing from '@/components/BaseMockListing/BaseMockListing'
import BaseFooter from '@/components/BaseFooter/BaseFooter'
import anime from 'animejs'
export default {
  name: 'agents',
  components: {
    BaseNavHorizontalPrimary,
    BaseButtonLarge,
    BaseMockListing,
    BaseFooter
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
.agents {
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
  .illustration {
    position: relative;
    width: 40%;
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
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
