<template>
  <div class="login" @keypress.enter="submit">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-2-2.svg">
    </router-link>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.email"
          placeholder="tom@hanks.com"
          autocomplete="username"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <ValidationProvider class="provider" name="password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          placeholder="At least 8 characters"
          autocomplete="current-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <div class="forgot-password">I forgot my password</div>
      <BaseFormSubmitButton
        text="Login to Homeshade"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </div>
</template>

<script>
import AuthService from '@/services/Api/services/AuthService/AuthService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'login',
  components: {
    BaseFormInput,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  mounted () {
    if (this.$store.state.accessToken) this.$router.push('/app')
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
        this.$store.dispatch('loginSuccess', { user, accessToken })
        this.$router.push('/app/listings')
      }
      catch (error) {
        this.$notify({ text: 'Your login info isn\'t right. Try again, or reset your password if it slipped your mind.', type: 'error' })
        this.$store.dispatch('logout')
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-2);
}
.logo {
  position: absolute;
  margin: var(--spacing-5);
  height: 2.5rem;
  left: 0;
  top: 0;
}
.observer {
  width: 256px;
  position: relative;
}
.provider {
  position: relative;
  display: block;
}
.provider:nth-child(1) {
  margin-bottom: var(--spacing-4);
}
.provider:nth-child(2) {
  margin-bottom: var(--spacing-1);
}
.forgot-password {
  font-size: 12px;
  color: var(--color-medium-gray);
  text-decoration: underline;
  margin-bottom: calc(var(--spacing-4) + 5px);
  display: inline-block;
  cursor: pointer;
}
</style>
