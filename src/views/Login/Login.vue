<template>
  <LayoutFocus @keypress.native.enter="submit" v-if="authCheckIsComplete">
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Login to Homeshade"/>
      <BaseDivider/>
      <BaseText4 class="label" text="Email"/>
      <ValidationProvider class="provider email" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.email"
          placeholder="tom@hanks.com"
          autocomplete="username email"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseText4 class="label" text="Password"/>
      <ValidationProvider class="provider password" name="password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          placeholder="At least 8 characters"
          autocomplete="current-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <router-link to="/password/instructions">
        <div class="forgot-password">I forgot my password</div>
      </router-link>
      <BaseDivider/>
      <BaseFormSubmitButton
        text="Login"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </LayoutFocus>
</template>

<script>
import LayoutFocus from '@/layouts/LayoutFocus/LayoutFocus'
import AuthService from '@/services/Api/services/AuthService/AuthService'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'login',
  components: {
    LayoutFocus,
    BaseFormInput,
    BaseDivider,
    BaseText1,
    BaseText4,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  mounted () {
    if (this.$store.state.user.accessToken) {
      if (this.$store.state.user.user && this.$store.state.user.user.verified) this.$router.push('/app')
      else this.$router.push('/verify')
    }
    this.authCheckIsComplete = true
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      authCheckIsComplete: false
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
.label {
  margin-bottom: var(--spacing-2);
}
.provider {
  position: relative;
  margin-bottom: var(--spacing-5);
  display: block;
}
.provider.password {
  margin-bottom: var(--spacing-1);
}
.forgot-password {
  font-size: 12px;
  color: var(--color-gray-4);
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;
}
</style>
