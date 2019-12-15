<template>
  <div class="register" @keypress.enter="submit" v-if="authCheckIsComplete">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-4.svg">
    </router-link>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Create your account"/>
      <BaseDivider/>
      <BaseText4 class="label" text="Name"/>
      <ValidationProvider class="provider" name="name" rules="required|alpha_spaces" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.name"
          placeholder="Tom Hanks"
          autocomplete="name"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseText4 class="label" text="Email"/>
      <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.email"
          placeholder="tom@hanks.com"
          autocomplete="username email"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseText4 class="label" text="Password"/>
      <ValidationProvider class="provider" name="password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
          type="password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseFormSubmitButton
        class="submit"
        text="Next"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </div>
</template>

<script>
import UserService from '@/services/Api/services/UserService/UserService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'register',
  components: {
    BaseFormInput,
    BaseDivider,
    BaseFormSubmitButton,
    BaseFormError,
    BaseText1,
    BaseText4,
    ValidationObserver,
    ValidationProvider
  },
  mounted () {
    if (this.$store.state.user.accessToken) {
      if (this.$store.state.user.user && this.$store.state.user.user.active) this.$router.push('/app')
      else this.$router.push('/verify')
    }
    this.authCheckIsComplete = true
  },
  data () {
    return {
      form: {
        name: '',
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
        const { user, accessToken } = await UserService.register(this.form)
        this.$notify({ text: 'Account successfully created', type: 'success' })
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
.register {
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
  margin-bottom: var(--spacing-4);
  display: block;
}
.title {
  margin-bottom: var(--spacing-6);
  text-align: left;
}
.label {
  margin-bottom: var(--spacing-2);
}
.submit {
  margin-top: var(--spacing-6);
}
</style>
