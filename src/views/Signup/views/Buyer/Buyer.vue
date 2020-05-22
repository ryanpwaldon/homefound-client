<template>
  <div class="container">
    <Nav/>
    <BaseCard class="card">
      <ValidationObserver class="form" ref="form" tag="form" v-slot="{ valid }" @submit.prevent="submit">
        <div class="content">
          <div class="section">
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
          </div>
          <div class="vertical-divider"/>
          <div class="section">
            <div class="label">Plan</div>
            <ValidationProvider class="input" name="plan" rules="required" v-slot="{ errors }">
              <BaseFormToggleText v-model="form.plan" :options="[Plan.BASIC_MONTHLY, Plan.BASIC_YEARLY]">
                <template #option-1="{ active }">
                  <div class="option" :class="{ active }">
                    <div class="title">Monthly</div>
                    <div class="subtitle">${{ Plan.BASIC_MONTHLY_PRICE }} billed monthly</div>
                  </div>
                </template>
                <template #option-2="{ active }">
                  <div class="option" :class="{ active }">
                    <div class="title">Yearly <span class="discount">(save 20%)</span></div>
                    <div class="subtitle">${{ Plan.BASIC_YEARLY_PRICE | numeral('0,0') }} billed yearly</div>
                  </div>
                </template>
              </BaseFormToggleText>
              <BaseFormError :message="errors[0]"/>
            </ValidationProvider>
            <div class="label">Card details</div>
            <ValidationProvider class="input" name="card details" rules="required|card" v-slot="{ errors }" :custom-messages="{ required: 'Your card details are required.' }">
              <BaseFormCard v-model="card"/>
              <div class="card-error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="footer">
          <BaseFormSubmitButton
            class="submit"
            type="submit"
            text="Create account"
            :loading="loading"
            :design="valid ? 'black' : 'disabled'"
          />
        </div>
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
import UserService from '@/services/Api/services/UserService/UserService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormCard from '@/components/BaseFormCard/BaseFormCard'
import BaseFormToggleText from '@/components/BaseFormToggleText/BaseFormToggleText'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
import * as Plan from '@/constants/plan/plan'
export default {
  name: 'signup',
  metaInfo: {
    title: 'Signup: Buyer'
  },
  components: {
    Nav,
    BaseCard,
    BaseFormInput,
    BaseFormSubmitButton,
    BaseFormError,
    BaseFormToggleText,
    BaseFormCard,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      Plan,
      form: {
        name: '',
        email: '',
        plan: Plan.BASIC_MONTHLY,
        password: ''
      },
      card: null,
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['form'].validate())) return
      this.loading = true
      try {
        const paymentMethodId = (await window.stripe.createPaymentMethod({ type: 'card', card: this.card.item })).paymentMethod.id
        const { user, accessToken } = await UserService.createBuyer({ ...this.form, paymentMethodId })
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$router.push('/verify/email')
      } catch (error) {
        console.log(error)
        this.$notify({ type: 'error' })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 80rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
.card {
  padding: 0;
}
.form {
  display: flex;
  flex-direction: column;
}
.content {
  display: flex;
  @include media(sm-only) {
    flex-direction: column;
    > *:not(:last-child) {
      padding-bottom: 0;
    }
  }
}
.section {
  padding: var(--spacing-5);
  width: 100%;
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
.option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: var(--color-gray-6);
  padding: var(--spacing-2) 0;
  transition: color var(--transition-settings-1);
  font-size: 0.5rem;
  &.active {
    color: var(--color-black-2);
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
.vertical-divider {
  position: relative;
  width: 1px;
  flex-shrink: 0;
  background: var(--color-gray-1);
}
.footer {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  padding: var(--spacing-5);
  align-items: center;
  border-top: 1px solid var(--color-gray-1);
  grid-gap: var(--spacing-5);
  @include media(sm-only) {
    display: flex;
  }
}
.submit {
  width: 100%;
  grid-column: 3;
  @include media(sm-only) {
    width: 100%;
  }
}
.card-error {
  top: 100%;
  position: absolute;
  color: var(--color-red-1);
  margin-top: var(--spacing-2);
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
</style>
