<template>
  <BaseLayoutHome @keypress.native.enter="submit">
    <div class="login">
      <div class="container">
        <div class="title">Login</div>
        <BaseCard>
          <ValidationObserver class="form" ref="form" tag="form" v-slot="{ valid }" @submit.prevent="submit">
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
              <div class="text-button">I forgot my password</div>
            </router-link>
            <BaseDivider class="divider"/>
            <BaseFormSubmitButton
              text="Continue"
              type="submit"
              :loading="loading"
              :design="valid ? 'black' : 'disabled'"
            />
          </ValidationObserver>
        </BaseCard>
      </div>
    </div>
  </BaseLayoutHome>
</template>

<script>
import BaseLayoutHome from '@/components/BaseLayoutHome/BaseLayoutHome'
import BaseCard from '@/components/BaseCard/BaseCard'
import AuthService from '@/services/Api/services/AuthService/AuthService'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'login',
  metaInfo: {
    title: 'Login'
  },
  components: {
    BaseLayoutHome,
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
        email: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (this.loading || !(await this.$refs['form'].validate())) return
      this.loading = true
      try {
        const { user, accessToken } = await AuthService.login(this.form)
        this.$store.dispatch('user/loginSuccess', { user, accessToken })
        this.$router.push('/app/listings')
      } catch (error) {
        console.log(error)
        this.$notify({ type: 'error' })
        this.$store.dispatch('user/logout')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: var(--spacing-10) 0;
  @include media(sm-only) {
    padding: var(--spacing-8) 0;
  }
}
.container {
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  grid-gap: var(--spacing-5);
  max-width: 40rem;
  @include media(sm-only) {
    max-width: none;
  }
}
.form {
  width: 100%;
  position: relative;
}
.title {
  font-size: 2rem;
  font-weight: var(--font-weight-medium);
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
.text-button {
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
