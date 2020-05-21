<template>
  <div class="explore">
    <BaseLayoutFullWindow/>
    <BaseNavHorizontalPrimary/>
    <BasePreviewMap class="map"/>
    <BaseCard class="card">
      <div class="title">Explore our listings</div>
      <div class="subcopy">Sign up for full access or subscribe to our newsletter – we’ll update you as we grow.</div>
      <div class="buttons-container">
        <router-link to="/signup/buyer">
          <BaseButtonLarge
            class="button"
            text="Sign up for full access"
            design="red"
          />
        </router-link>
        <BaseButtonLarge
          class="button"
          text="Subscribe for updates"
          design="pink"
          @click.native="showForm = true"
          v-if="!showForm"
        />
        <ValidationObserver v-slot="{ valid }" v-else>
          <form class="form" @submit.prevent="valid && submit()">
            <ValidationProvider name="email" rules="required|email">
              <BaseFormInput v-model="form.email" placeholder="Enter your email..."/>
            </ValidationProvider>
            <BaseButtonLarge class="button" text="Get updates" type="submit" design="pink" :loading="loading"/>
          </form>
        </ValidationObserver>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import BaseLayoutFullWindow from '@/components/BaseLayoutFullWindow/BaseLayoutFullWindow'
import BaseNavHorizontalPrimary from '@/components/BaseNavHorizontalPrimary/BaseNavHorizontalPrimary'
import BaseCard from '@/components/BaseCard/BaseCard'
import BasePreviewMap from '@/components/BasePreviewMap/BasePreviewMap'
import BaseButtonLarge from '@/components/BaseButtonLarge/BaseButtonLarge'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full'
export default {
  components: {
    BaseLayoutFullWindow,
    BaseNavHorizontalPrimary,
    BaseCard,
    BasePreviewMap,
    BaseButtonLarge,
    BaseFormInput,
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    loading: false,
    showForm: false,
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
.explore {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card {
  display: flex;
  flex-direction: column;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 43.5rem;
  margin: var(--spacing-5);
  @include media(sm-only) {
    position: relative;
    flex-shrink: 0;
    margin: 0;
    width: 100%;
    border: 0;
    border-top: solid 1px var(--color-gray-1);
    padding: var(--spacing-4);
  }
}
.title {
  font-size: 1.8rem;
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);
}
.subcopy {
  font-size: 1.6rem;
  line-height: 1.5;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-5);
  @include media(sm-only) {
    margin-bottom: var(--spacing-4);
  }
}
.buttons-container {
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-4);
}
.button {
  width: 100%;
}
.form {
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-gap: var(--spacing-2);
}
</style>
