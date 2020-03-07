<template>
  <div class="container">
    <Nav/>
    <BaseCard class="card">
      <ValidationObserver class="form" ref="form" tag="div" v-slot="{ valid }">
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
            <div class="input plan">
              <div class="price">74 AUD</div>
              <div class="subcopy">billed monthly</div>
            </div>
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
            text="Create account"
            :loading="loading"
            @click.native="submit"
            :design="valid ? 'black' : 'disabled'"
          />
        </div>
      </ValidationObserver>
    </BaseCard>
  </div>
</template>

<script>
import Nav from '../../components/Nav/Nav'
import BaseCard from '@/components/BaseCard/BaseCard'
import UserService from '@/services/Api/services/UserService/UserService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormCard from '@/components/BaseFormCard/BaseFormCard'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'signup',
  components: {
    Nav,
    BaseCard,
    BaseFormInput,
    BaseFormSubmitButton,
    BaseFormError,
    BaseFormCard,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
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
        this.$router.push('/app')
      } catch (error) {
        console.log(error)
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
.plan {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--spacing-4);
  border-radius: var(--border-radius-1);
  border: solid 1px var(--color-gray-1);
  background: var(--color-gray-2);
  .price {
    font-size: 2.4rem;
    font-weight: var(--font-weight-medium);
    color: var(--color-black-2);
  }
  .subcopy {
    font-size: 1.4rem;
    color: var(--color-gray-4);
  }
}
.vertical-divider {
  position: relative;
  width: 1px;
  flex-shrink: 0;
  background: var(--color-gray-1);
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--spacing-5);
  border-top: 1px solid var(--color-gray-1);
}
.submit {
  width: calc(50% - var(--spacing-5) - 0.5px);
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
</style>
