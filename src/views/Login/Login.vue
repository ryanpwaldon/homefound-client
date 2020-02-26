<template>
  <BaseLayoutFocus @keypress.native.enter="submit">
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <div class="title">Login to Homefound</div>
      <BaseDivider class="divider"/>
      <div class="label">Email</div>
      <ValidationProvider class="provider email" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.email"
          autocomplete="username"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <div class="label">Password</div>
      <ValidationProvider class="provider password" name="password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          autocomplete="current-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <router-link to="/password/instructions">
        <div class="forgot-password">I forgot my password</div>
      </router-link>
      <BaseDivider class="divider"/>
      <BaseFormSubmitButton
        text="Login"
        :loading="loading"
        @click.native="submit"
        :design="invalid ? 'disabled' : 'black'"
      />
    </ValidationObserver>
  </BaseLayoutFocus>
</template>

<script>
import BaseLayoutFocus from '@/components/BaseLayoutFocus/BaseLayoutFocus'
import AuthService from '@/services/Api/services/AuthService/AuthService'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'login',
  components: {
    BaseLayoutFocus,
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
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['observer'].validate())) return
      this.loading = true
      try {
        const { user, accessToken } = await AuthService.login(this.form)
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$router.push('/app/listings')
      } catch (error) {
        console.log(error)
        this.$store.dispatch('user/logout')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.observer {
  width: 100%;
  position: relative;
}
.title {
  font-size: 1.6rem;
}
.label {
  font-size: 1.4rem;
  color: var(--color-gray-4);
  margin-bottom: var(--spacing-2);
}
.provider {
  position: relative;
  margin-bottom: var(--spacing-5);
  display: block;
}
.provider.password {
  margin-bottom: var(--spacing-2);
}
.forgot-password {
  font-size: 1.2rem;
  color: var(--color-gray-4);
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;
}
.divider {
  position: relative;
  width: calc(100% + var(--spacing-5) * 2);
  left: calc(-1 * var(--spacing-5));
}
</style>
