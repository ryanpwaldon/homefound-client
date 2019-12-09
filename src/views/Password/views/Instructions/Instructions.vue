<template>
  <div class="instructions" @keypress.enter="submit" v-if="authCheckIsComplete">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-4.svg">
    </router-link>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Reset password"/>
      <BaseDivider/>
      <BaseText2 class="description">
        Type the email address linked to your account and we’ll send you password reset instructions. This may end up in your spam folder, so be sure to check there as well.
      </BaseText2>
      <BaseText4 class="label" text="Email"/>
      <ValidationProvider class="provider" name="email" rules="required|email" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.email"
          placeholder="tom@hanks.com"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseFormSubmitButton
        text="Send instructions"
        :loading="loading"
        @click.native="submit"
      />
    </ValidationObserver>
  </div>
</template>

<script>
import UserService from '@/services/Api/services/UserService/UserService'
import BaseDivider from '@/components/BaseDivider/BaseDivider'
import BaseText1 from '@/components/BaseText1/BaseText1'
import BaseText2 from '@/components/BaseText2/BaseText2'
import BaseText4 from '@/components/BaseText4/BaseText4'
import BaseFormInput from '@/components/BaseFormInput/BaseFormInput'
import BaseFormError from '@/components/BaseFormError/BaseFormError'
import BaseFormSubmitButton from '@/components/BaseFormSubmitButton/BaseFormSubmitButton'
import { ValidationObserver, ValidationProvider } from 'vee-validate/dist/vee-validate.full'
export default {
  name: 'instructions',
  components: {
    BaseFormInput,
    BaseDivider,
    BaseText1,
    BaseText2,
    BaseText4,
    BaseFormSubmitButton,
    BaseFormError,
    ValidationObserver,
    ValidationProvider
  },
  mounted () {
    if (this.$store.getters.authenticated) this.$router.push('/app')
    this.authCheckIsComplete = true
  },
  data () {
    return {
      form: {
        email: ''
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
        await UserService.sendPasswordResetInstructions(this.form.email)
        this.$notify({ text: 'If the email matches one of our accounts, we’ll send instructions to reset your password', type: 'success' })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.instructions {
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
  margin-bottom: var(--spacing-5);
  text-align: left;
}
.description {
  margin-bottom: var(--spacing-5);
  color: var(--color-gray-4);
  line-height: 1.5;
}
.label {
  margin-bottom: var(--spacing-2);
}
.provider {
  display: block;
  position: relative;
  margin-bottom: var(--spacing-5);
}
</style>
