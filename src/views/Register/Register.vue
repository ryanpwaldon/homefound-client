<template>
  <div class="register" @keypress.enter="submit" v-if="authCheckIsComplete">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-2-2.svg">
    </router-link>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Create your account"/>
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
        text="Submit"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </div>
</template>

<script>
import AuthService from '@/services/Api/services/AuthService/AuthService'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'register',
  components: {
    BaseFormInput,
    BaseFormSubmitButton,
    BaseFormError,
    BaseText1,
    BaseText4,
    ValidationObserver,
    ValidationProvider
  },
  mounted () {
    if (this.$store.state.accessToken) this.$router.push('/app')
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
        const { user, accessToken } = await AuthService.register(this.form)
      }
      catch (error) {
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
  text-align: center;
}
.label {
  margin-bottom: var(--spacing-2);
}
.submit {
  margin-top: var(--spacing-6);
}
</style>
