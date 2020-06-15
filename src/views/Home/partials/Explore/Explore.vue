<template>
  <div class="explore">
    <div class="header">
      <div class="title">Explore our listings</div>
      <div class="paragraph" :style="{ opacity: totalListingsCount ? 1 : 0 }">There are {{ totalListingsCount }} off-market properties listed on Homefound</div>
    </div>
    <div class="map-container">
      <BasePreviewMap class="map" @loaded="totalListingsCount = $event.totalListingsCount"/>
    </div>
    <div class="content">
      <div class="paragraph mobile">Sign up for full access or subscribe to our newsletter – we’ll update you as we grow.</div>
      <BaseCard class="card action">
        <div class="title">Subscribe for full access</div>
        <div class="paragraph">Gain access by subscribing to a no lock-in monthly or yearly subscription. Cancel anytime.</div>
        <router-link to="/signup/buyer">
          <BaseButtonLarge class="button" text="Get started" design="red"/>
        </router-link>
      </BaseCard>
      <BaseCard class="card newsletter">
        <div class="title">Nothing in your area?</div>
        <div class="paragraph">Subscribe to our newsletter – we’ll update you as we grow.</div>
        <BaseButtonLarge class="button" text="Subscribe for updates" design="pink" @click.native="showForm = true" v-if="!showForm"/>
        <ValidationObserver v-slot="{ valid }" v-else>
          <form class="form" @submit.prevent="valid && submit()">
            <ValidationProvider name="email" rules="required|email">
              <BaseFormInput v-model="form.email" placeholder="Enter your email..."/>
            </ValidationProvider>
            <BaseButtonLarge class="button" text="Get updates" type="submit" design="pink" :loading="loading"/>
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
    showForm: false,
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
.header .title {
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
.header .paragraph {
  font-size: 1.6rem;
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  text-align: center;
  transition: var(--transition-settings-1) opacity;
  line-height: 1.5;
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
    text-align: center;
    grid-template-columns: 1fr;
    grid-gap: var(--spacing-4);
  }
}
.content .title {
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
  line-height: 1.5;
}
.content .paragraph {
  font-size: 1.6rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-4);
  line-height: 1.5;
}
.content .button {
  font-size: 1.4rem;
  @include media(sm-only) {
    width: 100%;
  }
}
.newsletter .form {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: var(--spacing-2);
}
.paragraph.mobile {
  display: none;
  @include media(sm-only) {
    display: block;
    margin: 0;
  }
}
@include media(sm-only) {
  .map-container {
    width: 100vw;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 0;
  }
  .card {
    border: none;
    border-radius: 0;
    background: var(--color-transparent);
    padding: 0;
  }
  .card .title,
  .card .paragraph {
    display: none;
  }
}
</style>
