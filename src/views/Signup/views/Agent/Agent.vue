<template>
  <div class="container">
    <Nav/>
    <BaseCard>
      <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ valid }">
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
        <div class="label">Phone</div>
        <ValidationProvider class="input" name="phone" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.phone"
            autocomplete="phone"
          />
          <BaseFormError :message="errors[0]"/>
        </ValidationProvider>
        <div class="label">Agent licence number</div>
        <ValidationProvider class="input" name="agent licence number" rules="required|numeric" v-slot="{ errors }">
          <BaseFormInput
            v-model="form.licenceNumber"
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
        <BaseDivider class="divider"/>
        <BaseFormSubmitButton
          class="submit"
          text="Create account"
          :loading="loading"
          @click.native="submit"
          :design="valid ? 'black' : 'disabled'"
        />
      </ValidationObserver>
    </BaseCard>
  </div>
</template>

<script>
import Nav from '../../components/Nav/Nav'
import BaseCard from '@/components/BaseCard/BaseCard'
import UserService from '@/services/Api/services/UserService/UserService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'signup',
  components: {
    Nav,
    BaseCard,
    BaseFormInput,
    BaseDivider,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        licenceNumber: '',
        password: '',
        userType: 'SELLER'
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        const { user, accessToken } = await UserService.register(this.form)
        this.$notify({ type: 'success' })
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$router.push('/verify')
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
  max-width: 40rem;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
}
.title {
  font-size: 1.6rem;
  color: var(--color-black-2);
}
.label {
  font-size: 1.4rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.input {
  position: relative;
  margin-bottom: var(--spacing-5);
  display: block;
}
.divider {
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
}
</style>
