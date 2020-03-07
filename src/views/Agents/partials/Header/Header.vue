<template>
  <div class="header">
    <div class="content">
      <div class="title">Pre-market listing service for agents</div>
      <div class="subtitle">List properties for free and gain insights that boost your listing performance on REA and Domain</div>
      <div class="buttons">
        <router-link to="/signup/agent">
          <BaseButtonLarge text="Get started" design="red"/>
        </router-link>
        <BaseButtonLarge text="View demo" design="pink"/>
      </div>
    </div>
    <div class="illustration">
      <div class="listings">
        <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
        <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
        <BaseMockListing listing-width="auto" spacing="0.8rem" placeholder-height="1rem"/>
      </div>
      <svg class="line" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 51">
        <path ref="line-path" d="M2.5,2.5v46" fill="none" stroke="var(--color-gray-8)" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" stroke-dasharray="0.1 10"/>
      </svg>
      <svg class="chart" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 445 239">
        <rect width="445" height="239" fill="#fff" rx="3"/>
        <path fill="#EFEEEC" d="M0 3a3 3 0 013-3h439a3 3 0 013 3v38H0V3z"/>
        <path fill="#AAA5A2" d="M38.555 224.228v-8.456H37.02l-2.696 6.469h-.1l-2.689-6.469H30v8.456h1.219v-6.106h.082l2.478 5.906h.996l2.479-5.906h.082v6.106h1.219zM45.48 215.567c-2.426 0-3.95 1.7-3.95 4.43 0 2.725 1.488 4.436 3.95 4.436 2.443 0 3.943-1.717 3.943-4.436 0-2.725-1.512-4.43-3.944-4.43zm0 1.225c1.599 0 2.6 1.242 2.6 3.205 0 1.951-.995 3.211-2.6 3.211-1.63 0-2.608-1.26-2.608-3.211 0-1.963 1.008-3.205 2.607-3.205zM53.681 224.228v-6.006h.094l4.342 6.006H59.3v-8.456h-1.277v6.006h-.094l-4.342-6.006h-1.183v8.456h1.277zM97.573 224.125v-7.26h2.655v-1.195h-6.627v1.195h2.66v7.26h1.312zM104.34 215.67h-1.313v5.543c0 1.834 1.307 3.117 3.422 3.117 2.127 0 3.428-1.283 3.428-3.117v-5.543h-1.313v5.426c0 1.183-.767 2.004-2.115 2.004-1.342 0-2.109-.821-2.109-2.004v-5.426zM118.559 222.93h-4.055v-2.537h3.838v-1.137h-3.838v-2.391h4.055v-1.195h-5.367v8.455h5.367v-1.195zM158.191 218.022h.082l1.817 6.206h1.236l2.285-8.456h-1.365l-1.547 6.475h-.082l-1.775-6.475h-1.219l-1.764 6.475h-.082l-1.552-6.475h-1.366l2.28 8.456h1.242l1.81-6.206zM171.766 223.032h-4.054v-2.537h3.838v-1.137h-3.838v-2.39h4.054v-1.196h-5.367v8.456h5.367v-1.196zM174.865 215.772v8.456h3.053c2.519 0 3.978-1.553 3.978-4.254 0-2.661-1.471-4.202-3.978-4.202h-3.053zm1.312 1.196h1.594c1.752 0 2.789 1.113 2.789 3.023 0 1.94-1.019 3.041-2.789 3.041h-1.594v-6.064zM220.168 224.125v-7.26h2.654v-1.195h-6.627v1.195h2.66v7.26h1.313zM232.595 224.125v-8.455h-1.307v3.551h-4.342v-3.551h-1.312v8.455h1.312v-3.709h4.342v3.709h1.307zM237.216 215.67h-1.312v5.543c0 1.834 1.307 3.117 3.422 3.117 2.127 0 3.428-1.283 3.428-3.117v-5.543h-1.313v5.426c0 1.183-.768 2.004-2.115 2.004-1.342 0-2.11-.821-2.11-2.004v-5.426zM278.366 224.228v-3.504h3.633v-1.161h-3.633v-2.595h3.967v-1.196h-5.279v8.456h1.312zM286.551 216.927h1.851c1.014 0 1.635.556 1.635 1.476 0 .944-.586 1.483-1.6 1.483h-1.886v-2.959zm0 4.078h1.851l1.723 3.223h1.517l-1.898-3.44c1.031-.351 1.641-1.277 1.641-2.414 0-1.588-1.096-2.602-2.801-2.602h-3.346v8.456h1.313v-3.223zM295.766 224.228v-8.456h-1.312v8.456h1.312zM330.066 221.954c.094 1.512 1.354 2.479 3.229 2.479 2.004 0 3.258-1.014 3.258-2.631 0-1.272-.715-1.975-2.449-2.379l-.932-.229c-1.102-.257-1.547-.603-1.547-1.207 0-.761.691-1.259 1.729-1.259.984 0 1.664.486 1.787 1.265h1.277c-.076-1.424-1.33-2.426-3.047-2.426-1.846 0-3.076 1.002-3.076 2.508 0 1.242.697 1.981 2.226 2.338l1.09.264c1.119.263 1.612.65 1.612 1.295 0 .75-.774 1.295-1.828 1.295-1.131 0-1.916-.51-2.028-1.313h-1.301zM344.954 224.228h1.394l-3.052-8.456h-1.412l-3.053 8.456h1.348l.779-2.245h3.222l.774 2.245zm-2.432-6.92h.1l1.224 3.574h-2.554l1.23-3.574zM351.509 224.228v-7.26h2.655v-1.196h-6.627v1.196h2.66v7.26h1.312zM388.464 221.954c.094 1.512 1.353 2.479 3.228 2.479 2.004 0 3.258-1.014 3.258-2.631 0-1.272-.715-1.975-2.449-2.379l-.932-.229c-1.101-.257-1.547-.603-1.547-1.207 0-.761.692-1.259 1.729-1.259.984 0 1.664.486 1.787 1.265h1.277c-.076-1.424-1.33-2.426-3.046-2.426-1.846 0-3.077 1.002-3.077 2.508 0 1.242.698 1.981 2.227 2.338l1.09.264c1.119.263 1.611.65 1.611 1.295 0 .75-.773 1.295-1.828 1.295-1.131 0-1.916-.51-2.027-1.313h-1.301zM399.179 215.772h-1.312v5.543c0 1.834 1.307 3.118 3.422 3.118 2.127 0 3.428-1.284 3.428-3.118v-5.543h-1.313v5.426c0 1.184-.767 2.004-2.115 2.004-1.342 0-2.11-.82-2.11-2.004v-5.426zM409.309 224.228v-6.006h.094l4.342 6.006h1.183v-8.456h-1.277v6.006h-.094l-4.342-6.006h-1.183v8.456h1.277z"/>
        <path fill="#111" d="M30.06 17.545V26h1.313v-2.848h1.957c1.658 0 2.83-1.136 2.83-2.789 0-1.675-1.137-2.818-2.789-2.818h-3.31zm1.313 1.16h1.652c1.155 0 1.793.586 1.793 1.658 0 1.05-.662 1.635-1.793 1.635h-1.652v-3.293zM44.42 24.805h-4.054v-2.537h3.838V21.13h-3.838v-2.39h4.055v-1.196h-5.367V26h5.367v-1.195zM48.832 18.7h1.851c1.014 0 1.635.556 1.635 1.476 0 .943-.586 1.482-1.6 1.482h-1.886V18.7zm0 4.077h1.851L52.406 26h1.517l-1.898-3.44c1.031-.351 1.64-1.277 1.64-2.413 0-1.588-1.095-2.602-2.8-2.602h-3.346V26h1.313v-3.223zM58.047 26v-3.504h3.633v-1.16h-3.633V18.74h3.967v-1.195h-5.28V26h1.313zM68.523 17.34c-2.426 0-3.95 1.7-3.95 4.43 0 2.724 1.489 4.435 3.95 4.435 2.443 0 3.943-1.717 3.943-4.435 0-2.725-1.512-4.43-3.943-4.43zm0 1.224c1.6 0 2.601 1.243 2.601 3.206 0 1.95-.996 3.21-2.601 3.21-1.63 0-2.608-1.26-2.608-3.21 0-1.963 1.008-3.206 2.608-3.206zM76.76 18.7h1.851c1.014 0 1.635.556 1.635 1.476 0 .943-.586 1.482-1.6 1.482H76.76V18.7zm0 4.077h1.851L80.334 26h1.518l-1.899-3.44c1.031-.351 1.64-1.277 1.64-2.413 0-1.588-1.095-2.602-2.8-2.602h-3.346V26h1.313v-3.223zM93.218 26v-8.455h-1.536l-2.695 6.469h-.1l-2.689-6.47h-1.535V26h1.219v-6.105h.082l2.478 5.906h.996l2.479-5.906h.082V26h1.219zM102.011 26h1.395l-3.053-8.455h-1.412L95.888 26h1.348l.78-2.244h3.222l.773 2.244zm-2.431-6.92h.1l1.224 3.574h-2.555l1.23-3.574zM107.36 26v-6.006h.094L111.795 26h1.184v-8.455h-1.277v6.006h-.094l-4.342-6.006h-1.184V26h1.278zM119.775 26.205c1.886 0 3.275-1.113 3.509-2.783h-1.306c-.235.955-1.084 1.558-2.203 1.558-1.524 0-2.473-1.236-2.473-3.205 0-1.974.949-3.21 2.467-3.21 1.113 0 1.963.667 2.209 1.704h1.306c-.211-1.722-1.652-2.93-3.515-2.93-2.35 0-3.809 1.694-3.809 4.436 0 2.737 1.465 4.43 3.815 4.43zM131.58 24.805h-4.055v-2.537h3.838V21.13h-3.838v-2.39h4.055v-1.196h-5.367V26h5.367v-1.195z"/>
        <path ref="chart-path" stroke="var(--color-green-9)" d="M396.5 93.5l-58 16-58-8.5-58 31-58 13.5-58.5-14-57.5 27" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke-dasharray="0.1 10"/>
        <circle r="3" fill="#ffffff" stroke="#fff" transform="matrix(-1 0 0 1 48.5 158.5)"/>
        <circle r="3" fill="#ffffff" stroke="#fff" transform="matrix(-1 0 0 1 396.5 93.5)"/>
      </svg>
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
      targets: this.$refs['line-path'],
      strokeDashoffset: -20,
      easing: 'linear',
      duration: 2000,
      loop: true
    })
    anime({
      targets: this.$refs['chart-path'],
      strokeDashoffset: 20,
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
    max-width: 95%;
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
  .illustration {
    position: relative;
    width: 45%;
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
      height: 7rem;
      margin: -0.5rem 0;
    }
    .chart {
      width: 100%;
      box-shadow: var(--box-shadow-1);
      border-radius: var(--border-radius-1);
    }
  }
}
</style>
