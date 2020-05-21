<template>
  <div class="explore">
    <div class="header">
      <div class="title">Explore our listings</div>
      <div class="subtitle" :style="{ opacity: totalListingsCount ? 1 : 0 }">There are {{ totalListingsCount }} off-market properties listed on Homefound</div>
      <BaseButtonLarge class="button" text="View interactive map" design="pink"/>
    </div>
    <div class="map-container" @mouseenter="pulse = true" @mouseleave="pulse = false">
      <BasePreviewMap class="map" @loaded="totalListingsCount = $event.totalListingsCount"/>
    </div>
    <div class="content">
      <BaseCard>
        <div class="copy-1">Sign up to gain access</div>
        <div class="copy-2">
          Access exclusive properties before they list on Realestate.com.au or Domain.</div>
        <router-link to="/signup/buyer">
          <BaseButtonLarge class="button" text="Get started" design="red"/>
        </router-link>
      </BaseCard>
      <BaseCard>
        <div class="copy-1">Not in your area?</div>
        <div class="copy-2">Subscribe to our newsletter and we’ll let you know when we expand to new locations.</div>
        <ValidationObserver v-slot="{ valid }">
          <form class="form" @submit.prevent="valid && submit()">
            <ValidationProvider name="email" rules="required|email">
              <BaseFormInput v-model="form.email" placeholder="Enter your email..."/>
            </ValidationProvider>
            <BaseButtonLarge class="button" text="Submit" type="submit" design="pink" :loading="loading"/>
          </form>
        </ValidationObserver>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import BasePreviewMap from '@/components/BasePreviewMap/BasePreviewMap'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
export default {
  components: {
    BasePreviewMap,
    BaseCard,
    BaseButtonLarge,
    BaseFormInput,
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    loading: false,
    totalListingsCount: null,
    form: {
      email: ''
    }
  }),
  methods: {
    async submit () {
      if (this.loading) return
      this.loading = true
      try {
        await new Promise(resolve => this.$segment.identify({ email: this.form.email }, resolve))
        this.$notify({ type: 'success', message: 'Subscribed' })
      } catch (err) {
        console.log(err)
        this.$notify({ type: 'error' })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3.5rem;
  margin-bottom: var(--spacing-2);
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
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  text-align: center;
  transition: var(--transition-settings-1) opacity;
  line-height: 1.5;
  @include media(sm-only) {
    margin-bottom: var(--spacing-2);
  }
}
.count {
  position: relative;
  display: inline-block;
  color: var(--color-black-2);
  font-weight: var(--font-weight-medium);
  &::after {
    width: 100%;
    position: absolute;
    height: 2px;
    top: 100%;
    left: 0;
    background: var(--color-black-2);
    content: '';
    @include media(sm-only) {
      display: none;
    }
  }
}
.map-container {
  height: 0;
  width: 100%;
  position: relative;
  padding-top: calc(100% / 16 * 10);
  margin-bottom: var(--spacing-5);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-1);
  overflow: hidden;
}
.map {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.content {
  width: 100%;
  display: grid;
  grid-gap: var(--spacing-5);
  grid-template-columns: 1fr 1fr;
  @include media(sm-only) {
    grid-template-columns: 1fr;
  }
}
.copy-1 {
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
  line-height: 1.5;
}
.copy-2 {
  font-size: 1.6rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-4);
  line-height: 1.5;
}
.button {
  font-size: 1.4rem;
  @include media(sm-only) {
    width: 100%;
  }
}
.form {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: var(--spacing-2);
}
.map-container,
.content {
  @include media(sm-only) {
    display: none;
  }
}
.header .button {
  display: none;
  @include media(sm-only) {
    display: block;
  }
}
</style>
