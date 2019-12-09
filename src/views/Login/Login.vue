<template>
  <div class="login" @keypress.enter="submit" v-if="authCheckIsComplete">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-4.svg">
    </router-link>
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
      <BaseFormSubmitButton
        text="Login"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </div>
</template>

<script>
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
    if (this.$store.state.accessToken) {
      if (this.$store.state.user && this.$store.state.user.active) this.$router.push('/app')
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
        this.$store.dispatch('loginSuccess', { user, accessToken })
        this.$router.push('/app/listings')
      } catch (error) {
        console.log(error)
        this.$store.dispatch('logout')
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
.title {
  margin-bottom: var(--spacing-6);
  text-align: left;
}
.label {
  margin-bottom: var(--spacing-2);
}
.provider {
  position: relative;
  display: block;
}
.provider.email {
  margin-bottom: var(--spacing-4);
}
.provider.password {
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
