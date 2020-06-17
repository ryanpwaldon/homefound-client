<template>
  <div class="container">
    <Nav/>
    <BaseCard class="card">
      <ValidationObserver class="form" ref="form" tag="form" v-slot="{ valid }" @submit.prevent="submit">
        <div class="label">Name</div>
        <ValidationProvider class="input" name="name" rules="required|alpha_spaces" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.name"
            autocomplete="name"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Email</div>
        <ValidationProvider class="input" name="email" rules="required|email" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.email"
            autocomplete="email"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Password</div>
        <ValidationProvider class="input" name="password" rules="required|min:8" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.password"
            autocomplete="new-password"
            type="password"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Invite code</div>
        <ValidationProvider class="input" name="invite code" rules="required|forceInvalid" v-slot="{ errors }">
          <BaseFormInput v-model="form.inviteCode"/>
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <BaseDivider class="divider"/>
        <BaseFormSubmitButton
          class="submit"
          type="submit"
          text="Create account"
          :loading="loading"
          :design="valid ? 'black' : 'disabled'"
        />
      </ValidationObserver>
    </BaseCard>
    <div class="disclaimer">
      By creating an account, you acknowledge that you have read and understood, and agree to Homefound's <router-link to="/terms">Terms & Conditions</router-link> and <router-link to="/privacy">Privacy Policy</router-link>.
    </div>
  </div>
</template>

<script>
import Nav from '../../components/Nav/Nav'
import BaseCard from '@/components/BaseCard/BaseCard'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'signup',
  metaInfo: {
    title: 'Sign up: Buyer'
  },
  components: {
    Nav,
    BaseCard,
    BaseFormInput,
    BaseFormSubmitButton,
    BaseFormError,
    BaseDivider,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        inviteCode: ''
      },
      card: null,
      loading: false
    }
  },
  methods: {
    async submit () {
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 40rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
.label {
  font-size: 1.4rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.input {
  position: relative;
  display: block;
  &:not(:last-child) {
    margin-bottom: var(--spacing-5);
  }
}
.title {
  font-size: 1.4rem;
  font-family: var(--font-1);
  font-weight: var(--font-weight-medium);
  display: flex;
  align-items: center;
  margin-bottom: 0.2em;
}
.discount {
  font-size: 1.2rem;
  margin-left: 0.5rem;
}
.subtitle {
  font-size: 1.4rem;
  font-family: var(--font-1);
  font-weight: var(--font-weight-regular);
}
.submit {
  width: 100%;
}
.disclaimer {
  line-height: 1.5;
  font-size: 1.2rem;
  color: var(--color-gray-6);
  text-align: center;
  max-width: 50rem;
  margin: auto;
  a {
    text-decoration: underline;
  }
}
.divider {
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
}
</style>
