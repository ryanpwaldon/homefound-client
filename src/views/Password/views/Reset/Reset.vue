<template>
  <div class="reset" @keypress.enter="submit" v-if="authCheckIsComplete">
    <router-link to="/">
      <img class="logo" src="@/assets/img/logo-4.svg">
    </router-link>
    <ValidationObserver class="observer" ref="observer" tag="div" v-slot="{ invalid }">
      <BaseText1 class="title" text="Reset password"/>
      <BaseDivider/>
      <BaseText2 class="description">
        Please enter your new password.
      </BaseText2>
      <BaseText4 class="label" text="Password"/>
      <ValidationProvider class="provider" name="password" rules="required" v-slot="{ errors }">
        <BaseFormInput
          v-model="form.password"
          placeholder="At least 8 characters"
          autocomplete="new-password"
        />
        <BaseFormError :message="errors[0]"/>
      </ValidationProvider>
      <BaseFormSubmitButton
        text="Reset password"
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
  name: 'reset',
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
  props: {
    token: {
      type: String,
      required: true
    }
  },
  mounted () {
    if (this.$store.getters.authenticated) this.$router.push('/app')
    this.authCheckIsComplete = true
  },
  data () {
    return {
      form: {
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
        await UserService.passwordReset(this.token, this.form.password)
        this.$notify({ text: 'Successfully reset password', type: 'success' })
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.reset {
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
